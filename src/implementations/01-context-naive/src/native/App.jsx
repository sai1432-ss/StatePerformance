import React, { useEffect } from 'react';
import { AppProvider, useApp } from '../AppContext.jsx';
import Header from "../components/Header.jsx";
import ProductListPage from "../components/ProductListPage.jsx";
import CartSidebar from "../components/CartSidebar.jsx";
import Notification from "../components/Notification.jsx";

function MainLayout() {
  const { state, dispatch } = useApp();
  const totalItemsCount = state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (state.ui.notification) {
      const timer = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.ui.notification, dispatch]);

  return (
    <div style={{ 
      background: state.ui.theme === 'light' ? '#f5f5f5' : '#333', 
      color: state.ui.theme === 'light' ? '#000' : '#fff', 
      minHeight: '100vh', 
      padding: '20px',
      transition: 'all 0.2s ease'
    }}>
      <Header 
        user={state.user} 
        cartCount={totalItemsCount} 
        theme={state.ui.theme} 
        onToggleCart={() => dispatch({ type: 'TOGGLE_CART' })}
        onToggleTheme={() => dispatch({ type: 'TOGGLE_THEME' })}
      />
      <ProductListPage onAddToCart={(product) => dispatch({ type: 'ADD_TO_CART', payload: product })} />
      <CartSidebar 
        isOpen={state.cart.isOpen} 
        items={state.cart.items} 
        onClose={() => dispatch({ type: 'TOGGLE_CART' })}
      />
      <Notification notification={state.ui.notification} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}