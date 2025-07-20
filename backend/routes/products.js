const express = require('express');
const db = require('../config/database');
const { auth, authorize } = require('../middleware/auth');
const { validateProduct, validateId } = require('../middleware/validation');
const axios = require('axios');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      min_price,
      max_price,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = 'WHERE p.status = "active"';
    const queryParams = [];

    // Build WHERE clause
    if (category) {
      whereClause += ' AND p.category_id = ?';
      queryParams.push(category);
    }

    if (search) {
      whereClause += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (min_price) {
      whereClause += ' AND p.price >= ?';
      queryParams.push(min_price);
    }

    if (max_price) {
      whereClause += ' AND p.price <= ?';
      queryParams.push(max_price);
    }

    // Validate sort column
    const allowedSortColumns = ['name', 'price', 'created_at', 'stock_quantity'];
    const sortColumn = allowedSortColumns.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Get products
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name, u.name as seller_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.seller_id = u.id
       ${whereClause}
       ORDER BY p.${sortColumn} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM products p ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        products,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', validateId, async (req, res) => {
  try {
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name, u.name as seller_name, u.phone as seller_phone
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.seller_id = u.id
       WHERE p.id = ? AND p.status = 'active'`,
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        product: products[0]
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Seller/Admin)
router.post('/', auth, authorize('seller', 'admin'), validateProduct, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock_quantity,
      category_id,
      unit,
      image_url
    } = req.body;

    // Verify category exists
    const [categories] = await db.execute(
      'SELECT id FROM categories WHERE id = ?',
      [category_id]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid category ID'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO products (name, description, price, stock_quantity, category_id, unit, image_url, seller_id, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())`,
      [name, description, price, stock_quantity, category_id, unit, image_url || null, req.user.id]
    );

    // Get the created product
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: {
        product: products[0]
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Owner/Admin)
router.put('/:id', auth, validateId, validateProduct, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock_quantity,
      category_id,
      unit,
      image_url
    } = req.body;

    // Check if product exists and user owns it (or is admin)
    const [products] = await db.execute(
      'SELECT seller_id FROM products WHERE id = ?',
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    if (req.user.role !== 'admin' && products[0].seller_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this product'
      });
    }

    await db.execute(
      `UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, 
       category_id = ?, unit = ?, image_url = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, description, price, stock_quantity, category_id, unit, image_url || null, req.params.id]
    );

    // Get updated product
    const [updatedProducts] = await db.execute(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Product updated successfully',
      data: {
        product: updatedProducts[0]
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (soft delete)
// @access  Private (Owner/Admin)
router.delete('/:id', auth, validateId, async (req, res) => {
  try {
    // Check if product exists and user owns it (or is admin)
    const [products] = await db.execute(
      'SELECT seller_id FROM products WHERE id = ?',
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    if (req.user.role !== 'admin' && products[0].seller_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this product'
      });
    }

    // Soft delete
    await db.execute(
      'UPDATE products SET status = "deleted", updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/products/external
// @desc    Fetch external product data using axios
// @access  Public
router.get('/external', async (req, res) => {
  try {
    // Example: Fetch product data from a public API (replace with a real API as needed)
    const response = await axios.get('https://fakestoreapi.com/products?limit=5');
    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    console.error('External API error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch external product data'
    });
  }
});

module.exports = router;