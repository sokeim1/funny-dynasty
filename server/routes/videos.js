import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// Получить все видео
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    if (!videos) {
      return res.status(404).json({ message: 'Видео не найдены' });
    }
    console.log('Отправка видео:', videos);
    res.json(videos);
  } catch (error) {
    console.error('Ошибка при получении видео:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении видео' });
  }
});

// Получить одно видео по ID
router.get('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Видео не найдено' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавить новое видео
router.post('/videos', async (req, res) => {
  try {
    // Проверяем наличие всех необходимых полей
    const { title, video_url, category } = req.body;
    
    if (!title || !video_url || !category) {
      return res.status(400).json({ 
        message: 'Необходимо заполнить все поля (название, ссылка на видео и категория)' 
      });
    }

    // Создаем новое видео
    const video = new Video({
      title,
      video_url,
      category,
      likes: 0,
      views: 0
    });

    // Сохраняем в базу данных
    const savedVideo = await video.save();
    console.log('Новое видео добавлено:', savedVideo);

    // Возвращаем добавленное видео
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Ошибка при добавлении видео:', error);
    res.status(400).json({ 
      message: 'Ошибка при добавлении видео: ' + error.message 
    });
  }
});

// Обновить лайки видео
router.patch('/videos/:id/like', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Видео не найдено' });
    }
    video.likes += 1;
    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 