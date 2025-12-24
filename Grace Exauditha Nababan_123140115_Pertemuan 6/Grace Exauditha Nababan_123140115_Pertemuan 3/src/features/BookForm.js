import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Box, Smartphone } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import Button from '../components/Button';
import InputField from '../components/InputField';

const BookForm = ({ onClose, editData = null }) => {
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({ 
    title: '', author: '', status: 'completed', format: 'physical' 
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Judul buku wajib diisi.";
    if (!formData.author.trim()) tempErrors.author = "Nama penulis wajib diisi.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const finalData = { ...formData, format: formData.format || 'physical' };
    editData ? updateBook(editData.id, finalData) : addBook(finalData);
    onClose();
  };

  const getStatusLabel = (status) => {
    if (status === 'reading') return 'Sedang Baca';
    if (status === 'completed') return 'Selesai';
    return 'Wishlist';
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
    }}>
      <div style={{
        backgroundColor: '#F4F4F2', padding: '2rem', borderRadius: '0.5rem',
        width: '100%', maxWidth: '450px', borderTop: '4px solid #C8A165', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1A3C34', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {editData ? <Edit2 size={24} /> : <Plus size={24} />}
          {editData ? 'Edit Buku' : 'Tambah Buku'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <InputField label="Judul Buku" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} error={errors.title} placeholder="Contoh: Laut Bercerita" />
          <InputField label="Penulis" name="author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} error={errors.author} placeholder="Contoh: Leila S. Chudori" />

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#2C2C2C', fontWeight: 'bold', marginBottom: '0.5rem' }} className="font-heading">Status</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['completed', 'reading', 'wishlist'].map((status) => (
                  <button
                    key={status} type="button" onClick={() => setFormData({...formData, status})}
                    style={{
                      padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                      backgroundColor: formData.status === status ? '#1A3C34' : 'white',
                      color: formData.status === status ? '#C8A165' : '#6B7280',
                      borderColor: formData.status === status ? '#1A3C34' : '#D1D5DB',
                      textAlign: 'center', transition: 'all 0.2s'
                    }}
                  >
                    {getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#2C2C2C', fontWeight: 'bold', marginBottom: '0.5rem' }} className="font-heading">Format</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'physical', label: 'Fisik', icon: Box },
                  { id: 'digital', label: 'E-Book', icon: Smartphone }
                ].map((fmt) => (
                  <button
                    key={fmt.id} type="button" onClick={() => setFormData({...formData, format: fmt.id})}
                    style={{
                      padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                      backgroundColor: formData.format === fmt.id ? '#1A3C34' : 'white',
                      color: formData.format === fmt.id ? '#F4F4F2' : '#6B7280',
                      borderColor: formData.format === fmt.id ? '#1A3C34' : '#D1D5DB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s'
                    }}
                  >
                    <fmt.icon size={14} /> {fmt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
            <Button variant="outline" onClick={onClose}>Batal</Button>
            <Button variant="primary" type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;