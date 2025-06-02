import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [categories, setCategories] = useState([
    { id: 'funny', name: 'Смешное' },
    { id: 'fails', name: 'Неудачи' },
    { id: 'animals', name: 'Животные' },
    { id: 'other', name: 'Другое' }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchVideos();
    fetchComments();
  }, [navigate]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/videos');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const updateVideo = async (videoId, updates) => {
    try {
      const response = await fetch(`http://localhost:5001/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        fetchVideos();
      }
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/videos/${videoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchVideos();
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    // Проверяем, есть ли видео в этой категории
    const videosInCategory = videos.filter(video => video.category === categoryId);
    if (videosInCategory.length > 0) {
      alert('Нельзя удалить категорию, в которой есть видео. Сначала удалите или переместите все видео из этой категории.');
      return;
    }
    
    // Удаляем категорию из локального состояния
    setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#1a1a1a',
      minHeight: 'calc(100vh - 40px)',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        backgroundColor: '#2a2a2a',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Админ панель</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
          onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
        >
          Выйти
        </button>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setActiveTab('videos')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'videos' ? '#ff0000' : '#2a2a2a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Видео
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'comments' ? '#ff0000' : '#2a2a2a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Комментарии
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'categories' ? '#ff0000' : '#2a2a2a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Категории
        </button>
      </div>

      {/* Content */}
      {activeTab === 'videos' ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {videos.map(video => (
            <div key={video._id} style={{ 
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => updateVideo(video._id, { title: e.target.value })}
                  style={{
                    flex: 1,
                    marginRight: '15px',
                    padding: '12px',
                    backgroundColor: '#3a3a3a',
                    border: '1px solid #444',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => deleteVideo(video._id)}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
                  onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
                >
                  Удалить
                </button>
              </div>
              <select
                value={video.category}
                onChange={(e) => updateVideo(video._id, { category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#3a3a3a',
                  border: '1px solid #444',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : activeTab === 'comments' ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {comments.map(comment => (
            <div key={comment._id} style={{ 
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#ff0000'
                }}>
                  {comment.username}
                </strong>
                <p style={{ margin: 0, fontSize: '14px' }}>{comment.text}</p>
              </div>
              <button
                onClick={() => deleteComment(comment._id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
                onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Categories Tab
        <div style={{ display: 'grid', gap: '20px' }}>
          {categories.map(category => (
            <div key={category.id} style={{ 
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '16px' }}>{category.name}</div>
              <button
                onClick={() => deleteCategory(category.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
                onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 