import { API_BASE_URL } from '../config/api';

export const getComments = async (videoId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при получении комментариев');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    throw error;
  }
};

export const addComment = async (videoId, commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при добавлении комментария');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при удалении комментария');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error);
    throw error;
  }
}; 