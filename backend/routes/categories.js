const express = require('express');
const db = require('../config/database');
const { auth, authorize } = require('../middleware/auth');
const { validateCategory, validateId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.execute(
      `SELECT c.*, COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
       WHERE c.status = 'active'
       GROUP BY c.id
       ORDER BY c.name ASC`
    );

    res.json({
      status: 'success',
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', validateId, async (req, res) => {
  try {
    const [categories] = await db.execute(
      'SELECT * FROM categories WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        category: categories[0]
      }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin only)
router.post('/', auth, authorize('admin'), validateCategory, async (req, res) => {
  try {
    const { name, description, image_url } = req.body;

    // Check if category already exists
    const [existingCategories] = await db.execute(
      'SELECT id FROM categories WHERE name = ?',
      [name]
    );

    if (existingCategories.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Category with this name already exists'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO categories (name, description, image_url, status, created_at)
       VALUES (?, ?, ?, 'active', NOW())`,
      [name, description || null, image_url || null]
    );

    const [categories] = await db.execute(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: {
        category: categories[0]
      }
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (Admin only)
router.put('/:id', auth, authorize('admin'), validateId, validateCategory, async (req, res) => {
  try {
    const { name, description, image_url } = req.body;

    // Check if category exists
    const [categories] = await db.execute(
      'SELECT id FROM categories WHERE id = ?',
      [req.params.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Check if name is already taken by another category
    const [existingCategories] = await db.execute(
      'SELECT id FROM categories WHERE name = ? AND id != ?',
      [name, req.params.id]
    );

    if (existingCategories.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Category with this name already exists'
      });
    }

    await db.execute(
      'UPDATE categories SET name = ?, description = ?, image_url = ?, updated_at = NOW() WHERE id = ?',
      [name, description || null, image_url || null, req.params.id]
    );

    const [updatedCategories] = await db.execute(
      'SELECT * FROM categories WHERE id = ?',
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Category updated successfully',
      data: {
        category: updatedCategories[0]
      }
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category (soft delete)
// @access  Private (Admin only)
router.delete('/:id', auth, authorize('admin'), validateId, async (req, res) => {
  try {
    // Check if category exists
    const [categories] = await db.execute(
      'SELECT id FROM categories WHERE id = ?',
      [req.params.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Check if category has products
    const [products] = await db.execute(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND status = "active"',
      [req.params.id]
    );

    if (products[0].count > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot delete category with active products'
      });
    }

    // Soft delete
    await db.execute(
      'UPDATE categories SET status = "deleted", updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;