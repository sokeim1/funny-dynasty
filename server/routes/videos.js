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
    const { title, video_url, category } = req.body;
    
    if (!title || !video_url || !category) {
      return res.status(400).json({ 
        message: 'Необходимо заполнить все поля (название, ссылка на видео и категория)' 
      });
    }

    const video = new Video({
      title,
      video_url,
      category,
      likes: 0,
      likedBy: []
    });

    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Ошибка при добавлении видео:', error);
    res.status(400).json({ 
      message: 'Ошибка при добавлении видео: ' + error.message 
    });
  }
});

// Поставить/убрать лайк
router.patch('/videos/:id/like', async (req, res) => {
  try {
    const { userIp } = req.body;
    if (!userIp) {
      return res.status(400).json({ message: 'IP адрес пользователя обязателен' });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Видео не найдено' });
    }

    const userLikedIndex = video.likedBy.indexOf(userIp);
    
    if (userLikedIndex === -1) {
      // Пользователь еще не лайкал это видео
      video.likes += 1;
      video.likedBy.push(userIp);
    } else {
      // Пользователь уже лайкал это видео - убираем лайк
      video.likes = Math.max(0, video.likes - 1);
      video.likedBy.splice(userLikedIndex, 1);
    }

    const updatedVideo = await video.save();
    res.json({
      likes: updatedVideo.likes,
      isLiked: userLikedIndex === -1 // true если лайк был поставлен, false если убран
    });
  } catch (error) {
    console.error('Ошибка при обновлении лайков:', error);
    res.status(400).json({ message: error.message });
  }
});

// Обновить видео
router.put('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!video) {
      return res.status(404).json({ message: 'Видео не найдено' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удалить видео
router.delete('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Видео не найдено' });
    }
    res.json({ message: 'Видео успешно удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 