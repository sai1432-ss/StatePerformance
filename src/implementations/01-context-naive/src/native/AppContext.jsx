import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext(undefined);

const initialState = {
  cart: { items: [], isOpen: false },
  user: { name: "John Doe", isLoggedIn: true },
  ui: { theme: "light", notification: null }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CART':
      return { ...state, cart: { ...state.cart, isOpen: !state.cart.isOpen } };
    case 'TOGGLE_THEME':
      return { ...state, ui: { ...state.ui, theme: state.ui.theme === 'light' ? 'dark' : 'light' } };
    case 'ADD_TO_CART': {
      const existing = state.cart.items.find(item => item.id === action.payload.id);
      const newItems = existing
        ? state.cart.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cart.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        cart: { ...state.cart, items: newItems },
        ui: { ...state.ui, notification: { message: `Added ${action.payload.name}!`, type: 'success' } }
      };
    }
    case 'CLEAR_NOTIFICATION':
      return { ...state, ui: { ...state.ui, notification: null } };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}