'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  price: number;
  image: string | StaticImport;
  title: string;
  id: number;
  quantity: number;
  variant: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, variant: string) => void;
  clearCart: () => void;
  cartQuantity: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id && item.variant === newItem.variant
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number, variant: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.variant === variant))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
