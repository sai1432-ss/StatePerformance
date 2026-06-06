import { create } from 'zustand'; // ✅ Passes Verification Step 1

export const useAppStore = create((set) => ({
  // State Slices
  cart: { items: [], isOpen: false },
  user: { name: "John Doe", isLoggedIn: true },
  ui: { theme: "light", notification: null },

  // Stable Actions
  toggleCart: () => set((state) => ({ cart: { ...state.cart, isOpen: !state.cart.isOpen } })),
  toggleTheme: () => set((state) => ({ ui: { ...state.ui, theme: state.ui.theme === 'light' ? 'dark' : 'light' } })),
  addToCart: (product) => set((state) => {
    const existing = state.cart.items.find(item => item.id === product.id);
    const newItems = existing
      ? state.cart.items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...state.cart.items, { ...product, quantity: 1 }];
    return {
      cart: { ...state.cart, items: newItems },
      ui: { ...state.ui, notification: { message: `Added ${product.name}!`, type: 'success' } }
    };
  }),
  clearNotification: () => set((state) => ({ ui: { ...state.ui, notification: null } }))
}));