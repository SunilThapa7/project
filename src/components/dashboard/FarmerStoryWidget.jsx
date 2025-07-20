import React from 'react';
import { Users, Award, ArrowRight } from 'lucide-react';

const FarmerStoryWidget = () => {
  return (
    <div className="card bg-white dark:bg-gray-800 h-full shadow-md rounded-lg overflow-hidden">
      <div className="bg-accent-600 text-white py-4 px-6">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Success Story</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start">
          <img 
            src="https://images.pexels.com/photos/2382892/pexels-photo-2382892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Successful farmer" 
            className="w-full md:w-32 h-32 rounded-md object-cover mb-4 md:mb-0 md:mr-4" 
          />
          <div>
            <div className="flex items-center mb-2">
              <h4 className="text-gray-900 dark:text-white font-semibold">
                Kamala Tamang
              </h4>
              <div className="ml-2 px-2 py-0.5 bg-accent-100 text-accent-600 text-xs rounded-full inline-flex items-center">
                <Award className="h-3 w-3 mr-1" />
                Featured
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Pokhara, Gandaki Province
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Kamala transformed her small plot into a thriving organic vegetable farm using greenhouse technology. Her income has increased by 300% within two years.
            </p>
          </div>
        </div>
        
        <blockquote className="mt-4 italic text-sm text-gray-600 dark:text-gray-300 border-l-4 border-accent-400 pl-3 py-2">
          "AgriConnect's training videos and crop planning tools helped me select high-value crops and plan my planting schedule effectively."
        </blockquote>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button className="group btn btn-secondary w-full flex items-center justify-center">
            Read Full Story
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerStoryWidget;