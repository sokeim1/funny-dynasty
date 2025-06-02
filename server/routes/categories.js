import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Получить все категории
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавить новую категорию
router.post('/categories', async (req, res) => {
  try {
    const { id, name } = req.body;
    
    // Проверяем, существует ли уже категория с таким id
    const existingCategory = await Category.findOne({ id });
    if (existingCategory) {
      return res.status(400).json({ message: 'Категория с таким ID уже существует' });
    }

    const category = new Category({
      id,
      name
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 