import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogIn, 
  LogOut,
  ShoppingCart,
  Sprout
} from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Community', path: '/social-feed' },
  { name: 'Weather', path: '/weather' },
  { name: 'Crop Prices', path: '/crop-prices' },
  { name: 'Government Schemes', path: '/gov-schemes' },
  { name: 'Training', path: '/training' },
  { name: 'Crop Planner', path: '/crop-planner' },
  { name: 'E-Commerce', path: '/ecommerce' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-800 dark:text-primary-400">
              AgriConnect Nepal
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === link.path 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden md:flex rounded-full border border-gray-300 dark:border-gray-700">
              <button className="px-3 py-1 rounded-l-full bg-primary-600 text-white text-xs font-medium">
                नेपाली
              </button>
              <button className="px-3 py-1 rounded-r-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium">
                English
              </button>
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="hidden sm:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 relative"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs rounded-full bg-primary-600 text-white flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-2">
              {user ? (
                <>
                  <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                    Welcome, {user.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-secondary flex items-center space-x-1 text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary flex items-center space-x-1 text-sm">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="btn btn-primary flex items-center space-x-1 text-sm">
                    <User className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium py-2 border-b border-gray-100 dark:border-gray-800 ${
                location.pathname === link.path 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex rounded-full border border-gray-300 dark:border-gray-700 self-start my-2">
            <button className="px-3 py-1 rounded-l-full bg-primary-600 text-white text-xs font-medium">
              नेपाली
            </button>
            <button className="px-3 py-1 rounded-r-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium">
              English
            </button>
          </div>
          
          {/* Mobile Auth Buttons */}
          <div className="flex space-x-2 pt-2">
            {user ? (
              <button 
                onClick={handleLogout}
                className="btn btn-secondary flex items-center space-x-1 text-sm flex-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary flex items-center space-x-1 text-sm flex-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="btn btn-primary flex items-center space-x-1 text-sm flex-1">
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;