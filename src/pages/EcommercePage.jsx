import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Filter, 
  Search, 
  Star, 
  ChevronDown,
  ChevronUp, 
  Plus, 
  Minus 
} from 'lucide-react';

const EcommercePage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterOpen, setFilterOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchProducts();
    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.status === 'success') {
        setProducts(data.data.products);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      const res = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCartItems(data.data.items);
      }
    } catch (err) {
      console.error('Failed to fetch cart items:', err);
    }
  };

  const addToCart = async (productId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchCartItems();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  const categories = Array.from(new Set(products.map(product => product.category)));
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products;

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Agricultural Supplies
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Shop for high-quality tools, seeds, and supplies for your farm.
        </p>
      </div>
      
      {/* Cart notification */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-30">
          <button 
            onClick={() => navigate('/cart')}
            className="btn-primary rounded-full py-3 px-6 flex items-center shadow-lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>View Cart ({getTotalItems()} items)</span>
          </button>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {filterOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {filterOpen && (
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeCategory === null 
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 font-medium' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          activeCategory === category 
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 font-medium' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">रू {product.price}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`btn ${product.inStock ? 'btn-primary' : 'btn-disabled'}`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;