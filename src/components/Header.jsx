import React, { useRef } from 'react';

export const UserInfo = React.memo(({ name, isLoggedIn }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', fontSize: '14px' }}>
      <span>👤</span> {isLoggedIn ? name : 'Guest'} 
      <small data-testid="user-info-render-count" style={{ color: '#ef4444', marginLeft: '6px', fontWeight: 'bold' }}>({renderCount.current})</small>
    </div>
  );
});

export const CartItemCount = React.memo(({ count, onToggleCart }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <button onClick={onToggleCart} style={{ padding: '8px 16px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '20px', cursor: 'pointer' }}>
      <span>🛒</span> Cart <strong style={{ background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{count}</strong>
      <small data-testid="cart-count-render-count" style={{ color: '#ef4444', marginLeft: '6px' }}>({renderCount.current})</small>
    </button>
  );
});

export const ThemeSwitcher = React.memo(({ theme, onToggleTheme }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <button onClick={onToggleTheme} style={{ padding: '8px 14px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #e2e8f0', background: '#fff' }}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      <small data-testid="theme-render-count" style={{ color: '#ef4444', marginLeft: '6px', fontWeight: 'bold' }}>({renderCount.current})</small>
    </button>
  );
});

export default function Header({ user, cartCount, theme, onToggleCart, onToggleTheme }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>🏪</span>
        <h3 style={{ margin: 0, fontWeight: '700' }}>DevCart Engine <small style={{ color: '#ef4444', fontSize: '12px' }}>[H-Hdr: {renderCount.current}]</small></h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <UserInfo name={user.name} isLoggedIn={user.isLoggedIn} />
        <CartItemCount count={cartCount} onToggleCart={onToggleCart} />
        <ThemeSwitcher theme={theme} onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
}