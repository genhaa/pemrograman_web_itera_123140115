import React, { useState } from 'react';
import { Book, BarChart2, Home, Menu, X } from 'lucide-react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'; 
import { BookProvider } from './context/BookContext';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import './App.css'; 

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

  const getHeaderInfo = () => {
    if (location.pathname === '/stats') {
      return { title: 'Insight', subtitle: 'Data di balik kebiasaan membacamu.' };
    }
    return { title: 'Daftar Pustaka', subtitle: 'Kelola bacaanmu dengan gaya.' };
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <BookProvider>
      <div className="app-container">
        
        {/* === NAVBAR === */}
        <nav className="navbar">
          <div className="navbar-container">
            
            {/* 1. Logo Area */}
            <div className="logo-area">
              <Book size={28} className="logo-icon" />
              <h1 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#C8A165' }}>
                LibManager
              </h1>
            </div>

            {/* 2. Desktop Menu (Ganti button jadi NavLink) */}
            <div className="desktop-menu" style={{ gap: '2rem' }}>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                end 
              >
                Koleksi Saya
              </NavLink>
              <NavLink 
                to="/stats" 
                className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
              >
                Statistik
              </NavLink>
            </div>

            {/* 3. Mobile Hamburger Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} color="#C8A165" /> : <Menu size={28} color="#C8A165" />}
            </button>
          </div>

          {/* === MOBILE MENU DROPDOWN === */}
          {isMenuOpen && (
            <div className="mobile-dropdown">
               <div className="mobile-menu-container">
                 <NavLink 
                   to="/" 
                   className={({ isActive }) => `mobile-menu-item ${isActive ? 'active' : ''}`}
                   onClick={() => setIsMenuOpen(false)}
                   end
                 >
                   <Home size={20} /> Koleksi Saya
                 </NavLink>
                 
                 <NavLink 
                   to="/stats" 
                   className={({ isActive }) => `mobile-menu-item ${isActive ? 'active' : ''}`}
                   onClick={() => setIsMenuOpen(false)}
                 >
                   <BarChart2 size={20} /> Statistik
                 </NavLink>
               </div>
            </div>
          )}
        </nav>

        {/* === MAIN CONTENT === */}
        <main className="main-content">
           <header className="page-header">
              <h2 className="page-title font-heading">{title}</h2>
              <p className="page-subtitle">{subtitle}</p>
            </header>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
        </main>

      </div>
    </BookProvider>
  );
};

export default App;
