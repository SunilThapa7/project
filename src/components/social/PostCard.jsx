import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  MoreHorizontal,
  Bookmark,
  CheckCircle
} from 'lucide-react';

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(post.id, !isLiked);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const renderCaption = (caption) => {
    if (!caption) return null;
    
    const words = caption.split(' ');
    const shouldTruncate = words.length > 20 && !showFullCaption;
    const displayText = shouldTruncate ? words.slice(0, 20).join(' ') + '...' : caption;
    
    // Simple hashtag highlighting
    const highlightHashtags = (text) => {
      return text.split(/(\s+)/).map((word, index) => {
        if (word.startsWith('#')) {
          return (
            <span key={index} className="text-primary-600 dark:text-primary-400 font-medium">
              {word}
            </span>
          );
        }
        return word;
      });
    };

    return (
      <div className="mt-3">
        <p className="text-gray-900 dark:text-white">
          <Link 
            to={`/profile/${post.username}`} 
            className="font-semibold hover:underline mr-2"
          >
            {post.username}
          </Link>
          {highlightHashtags(displayText)}
        </p>
        {words.length > 20 && (
          <button
            onClick={() => setShowFullCaption(!showFullCaption)}
            className="text-gray-500 dark:text-gray-400 text-sm mt-1 hover:underline"
          >
            {showFullCaption ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center">
          <Link to={`/profile/${post.username}`}>
            <img
              src={post.userAvatar}
              alt={post.username}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-2 sm:mr-3"
            />
          </Link>
          <div>
            <div className="flex items-center">
              <Link 
                to={`/profile/${post.username}`}
                className="font-semibold text-gray-900 dark:text-white hover:underline text-sm sm:text-base"
              >
                {post.username}
              </Link>
              {post.verified && (
                <CheckCircle className="w-4 h-4 text-primary-600 ml-1" />
              )}
            </div>
            {post.location && (
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {post.location}
              </div>
            )}
          </div>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image */}
      <Link to={`/post/${post.id}`}>
        <div className="relative">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
          />
        </div>
      </Link>

      {/* Post Actions */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                isLiked 
                  ? 'text-red-500' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <Link 
              to={`/post/${post.id}`}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
            <button
              onClick={() => onShare && onShare(post.id)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Like Count */}
        <div className="mb-2">
          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {likeCount} likes
          </span>
        </div>

        {/* Caption */}
        {renderCaption(post.caption)}

        {/* Comments Preview */}
        {post.comments > 0 && (
          <Link 
            to={`/post/${post.id}`}
            className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-2 block hover:underline"
          >
            View all {post.comments} comments
          </Link>
        )}

        {/* Timestamp */}
        <div className="text-gray-400 dark:text-gray-500 text-xs mt-2">
          {formatTimeAgo(post.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default PostCard;