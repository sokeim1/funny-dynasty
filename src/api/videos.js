import Video from '../models/Video';
import { API_BASE_URL } from '../config/api';

// Функция для получения IP адреса пользователя
async function getUserIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Ошибка при получении IP:', error);
    return null;
  }
}

export const getVideos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`);
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
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при добавлении видео');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении видео:', error);
    throw error;
  }
};

export const toggleVideoLike = async (videoId) => {
  try {
    const userIp = await getUserIp();
    if (!userIp) {
      throw new Error('Не удалось получить IP адрес');
    }

    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIp }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при обновлении лайков');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при обновлении лайков:', error);
    throw error;
  }
}; 