const API_URL = '/api';

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при получении категорий');
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Неверный формат данных с сервера');
    }
    return data;
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    if (!categoryData.id || !categoryData.name) {
      throw new Error('ID и название категории обязательны');
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

    const data = await response.json();
    if (!data.id || !data.name) {
      throw new Error('Неверный формат данных с сервера');
    }

    return data;
  } catch (error) {
    console.error('Ошибка при добавлении категории:', error);
    throw error;
  }
}; 