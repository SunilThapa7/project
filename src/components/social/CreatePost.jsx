import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';

const CreatePost = ({ onCreatePost, currentUser: propCurrentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Use the passed currentUser prop or fallback to a default
  const user = propCurrentUser || {
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    username: "current_user"
  };

  const handleCreateClick = () => {
    if (window.innerWidth >= 768) {
      setShowModal(true);
    } else {
      navigate('/create-post');
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const QuickCreateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Post
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to share your farming journey?
          </p>
          <button
            onClick={() => {
              handleClose();
              navigate('/create-post');
            }}
            className="btn btn-primary"
          >
            Start Creating
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Top Create Post Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt="Your avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <button
            onClick={handleCreateClick}
            className="flex-1 text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            What's happening on your farm today?
          </button>
          <button
            onClick={handleCreateClick}
            className="btn btn-primary px-6"
          >
            Post
          </button>
        </div>
      </div>

      {showModal && <QuickCreateModal />}
    </>
  );
};

export default CreatePost;