import React, { useState } from 'react';
import { Calendar, Sprout, Info, Check, CloudRain, Sun, ArrowRight } from 'lucide-react';

const cropRecommendations = [
  {
    name: 'Rice',
    season: 'Monsoon',
    earnings: 'रू 65,000-80,000/hectare',
    growthPeriod: '110-150 days',
    waterNeeds: 'high',
    idealTemp: '20-35°C',
    idealSoil: 'Clay or clay loam'
  },
  {
    name: 'Maize',
    season: 'Spring/Summer',
    earnings: 'रू 45,000-60,000/hectare',
    growthPeriod: '90-120 days',
    waterNeeds: 'medium',
    idealTemp: '18-32°C',
    idealSoil: 'Well-drained loam'
  },
  {
    name: 'Tomatoes',
    season: 'Spring',
    earnings: 'रू 150,000-200,000/hectare',
    growthPeriod: '70-90 days',
    waterNeeds: 'medium',
    idealTemp: '15-29°C',
    idealSoil: 'Well-drained loam, slightly acidic'
  }
];

const CropPlannerPage = () => {
  const [region, setRegion] = useState('');
  const [season, setSeason] = useState('');
  const [landSize, setLandSize] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
    // In a real app, you would make API calls here to get recommendations
  };
  
  const renderWaterNeedsIcon = (needs) => {
    switch (needs) {
      case 'low':
        return <div className="text-blue-400"><CloudRain className="h-5 w-5 opacity-30" /></div>;
      case 'medium':
        return <div className="text-blue-400"><CloudRain className="h-5 w-5 opacity-70" /></div>;
      case 'high':
        return <div className="text-blue-400"><CloudRain className="h-5 w-5" /></div>;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get personalized crop recommendations based on your region, season, and land size. Our algorithm analyzes soil conditions, climate data, and market trends.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Region
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="input w-full"
                  required
                >
                  <option value="">Select Region</option>
                  <option value="bagmati">Bagmati Province</option>
                  <option value="gandaki">Gandaki Province</option>
                  <option value="koshi">Koshi Province</option>
                  <option value="madhesh">Madhesh Province</option>
                  <option value="lumbini">Lumbini Province</option>
                  <option value="karnali">Karnali Province</option>
                  <option value="sudurpaschim">Sudurpaschim Province</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="season" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Season
                </label>
                <select
                  id="season"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="input w-full"
                  required
                >
                  <option value="">Select Season</option>
                  <option value="winter">Winter (Dec-Feb)</option>
                  <option value="spring">Spring (Mar-May)</option>
                  <option value="summer">Summer (Jun-Aug)</option>
                  <option value="autumn">Autumn (Sep-Nov)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Land Size (in Ropani)
                </label>
                <input
                  id="landSize"
                  type="number"
                  min="1"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  className="input w-full"
                  placeholder="e.g., 5"
                  required
                />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-4 mb-6">
              <div className="flex">
                <Info className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our recommendations are based on historical climate data, soil profiles from the Nepal Agricultural Research Council, and current market trends for optimal profitability.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary flex items-center px-8 py-3">
                <Sprout className="h-5 w-5 mr-2" />
                Get Crop Recommendations
              </button>
            </div>
          </form>
        </div>
        
        {showResults && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-primary-600" />
              Recommended Crops
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      {crop.name}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Best for {crop.season} season
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Est. Earnings:</span>
                        <span className="font-medium text-primary-600 dark:text-primary-400">{crop.earnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Growth Period:</span>
                        <span className="font-medium">{crop.growthPeriod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Water Needs:</span>
                        <span className="font-medium flex items-center">
                          {renderWaterNeedsIcon(crop.waterNeeds)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Ideal Temperature:</span>
                        <span className="font-medium flex items-center">
                          {crop.idealTemp}
                        </span>
                      </div>
                    </div>
                    
                    <button className="btn btn-secondary w-full text-sm">
                      View Detailed Guide
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Planting Calendar</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feb</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mar</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Apr</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">May</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jun</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jul</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aug</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sep</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Oct</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nov</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dec</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-800">
                    {cropRecommendations.map((crop, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{crop.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"></td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${crop.name === 'Tomatoes' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : ''}`}>
                          {crop.name === 'Tomatoes' && <span className="flex justify-center"><Sprout className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${(crop.name === 'Tomatoes' || crop.name === 'Maize') ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : ''}`}>
                          {(crop.name === 'Tomatoes' || crop.name === 'Maize') && <span className="flex justify-center"><Sprout className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${(crop.name === 'Tomatoes' || crop.name === 'Maize') ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : ''}`}>
                          {(crop.name === 'Tomatoes' || crop.name === 'Maize') && <span className="flex justify-center"><Sun className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${(crop.name === 'Rice' || crop.name === 'Maize') ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : (crop.name === 'Tomatoes' ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200' : '')}`}>
                          {crop.name === 'Rice' && <span className="flex justify-center"><Sprout className="h-4 w-4" /></span>}
                          {crop.name === 'Maize' && <span className="flex justify-center"><Sun className="h-4 w-4" /></span>}
                          {crop.name === 'Tomatoes' && <span className="flex justify-center"><Check className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${crop.name === 'Rice' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : ''}`}>
                          {crop.name === 'Rice' && <span className="flex justify-center"><CloudRain className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${crop.name === 'Rice' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : ''}`}>
                          {crop.name === 'Rice' && <span className="flex justify-center"><CloudRain className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${crop.name === 'Rice' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200' : ''}`}>
                          {crop.name === 'Rice' && <span className="flex justify-center"><Sun className="h-4 w-4" /></span>}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${crop.name === 'Rice' ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200' : ''}`}>
                          {crop.name === 'Rice' && <span className="flex justify-center"><Check className="h-4 w-4" /></span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary-100 dark:bg-primary-900/30 rounded mr-2"></div>
                  <span>Growing Period</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-accent-100 dark:bg-accent-900/30 rounded mr-2"></div>
                  <span>Harvesting Period</span>
                </div>
                <div className="flex items-center">
                  <Sprout className="h-4 w-4 text-primary-600 mr-2" />
                  <span>Planting</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-accent-600 mr-2" />
                  <span>Harvesting</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help with your specific farming situation?
          </p>
          <button className="btn btn-accent">
            Connect with an Agricultural Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropPlannerPage;