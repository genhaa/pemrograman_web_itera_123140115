import React, { useState } from 'react';
import { Search, BookOpen, Plus } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookItem from '../features/BookItem';
import BookForm from '../features/BookForm';
import Button from '../components/Button';

const HomePage = () => {
  const { books } = useBooks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book => {
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  return (
    <div>
      {/* Header Filter & Search */}
      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={18} />
            <input 
              type="text" placeholder="Cari judul atau penulis..." 
              style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', backgroundColor: '#F4F4F2', border: 'none', borderRadius: '9999px', boxSizing: 'border-box' }}
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {['all', 'completed', 'reading', 'wishlist'].map(status => (
              <button
                key={status} onClick={() => setFilterStatus(status)}
                style={{
                  padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold', border: 'none', whiteSpace: 'nowrap',
                  backgroundColor: filterStatus === status ? '#1A3C34' : '#F4F4F2',
                  color: filterStatus === status ? '#C8A165' : '#4B5563'
                }}
              >
                {status === 'all' ? 'Semua' : status === 'completed' ? 'Selesai' : status === 'reading' ? 'Sedang Baca' : 'Wishlist'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', border: '2px dashed #D1D5DB', borderRadius: '0.5rem' }}>
          <BookOpen size={32} color="#1A3C34" style={{ marginBottom: '1rem' }} />
          <h3 className="font-heading" style={{ fontWeight: 'bold', color: '#2C2C2C' }}>Belum ada buku ditemukan</h3>
          <Button variant="accent" onClick={() => setIsFormOpen(true)} className="mx-auto mt-4">
            <Plus size={18} /> Tambah Buku
          </Button>
        </div>
      )}

      {/* Grid Buku */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filteredBooks.map(book => (
          <BookItem key={book.id} book={book} onEdit={handleEdit} />
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => { setEditingBook(null); setIsFormOpen(true); }}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', width: '3.5rem', height: '3.5rem',
          backgroundColor: '#C8A165', color: '#1A3C34', borderRadius: '50%', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', zIndex: 40
        }}
      >
        <Plus size={28} />
      </button>

      {isFormOpen && <BookForm onClose={() => { setIsFormOpen(false); setEditingBook(null); }} editData={editingBook} />}
    </div>
  );
};

export default HomePage;