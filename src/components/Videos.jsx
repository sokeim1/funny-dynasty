import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Videos.css';
import { getVideos, addVideo, updateVideoLikes } from '../api/videos';

const initialCategories = [
  { id: 'all', name: 'Все' },
  { id: 'barboskiny', name: 'Барбоскины' },
  { id: 'smeshariki', name: 'Смешарики' },
  { id: 'lentyaevo', name: 'Лентяево' },
  { id: 'luntik', name: 'Лунтик' },
  { id: 'tomandjerry', name: 'Том и Джерри' },
  { id: 'tmnt', name: 'Черепашки ниндзя' },
  { id: 'football', name: 'Футбол' },
  { id: 'toy_story', name: 'История игрушек' },
  { id: 'kung_fu_panda', name: 'Кунг-фу панда' }
];

function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    video_url: '',
    category: '',
    newCategory: ''
  });
  
  const [categories, setCategories] = useState(initialCategories);
  const [customCategories, setCustomCategories] = useState([]);
  const allCategories = [...categories, ...customCategories];

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedVideos = await getVideos();
        if (!Array.isArray(fetchedVideos)) {
          throw new Error('Неверный формат данных с сервера');
        }
        setVideos(fetchedVideos);
      } catch (err) {
        setError('Ошибка при загрузке видео: ' + err.message);
        console.error('Ошибка при загрузке видео:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    
    if (!newVideo.title || !newVideo.video_url || !newVideo.category) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const videoData = {
        title: newVideo.title,
        video_url: newVideo.video_url,
        category: newVideo.category
      };

      // Добавляем видео в базу данных
      const addedVideo = await addVideo(videoData);
      
      // Сразу обновляем UI, добавляя новое видео в начало списка
      setVideos(prev => [addedVideo, ...prev]);
      
      // Очищаем форму
      setNewVideo({
        title: '',
        video_url: '',
        category: '',
        newCategory: ''
      });
      
      // Показываем уведомление об успехе
      alert('Видео успешно добавлено!');
      
      // Закрываем форму
      setShowAddForm(false);
    } catch (err) {
      console.error('Ошибка при добавлении видео:', err);
      alert('Не удалось добавить видео: ' + err.message);
    }
  };

  const handleLike = async (videoId) => {
    try {
      const updatedVideo = await updateVideoLikes(videoId);
      setVideos(prevVideos => 
        prevVideos.map(video => 
          video._id === videoId ? updatedVideo : video
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
    ? allCategories 
    : allCategories.slice(0, 5);

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
          <button 
            className="add-video-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Отменить' : 'Загрузить видео'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddVideo} className="add-video-form">
            <input
              type="text"
              placeholder="Название видео"
              value={newVideo.title}
              onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
              required
            />
            <input
              type="url"
              placeholder="Ссылка на видео"
              value={newVideo.video_url}
              onChange={(e) => setNewVideo({...newVideo, video_url: e.target.value})}
              required
            />
            <div className="category-selection">
              <label>Выберите категорию:</label>
              <div className="category-grid">
                {allCategories.filter(c => c.id !== 'all').map(category => (
                  <div 
                    key={category.id} 
                    className={`category-item ${newVideo.category === category.id ? 'selected' : ''}`}
                    onClick={() => setNewVideo({...newVideo, category: category.id})}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="submit-video-button">Загрузить</button>
          </form>
        )}

        <div className="category-filters">
          <div className="category-grid">
            {visibleCategories.map(category => (
              <div
                key={category.id}
                className={`category-filter-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
          {allCategories.length > 5 && (
            <button 
              className="category-expand-button"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? 'Показать меньше' : 'Показать больше'}
            </button>
          )}
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
                {allCategories.find(c => c.id === video.category)?.name || video.category}
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