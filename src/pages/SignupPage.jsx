import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { signup, loading, error, user } = useContext(AuthContext);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '', 
    address: '',
    role: 'customer' // default role
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (form.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }
    if (form.phone && !/^[0-9+\-\s()]*$/.test(form.phone)) {
      setFormError('Please enter a valid phone number');
      return false;
    }
    if (form.name.length < 2) {
      setFormError('Name must be at least 2 characters long');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(null); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    if (!validateForm()) {
      return;
    }

    const newUser = await signup(form);
    if (newUser) {
      // Navigate based on role using the returned user data
      if (newUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-700 dark:text-primary-300">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Name</label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Phone</label>
          <input 
            type="text" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Address</label>
          <input 
            type="text" 
            name="address" 
            value={form.address} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Role</label>
          <select 
            name="role" 
            value={form.role} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {(formError || error) && (
          <div className="mb-4 text-red-500 text-sm">{formError || error}</div>
        )}

        <button 
          type="submit" 
          className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition disabled:opacity-50" 
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/login" className="text-primary-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default SignupPage; 