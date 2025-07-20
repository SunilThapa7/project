import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Grid3X3 } from 'lucide-react';

const PostGrid = ({ posts, showStats = true }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <Grid3X3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No posts yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          When posts are shared, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/${post.id}`}
          className="relative aspect-square group"
        >
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover"
          />
          
          {showStats && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-4 text-white">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-1 fill-current" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-1 fill-current" />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default PostGrid;