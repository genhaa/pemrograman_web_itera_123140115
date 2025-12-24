import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('my-library-books', []);

  const addBook = (newBook) => {
    setBooks((prev) => [...prev, { ...newBook, id: Date.now().toString() }]);
  };

  const updateBook = (id, updatedData) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...updatedData } : book)));
  };

  const removeBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);