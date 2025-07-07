import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    const { id, selectedSize, quantity } = productToAdd;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id);

      if (existingIndex === -1) {
        // Product not in cart, add with sizes object
        return [
          ...prev,
          {
            ...productToAdd,
            sizes: { [selectedSize]: quantity },
          },
        ];
      } else {
        // Product already in cart
        const updatedCart = [...prev];
        const existingProduct = updatedCart[existingIndex];

        if (!existingProduct.sizes) existingProduct.sizes = {};

        // Update quantity for selected size or add if new
        existingProduct.sizes[selectedSize] =
          (existingProduct.sizes[selectedSize] || 0) + quantity;

        updatedCart[existingIndex] = existingProduct;

        return updatedCart;
      }
    });
  };

  const totalItems = cart.reduce(
    (sum, item) =>
      sum +
      (item.sizes
        ? Object.values(item.sizes).reduce((a, b) => a + b, 0)
        : item.quantity || 0),
    0
  );

  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.sizes
      ? Object.entries(item.sizes).reduce(
          (acc, [size, qty]) => acc + qty * item.price,
          0
        )
      : (item.quantity || 0) * item.price;
    return sum + itemTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
