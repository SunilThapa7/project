import React from 'react';
import { Link } from 'react-router-dom';
import { BellRing, FileText, ExternalLink } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const noticesData = [
  {
    title: "New Subsidy Program for Organic Farmers",
    date: "2025-05-10",
    province: "Bagmati",
    summary: "Ministry announces new subsidy program for certified organic farmers.",
    link: "/gov-schemes/organic-subsidy"
  },
  {
    title: "Drought Relief Package for Province 2",
    date: "2025-05-05",
    province: "Madhesh",
    summary: "Government allocates relief funds for farmers affected by drought.",
    link: "/gov-schemes/drought-relief"
  },
  {
    title: "Training Program on Greenhouse Farming",
    date: "2025-05-01",
    province: "All",
    summary: "Free training sessions on greenhouse methods starting next month.",
    link: "/gov-schemes/greenhouse-training"
  }
];

const GovNoticeWidget = () => {
  return (
    <div className="card bg-white dark:bg-gray-800 h-full shadow-md rounded-lg overflow-hidden">
      <div className="bg-secondary-600 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Government Notices</h3>
          <Link to="/gov-schemes" className="text-white/80 hover:text-white text-sm">
            View All
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {noticesData.map((notice, index) => (
            <div 
              key={index} 
              className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
            >
              <div className="flex items-start">
                <div className="mt-0.5">
                  <FileText className="h-5 w-5 text-secondary-500" />
                </div>
                <div className="ml-3">
                  <Link 
                    to={notice.link} 
                    className="text-gray-900 dark:text-white font-medium hover:text-secondary-600 dark:hover:text-secondary-400"
                  >
                    {notice.title}
                  </Link>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{notice.date}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium text-secondary-600 dark:text-secondary-400">{notice.province}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {notice.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <Link 
            to="/gov-schemes" 
            className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:underline text-sm font-medium"
          >
            View all schemes
            <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
          
          <button 
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-secondary-400"
          >
            <BellRing className="h-4 w-4 mr-1" />
            Get SMS Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovNoticeWidget;