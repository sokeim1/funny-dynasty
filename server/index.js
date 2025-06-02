import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import videoRoutes from './routes/videos.js';
import categoriesRouter from './routes/categories.js';
import commentsRouter from './routes/comments.js';
import { MONGODB_URI } from './config.js';
import Video from './models/Video.js';
import Comment from './models/Comment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../dist')));

console.log('Trying to connect to MongoDB with URI:', MONGODB_URI);

mongoose.set('strictQuery', false);

// Подключение к MongoDB с обработкой ошибок
try {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB успешно подключена');
} catch (err) {
  console.error('Ошибка подключения к MongoDB:', err);
  process.exit(1);
}

// Маршруты для видео
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const video = await Video.findByIdAndUpdate(id, updates, { new: true });
    if (!video) {
      return res.status(404).json({ message: 'Видео не найдено' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Маршруты для комментариев
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }
    res.json({ message: 'Комментарий успешно удален' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API routes с префиксом /api
app.use('/api', videoRoutes);
app.use('/api', categoriesRouter);
app.use('/api', commentsRouter);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist', 'index.html'));
});

// Запуск сервера с обработкой ошибок
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Порт ${PORT} уже используется`);
  } else {
    console.error('Ошибка запуска сервера:', err);
  }
  process.exit(1);
}); 