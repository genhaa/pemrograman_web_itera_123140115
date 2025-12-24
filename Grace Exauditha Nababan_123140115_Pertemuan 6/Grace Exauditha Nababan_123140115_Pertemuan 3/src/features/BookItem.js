import React from 'react';
import { Edit2, Trash2, Box, Smartphone } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import Badge from '../components/Badge';

const BookItem = ({ book, onEdit }) => {
  const { removeBook } = useBooks();

  const FormatIcon = book.format === 'digital' ? Smartphone : Box;
  const formatLabel = book.format === 'digital' ? 'E-Book' : 'Fisik';

  return (
    <div style={{
      backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderLeft: '4px solid #1A3C34',
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: '1rem'
    }}>
      {/* BAGIAN KIRI: Judul, Penulis, Status */}
      <div style={{ flex: 1, paddingRight: '1rem' }}>
        <div style={{ marginBottom: '0.25rem' }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1A3C34', margin: 0 }}>
            {book.title}
          </h3>
        </div>
        <p style={{ color: '#4B5563', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
           by <span style={{ fontWeight: 600, color: '#C8A165' }}>{book.author}</span>
        </p>
        <Badge status={book.status} />
      </div>
      
      {/* BAGIAN KANAN: Layout Atas-Bawah (Column) */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
        alignSelf: 'center' 
      }}>
        
        {/* 1. Label Format */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', 
          padding: '4px 8px', borderRadius: '4px', backgroundColor: '#F3F4F6', 
          color: '#6B7280', border: '1px solid #E5E7EB',
          width: 'fit-content'
        }}>
          <FormatIcon size={12} /> {formatLabel}
        </div>

        {/* 2. Tombol Action */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => onEdit(book)} 
            style={{ padding: '0.25rem', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            title="Edit Buku"
          >
            <Edit2 size={18} />
          </button>
          
          <button 
            onClick={() => removeBook(book.id)} 
            style={{ padding: '0.25rem', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            title="Hapus Buku"
          >
            <Trash2 size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookItem;