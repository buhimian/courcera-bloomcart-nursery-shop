import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Use plant name as key for cart
  const addToCart = (plant) => {
    setCart(prev => ({
      ...prev,
      [plant.name]: {
        ...plant,
        quantity: prev[plant.name]?.quantity + 1 || 1
      }
    }));
  };

  const removeFromCart = (plantName) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[plantName];
      return newCart;
    });
  };

  const updateQuantity = (plantName, quantity) => {
    setCart(prev => ({
      ...prev,
      [plantName]: {
        ...prev[plantName],
        quantity: quantity
      }
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalCost = () => {
    return Object.values(cart).reduce((sum, item) => {
      const price = Number(item.cost.replace('$',''));
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalCost }}>
      {children}
    </CartContext.Provider>
  );
};
