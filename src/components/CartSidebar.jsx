import React from 'react';

export const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  console.log(`🎨 Rendering: <CartItem /> [${item.name}]`);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
      <div style={{ flex: 1 }}>
        <h5 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.name}</h5>
        <span style={{ color: '#666', fontSize: '14px' }}>${item.price} each</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} style={{ padding: '2px 8px', cursor: 'pointer' }}>-</button>
        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} style={{ padding: '2px 8px', cursor: 'pointer' }}>+</button>
        <button 
          onClick={() => onRemove(item.productId)} 
          style={{ background: '#ff4d4f', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
});

export const CartSummary = React.memo(({ items }) => {
  console.log("🎨 Rendering: <CartSummary />");
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return (
    <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', color: '#111' }}>
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
});

export default function CartSidebar({ isOpen, items, onClose, onUpdateQuantity, onRemove }) {
  console.log("🧱 Rendering: <CartSidebar /> (Container)");
  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      right: 0, 
      top: 0, 
      width: '320px', 
      height: '100vh', 
      background: '#fff', 
      boxShadow: '-4px 0 12px rgba(0,0,0,0.15)', 
      padding: '20px', 
      zIndex: 1000,
      boxSizing: 'border-box',
      color: '#000'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>Your Cart</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#333' }}>✕</button>
      </div>
      
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        {items.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>Your cart is empty.</p>
        ) : (
          items.map(item => (
            <CartItem key={item.productId} item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
          ))
        )}
      </div>
      
      {items.length > 0 && <CartSummary items={items} />}
    </div>
  );
}