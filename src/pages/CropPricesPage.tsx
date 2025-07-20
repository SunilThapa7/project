import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

interface CropPrice {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  change: number;
  market: string;
  date: string;
}

const cropPriceData: CropPrice[] = [
  { 
    id: 1,
    name: "Rice (Coarse)", 
    category: "Cereal",
    price: 65, 
    unit: "kg", 
    change: 2.5,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 2,
    name: "Rice (Fine)", 
    category: "Cereal",
    price: 85, 
    unit: "kg", 
    change: 0,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 3,
    name: "Maize", 
    category: "Cereal",
    price: 45, 
    unit: "kg", 
    change: -1.2,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 4,
    name: "Wheat", 
    category: "Cereal",
    price: 58, 
    unit: "kg", 
    change: 0,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 5,
    name: "Tomatoes", 
    category: "Vegetable",
    price: 95, 
    unit: "kg", 
    change: 5.5,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 6,
    name: "Potatoes", 
    category: "Vegetable",
    price: 42, 
    unit: "kg", 
    change: -2.0,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 7,
    name: "Onions", 
    category: "Vegetable",
    price: 75, 
    unit: "kg", 
    change: 3.2,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 8,
    name: "Cabbage", 
    category: "Vegetable",
    price: 55, 
    unit: "kg", 
    change: -1.5,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 9,
    name: "Apples", 
    category: "Fruit",
    price: 180, 
    unit: "kg", 
    change: 0,
    market: "Kalimati",
    date: "2025-05-15"
  },
  { 
    id: 10,
    name: "Bananas", 
    category: "Fruit",
    price: 120, 
    unit: "dozen", 
    change: 2.0,
    market: "Kalimati",
    date: "2025-05-15"
  },
];

const markets = [
  "All Markets",
  "Kalimati",
  "Balkhu", 
  "Teku",
  "Birtamod",
  "Pokhara",
  "Bharatpur"
];

const categories = [
  "All Categories",
  "Cereal",
  "Vegetable",
  "Fruit",
  "Spice",
  "Pulse"
];

// Mock data for the chart
const chartDays = [...Array(30)].map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 29 + i);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
});

const chartData = [60, 62, 61, 64, 63, 66, 65, 67, 64, 63, 64, 65, 68, 67, 65, 64, 65, 66, 64, 62, 61, 63, 65, 66, 68, 70, 69, 68, 65, 65];

const CropPricesPage = () => {
  const [selectedMarket, setSelectedMarket] = useState("All Markets");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCrop, setSelectedCrop] = useState<CropPrice | null>(null);
  
  const filteredCrops = cropPriceData.filter(crop => {
    if (selectedCategory !== "All Categories" && crop.category !== selectedCategory) {
      return false;
    }
    if (selectedMarket !== "All Markets" && crop.market !== selectedMarket) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Price Information
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Current market prices of agricultural products across Nepal. Updated daily.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                id="date"
                className="input w-full"
                defaultValue="2025-05-15"
              />
            </div>
            
            <div className="w-full md:w-1/3">
              <label htmlFor="market" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <MapPin className="h-4 w-4 inline mr-1" />
                Market
              </label>
              <select
                id="market"
                className="input w-full"
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
              >
                {markets.map(market => (
                  <option key={market} value={market}>{market}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Filter className="h-4 w-4 inline mr-1" />
                Category
              </label>
              <select
                id="category"
                className="input w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Prices Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Current Prices
              </h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated: May 15, 2025
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Market
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCrops.map((crop) => (
                  <tr 
                    key={crop.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {crop.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {crop.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {crop.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                      रू {crop.price}/{crop.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <div className={`inline-flex items-center ${
                        crop.change > 0 
                          ? 'text-green-500' 
                          : crop.change < 0 
                            ? 'text-red-500' 
                            : 'text-gray-400'
                      }`}>
                        {crop.change > 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : crop.change < 0 ? (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        ) : (
                          <Minus className="h-4 w-4 mr-1" />
                        )}
                        <span>{crop.change !== 0 ? Math.abs(crop.change) + '%' : '--'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredCrops.length} of {cropPriceData.length} products
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Page 1 of 1
              </span>
              <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Price Trend Chart */}
        {selectedCrop && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 animate-fade-in">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                Price Trend: {selectedCrop.name}
              </h2>
              <div className="flex space-x-2">
                <button className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                  30 Days
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md border border-primary-100 dark:border-primary-800">
                  90 Days
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                  1 Year
                </button>
              </div>
            </div>
            
            <div className="h-64 w-full">
              {/* This is a simplified chart representation */}
              <div className="relative h-full">
                <div className="absolute inset-0 flex items-end">
                  {chartData.map((value, index) => (
                    <div 
                      key={index} 
                      className="flex-1 flex flex-col justify-end h-full"
                    >
                      <div 
                        style={{ height: `${(value - 55) * 6}%` }}
                        className={`relative w-full mx-0.5 ${
                          index > 0 && value > chartData[index - 1] 
                            ? 'bg-green-500' 
                            : index > 0 && value < chartData[index - 1] 
                              ? 'bg-red-500' 
                              : 'bg-gray-400'
                        }`}
                      >
                        {index % 5 === 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                            रू {value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 dark:border-gray-700 pt-1 flex justify-between">
                  {chartDays.filter((_, i) => i % 5 === 0).map((day, index) => (
                    <div key={index} className="text-xs text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-between">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Average Price:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">
                    रू {Math.round(chartData.reduce((a, b) => a + b, 0) / chartData.length)}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">High:</span>
                  <span className="ml-1 font-medium text-green-500">
                    रू {Math.max(...chartData)}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Low:</span>
                  <span className="ml-1 font-medium text-red-500">
                    रू {Math.min(...chartData)}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Volatility:</span>
                  <span className="ml-1 font-medium text-accent-600">
                    Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Market Overview
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Current agricultural market situation in Nepal shows stable prices for cereals with slight increases for vegetables due to seasonal factors.
              </p>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Price Trends</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span>Vegetable prices have increased by 3.5% on average over the past month.</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                  <span>Cereal prices remain stable with slight decreases expected after harvest season.</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span>Fruit prices are higher due to seasonal factors but expected to decrease by mid-June.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Price Alerts
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Get notified when crop prices change or reach your target levels. Set up custom price alerts for your preferred crops.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="alert-crop" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Crop
                </label>
                <select
                  id="alert-crop"
                  className="input w-full"
                >
                  <option value="">Select Crop</option>
                  {cropPriceData.map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="alert-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Price (रू)
                </label>
                <input
                  type="number"
                  id="alert-price"
                  className="input w-full"
                  placeholder="e.g., 65"
                />
              </div>
              
              <div>
                <label htmlFor="alert-mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number for SMS Alerts
                </label>
                <input
                  type="tel"
                  id="alert-mobile"
                  className="input w-full"
                  placeholder="e.g., 98XXXXXXXX"
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Set Price Alert
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPricesPage;