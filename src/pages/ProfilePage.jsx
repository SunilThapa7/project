import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid3X3, Bookmark, Settings } from 'lucide-react';
import UserProfileCard from '../components/social/UserProfileCard';
import PostGrid from '../components/social/PostGrid';
import { users } from '../data/users';
import { posts } from '../data/posts';

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // Find user by username
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      // Filter posts by this user
      const filteredPosts = posts.filter(post => post.username === username);
      setUserPosts(filteredPosts);
      
      // Check if this is the current user's profile (mock check)
      setIsOwnProfile(username === 'current_user');
    }
  }, [username]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            User not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            The profile you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-center space-x-2 py-3 px-4 border-b-2 transition-colors ${
        activeTab === id
          ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
      {count !== undefined && (
        <span className="text-sm">({count})</span>
      )}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user.username}
          </h1>
        </div>
        {isOwnProfile && (
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <UserProfileCard 
            user={user} 
            isOwnProfile={isOwnProfile}
            postsCount={userPosts.length}
          />
        </div>

        {/* Posts Section */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex">
              <TabButton
                id="posts"
                label="Posts"
                icon={Grid3X3}
                count={userPosts.length}
              />
              {isOwnProfile && (
                <TabButton
                  id="saved"
                  label="Saved"
                  icon={Bookmark}
                />
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'posts' && (
              <PostGrid posts={userPosts} showStats={true} />
            )}
            
            {activeTab === 'saved' && isOwnProfile && (
              <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No saved posts
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Posts you save will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;