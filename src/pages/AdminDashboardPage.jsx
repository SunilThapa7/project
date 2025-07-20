import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);

  // Redirect if not logged in or not an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">User Management</h2>
          <div className="space-y-3">
            <button className="w-full btn btn-primary">View All Users</button>
            <button className="w-full btn btn-secondary">Manage Roles</button>
            <button className="w-full btn btn-secondary">User Reports</button>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Content Management</h2>
          <div className="space-y-3">
            <button className="w-full btn btn-primary">Manage Posts</button>
            <button className="w-full btn btn-secondary">Manage Products</button>
            <button className="w-full btn btn-secondary">Content Reports</button>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">System Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Users:</span>
              <span className="font-semibold text-gray-800 dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Posts:</span>
              <span className="font-semibold text-gray-800 dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Products:</span>
              <span className="font-semibold text-gray-800 dark:text-white">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 