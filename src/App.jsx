import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from './components/Home';
import Videos from './components/Videos';
import VideoDetail from './components/VideoDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <SpeedInsights />
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/">Funny.Dynasty</Link>
          </div>
          <div className="navbar-links">
            <Link to="/">Главная</Link>
            <Link to="/videos">Видео</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>

        <footer className="footer">
          <p>© 2024 Funny.Dynasty. Все права защищены.</p>
          <div className="social-links">
            <a href="https://tiktok.com/@funny.dynasty" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://t.me/funnydynasty" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 