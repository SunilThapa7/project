import React from 'react';
import { Lightbulb, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const DailyTipWidget = () => {
  return (
    <div className="card bg-white dark:bg-gray-800 h-full shadow-md rounded-lg overflow-hidden">
      <div className="bg-primary-600 text-white py-4 px-6">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Tip of the Day</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start">
          <img 
            src="https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Organic pesticide" 
            className="w-24 h-24 rounded-md object-cover mr-4" 
          />
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
              Natural Pesticide for Tomatoes
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Mix 1 tablespoon of neem oil with 1 liter of water and a few drops of dish soap for an effective organic pesticide against tomato pests.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <span>By: Dr. Arjun Sharma</span>
              <span className="mx-2">•</span>
              <span>Agricultural Expert</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>24</span>
              </button>
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>5</span>
              </button>
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button className="btn btn-primary w-full">
            See More Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyTipWidget;