import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cph_cart_v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [];
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.product_id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.product_id === product.id ? { ...it, quantity: it.quantity + qty } : it
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          weight_grams: Number(product.weight_grams || 0),
          quantity: qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((product_id, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((it) => it.product_id !== product_id);
      return prev.map((it) => (it.product_id === product_id ? { ...it, quantity: qty } : it));
    });
  }, []);

  const removeItem = useCallback((product_id) => {
    setItems((prev) => prev.filter((it) => it.product_id !== product_id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const weightGrams = items.reduce((sum, it) => sum + (it.weight_grams || 0) * it.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, count, subtotal, weightGrams }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}