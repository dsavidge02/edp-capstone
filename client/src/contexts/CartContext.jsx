import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (duck) => {
    const existingItem = cartItems.find((item) => item._id === duck._id);

    if (existingItem) {
      return;
    }

    setCartItems((prevItems) => [...prevItems, duck]);
  };

  const removeFromCart = (duck) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== duck._id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
