import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Cloud, 
  TrendingUp, 
  FileText, 
  Lightbulb, 
  Users, 
  ArrowRight,
  Droplets,
  Sun,
  Wind,
  CloudRain
} from 'lucide-react';

// Components
import WeatherWidget from '../components/dashboard/WeatherWidget';
import CropPriceWidget from '../components/dashboard/CropPriceWidget';
import GovNoticeWidget from '../components/dashboard/GovNoticeWidget';
import DailyTipWidget from '../components/dashboard/DailyTipWidget';
import FarmerStoryWidget from '../components/dashboard/FarmerStoryWidget';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/90 to-primary-600/80 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Nepali farmer in the field" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 py-16 md:py-24 px-6 md:px-12 max-w-4xl">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
            Digital Solutions for Nepal's Farmers
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl animate-fade-in">
            Access weather forecasts, market prices, training resources, and connect with agricultural experts - all in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/crop-planner" className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 animate-slide-up">
              Plan Your Crops
            </Link>
            <Link to="/ecommerce" className="btn bg-primary-700/60 backdrop-blur-sm text-white border border-white/30 hover:bg-primary-700/80 px-6 py-3 animate-slide-up">
              Shop Agricultural Supplies
            </Link>
          </div>
        </div>
      </section>
      
      {/* Dashboard Widgets */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Widget */}
          <WeatherWidget />
          
          {/* Crop Prices Widget */}
          <CropPriceWidget />
          
          {/* Government Notices Widget */}
          <GovNoticeWidget />
        </div>
      </section>
      
      {/* Tip & Story Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Tip */}
          <DailyTipWidget />
          
          {/* Farmer Success Story */}
          <FarmerStoryWidget />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <Link 
            to="/weather" 
            className="card hover:shadow-lg transform hover:-translate-y-1 transition-all p-6 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
              <Cloud className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Weather Forecast</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Accurate weather forecasts tailored for agriculture
            </p>
            <span className="mt-auto text-primary-600 dark:text-primary-400 font-medium inline-flex items-center">
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </Link>
          
          {/* Service 2 */}
          <Link 
            to="/crop-prices" 
            className="card hover:shadow-lg transform hover:-translate-y-1 transition-all p-6 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
              <TrendingUp className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Crop Price Tracker</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stay updated with real-time market prices for your crops
            </p>
            <span className="mt-auto text-primary-600 dark:text-primary-400 font-medium inline-flex items-center">
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </Link>
          
          {/* Service 3 */}
          <Link 
            to="/gov-schemes" 
            className="card hover:shadow-lg transform hover:-translate-y-1 transition-all p-6 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mb-4">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Government Schemes</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Access government support programs and subsidies
            </p>
            <span className="mt-auto text-primary-600 dark:text-primary-400 font-medium inline-flex items-center">
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </Link>
          
          {/* Service 4 */}
          <Link 
            to="/crop-planner" 
            className="card hover:shadow-lg transform hover:-translate-y-1 transition-all p-6 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Crop Planner</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Plan your farming calendar with personalized recommendations
            </p>
            <span className="mt-auto text-primary-600 dark:text-primary-400 font-medium inline-flex items-center">
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </Link>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="rounded-xl bg-gradient-to-r from-accent-600 to-accent-700 p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Thousands of Nepali Farmers
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Create a free account to get personalized recommendations, save your preferences, and connect with other farmers.
          </p>
          <button className="btn bg-white text-accent-700 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;