import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, loading, error, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    if (!password) {
      setFormError('Password is required');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    const loggedInUser = await login(email, password);
    if (loggedInUser) {
      // Navigate based on user role immediately using the returned user data
      if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const setDefaultCredentials = () => {
    setEmail('admin@agriconnect.com');
    setPassword('admin123');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-700 dark:text-primary-300">Login</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>
        {(formError || error) && (
          <div className="mb-4 text-red-500 text-sm">{formError || error}</div>
        )}
        <button 
          type="submit" 
          className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition disabled:opacity-50" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? <a href="/signup" className="text-primary-600 hover:underline">Sign up</a>
        </div>
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Demo Credentials</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Email: admin@agriconnect.com<br />
            Password: admin123
          </p>
          <button
            type="button"
            onClick={setDefaultCredentials}
            className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Click to autofill demo credentials
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 