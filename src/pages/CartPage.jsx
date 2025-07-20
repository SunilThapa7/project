import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Plus, Minus, Trash2, Package } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    cartItems,
    cartTotal,
    loading,
    error,
    updateCartItem,
    removeFromCart,
    createOrder
  } = useContext(CartContext);

  const [shippingDetails, setShippingDetails] = useState({
    shipping_address: '',
    phone: ''
  });
  const [checkoutError, setCheckoutError] = useState(null);
  const [processing, setProcessing] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
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

  const handleQuantityChange = async (cartItemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await updateCartItem(cartItemId, newQuantity);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    await removeFromCart(cartItemId);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setCheckoutError(null);
    setProcessing(true);

    try {
      const result = await createOrder(shippingDetails);
      if (result.success) {
        navigate(`/orders/${result.order.id}`);
      } else {
        setCheckoutError(result.error);
      }
    } catch (err) {
      setCheckoutError('Failed to process order');
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add some products to your cart to continue shopping
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      रू {item.price} per {item.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      disabled={item.quantity >= item.stock_quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      रू {item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>रू {cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>रू {cartTotal}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Shipping Address
                  </label>
                  <textarea
                    id="shipping_address"
                    value={shippingDetails.shipping_address}
                    onChange={(e) => setShippingDetails(prev => ({
                      ...prev,
                      shipping_address: e.target.value
                    }))}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="3"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {checkoutError && (
                  <div className="text-red-500 text-sm">
                    {checkoutError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                >
                  {processing ? (
                    'Processing...'
                  ) : (
                    <>
                      <Package className="h-5 w-5" />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 