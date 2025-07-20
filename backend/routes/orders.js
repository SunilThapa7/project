const express = require('express');
const db = require('../config/database');
const { auth, authorize } = require('../middleware/auth');
const { validateOrder, validateId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE o.user_id = ?';
    const queryParams = [req.user.id];

    if (status) {
      whereClause += ' AND o.status = ?';
      queryParams.push(status);
    }

    const [orders] = await db.execute(
      `SELECT o.*, COUNT(oi.id) as item_count
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       ${whereClause}
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM orders o ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        orders,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order with items
// @access  Private
router.get('/:id', auth, validateId, async (req, res) => {
  try {
    // Get order
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Get order items
    const [orderItems] = await db.execute(
      `SELECT oi.*, p.name as product_name, p.image_url, p.unit
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    res.json({
      status: 'success',
      data: {
        order: {
          ...orders[0],
          items: orderItems
        }
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, validateOrder, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { items, shipping_address, phone, notes } = req.body;
    let totalAmount = 0;

    // Validate products and calculate total
    for (const item of items) {
      const [products] = await connection.execute(
        'SELECT id, name, price, stock_quantity FROM products WHERE id = ? AND status = "active"',
        [item.product_id]
      );

      if (products.length === 0) {
        await connection.rollback();
        return res.status(400).json({
          status: 'error',
          message: `Product with ID ${item.product_id} not found`
        });
      }

      const product = products[0];

      if (product.stock_quantity < item.quantity) {
        await connection.rollback();
        return res.status(400).json({
          status: 'error',
          message: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`
        });
      }

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const [orderResult] = await connection.execute(
      `INSERT INTO orders (user_id, total_amount, status, shipping_address, phone, notes, created_at)
       VALUES (?, ?, 'pending', ?, ?, ?, NOW())`,
      [req.user.id, totalAmount, shipping_address, phone, notes || null]
    );

    const orderId = orderResult.insertId;

    // Create order items and update stock
    for (const item of items) {
      const [products] = await connection.execute(
        'SELECT price FROM products WHERE id = ?',
        [item.product_id]
      );

      const unitPrice = products[0].price;

      // Insert order item
      await connection.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, unitPrice, unitPrice * item.quantity]
      );

      // Update product stock
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    // Get created order with items
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );

    const [orderItems] = await db.execute(
      `SELECT oi.*, p.name as product_name, p.image_url, p.unit
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: {
        order: {
          ...orders[0],
          items: orderItems
        }
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Create order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  } finally {
    connection.release();
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin/Seller only)
// @access  Private
router.put('/:id/status', auth, authorize('admin', 'seller'), validateId, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    // Check if order exists
    const [orders] = await db.execute(
      'SELECT id, status as current_status FROM orders WHERE id = ?',
      [req.params.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Update order status
    await db.execute(
      'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Order status updated successfully',
      data: {
        order_id: req.params.id,
        new_status: status
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel order (if pending)
// @access  Private
router.delete('/:id', auth, validateId, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    // Check if order exists and belongs to user
    const [orders] = await connection.execute(
      'SELECT id, status FROM orders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (orders[0].status !== 'pending') {
      await connection.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Can only cancel pending orders'
      });
    }

    // Restore product stock
    const [orderItems] = await connection.execute(
      'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
      [req.params.id]
    );

    for (const item of orderItems) {
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // Update order status to cancelled
    await connection.execute(
      'UPDATE orders SET status = "cancelled", updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );

    await connection.commit();

    res.json({
      status: 'success',
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    await connection.rollback();
    console.error('Cancel order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  } finally {
    connection.release();
  }
});

module.exports = router;