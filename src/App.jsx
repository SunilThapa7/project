import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
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
import Feed from './pages/Feed';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailsPage from './pages/PostDetailsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
              <Route path="/social-feed" element={<Feed />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/post/:id" element={<PostDetailsPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;