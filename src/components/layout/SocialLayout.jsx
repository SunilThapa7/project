import React from 'react';
import SocialNavbar from './SocialNavbar';

const SocialLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <SocialNavbar />
      <main className="flex-grow pt-20 pb-16 md:pb-4">
        {children}
      </main>
    </div>
  );
};

export default SocialLayout;