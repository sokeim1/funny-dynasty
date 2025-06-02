import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVideo } from '../api/videos';

const AdminPanel = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newVideoCategoryName, setNewVideoCategoryName] = useState('');
  const [newVideo, setNewVideo] = useState({
    title: '',
    video_url: '',
    category: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchVideos();
    fetchComments();
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
    
    try {
      const response = await fetch(`http://localhost:5001/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Ответ сервера не в формате JSON");
      }

      const data = await response.json();
      
      // Обновляем список категорий после успешного удаления
      setCategories(prevCategories => prevCategories.filter(cat => cat._id !== categoryId));
      alert('Категория успешно удалена');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert(error.message || 'Ошибка при удалении категории');
    }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Введите название категории');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName.trim() })
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories(prev => [...prev, newCategory]);
        setNewCategoryName('');
      } else {
        const error = await response.json();
        alert('Ошибка при создании категории: ' + error.message);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Ошибка при создании категории');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
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
        category: ''
      });
      
      alert('Видео успешно добавлено!');
      setShowAddVideoForm(false);
    } catch (err) {
      console.error('Ошибка при добавлении видео:', err);
      alert('Не удалось добавить видео: ' + err.message);
    }
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsCreatingNewCategory(true);
      setNewVideoCategoryName('');
    } else {
      setIsCreatingNewCategory(false);
      setNewVideo({...newVideo, category: value});
    }
  };

  const handleCreateCategoryInForm = async () => {
    if (!newVideoCategoryName.trim()) {
      alert('Введите название категории');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newVideoCategoryName.trim() })
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories(prev => [...prev, newCategory]);
        setNewVideo({...newVideo, category: newCategory._id});
        setIsCreatingNewCategory(false);
        setNewVideoCategoryName('');
      } else {
        const error = await response.json();
        alert('Ошибка при создании категории: ' + error.message);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Ошибка при создании категории');
    }
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
          {/* Add Video Button */}
          <button
            onClick={() => setShowAddVideoForm(!showAddVideoForm)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={e => e.target.style.backgroundColor = '#4CAF50'}
          >
            {showAddVideoForm ? 'Отменить' : 'Загрузить видео'}
          </button>

          {/* Add Video Form */}
          {showAddVideoForm && (
            <div style={{ 
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              <form onSubmit={handleAddVideo} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Название видео"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  style={{
                    padding: '12px',
                    backgroundColor: '#3a3a3a',
                    border: '1px solid #444',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  required
                />
                <input
                  type="url"
                  placeholder="Ссылка на видео"
                  value={newVideo.video_url}
                  onChange={(e) => setNewVideo({...newVideo, video_url: e.target.value})}
                  style={{
                    padding: '12px',
                    backgroundColor: '#3a3a3a',
                    border: '1px solid #444',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  required
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select
                    value={isCreatingNewCategory ? 'new' : newVideo.category}
                    onChange={handleCategoryChange}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#3a3a3a',
                      border: '1px solid #444',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                    <option value="new">+ Создать новую категорию</option>
                  </select>
                </div>

                {isCreatingNewCategory && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Название новой категории"
                      value={newVideoCategoryName}
                      onChange={(e) => setNewVideoCategoryName(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#3a3a3a',
                        border: '1px solid #444',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleCreateCategoryInForm}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={e => e.target.style.backgroundColor = '#45a049'}
                      onMouseOut={e => e.target.style.backgroundColor = '#4CAF50'}
                    >
                      Создать
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
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
                  Загрузить
                </button>
              </form>
            </div>
          )}

          {/* Videos List */}
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
                  <option key={category._id} value={category._id}>
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
                <div style={{ marginBottom: '10px', fontSize: '14px', color: '#888' }}>
                  {new Date(comment.timestamp).toLocaleString()}
                </div>
                <div>{comment.text}</div>
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
          {/* Add Category Form */}
          <div style={{ 
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            <div style={{ 
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Название новой категории"
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#3a3a3a',
                  border: '1px solid #444',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={addCategory}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={e => e.target.style.backgroundColor = '#4CAF50'}
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Categories List */}
          {categories.map(category => (
            <div key={category._id} style={{ 
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
                onClick={() => deleteCategory(category._id)}
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