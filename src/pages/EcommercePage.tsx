import React, { useState } from 'react';
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

interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Agricultural Hoe",
    category: "Tools",
    subCategory: "Manual Tools",
    price: 650,
    rating: 4.5,
    image: "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inStock: true
  },
  {
    id: 2,
    name: "Garden Fork",
    category: "Tools",
    subCategory: "Manual Tools",
    price: 850,
    rating: 4.2,
    image: "https://images.pexels.com/photos/90763/garden-trug-garden-tools-pliers-90763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inStock: true
  },
  {
    id: 3,
    name: "Tomato Seeds (Hybrid)",
    category: "Seeds",
    subCategory: "Vegetables",
    price: 120,
    rating: 4.8,
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inStock: true
  },
  {
    id: 4,
    name: "Rice Seeds (Local Variety)",
    category: "Seeds",
    subCategory: "Grains",
    price: 250,
    rating: 4.7,
    image: "https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inStock: true
  },
  {
    id: 5,
    name: "Cucumber Seeds",
    category: "Seeds",
    subCategory: "Vegetables",
    price: 90,
    rating: 4.4,
    image: "https://images.pexels.com/photos/5529541/pexels-photo-5529541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inStock: true
  },
  {
    id: 6,
    name: "Watering Can (5L)",
    category: "Tools",
    subCategory: "Irrigation",
    price: 450,
    rating: 4.3,
    image: "https://images.pexels.com/photos/1459459/pexels-photo-1459459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inStock: false
  }
];

const EcommercePage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(true);
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  
  const categories = Array.from(new Set(products.map(product => product.category)));
  const subCategories = Array.from(new Set(products.map(product => product.subCategory)));
  
  const filteredProducts = activeCategory
    ? products.filter(product => product.category === activeCategory)
    : products;
  
  const addToCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
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
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-30">
          <button className="btn-primary rounded-full py-3 px-6 flex items-center shadow-lg">
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
                {/* Search */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="input w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                
                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                  <div className="px-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>रू 0</span>
                      <span>रू 1000</span>
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
                          type="checkbox"
                          id={`rating-${rating}`}
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
                        className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        In Stock
                      </label>
                    </div>
                  </div>
                </div>
                
                <button className="btn btn-secondary w-full text-sm">
                  Apply Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Coming Soon */}
          <div className="mt-6 bg-gradient-to-r from-accent-600 to-accent-700 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">E-Marketplace</h3>
            <p className="text-white/90 text-sm mb-4">
              Sell your produce directly to buyers online. Coming soon!
            </p>
            <button className="bg-white text-accent-700 px-4 py-2 rounded-md text-sm font-medium">
              Get Notified
            </button>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="lg:w-3/4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {activeCategory || 'All Products'}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({filteredProducts.length} products)
              </span>
            </h2>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                className="input py-1 text-sm"
              >
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="card hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium px-3 py-1 rounded-full bg-gray-800/80 text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {product.category} &gt; {product.subCategory}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : i < product.rating 
                                ? 'text-yellow-400 fill-current opacity-50' 
                                : 'text-gray-300 dark:text-gray-600'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      रू {product.price}
                    </span>
                    <button 
                      onClick={() => product.inStock && addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full ${
                        product.inStock 
                          ? 'bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="btn btn-secondary px-6">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;