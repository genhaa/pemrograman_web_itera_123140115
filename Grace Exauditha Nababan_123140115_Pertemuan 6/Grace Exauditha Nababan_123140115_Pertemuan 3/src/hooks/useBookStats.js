import { useMemo } from 'react';

const useBookStats = (books) => {
  const stats = useMemo(() => {
    return {
      total: books.length,
      reading: books.filter(b => b.status === 'reading').length,
      completed: books.filter(b => b.status === 'completed').length,
      wishlist: books.filter(b => b.status === 'wishlist').length,
      digital: books.filter(b => b.format === 'digital').length,
    };
  }, [books]);

  return stats;
};

export default useBookStats;