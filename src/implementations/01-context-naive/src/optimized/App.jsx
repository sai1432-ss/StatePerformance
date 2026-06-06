import React, { useEffect } from 'react';
import { OptimizedAppProvider, useAppTheme, useNotification } from './SplitContexts.jsx';
import Header from '../components/Header.jsx';
import ProductListPage from '../components/ProductListPage.jsx';
import CartSidebar from '../components/CartSidebar.jsx';
import Notification from '../components/Notification.jsx';

function OptimizedMainLayout() {
  const { state: theme } = useAppTheme();
  const { state: notification, dispatch: notifyDispatch } = useNotification();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => notifyDispatch({ type: 'CLEAR_NOTIFICATION' }), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, notifyDispatch]);

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

export default function App() {
  return (
    <ProviderWrapper>
      <OptimizedMainLayout />
    </ProviderWrapper>
  );
}

// Simple layout preservation wrap
function ProviderWrapper({ children }) {
  return <OptimizedAppProvider>{children}</OptimizedAppProvider>;
}