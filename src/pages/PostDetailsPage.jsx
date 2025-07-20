import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Bookmark, MoreHorizontal, MapPin, CheckCircle } from 'lucide-react';
import CommentSection from '../components/social/CommentSection';
import { posts } from '../data/posts';
import { comments as initialComments } from '../data/posts';

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Find the post by ID
    const foundPost = posts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      setLikeCount(foundPost.likes);
      // Load comments for this post
      setComments(initialComments[foundPost.id] || []);
    }
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${post.username}'s post`,
        text: post.caption,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleAddComment = (postId, comment) => {
    setComments([...comments, comment]);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Post not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/social-feed')}
            className="btn btn-primary"
          >
            Back to Community Feed
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/social-feed')}
          className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Post
        </h1>
      </div>

      {/* Post Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img
              src={post.userAvatar}
              alt={post.username}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {post.username}
                </h3>
                {post.verified && (
                  <CheckCircle className="w-4 h-4 text-primary-600 ml-1" />
                )}
              </div>
              {post.location && (
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
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
        <div className="relative">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
        </div>

        {/* Post Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`transition-colors ${
                  isLiked 
                    ? 'text-red-500' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-red-500'
                }`}
              >
                <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Share2 className="w-7 h-7" />
              </button>
            </div>
            <button
              onClick={handleBookmark}
              className={`transition-colors ${
                isBookmarked 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className={`w-7 h-7 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Like Count */}
          <div className="mb-3">
            <span className="font-semibold text-gray-900 dark:text-white">
              {likeCount} likes
            </span>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="mb-3">
              <p className="text-gray-900 dark:text-white">
                <span className="font-semibold mr-2">{post.username}</span>
                {post.caption.split(/(\s+)/).map((word, index) => {
                  if (word.startsWith('#')) {
                    return (
                      <span key={index} className="text-primary-600 dark:text-primary-400 font-medium">
                        {word}
                      </span>
                    );
                  }
                  return word;
                })}
              </p>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-gray-400 dark:text-gray-500 text-sm mb-4">
            {formatTimeAgo(post.timestamp)}
          </div>

          {/* Comments Section */}
          <CommentSection
            postId={post.id}
            comments={comments}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;