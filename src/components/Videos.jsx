import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Videos.css';
<<<<<<< HEAD
import { getVideos, toggleVideoLike } from '../api/videos';
import { getCategories } from '../api/categories';
=======
import { getVideos, addVideo, toggleVideoLike } from '../api/videos';
import { getCategories, addCategory } from '../api/categories';
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c

const initialCategories = [
  { id: 'all', name: 'Все' }
];

function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllCategories, setShowAllCategories] = useState(false);
<<<<<<< HEAD
  const [categories, setCategories] = useState(initialCategories);
=======
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    video_url: '',
    category: '',
    newCategory: ''
  });
  
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryInput, setNewCategoryInput] = useState('');
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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

<<<<<<< HEAD
=======
  const handleAddCategory = async () => {
    if (!newCategoryInput.trim()) {
      alert('Введите название категории');
      return;
    }

    try {
      const categoryId = newCategoryInput.toLowerCase().replace(/\s+/g, '_');
      const newCategory = await addCategory({
        id: categoryId,
        name: newCategoryInput.trim()
      });
      
      setCategories(prev => [...prev, newCategory]);
      setNewVideo(prev => ({...prev, category: categoryId}));
      setNewCategoryInput('');
    } catch (err) {
      alert('Ошибка при добавлении категории: ' + err.message);
    }
  };

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

      const addedVideo = await addVideo(videoData);
      setVideos(prev => [addedVideo, ...prev]);
      
      setNewVideo({
        title: '',
        video_url: '',
        category: '',
        newCategory: ''
      });
      
      alert('Видео успешно добавлено!');
      setShowAddForm(false);
    } catch (err) {
      console.error('Ошибка при добавлении видео:', err);
      alert('Не удалось добавить видео: ' + err.message);
    }
  };

>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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
<<<<<<< HEAD
        </div>

=======
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
              <label>Выберите категорию или создайте новую:</label>
              <div className="new-category-input">
                <input
                  type="text"
                  placeholder="Новая категория"
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={handleAddCategory}
                  className="add-category-button"
                >
                  Добавить категорию
                </button>
              </div>
              <div className="category-grid">
                {categories.filter(c => c.id !== 'all').map(category => (
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

>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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