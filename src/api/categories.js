const API_URL = 'http://localhost:5001/api';

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при получении категорий');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    if (!categoryData.name) {
      throw new Error('Название категории обязательно');
    }

    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при добавлении категории');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении категории:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при удалении категории');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    throw error;
  }
}; 