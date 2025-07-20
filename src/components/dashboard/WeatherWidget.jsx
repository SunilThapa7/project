import React, { useState } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  Thermometer, 
  Droplets, 
  Wind 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const locations = [
  "Kathmandu",
  "Pokhara",
  "Biratnagar",
  "Birgunj",
  "Dharan"
];

// Mock data - in a real app, this would come from an API
const weatherData = {
  Kathmandu: {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 8,
    icon: Cloud
  },
  Pokhara: {
    temp: 27,
    condition: "Sunny",
    humidity: 60,
    wind: 5,
    icon: Sun
  },
  Biratnagar: {
    temp: 31,
    condition: "Hot",
    humidity: 75,
    wind: 7,
    icon: Sun
  },
  Birgunj: {
    temp: 30,
    condition: "Thunderstorms",
    humidity: 80,
    wind: 12,
    icon: CloudRain
  },
  Dharan: {
    temp: 29,
    condition: "Light Rain",
    humidity: 78,
    wind: 6,
    icon: CloudDrizzle
  }
};

const WeatherWidget = () => {
  const [location, setLocation] = useState("Kathmandu");
  const weather = weatherData[location];
  const WeatherIcon = weather.icon;
  
  return (
    <div className="card bg-white dark:bg-gray-800 h-full shadow-md rounded-lg overflow-hidden">
      <div className="bg-accent-600 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Weather Forecast</h3>
          <Link to="/weather" className="text-white/80 hover:text-white text-sm">
            View Details
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        {/* Location Selector */}
        <div className="mb-4">
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="input text-sm w-full"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        {/* Current Weather */}
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <WeatherIcon className="h-16 w-16 text-accent-500" />
          </div>
          <div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{weather.temp}°</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">C</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{weather.condition}</p>
          </div>
        </div>
        
        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-accent-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-gray-900 dark:text-white font-medium">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-accent-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
              <p className="text-gray-900 dark:text-white font-medium">{weather.wind} km/h</p>
            </div>
          </div>
        </div>
        
        {/* Forecast Teaser */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">3-Day Forecast</p>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Wed</p>
              <Sun className="h-6 w-6 text-accent-500 mx-auto my-1" />
              <p className="text-sm font-medium">26°</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Thu</p>
              <CloudRain className="h-6 w-6 text-accent-500 mx-auto my-1" />
              <p className="text-sm font-medium">24°</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Fri</p>
              <Cloud className="h-6 w-6 text-accent-500 mx-auto my-1" />
              <p className="text-sm font-medium">23°</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;