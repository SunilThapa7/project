import React from 'react';

const TrainingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Training Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Training modules will be added here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Sustainable Farming Practices</h2>
          <p className="text-gray-600 mb-4">Learn about modern sustainable farming techniques and best practices.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Start Learning
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Crop Management</h2>
          <p className="text-gray-600 mb-4">Master the essentials of effective crop management and optimization.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Start Learning
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Agricultural Technology</h2>
          <p className="text-gray-600 mb-4">Discover how modern technology can improve your farming operations.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;