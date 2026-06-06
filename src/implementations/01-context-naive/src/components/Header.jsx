import React, { useRef } from 'react';
import { useUser, useCart, useAppTheme } from '../optimized/SplitContexts.jsx';

export const UserInfo = React.memo(() => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const { state: user } = useUser();

  return (
    <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', fontSize: '14px', color: '#333' }}>
      <span>👤</span> {user.isLoggedIn ? user.name : 'Guest'} 
      <small style={{ color: '#ef4444', marginLeft: '6px', fontWeight: 'bold' }}>({renderCount.current})</small>
    </div>
  );
});

export const CartItemCount = React.memo(() => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const { state: cart, dispatch: cartDispatch } = useCart();
  const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button onClick={() => cartDispatch({ type: 'TOGGLE_CART' })} style={{ padding: '8px 16px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '20px', cursor: 'pointer' }}>
      <span>🛒</span> Cart <strong style={{ background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{count}</strong>
      <small style={{ color: '#ef4444', marginLeft: '6px' }}>({renderCount.current})</small>
    </button>
  );
});

export const ThemeSwitcher = React.memo(() => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const { state: theme, dispatch: themeDispatch } = useAppTheme();

  return (
    <button onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })} style={{ padding: '8px 14px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #e2e8f0', background: '#fff', color: '#333' }}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      <small style={{ color: '#ef4444', marginLeft: '6px', fontWeight: 'bold' }}>({renderCount.current})</small>
    </button>
  );
});

export default React.memo(function Header() {
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
});