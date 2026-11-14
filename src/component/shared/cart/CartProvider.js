"use client";

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "buildmart-cart";
const CartContext = createContext(null);

// "Rs. 1,200 / Bag" -> 1200, "Contact for price" -> null (cart mein nahi jata)
export const getPrice = (price) => {
  const found = String(price).match(/\d[\d,]*/);
  return found ? Number(found[0].replace(/,/g, "")) : null;
};

// Demo cart: data sirf is browser (localStorage) mein rehta hai
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Page khulne par purana cart wapas lao
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY)) ?? []);
    } catch {}
    setReady(true);
  }, []);

  // Har badlav save karo (pehli load se pehle nahi, warna cart khali ho jata)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const has = (id) => items.some((i) => i.id === id);

  // Pehle se cart mein ho to kuch nahi hota
  const add = ({ id, name, slug, categorySlug, price, supplier }, quantity = 1) =>
    setItems((list) =>
      list.some((i) => i.id === id) ? list : [...list, { id, name, slug, categorySlug, price, supplier, quantity }]
    );

  const remove = (id) => setItems((list) => list.filter((i) => i.id !== id));
  const setQuantity = (id, quantity) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  const clear = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, has, add, remove, setQuantity, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart ko CartProvider ke andar use karo");
  return cart;
};