const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '24h'
  });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', validateRegister, async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists with this email'
      });
    }

    // Validate role
    const allowedRoles = ['customer', 'seller'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role selected'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password, phone, address, role, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'active', NOW())`,
      [name, email, hashedPassword, phone || null, address || null, role]
    );

    // Generate token
    const token = generateToken(result.insertId);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: result.insertId,
          name,
          email,
          phone,
          role
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Check if user exists
    const [users] = await db.execute(
      'SELECT id, name, email, password, phone, role, status FROM users WHERE email = ?',
      [email]
    );
    console.log('Found users:', users.length);

    if (users.length === 0) {
      console.log('No user found with email:', email);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const user = users[0];
    console.log('User found:', { id: user.id, email: user.email, role: user.role, status: user.status });

    // Check if account is active
    if (user.status !== 'active') {
      console.log('Account not active for user:', user.id);
      return res.status(401).json({
        status: 'error',
        message: 'Account is not active'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      console.log('Invalid password for user:', user.id);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    try {
      // Generate token
      const token = generateToken(user.id);
      console.log('Generated token for user:', user.id);

      res.json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          },
          token
        }
      });
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      return res.status(500).json({
        status: 'error',
        message: 'Error generating authentication token'
      });
    }
  } catch (error) {
    console.error('Login error details:', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    res.status(500).json({
      status: 'error',
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, phone, address, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: {
        user: users[0]
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    await db.execute(
      'UPDATE users SET name = ?, phone = ?, address = ?, updated_at = NOW() WHERE id = ?',
      [name, phone || null, address || null, req.user.id]
    );

    const [users] = await db.execute(
      'SELECT id, name, email, phone, address, role FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: users[0]
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;