import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Videos.css';
import { getVideos, toggleVideoLike } from '../api/videos';
import { getCategories } from '../api/categories';

const initialCategories = [
  { id: 'all', name: 'Все' }
];

function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Загружаем категории
        const fetchedCategories = await getCategories();
        setCategories([...initialCategories, ...fetchedCategories]);
        
        // Загружаем видео
        const fetchedVideos = await getVideos();
        if (!Array.isArray(fetchedVideos)) {
          throw new Error('Неверный формат данных с сервера');
        }
        setVideos(fetchedVideos);
      } catch (err) {
        setError('Ошибка при загрузке данных: ' + err.message);
        console.error('Ошибка при загрузке данных:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLike = async (videoId) => {
    try {
      const updatedVideo = await toggleVideoLike(videoId);
      setVideos(prevVideos => 
        prevVideos.map(video => 
          video._id === videoId ? { ...video, likes: updatedVideo.likes } : video
        )
      );
    } catch (err) {
      console.error('Ошибка при обновлении лайков:', err);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const visibleCategories = showAllCategories 
    ? categories 
    : categories.slice(0, 5);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button onClick={() => window.location.reload()} className="retry-button">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="videos-page">
      <div className="search-section">
        <div className="search-and-add">
          <input
            type="text"
            placeholder="Поиск видео..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          <div className="category-list">
            {visibleCategories.map((category, index) => (
              <React.Fragment key={category.id}>
                <div
                  className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </div>
                {index < visibleCategories.length - 1 && <span className="category-separator">-</span>}
              </React.Fragment>
            ))}
            {categories.length > 5 && (
              <button 
                className="category-expand-button"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? '⬆️' : '⬇️'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="videos-grid">
        {filteredVideos.map(video => (
          <Link to={`/video/${video._id}`} key={video._id} className="video-card">
            <div className="video-preview">
              <video 
                className="preview-player"
                muted
                loop
                preload="metadata"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              >
                <source src={video.video_url} type="video/mp4" />
                Ваш браузер не поддерживает видео
              </video>
            </div>
            <h3>{video.title}</h3>
            <div className="video-card-info">
              <span className="category-tag">
                {categories.find(c => c.id === video.category)?.name || video.category}
              </span>
              <button 
                className="likes-count"
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(video._id);
                }}
              >
                ❤️ {video.likes}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Videos; 