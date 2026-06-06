import React, { useRef, useState } from 'react';
import { useAppStore } from '../useAppStore';
import { mockProducts } from '../data/mockProducts';

export const ProductCard = React.memo(({ product }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [added, setAdded] = useState(false);
  const addToCart = useAppStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
          {product.name} 
          <span style={{ color: '#ef4444', fontSize: '12px', marginLeft: '6px' }}>({renderCount.current})</span>
        </h4>
        <p style={{ fontWeight: '700', color: '#2563eb', fontSize: '18px', margin: '0 0 16px 0' }}>${product.price.toFixed(2)}</p>
      </div>
      <button onClick={handleAdd} style={{ width: '100%', padding: '10px', background: added ? '#10b981' : '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        {added ? '✓ Added' : 'Add to Cart'}
      </button>
    </div>
  );
});

export default function ProductListPage() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700' }}>
        Available Products <small style={{ color: '#ef4444', fontSize: '12px' }}>[H-List: {renderCount.current}]</small>
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}