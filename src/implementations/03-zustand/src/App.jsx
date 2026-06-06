import React, { useEffect } from 'react';
import { useAppStore } from './useAppStore.js';
import Header from "./components/Header.jsx";
import ProductListPage from "./components/ProductListPage.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Notification from "./components/Notification.jsx";

export default function App() {
  const theme = useAppStore((state) => state.ui.theme);
  const notification = useAppStore((state) => state.ui.notification);
  const clearNotification = useAppStore((state) => state.clearNotification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => clearNotification(), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  return (
    <div style={{ 
      background: theme === 'light' ? '#f5f5f5' : '#333', 
      color: theme === 'light' ? '#000' : '#fff', 
      minHeight: '100vh', 
      padding: '20px',
      transition: 'all 0.2s ease'
    }}>
      <Header />
      <ProductListPage />
      <CartSidebar />
      <Notification notification={notification} />
    </div>
  );
}