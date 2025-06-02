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
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Название категории обязательно' });
    }

    // Проверяем, существует ли уже категория с таким именем
    const existingCategory = await Category.findOne({ 
      name: name.trim() 
    });
    
    if (existingCategory) {
      return res.status(400).json({ message: 'Категория с таким названием уже существует' });
    }

    const category = new Category({
      name: name.trim()
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 