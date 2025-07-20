const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { validateId } = require('../middleware/validation');
const { body } = require('express-validator');

const router = express.Router();

// Validation for comments
const validateComment = [
  body('comment')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters'),
];

// @route   GET /api/comments/post/:postId
// @desc    Get comments for a post
// @access  Public
router.get('/post/:postId', validateId, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [comments] = await db.execute(
      `SELECT c.*, u.name as username, u.email
       FROM post_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ? AND c.status = 'active'
       ORDER BY c.created_at ASC
       LIMIT ? OFFSET ?`,
      [req.params.postId, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      'SELECT COUNT(*) as total FROM post_comments WHERE post_id = ? AND status = "active"',
      [req.params.postId]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        comments,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/comments
// @desc    Create new comment
// @access  Private
router.post('/', auth, validateComment, async (req, res) => {
  try {
    const { post_id, comment, parent_id } = req.body;

    // Check if post exists
    const [posts] = await db.execute(
      'SELECT id FROM posts WHERE id = ? AND status = "active"',
      [post_id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // If it's a reply, check if parent comment exists
    if (parent_id) {
      const [parentComments] = await db.execute(
        'SELECT id FROM post_comments WHERE id = ? AND post_id = ? AND status = "active"',
        [parent_id, post_id]
      );

      if (parentComments.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Parent comment not found'
        });
      }
    }

    const [result] = await db.execute(
      `INSERT INTO post_comments (post_id, user_id, comment, parent_id, status, created_at)
       VALUES (?, ?, ?, ?, 'active', NOW())`,
      [post_id, req.user.id, comment, parent_id || null]
    );

    // Get the created comment with user info
    const [comments] = await db.execute(
      `SELECT c.*, u.name as username, u.email
       FROM post_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      status: 'success',
      message: 'Comment created successfully',
      data: {
        comment: comments[0]
      }
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/comments/:id
// @desc    Update comment
// @access  Private (Owner only)
router.put('/:id', auth, validateId, validateComment, async (req, res) => {
  try {
    const { comment } = req.body;

    // Check if comment exists and user owns it
    const [comments] = await db.execute(
      'SELECT user_id FROM post_comments WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (comments.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Comment not found'
      });
    }

    if (comments[0].user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this comment'
      });
    }

    await db.execute(
      'UPDATE post_comments SET comment = ?, updated_at = NOW() WHERE id = ?',
      [comment, req.params.id]
    );

    // Get updated comment
    const [updatedComments] = await db.execute(
      `SELECT c.*, u.name as username, u.email
       FROM post_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Comment updated successfully',
      data: {
        comment: updatedComments[0]
      }
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete comment (soft delete)
// @access  Private (Owner only)
router.delete('/:id', auth, validateId, async (req, res) => {
  try {
    // Check if comment exists and user owns it
    const [comments] = await db.execute(
      'SELECT user_id FROM post_comments WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (comments.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Comment not found'
      });
    }

    if (comments[0].user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this comment'
      });
    }

    // Soft delete
    await db.execute(
      'UPDATE post_comments SET status = "deleted", updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );

    res.json({
      status: 'success',
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/comments/:id/like
// @desc    Like/unlike a comment
// @access  Private
router.post('/:id/like', auth, validateId, async (req, res) => {
  try {
    // Check if comment exists
    const [comments] = await db.execute(
      'SELECT id FROM post_comments WHERE id = ? AND status = "active"',
      [req.params.id]
    );

    if (comments.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Comment not found'
      });
    }

    // Check if user already liked this comment
    const [existingLikes] = await db.execute(
      'SELECT id FROM comment_likes WHERE comment_id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (existingLikes.length > 0) {
      // Unlike the comment
      await db.execute(
        'DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?',
        [req.params.id, req.user.id]
      );

      res.json({
        status: 'success',
        message: 'Comment unliked successfully',
        data: { liked: false }
      });
    } else {
      // Like the comment
      await db.execute(
        'INSERT INTO comment_likes (comment_id, user_id, created_at) VALUES (?, ?, NOW())',
        [req.params.id, req.user.id]
      );

      res.json({
        status: 'success',
        message: 'Comment liked successfully',
        data: { liked: true }
      });
    }
  } catch (error) {
    console.error('Like comment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;