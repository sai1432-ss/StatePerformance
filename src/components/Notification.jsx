import React from 'react';

export default React.memo(function Notification({ notification }) {
  console.log("🎨 Rendering: <Notification />");
  if (!notification) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', padding: '12px', borderRadius: '4px', background: '#e6f4ea', border: '1px solid #ccc', zIndex: 2000 }}>
      {notification.message}
    </div>
  );
});