import React from 'react';

const InputField = ({ label, name, value, onChange, error, placeholder }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', color: '#2C2C2C', fontWeight: 'bold', marginBottom: '0.5rem' }} className="font-heading">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '0.75rem', borderRadius: '0.375rem',
        border: error ? '1px solid #EF4444' : '1px solid #D1D1D1',
        outline: 'none', boxSizing: 'border-box'
      }}
    />
    {error && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{error}</p>}
  </div>
);

export default InputField;