import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  const baseStyle = {
    padding: '0.75rem 1.5rem', // Padding lebih besar biar lebih enak diklik
    borderRadius: '0.5rem',   // Rounded corner lebih jelas (dari 0.375rem jadi 0.5rem)
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out', // Animasi halus buat hover/active
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    border: 'none', // Pastikan border default browser hilang
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)', // Shadow tipis biar ada kedalaman
    outline: 'none', // Hilangkan outline biru saat focus (opsional, tapi sering bikin desain rusak)
  };
  
  const variants = {
    primary: {
      backgroundColor: '#1A3C34', // Hijau tua
      color: '#F4F4F2',           // Putih tulang
      ':hover': { backgroundColor: '#2E5048' }, // Lebih gelap saat hover
      ':active': { transform: 'scale(0.98)' }   // Efek klik
    },
    accent: {
      backgroundColor: '#C8A165', // Emas
      color: '#1A3C34',           // Hijau tua
      ':hover': { backgroundColor: '#D9B27E' },
      ':active': { transform: 'scale(0.98)' }
    },
    danger: {
      backgroundColor: '#EF4444', // Merah
      color: 'white',
      ':hover': { backgroundColor: '#DC2626' },
      ':active': { transform: 'scale(0.98)' }
    },
    outline: {
      backgroundColor: 'white',   
      border: '1px solid #D1D1D1',
      color: '#2C2C2C',           
      ':hover': { backgroundColor: '#F9F9F9', borderColor: '#BDBDBD' },
      ':active': { transform: 'scale(0.98)' }
    }
  };

  const combinedStyle = { ...baseStyle, ...variants[variant] };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={className}
      style={combinedStyle}
    >
      {children}
    </button>
  );
};

export default Button;