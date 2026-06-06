import React, { createContext, useContext, useReducer } from 'react';

// 1. Create 4 completely isolated Context layers
const CartContext = createContext(undefined);
const UserContext = createContext(undefined);
const ThemeContext = createContext(undefined);
const NotificationContext = createContext(undefined);

// --- INDEPENDENT REDUCERS ---
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.payload.id);
      const newItems = existing
        ? state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items: newItems };
    }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

function userReducer(state) { return state; }

function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
}

function notificationReducer(state, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

// 2. Nest all 4 providers to isolate data broadcast paths cleanly
export function OptimizedAppProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [userState, userDispatch] = useReducer(userReducer, { name: "John Doe", isLoggedIn: true });
  const [themeState, themeDispatch] = useReducer(themeReducer, "light");
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, null);

  return (
    <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
      <ThemeContext.Provider value={{ state: themeState, dispatch: themeDispatch }}>
        <NotificationContext.Provider value={{ state: notificationState, dispatch: notificationDispatch }}>
          <CartContext.Provider value={{ state: cartState, dispatch: cartDispatch }}>
            {children}
          </CartContext.Provider>
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// 3. Isolated Hooks
export function useCart() { return useContext(CartContext); }
export function useUser() { return useContext(UserContext); }
export function useAppTheme() { return useContext(ThemeContext); }
export function useNotification() { return useContext(NotificationContext); }