import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import CropPricesPage from './pages/CropPricesPage';
import GovSchemesPage from './pages/GovSchemesPage';
import TrainingPage from './pages/TrainingPage';
import CropPlannerPage from './pages/CropPlannerPage';
import EcommercePage from './pages/EcommercePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/crop-prices" element={<CropPricesPage />} />
            <Route path="/gov-schemes" element={<GovSchemesPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/crop-planner" element={<CropPlannerPage />} />
            <Route path="/ecommerce" element={<EcommercePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;