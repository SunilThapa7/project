import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const cropPricesData = [
  { 
    name: "Rice (Coarse)", 
    price: 65, 
    unit: "kg", 
    change: 2.5,
    trend: "up" 
  },
  { 
    name: "Maize", 
    price: 45, 
    unit: "kg", 
    change: -1.2,
    trend: "down" 
  },
  { 
    name: "Wheat", 
    price: 58, 
    unit: "kg", 
    change: 0,
    trend: "neutral" 
  },
  { 
    name: "Tomatoes", 
    price: 95, 
    unit: "kg", 
    change: 5.5,
    trend: "up" 
  },
  { 
    name: "Potatoes", 
    price: 42, 
    unit: "kg", 
    change: -2.0,
    trend: "down" 
  }
];

const CropPriceWidget = () => {
  return (
    <div className="card bg-white dark:bg-gray-800 h-full shadow-md rounded-lg overflow-hidden">
      <div className="bg-primary-600 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Today's Crop Prices</h3>
          <Link to="/crop-prices" className="text-white/80 hover:text-white text-sm">
            View All
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Kalimati Market, Kathmandu
          </p>
        </div>
        
        <div className="space-y-3">
          {cropPricesData.map((crop, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <span className="text-gray-800 dark:text-gray-200">{crop.name}</span>
              <div className="flex items-center">
                <span className="font-medium text-gray-900 dark:text-white mr-2">
                  रू {crop.price}/{crop.unit}
                </span>
                <div className={`flex items-center ${
                  crop.trend === 'up' 
                    ? 'text-green-500' 
                    : crop.trend === 'down' 
                      ? 'text-red-500' 
                      : 'text-gray-400'
                }`}>
                  {crop.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : crop.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                  <span className="text-xs ml-1">
                    {crop.change !== 0 ? Math.abs(crop.change) + '%' : '--'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link 
            to="/crop-prices" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            See historical price trends
            <TrendingUp className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropPriceWidget;