import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/VideoDetail.css';

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/videos/${id}`);
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

  if (loading) {
    return <div className="loading">Загрузка...</div>;
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

  return (
    <div className="video-detail">
      <div className="video-container">
        <video 
          controls 
          autoPlay
          className="video-player"
        >
          <source src={video.video_url} type="video/mp4" />
          Ваш браузер не поддерживает видео
        </video>
      </div>
      
      <div className="video-info">
        <h1>{video.title}</h1>
        <div className="video-stats">
          <span className="category-tag">{video.category}</span>
          <span className="likes">❤️ {video.likes}</span>
        </div>
      </div>

      <Link to="/videos" className="back-button">
        Вернуться к списку видео
      </Link>
    </div>
  );
}

export default VideoDetail; 