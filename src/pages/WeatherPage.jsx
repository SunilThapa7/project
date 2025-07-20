import React, { useState } from 'react';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudDrizzle, 
  CloudLightning, 
  Wind, 
  Droplets,
  ThermometerSun,
  ThermometerSnowflake,
  Calendar,
  ChevronRight,
  Info,
  AlertCircle,
  Leaf
} from 'lucide-react';

// Mock data for locations
const locations = [
  "Kathmandu",
  "Pokhara",
  "Biratnagar",
  "Birgunj",
  "Dharan",
  "Butwal",
  "Nepalgunj"
];

// Mock weather data
const weatherData = {
  Kathmandu: {
    current: {
      temp: 24,
      condition: "Partly Cloudy",
      humidity: 65,
      wind: 8,
      pressure: 1015,
      visibility: 10,
      icon: Cloud,
      feels_like: 25,
      uv_index: 6,
      precipitation: 0
    },
    forecast: [
      { day: "Wed", temp_max: 26, temp_min: 18, icon: Sun },
      { day: "Thu", temp_max: 24, temp_min: 17, icon: CloudRain },
      { day: "Fri", temp_max: 23, temp_min: 16, icon: Cloud },
      { day: "Sat", temp_max: 25, temp_min: 17, icon: Sun },
      { day: "Sun", temp_max: 27, temp_min: 18, icon: Sun },
      { day: "Mon", temp_max: 25, temp_min: 17, icon: CloudDrizzle },
      { day: "Tue", temp_max: 24, temp_min: 16, icon: Cloud }
    ],
    hourly: [
      { time: "Now", temp: 24, icon: Cloud },
      { time: "1 PM", temp: 25, icon: Sun },
      { time: "2 PM", temp: 26, icon: Sun },
      { time: "3 PM", temp: 25, icon: Cloud },
      { time: "4 PM", temp: 24, icon: Cloud },
      { time: "5 PM", temp: 22, icon: Cloud },
      { time: "6 PM", temp: 21, icon: CloudDrizzle },
      { time: "7 PM", temp: 20, icon: CloudDrizzle }
    ],
    agricultural: {
      soil_moisture: "Moderate",
      rainfall_forecast: "Light showers expected in 3 days",
      crop_conditions: [
        { crop: "Rice", status: "Favorable", note: "Adequate moisture for planting" },
        { crop: "Wheat", status: "Neutral", note: "Monitor soil moisture levels" },
        { crop: "Vegetables", status: "Favorable", note: "Good growing conditions" }
      ]
    },
    alerts: [
      { type: "Info", message: "Light rain expected on Thursday afternoon" }
    ]
  },
  Pokhara: {
    current: {
      temp: 27,
      condition: "Sunny",
      humidity: 60,
      wind: 5,
      pressure: 1014,
      visibility: 12,
      icon: Sun,
      feels_like: 29,
      uv_index: 8,
      precipitation: 0
    },
    forecast: [
      { day: "Wed", temp_max: 29, temp_min: 19, icon: Sun },
      { day: "Thu", temp_max: 28, temp_min: 19, icon: Sun },
      { day: "Fri", temp_max: 27, temp_min: 18, icon: CloudRain },
      { day: "Sat", temp_max: 25, temp_min: 18, icon: CloudRain },
      { day: "Sun", temp_max: 26, temp_min: 19, icon: Cloud },
      { day: "Mon", temp_max: 27, temp_min: 19, icon: Sun },
      { day: "Tue", temp_max: 28, temp_min: 20, icon: Sun }
    ],
    hourly: [
      { time: "Now", temp: 27, icon: Sun },
      { time: "1 PM", temp: 28, icon: Sun },
      { time: "2 PM", temp: 29, icon: Sun },
      { time: "3 PM", temp: 29, icon: Sun },
      { time: "4 PM", temp: 28, icon: Sun },
      { time: "5 PM", temp: 27, icon: Sun },
      { time: "6 PM", temp: 25, icon: Cloud },
      { time: "7 PM", temp: 23, icon: Cloud }
    ],
    agricultural: {
      soil_moisture: "Moderate",
      rainfall_forecast: "Rainfall expected in 2-3 days, good for planting",
      crop_conditions: [
        { crop: "Rice", status: "Favorable", note: "Ideal conditions for growth" },
        { crop: "Maize", status: "Favorable", note: "Good growing conditions" },
        { crop: "Vegetables", status: "Favorable", note: "Ensure regular watering" }
      ]
    },
    alerts: []
  }
};

// Get weather data for a location or default to Kathmandu
const getWeatherData = (location) => {
  return weatherData[location] || weatherData.Kathmandu;
};

const WeatherPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("Kathmandu");
  const weather = getWeatherData(selectedLocation);
  const CurrentWeatherIcon = weather.current.icon;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Weather Forecast
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get up-to-date weather information for agricultural planning.
          </p>
        </div>
        
        {/* Location Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Location
              </label>
              <select
                id="location"
                className="input w-full"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700 mx-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0">
              Weather data is updated every 3 hours. Last updated: <span className="font-medium">Today, 12:30 PM</span>
            </p>
          </div>
        </div>
        
        {/* Current Weather */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 md:mr-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {selectedLocation}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Today, May 15, 2025
              </p>
              <div className="flex items-center">
                <CurrentWeatherIcon className="h-20 w-20 text-accent-500" />
                <div className="ml-4">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{weather.current.temp}°</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1 mb-2">C</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{weather.current.condition}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 w-full pt-6 md:pt-0 md:pl-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    Humidity
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{weather.current.humidity}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                    <Wind className="h-4 w-4 mr-1" />
                    Wind
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{weather.current.wind} km/h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                    <ThermometerSun className="h-4 w-4 mr-1" />
                    Feels Like
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{weather.current.feels_like}°C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                    <Cloud className="h-4 w-4 mr-1" />
                    Precipitation
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{weather.current.precipitation} mm</p>
                </div>
              </div>
              
              {weather.alerts.length > 0 && (
                <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Weather Alert</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">{weather.alerts[0].message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Hourly Forecast */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Today's Forecast
          </h2>
          <div className="flex overflow-x-auto pb-4 space-x-6">
            {weather.hourly.map((hour, index) => {
              const HourIcon = hour.icon;
              return (
                <div 
                  key={index} 
                  className={`flex-shrink-0 flex flex-col items-center ${
                    index === 0 ? 'bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800 rounded-lg px-4 py-2' : ''
                  }`}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{hour.time}</p>
                  <HourIcon className="h-8 w-8 text-accent-500 mb-2" />
                  <p className="text-gray-900 dark:text-white font-medium">{hour.temp}°C</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 7-Day Forecast */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              7-Day Forecast
            </h2>
            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-700">
            {weather.forecast.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <div key={index} className={`flex items-center justify-between ${index > 0 ? 'pt-4' : ''}`}>
                  <div className="w-20">
                    <p className={`text-sm ${
                      index === 0 
                        ? 'font-medium text-accent-600 dark:text-accent-400' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {day.day}
                    </p>
                  </div>
                  <DayIcon className="h-6 w-6 text-accent-500" />
                  <div className="flex items-center space-x-2">
                    <ThermometerSun className="h-4 w-4 text-red-500" />
                    <span className="text-gray-900 dark:text-white font-medium">{day.temp_max}°</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-500 dark:text-gray-400">{day.temp_min}°</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Agricultural Weather Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Agricultural Weather Information
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Current Conditions
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Droplets className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Soil Moisture</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{weather.agricultural.soil_moisture}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CloudRain className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Rainfall Forecast</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{weather.agricultural.rainfall_forecast}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="btn btn-primary w-full text-sm">
                  View Detailed Agricultural Weather Report
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Crop Conditions
              </h3>
              <div className="space-y-3">
                {weather.agricultural.crop_conditions.map((crop, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{crop.crop}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        crop.status === "Favorable" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" 
                          : crop.status === "Neutral" 
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                      }`}>
                        {crop.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{crop.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* SMS Alerts */}
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
                Agricultural Weather Alerts
              </h3>
              <p className="text-primary-700 dark:text-primary-300 mb-4">
                Receive SMS alerts for important weather changes that may affect your crops. Get timely notifications about rainfall, temperature changes, and extreme weather events.
              </p>
              <form className="mt-4 flex flex-col sm:flex-row gap-4">
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="input flex-grow"
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  Subscribe to Alerts
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;