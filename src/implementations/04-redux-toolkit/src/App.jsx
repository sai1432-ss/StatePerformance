import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/index.js';
import { clearNotification } from './store/uiSlice.js';
import Header from "./components/Header.jsx";
import ProductListPage from "./components/ProductListPage.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Notification from "./components/Notification.jsx";

function ReduxMainLayout() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => dispatch(clearNotification()), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

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
    <Provider store={store}>
      <ReduxMainLayout />
    </Provider>
  );
}