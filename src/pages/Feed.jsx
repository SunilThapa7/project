import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/social/PostCard';
import CreatePost from '../components/social/CreatePost';
import { posts as initialPosts } from '../data/posts';
import { currentUser } from '../data/users';
import { Plus } from 'lucide-react';

const Feed = ({ isHomePage = false }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      verified: false
    };
    
    setPosts([post, ...posts]);
  };

  const handleLike = (postId, isLiked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: isLiked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };

  const handleShare = (postId) => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Check out this farming post!',
        url: `${window.location.origin}/post/${postId}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
      alert('Link copied to clipboard!');
    }
  };

  const loadMorePosts = () => {
    setLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (isHomePage) {
    return (
      <div className="w-full">
        {/* Posts Feed - Homepage Preview */}
        <div className="space-y-4 sm:space-y-6">
          {posts.slice(0, 3).map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Farmer Community
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Connect with fellow farmers, share experiences, and learn from the community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post Component */}
            <CreatePost onCreatePost={handleCreatePost} currentUser={currentUser} />

            {/* Posts Feed */}
            <div className="space-y-4 sm:space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onShare={handleShare}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-6 sm:mt-8">
              <button
                onClick={loadMorePosts}
                disabled={loading}
                className="btn btn-secondary px-6 sm:px-8"
              >
                {loading ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link 
                    to="/create-post"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Create Post</span>
                  </Link>
                  <Link 
                    to="/weather"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">Check Weather</span>
                  </Link>
                  <Link 
                    to="/crop-prices"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">View Crop Prices</span>
                  </Link>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Community Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Farmers</span>
                    <span className="font-medium text-gray-900 dark:text-white">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Posts Today</span>
                    <span className="font-medium text-gray-900 dark:text-white">56</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tips Shared</span>
                    <span className="font-medium text-gray-900 dark:text-white">89</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts in your feed
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Follow other farmers to see their posts here.
            </p>
            <button className="btn btn-primary">
              Discover Farmers
            </button>
          </div>
        )}
      </div>

      {/* Mobile Create Post FAB */}
      <Link
        to="/create-post"
        className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105 z-40 lg:hidden"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Feed;