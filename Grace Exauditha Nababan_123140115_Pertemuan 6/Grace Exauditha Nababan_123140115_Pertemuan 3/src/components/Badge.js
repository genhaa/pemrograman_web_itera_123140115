import React from 'react';

const Badge = ({ status }) => {
  const styles = {
    reading: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE', label: "Sedang Baca" },
    completed: { bg: '#1A3C34', text: '#F4F4F2', border: '#1A3C34', label: "Selesai" },
    wishlist: { bg: '#C8A165', text: '#1A3C34', border: '#C8A165', label: "Wishlist" }
  };
  
  const current = styles[status] || styles.completed;

  return (
    <span style={{
      padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold',
      backgroundColor: current.bg, color: current.text, border: `1px solid ${current.border}`
    }}>
      {current.label}
    </span>
  );
};

export default Badge;