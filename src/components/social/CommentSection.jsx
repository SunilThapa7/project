import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Reply, MoreHorizontal, CheckCircle } from 'lucide-react';

const CommentSection = ({ postId, comments = [], onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        userId: 1, // Current user ID (mock)
        username: "current_user",
        userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
        comment: newComment.trim(),
        timestamp: new Date().toISOString(),
        replyTo: replyTo
      };
      
      onAddComment(postId, comment);
      setNewComment('');
      setReplyTo(null);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const CommentItem = ({ comment }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10));

    const handleLike = () => {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    return (
      <div className="flex space-x-3 py-3">
        <Link to={`/profile/${comment.username}`}>
          <img
            src={comment.userAvatar}
            alt={comment.username}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2">
            <div className="flex items-center mb-1">
              <Link 
                to={`/profile/${comment.username}`}
                className="font-semibold text-sm text-gray-900 dark:text-white hover:underline"
              >
                {comment.username}
              </Link>
              {comment.verified && (
                <CheckCircle className="w-3 h-3 text-primary-600 ml-1" />
              )}
            </div>
            <p className="text-gray-900 dark:text-white text-sm">
              {comment.comment}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-1 px-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(comment.timestamp)}
            </span>
            <button
              onClick={handleLike}
              className={`text-xs font-medium ${
                isLiked 
                  ? 'text-red-500' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
              }`}
            >
              Like {likeCount > 0 && `(${likeCount})`}
            </button>
            <button
              onClick={() => setReplyTo(comment.username)}
              className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Reply
            </button>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <MoreHorizontal className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Comments ({comments.length})
      </h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex space-x-3">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyTo ? `Reply to ${replyTo}...` : "Add a comment..."}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows="2"
              />
              {replyTo && (
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {newComment.length}/500
              </span>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="btn btn-primary text-sm px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;