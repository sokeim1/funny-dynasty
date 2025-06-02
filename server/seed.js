import mongoose from 'mongoose';
import Video from './models/Video.js';

const MONGODB_URI = 'mongodb://mongo:BhQCjOILatzKbeKXZsnuZmGNAdonJzSA@interchange.proxy.rlwy.net:12384';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB успешно подключена');

    // Очищаем существующие данные
    await Video.deleteMany({});
    console.log('Существующие видео удалены');

    console.log('База данных успешно очищена');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при очистке базы данных:', error);
    process.exit(1);
  }
}

seedDatabase(); 