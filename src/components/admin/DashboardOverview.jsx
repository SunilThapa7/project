import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, FileText, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalPosts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingIssues: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.status === 'success') {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Total Users */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Total Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.totalProducts}</p>
          </div>
        </div>
      </div>

      {/* Total Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.totalPosts}</p>
          </div>
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
            <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900">
            <DollarSign className="h-6 w-6 text-teal-600 dark:text-teal-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              रू{stats.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Pending Issues */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Issues</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.pendingIssues}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
