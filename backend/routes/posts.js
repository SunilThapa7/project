const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { validateId } = require('../middleware/validation');
const { body } = require('express-validator');

const router = express.Router();

// Validation for posts
const validatePost = [
  body('caption')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Caption must not exceed 2000 characters'),
  body('image_url')
    .notEmpty()
    .withMessage('Image URL is required')
    .isURL()
    .withMessage('Must be a valid URL'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
];

// @route   GET /api/posts
// @desc    Get all posts with pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, user_id } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE p.status = "active"';
    const queryParams = [];

    if (user_id) {
      whereClause += ' AND p.user_id = ?';
      queryParams.push(user_id);
    }

    const [posts] = await db.execute(
      `SELECT p.*, u.name as username, u.email, 
              COUNT(DISTINCT l.id) as likes_count,
              COUNT(DISTINCT c.id) as comments_count,
              COUNT(DISTINCT s.id) as shares_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN post_likes l ON p.id = l.post_id
       LEFT JOIN post_comments c ON p.id = c.post_id AND c.status = 'active'
       LEFT JOIN post_shares s ON p.id = s.post_id
       ${whereClause}
       GROUP BY p.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM posts p ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        posts,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post with comments
// @access  Public
router.get('/:id', validateId, async (req, res) => {
  try {
    const [posts] = await db.execute(
      `SELECT p.*, u.name as username, u.email,
              COUNT(DISTINCT l.id) as likes_count,
              COUNT(DISTINCT c.id) as comments_count,
              COUNT(DISTINCT s.id) as shares_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN post_likes l ON p.id = l.post_id
       LEFT JOIN post_comments c ON p.id = c.post_id AND c.status = 'active'
       LEFT JOIN post_shares s ON p.id = s.post_id
       WHERE p.id = ? AND p.status = 'active'
       GROUP BY p.id`,
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // Get comments for this post
    const [comments] = await db.execute(
      `SELECT c.*, u.name as username, u.email
       FROM post_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ? AND c.status = 'active'
       ORDER BY c.created_at ASC`,
      [req.params.id]
    );

    res.json({
      status: 'success',
      data: {
        post: {
          ...posts[0],
          comments
        }
      }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', auth, validatePost, async (req, res) => {
  try {
    const { caption, image_url, location } = req.body;

    const [result] = await db.execute(
      `INSERT INTO posts (user_id, caption, image_url, location, status, created_at)
       VALUES (?, ?, ?, ?, 'active', NOW())`,
      [req.user.id, caption || null, image_url, location || null]
    );

    // Get the created post with user info
    const [posts] = await db.execute(
      `SELECT p.*, u.name as username, u.email
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Post created successfully',
      data: {
        post: posts[0]
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private (Owner only)
router.put('/:id', auth, validateId, validatePost, async (req, res) => {
  try {
    const { caption, location } = req.body;

    // Check if post exists and user owns it
    const [posts] = await db.execute(
      'SELECT user_id FROM posts WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    if (posts[0].user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this post'
      });
    }

    await db.execute(
      'UPDATE posts SET caption = ?, location = ?, updated_at = NOW() WHERE id = ?',
      [caption || null, location || null, req.params.id]
    );

    // Get updated post
    const [updatedPosts] = await db.execute(
      `SELECT p.*, u.name as username, u.email
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Post updated successfully',
      data: {
        post: updatedPosts[0]
      }
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post (soft delete)
// @access  Private (Owner only)
router.delete('/:id', auth, validateId, async (req, res) => {
  try {
    // Check if post exists and user owns it
    const [posts] = await db.execute(
      'SELECT user_id FROM posts WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    if (posts[0].user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this post'
      });
    }

    // Soft delete
    await db.execute(
      'UPDATE posts SET status = "deleted", updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/posts/:id/like
// @desc    Like/unlike a post
// @access  Private
router.post('/:id/like', auth, validateId, async (req, res) => {
  try {
    // Check if post exists
    const [posts] = await db.execute(
      'SELECT id FROM posts WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // Check if user already liked this post
    const [existingLikes] = await db.execute(
      'SELECT id FROM post_likes WHERE post_id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (existingLikes.length > 0) {
      // Unlike the post
      await db.execute(
        'DELETE FROM post_likes WHERE post_id = ? AND user_id = ?',
        [req.params.id, req.user.id]
      );

      res.json({
        status: 'success',
        message: 'Post unliked successfully',
        data: { liked: false }
      });
    } else {
      // Like the post
      await db.execute(
        'INSERT INTO post_likes (post_id, user_id, created_at) VALUES (?, ?, NOW())',
        [req.params.id, req.user.id]
      );

      res.json({
        status: 'success',
        message: 'Post liked successfully',
        data: { liked: true }
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/posts/:id/share
// @desc    Share a post
// @access  Private
router.post('/:id/share', auth, validateId, async (req, res) => {
  try {
    // Check if post exists
    const [posts] = await db.execute(
      'SELECT id FROM posts WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // Record the share
    await db.execute(
      'INSERT INTO post_shares (post_id, user_id, created_at) VALUES (?, ?, NOW())',
      [req.params.id, req.user.id]
    );

    res.json({
      status: 'success',
      message: 'Post shared successfully'
    });
  } catch (error) {
    console.error('Share post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;