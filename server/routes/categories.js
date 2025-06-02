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
<<<<<<< HEAD
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
=======
    const { id, name } = req.body;
    
    // Проверяем, существует ли уже категория с таким id
    const existingCategory = await Category.findOne({ id });
    if (existingCategory) {
      return res.status(400).json({ message: 'Категория с таким ID уже существует' });
    }

    const category = new Category({
      id,
      name
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 