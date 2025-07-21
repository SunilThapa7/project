import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardOverview from '../components/admin/DashboardOverview';
import UserManagement from '../components/admin/UserManagement';
import ProductManagement from '../components/admin/ProductManagement';
import { Users, Package, FileText, BarChart2 } from 'lucide-react';

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not logged in or not an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart2 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'posts', name: 'Posts', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'posts':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Post Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Post management interface coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-8 md:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Admin Dashboard
              </h2>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Logged in as:
                  <div className="font-medium text-gray-900 dark:text-white mt-1">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 