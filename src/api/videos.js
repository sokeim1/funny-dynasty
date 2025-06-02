import Video from '../models/Video';

const API_URL = '/api';

export const getVideos = async () => {
  try {
    const response = await fetch(`${API_URL}/videos`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при получении видео');
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Неверный формат данных с сервера');
    }
    return data;
  } catch (error) {
    console.error('Ошибка при получении видео:', error);
    throw error;
  }
};

export const addVideo = async (videoData) => {
  try {
    const response = await fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    });
    if (!response.ok) {
      throw new Error('Ошибка при добавлении видео');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении видео:', error);
    throw error;
  }
};

export const updateVideoLikes = async (videoId) => {
  try {
    const response = await fetch(`${API_URL}/videos/${videoId}/like`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Ошибка при обновлении лайков');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при обновлении лайков:', error);
    throw error;
  }
}; 