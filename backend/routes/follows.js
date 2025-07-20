const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { validateId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/follows/followers/:userId
// @desc    Get user's followers
// @access  Public
router.get('/followers/:userId', validateId, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [followers] = await db.execute(
      `SELECT u.id, u.name, u.email, f.created_at as followed_at
       FROM follows f
       JOIN users u ON f.follower_id = u.id
       WHERE f.following_id = ? AND u.status = 'active'
       ORDER BY f.created_at DESC
       LIMIT ? OFFSET ?`,
      [req.params.userId, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total 
       FROM follows f
       JOIN users u ON f.follower_id = u.id
       WHERE f.following_id = ? AND u.status = 'active'`,
      [req.params.userId]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        followers,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/follows/following/:userId
// @desc    Get users that a user is following
// @access  Public
router.get('/following/:userId', validateId, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [following] = await db.execute(
      `SELECT u.id, u.name, u.email, f.created_at as followed_at
       FROM follows f
       JOIN users u ON f.following_id = u.id
       WHERE f.follower_id = ? AND u.status = 'active'
       ORDER BY f.created_at DESC
       LIMIT ? OFFSET ?`,
      [req.params.userId, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total 
       FROM follows f
       JOIN users u ON f.following_id = u.id
       WHERE f.follower_id = ? AND u.status = 'active'`,
      [req.params.userId]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        following,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: total,
          items_per_page: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/follows/:userId
// @desc    Follow/unfollow a user
// @access  Private
router.post('/:userId', auth, validateId, async (req, res) => {
  try {
    const followingId = req.params.userId;
    const followerId = req.user.id;

    // Can't follow yourself
    if (followingId == followerId) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot follow yourself'
      });
    }

    // Check if user to follow exists
    const [users] = await db.execute(
      'SELECT id FROM users WHERE id = ? AND status = "active"',
      [followingId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check if already following
    const [existingFollows] = await db.execute(
      'SELECT id FROM follows WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );

    if (existingFollows.length > 0) {
      // Unfollow
      await db.execute(
        'DELETE FROM follows WHERE follower_id = ? AND following_id = ?',
        [followerId, followingId]
      );

      res.json({
        status: 'success',
        message: 'User unfollowed successfully',
        data: { following: false }
      });
    } else {
      // Follow
      await db.execute(
        'INSERT INTO follows (follower_id, following_id, created_at) VALUES (?, ?, NOW())',
        [followerId, followingId]
      );

      res.json({
        status: 'success',
        message: 'User followed successfully',
        data: { following: true }
      });
    }
  } catch (error) {
    console.error('Follow/unfollow error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/follows/check/:userId
// @desc    Check if current user is following another user
// @access  Private
router.get('/check/:userId', auth, validateId, async (req, res) => {
  try {
    const [follows] = await db.execute(
      'SELECT id FROM follows WHERE follower_id = ? AND following_id = ?',
      [req.user.id, req.params.userId]
    );

    res.json({
      status: 'success',
      data: {
        is_following: follows.length > 0
      }
    });
  } catch (error) {
    console.error('Check follow status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/follows/stats/:userId
// @desc    Get follow statistics for a user
// @access  Public
router.get('/stats/:userId', validateId, async (req, res) => {
  try {
    // Get followers count
    const [followersCount] = await db.execute(
      `SELECT COUNT(*) as count 
       FROM follows f
       JOIN users u ON f.follower_id = u.id
       WHERE f.following_id = ? AND u.status = 'active'`,
      [req.params.userId]
    );

    // Get following count
    const [followingCount] = await db.execute(
      `SELECT COUNT(*) as count 
       FROM follows f
       JOIN users u ON f.following_id = u.id
       WHERE f.follower_id = ? AND u.status = 'active'`,
      [req.params.userId]
    );

    res.json({
      status: 'success',
      data: {
        followers_count: followersCount[0].count,
        following_count: followingCount[0].count
      }
    });
  } catch (error) {
    console.error('Get follow stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router;