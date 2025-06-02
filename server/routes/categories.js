import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Получить все категории
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новую категорию
router.post('/categories', async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name
    });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удалить категорию
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена', category });
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    res.status(500).json({ message: error.message || 'Ошибка при удалении категории' });
  }
});

export default router; 