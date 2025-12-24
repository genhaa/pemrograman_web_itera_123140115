import React from 'react';
import { BarChart2, Book, Check, BookOpen, Bookmark } from 'lucide-react';

import { useBooks } from '../context/BookContext'; 
import useBookStats from '../hooks/useBookStats';

const StatsPage = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const StatCard = ({ title, count, icon: Icon, color }) => (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', borderTop: `4px solid ${color}`, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
          <h3 className="font-heading" style={{ fontSize: '2.25rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#2C2C2C', margin: 0 }}>{count}</h3>
        </div>
        <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#F4F4F2', color: '#1A3C34' }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ backgroundColor: '#1A3C34', color: '#F4F4F2', padding: '2rem', borderRadius: '0.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 className="font-heading" style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#F4F4F2' }}>Statistik Perpustakaan</h2>
          <p style={{ color: '#C8A165', margin: 0 }}>Ringkasan perjalanan literasimu sejauh ini.</p>
        </div>
        <BarChart2 style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', opacity: 0.1, width: '150px', height: '150px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatCard title="Total Buku" count={stats.total} icon={Book} color="#2C2C2C" />
        <StatCard title="Sedang Baca" count={stats.reading} icon={BookOpen} color="#3B82F6" />
        <StatCard title="Selesai" count={stats.completed} icon={Check} color="#1A3C34" />
        <StatCard title="Wishlist" count={stats.wishlist} icon={Bookmark} color="#C8A165" />
      </div>
    </div>
  );
};

export default StatsPage;