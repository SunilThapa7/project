const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { validateId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const [cartItems] = await db.execute(
      `SELECT c.*, p.name, p.price, p.image_url, p.unit, p.stock_quantity,
              (c.quantity * p.price) as total_price
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ? AND p.status = 'active'
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: {
        items: cartItems
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id || quantity < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Valid product ID and quantity are required'
      });
    }

    // Check if product exists and is active
    const [products] = await db.execute(
      'SELECT id, name, stock_quantity FROM products WHERE id = ? AND status = "active"',
      [product_id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    const product = products[0];

    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        status: 'error',
        message: `Insufficient stock. Available: ${product.stock_quantity}`
      });
    }

    // Check if item already exists in cart
    const [existingItems] = await db.execute(
      'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
      [req.user.id, product_id]
    );

    if (existingItems.length > 0) {
      // Update existing item
      await db.execute(
        'UPDATE cart SET quantity = quantity + ?, updated_at = NOW() WHERE id = ?',
        [quantity, existingItems[0].id]
      );
    } else {
      // Add new item
      await db.execute(
        'INSERT INTO cart (user_id, product_id, quantity, created_at) VALUES (?, ?, ?, NOW())',
        [req.user.id, product_id, quantity]
      );
    }

    res.json({
      status: 'success',
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Private
router.put('/:id', auth, validateId, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Valid quantity is required'
      });
    }

    // Check if cart item exists and belongs to user
    const [cartItems] = await db.execute(
      'SELECT id FROM cart WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (cartItems.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart item not found'
      });
    }

    await db.execute(
      'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ?',
      [quantity, req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', auth, validateId, async (req, res) => {
  try {
    // Check if cart item exists and belongs to user
    const [cartItems] = await db.execute(
      'SELECT id FROM cart WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (cartItems.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart item not found'
      });
    }

    await db.execute('DELETE FROM cart WHERE id = ?', [req.params.id]);

    res.json({
      status: 'success',
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;