// src/context/CartContext.jsx

import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }
      try {
        const cartRef = doc(db, "carts", user.uid);
        const docSnap = await getDoc(cartRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCartItems(data.items || []);
        } else {
          await setDoc(cartRef, { items: [] });
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    loadCart();
  }, [user]);

  const saveCart = async (items) => {
    if (!user) return;
    try {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addToCart = (car) => {
    if (!car?.id) return;
    if (cartItems.find((item) => item.id === car.id)) return;
    const newCart = [...cartItems, car];
    setCartItems(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  // 🔥 Check if car exists in cart
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
