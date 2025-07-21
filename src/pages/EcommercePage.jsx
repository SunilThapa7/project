import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import AddProductForm from '../components/products/AddProductForm';
import { 
  Filter, 
  Search, 
  Star, 
  ChevronDown,
  ChevronUp, 
  Plus, 
  Minus,
  PlusCircle
} from 'lucide-react';

const EcommercePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterOpen, setFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showInStock, setShowInStock] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.status === 'success') {
        setCategories(data.data.categories);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    // Category filter
    if (activeCategory && product.category !== activeCategory) return false;
    
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Price filter
    if (product.price > priceRange) return false;
    
    // Rating filter
    if (selectedRating > 0 && product.rating < selectedRating) return false;
    
    // Stock filter
    if (showInStock && product.stock_quantity === 0) return false;
    
    return true;
  });

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const success = await addToCart(productId);
    if (success) {
      // Optional: Show success message
    }
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Agricultural Supplies
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Shop for high-quality tools, seeds, and supplies for your farm
            </p>
          </div>
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Product
            </button>
          )}
        </div>
      </div>
      
      {showAddProduct && (
        <AddProductForm
          onClose={() => setShowAddProduct(false)}
          onProductAdded={(newProduct) => {
            setProducts([...products, newProduct]);
          }}
        />
      )}

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
                {/* Search */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
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
                        key={category.id}
                        onClick={() => setActiveCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          activeCategory === category.name 
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 font-medium' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                  <div className="px-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>रू 0</span>
                      <span>रू {priceRange}</span>
                    </div>
                  </div>
                </div>
                
                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center">
                        <input
                          type="radio"
                          id={`rating-${rating}`}
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                          className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                          ))}
                          <span className="ml-1">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Availability */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="in-stock"
                        checked={showInStock}
                        onChange={(e) => setShowInStock(e.target.checked)}
                        className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        In Stock Only
                      </label>
                    </div>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: Math.floor(product.rating || 0) }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      ({product.rating || 0})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">रू {product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock_quantity === 0}
                      className={`btn ${product.stock_quantity > 0 ? 'btn-primary' : 'btn-disabled'}`}
                    >
                      {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.stock_quantity > 0 ? (
                      <span className="text-green-600 dark:text-green-400">
                        In Stock ({product.stock_quantity} {product.unit}s)
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setSearchQuery('');
                  setPriceRange(2000);
                  setSelectedRating(0);
                  setShowInStock(false);
                }}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;