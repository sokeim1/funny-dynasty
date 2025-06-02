import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import videoRoutes from './routes/videos.js';
import categoriesRouter from './routes/categories.js';
import commentsRouter from './routes/comments.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../dist')));

// MongoDB connection
const MONGODB_URI = 'mongodb://mongo:BhQCjOILatzKbeKXZsnuZmGNAdonJzSA@interchange.proxy.rlwy.net:12384';

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