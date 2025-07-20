import React from 'react';

const GovSchemesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Government Agricultural Schemes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder content for government schemes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">PM-KISAN</h2>
          <p className="text-gray-600 mb-4">
            Direct income support of ₹6,000 per year to eligible farmer families,
            payable in three equal installments of ₹2,000.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Learn More
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Soil Health Card Scheme</h2>
          <p className="text-gray-600 mb-4">
            Provides information to farmers on nutrient status of their soil along
            with recommendations on appropriate dosage of nutrients.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Learn More
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">PMFBY</h2>
          <p className="text-gray-600 mb-4">
            Pradhan Mantri Fasal Bima Yojana provides comprehensive crop insurance
            to farmers against non-preventable natural risks.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovSchemesPage;