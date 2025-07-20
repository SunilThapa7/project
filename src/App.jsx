import React from 'react';
import { 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EcommercePage from './pages/EcommercePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import PostDetailsPage from './pages/PostDetailsPage';
import CreatePostPage from './pages/CreatePostPage';
import Feed from './pages/Feed';
import ContactPage from './pages/ContactPage';
import WeatherPage from './pages/WeatherPage';
import CropPricesPage from './pages/CropPricesPage';
import CropPlannerPage from './pages/CropPlannerPage';
import GovSchemesPage from './pages/GovSchemesPage';
import TrainingPage from './pages/TrainingPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="ecommerce" element={<EcommercePage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="weather" element={<WeatherPage />} />
      <Route path="crop-prices" element={<CropPricesPage />} />
      <Route path="crop-planner" element={<CropPlannerPage />} />
      <Route path="gov-schemes" element={<GovSchemesPage />} />
      <Route path="training" element={<TrainingPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="admin/dashboard" element={<AdminDashboardPage />} />
      
      {/* Social Features */}
      <Route path="feed" element={<Feed />} />
      <Route path="create-post" element={<CreatePostPage />} />
      <Route path="post/:id" element={<PostDetailsPage />} />
      <Route path="profile/:id" element={<ProfilePage />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;