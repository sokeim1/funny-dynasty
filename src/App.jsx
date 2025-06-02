import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from './components/Home';
import Videos from './components/Videos';
import VideoDetail from './components/VideoDetail';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <SpeedInsights />
        <header>
          <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#1a1a1a'
          }}>
            <Link to="/" style={{ color: '#ff0000', textDecoration: 'none', fontSize: '24px' }}>
              FUNNY.DYNASTY
            </Link>
            <div>
              <Link to="/videos" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
                Видео
              </Link>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Войти
              </Link>
            </div>
          </nav>
        </header>

        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        <footer className="footer" style={{ 
          padding: '20px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          textAlign: 'center'
        }}>
          <p>© 2024 Funny.Dynasty. Все права защищены.</p>
          <div className="social-links" style={{ marginTop: '10px' }}>
            <a href="https://tiktok.com/@funny.dynasty" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
              TikTok
            </a>
            <a href="https://t.me/funnydynasty" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ color: 'white', textDecoration: 'none' }}>
              Telegram
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 