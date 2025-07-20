import React, { useState } from 'react';
import { MapPin, Calendar, CheckCircle, Users, Grid3X3, Bookmark } from 'lucide-react';

const UserProfileCard = ({ user, isOwnProfile = false, postsCount = 0 }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followers);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-primary-600 to-accent-600"></div>
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="flex justify-center -mt-16 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
          />
        </div>

        {/* Name and Username */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            {user.verified && (
              <CheckCircle className="w-6 h-6 text-primary-600 ml-2" />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="text-center mb-4">
            <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
          </div>
        )}

        {/* Location and Join Date */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          {user.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Joined {formatDate(user.joinDate)}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {postsCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {followersCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {user.following}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {isOwnProfile ? (
            <>
              <button className="flex-1 btn btn-secondary">
                Edit Profile
              </button>
              <button className="btn btn-secondary px-4">
                <Bookmark className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleFollowToggle}
                className={`flex-1 btn ${
                  isFollowing 
                    ? 'btn-secondary' 
                    : 'btn-primary'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="btn btn-secondary px-4">
                Message
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;