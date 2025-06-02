import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import '../styles/VideoDetail.css';
import { API_BASE_URL } from '../config/api';
import { toggleVideoLike } from '../api/videos';
import Comments from './Comments';

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/videos/${id}`);
        if (!response.ok) {
          throw new Error('Видео не найдено');
        }
        const data = await response.json();
        setVideo(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLikeClick = async () => {
    try {
      const result = await toggleVideoLike(id);
      setVideo(prev => ({
        ...prev,
        likes: result.likes
      }));
      setIsLiked(result.isLiked);
    } catch (err) {
      console.error('Ошибка при обновлении лайка:', err);
    }
  };

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
        <Link to="/videos" className="back-button">Вернуться к списку видео</Link>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="error-container">
        <div className="error">Видео не найдено</div>
        <Link to="/videos" className="back-button">Вернуться к списку видео</Link>
      </div>
    );
  }

  const plyrOptions = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'fullscreen'
    ],
    settings: ['quality', 'speed'],
    quality: {
      default: 1080,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
    },
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
    },
    keyboard: { focused: true, global: true }
  };

  const plyrSource = {
    type: 'video',
    sources: [
      {
        src: video.video_url,
        type: 'video/mp4',
        size: 1080
      }
    ]
  };

  return (
    <div className="video-detail">
      <div className="video-container">
        <div className="plyr-wrapper">
          <Plyr 
            source={plyrSource}
            options={plyrOptions}
          />
        </div>
      </div>
      
      <div className="video-info">
        <h1>{video.title}</h1>
        <div className="video-stats">
          <span className="category-tag">{video.category}</span>
          <button 
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
          >
            <span className="like-icon">❤️</span>
            <span className="like-count">{video.likes}</span>
          </button>
        </div>
      </div>

      <Comments videoId={id} />

      <Link to="/videos" className="back-button">
        Вернуться к списку видео
      </Link>
    </div>
  );
}

export default VideoDetail; 