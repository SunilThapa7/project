const express = require('express');
const db = require('../config/database');
const { auth, authorize } = require('../middleware/auth');
const { validateId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, role, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const queryParams = [];

    if (role) {
      whereClause += ' AND role = ?';
      queryParams.push(role);
    }

    if (status) {
      whereClause += ' AND status = ?';
      queryParams.push(status);
    }

    const [users] = await db.execute(
      `SELECT id, name, email, phone, role, status, created_at, updated_at
       FROM users
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM users ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        users,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get single user (Admin only)
// @access  Private
router.get('/:id', auth, authorize('admin'), validateId, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, phone, address, role, status, created_at, updated_at FROM users WHERE id = ?',
      [req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

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

// @route   PUT /api/users/:id/role
// @desc    Update user role (Admin only)
// @access  Private
router.put('/:id/role', auth, authorize('admin'), validateId, async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['customer', 'seller', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role'
      });
    }

    // Check if user exists
    const [users] = await db.execute(
      'SELECT id FROM users WHERE id = ?',
      [req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Prevent admin from changing their own role
    if (req.user.id === parseInt(req.params.id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot change your own role'
      });
    }

    await db.execute(
      'UPDATE users SET role = ?, updated_at = NOW() WHERE id = ?',
      [role, req.params.id]
    );

    res.json({
      status: 'success',
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/:id/status
// @desc    Update user status (Admin only)
// @access  Private
router.put('/:id/status', auth, authorize('admin'), validateId, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['active', 'inactive', 'suspended'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    // Check if user exists
    const [users] = await db.execute(
      'SELECT id FROM users WHERE id = ?',
      [req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Prevent admin from changing their own status
    if (req.user.id === parseInt(req.params.id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot change your own status'
      });
    }

    await db.execute(
      'UPDATE users SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, req.params.id]
    );

    res.json({
      status: 'success',
      message: 'User status updated successfully'
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/stats/dashboard
// @desc    Get user statistics (Admin only)
// @access  Private
router.get('/stats/dashboard', auth, authorize('admin'), async (req, res) => {
  try {
    // Get user counts by role
    const [roleCounts] = await db.execute(
      `SELECT role, COUNT(*) as count
       FROM users
       WHERE status = 'active'
       GROUP BY role`
    );

    // Get recent registrations (last 30 days)
    const [recentRegistrations] = await db.execute(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM users
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date DESC`
    );

    // Get total counts
    const [totalCounts] = await db.execute(
      `SELECT 
         COUNT(*) as total_users,
         COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
         COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_users_this_month
       FROM users`
    );

    res.json({
      status: 'success',
      data: {
        role_counts: roleCounts,
        recent_registrations: recentRegistrations,
        totals: totalCounts[0]
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;