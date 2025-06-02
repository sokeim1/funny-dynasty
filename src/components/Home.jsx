import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Добро пожаловать в Funny.Dynasty</h1>
        <p className="hero-subtitle">Где юмор объединяет людей</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">130K+</span>
            <span className="stat-label">Подписчиков в TikTok</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1,400+</span>
            <span className="stat-label">Участников в Telegram</span>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>О нас</h2>
        <p>
          Funny.Dynasty - это место, где собран самый интересный и смешной контент 
          рунета. Мы создали активное сообщество любителей юмора, которые разделяют 
          нашу страсть к созданию хорошего настроения.
        </p>
        <Link to="/videos" className="cta-button">
          Смотреть видео
        </Link>
      </section>
    </div>
  );
}

export default Home; 