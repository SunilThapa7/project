import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
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
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const addToCart = async (productId, quantity = 1) => {
    if (!token) return false;

    try {
      setLoading(true);
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: productId,
          quantity
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        await fetchCartItems();
        return true;
      }
      setError(data.message);
      return false;
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError('Failed to add item to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!token) return false;

    try {
      setLoading(true);
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      if (data.status === 'success') {
        await fetchCartItems();
        return true;
      }
      setError(data.message);
      return false;
    } catch (err) {
      console.error('Failed to update quantity:', err);
      setError('Failed to update quantity');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return false;

    try {
      setLoading(true);
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'success') {
        await fetchCartItems();
        return true;
      }
      setError(data.message);
      return false;
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      setError('Failed to remove item from cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!token) return false;

    try {
      setLoading(true);
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCartItems([]);
        return true;
      }
      setError(data.message);
      return false;
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError('Failed to clear cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      error,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount,
      fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 