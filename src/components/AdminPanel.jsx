import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: '',
    video_url: '',
    category: ''
  });
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: ''
  });
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
=======
  const [categories, setCategories] = useState([
    { id: 'funny', name: 'Смешное' },
    { id: 'fails', name: 'Неудачи' },
    { id: 'animals', name: 'Животные' },
    { id: 'other', name: 'Другое' }
  ]);
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchVideos();
    fetchComments();
<<<<<<< HEAD
    fetchCategories();
=======
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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

<<<<<<< HEAD
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

=======
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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

<<<<<<< HEAD
  const addVideo = async (videoData) => {
    try {
      const response = await fetch('http://localhost:5001/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });
      if (response.ok) {
        fetchVideos();
        setNewVideo({ title: '', video_url: '', category: '' });
        setShowAddVideoForm(false);
      }
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Ошибка при добавлении видео');
    }
  };

  const addCategory = async () => {
    if (!newCategory.name.trim()) {
      alert('Введите название категории');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategory.name.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при создании категории');
      }

      const newCategoryData = await response.json();
      setCategories(prev => [...prev, newCategoryData]);
      setNewCategory({ id: '', name: '' });
      setShowNewCategoryForm(false);
      return newCategoryData;
    } catch (error) {
      console.error('Error adding category:', error);
      alert(error.message || 'Ошибка при добавлении категории');
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.video_url || !newVideo.category) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    await addVideo(newVideo);
  };

=======
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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
<<<<<<< HEAD
      {activeTab === 'videos' && (
        <>
          {/* Add Video Button */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setShowAddVideoForm(!showAddVideoForm)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
              onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
            >
              {showAddVideoForm ? 'Отменить' : 'Загрузить видео'}
            </button>
          </div>

          {/* Add Video Form */}
          {showAddVideoForm && (
            <div style={{
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <form onSubmit={handleAddVideo}>
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Название видео"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#3a3a3a',
                      border: '1px solid #444',
                      color: 'white',
                      borderRadius: '6px',
                      marginBottom: '10px'
                    }}
                  />
                  <input
                    type="url"
                    placeholder="Ссылка на видео"
                    value={newVideo.video_url}
                    onChange={(e) => setNewVideo({...newVideo, video_url: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#3a3a3a',
                      border: '1px solid #444',
                      color: 'white',
                      borderRadius: '6px',
                      marginBottom: '10px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select
                      value={newVideo.category}
                      onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#3a3a3a',
                        border: '1px solid #444',
                        color: 'white',
                        borderRadius: '6px'
                      }}
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewCategoryForm(true)}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#ff0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
                      onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
                    >
                      Новая категория
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
=======
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
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
<<<<<<< HEAD
                    width: '100%'
=======
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
                  }}
                  onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
                  onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
                >
<<<<<<< HEAD
                  Загрузить
                </button>
              </form>
            </div>
          )}

          {/* New Category Form */}
          {showNewCategoryForm && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '10px',
              zIndex: 1000,
              width: '300px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Новая категория</h3>
              <input
                type="text"
                placeholder="Название категории"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
=======
                  Удалить
                </button>
              </div>
              <select
                value={video.category}
                onChange={(e) => updateVideo(video._id, { category: e.target.value })}
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#3a3a3a',
                  border: '1px solid #444',
                  color: 'white',
                  borderRadius: '6px',
<<<<<<< HEAD
                  marginBottom: '15px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={async () => {
                    const newCat = await addCategory();
                    if (newCat) {
                      setNewVideo({...newVideo, category: newCat.id});
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.target.style.backgroundColor = '#cc0000'}
                  onMouseOut={e => e.target.style.backgroundColor = '#ff0000'}
                >
                  Добавить
                </button>
                <button
                  onClick={() => setShowNewCategoryForm(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#2a2a2a',
                    color: 'white',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          )}

          {/* Videos List */}
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
                    borderRadius: '6px'
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
        </>
      )}

      {activeTab === 'comments' ? (
=======
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
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
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