import React, { useRef } from 'react';
import { useAppStore } from '../useAppStore'; 

export const UserInfo = React.memo(() => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  // ✅ Precise individual selectors tell Zustand exactly when to trigger re-renders
  const userName = useAppStore((state) => state.user.name);
  const isLoggedIn = useAppStore((state) => state.user.isLoggedIn);

  return (
    <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', fontSize: '14px', color: '#333' }}>
      <span>👤</span> {isLoggedIn ? userName : 'Guest'} 
      <small style={{ color: '#ef4444', marginLeft: '6px', fontWeight: 'bold' }}>({renderCount.current})</small>
    </div>
  );
});

export const CartItemCount = React.memo(() => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  // ✅ Directly derives internal calculation properties inside the isolated store selector
  const count = useAppStore((state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));
  const toggleCart = useAppStore((state) => state.toggleCart);

  return (
    <button onClick={toggleCart} style={{ padding: '8px 16px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '20px', cursor: 'pointer' }}>
      <span>🛒</span> Cart <strong style={{ background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{count}</strong>
      <small style={{ color: '#ef4444', marginLeft: '6px' }}>({renderCount.current})</small>
    </button>
  );
});

export const ThemeSwitcher = React.memo(() => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  const theme = useAppStore((state) => state.ui.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <button onClick={toggleTheme} style={{ padding: '8px 14px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #e2e8f0', background: '#fff', color: '#333' }}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      <small style={{ color: '#ef4444', marginLeft: '6px', fontWeight: 'bold' }}>({renderCount.current})</small>
    </button>
  );
});

export default function Header() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#fff', borderRadius: '12px', marginBottom: '24px', color: '#333' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🏪</span>
        <h3 style={{ margin: 0, fontWeight: '700' }}>DevCart Engine <small style={{ color: '#ef4444', fontSize: '12px' }}>[H-Hdr: {renderCount.current}]</small></h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <UserInfo />
        <CartItemCount />
        <ThemeSwitcher />
      </div>
    </header>
  );
}