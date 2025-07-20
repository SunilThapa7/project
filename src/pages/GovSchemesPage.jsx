import React from 'react';

const GovSchemesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Government Agricultural Schemes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder content for government schemes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">PM-KISAN</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Direct income support of ₹6,000 per year to eligible farmer families,
            payable in three equal installments of ₹2,000.
          </p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
            Learn More
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Soil Health Card Scheme</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Provides information to farmers on nutrient status of their soil along
            with recommendations on appropriate dosage of nutrients.
          </p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
            Learn More
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">PMFBY</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Pradhan Mantri Fasal Bima Yojana provides comprehensive crop insurance
            to farmers against non-preventable natural risks.
          </p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovSchemesPage;