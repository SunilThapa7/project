import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Welcome to Your Dashboard, {user.name}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn btn-primary">Create New Post</button>
            <button className="w-full btn btn-secondary">View My Posts</button>
            <button className="w-full btn btn-secondary">Edit Profile</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Profile Summary</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">Email: {user.email}</p>
            <p className="text-gray-600 dark:text-gray-400">Role: {user.role}</p>
            <p className="text-gray-600 dark:text-gray-400">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 