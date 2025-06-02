import mongoose from 'mongoose';
import Video from './models/Video.js';
<<<<<<< HEAD
import Category from './models/Category.js';
import { MONGODB_URI } from './config.js';

const initialCategories = [
  { name: 'Смешное' },
  { name: 'Неудачи' },
  { name: 'Животные' },
  { name: 'Лунтик' },
  { name: 'Другое' }
];

const initialVideos = [
  {
    title: 'История игрушек',
    video_url: 'https://www.youtube.com/watch?v=example1',
    category: 'other'
  },
  {
    title: 'Чебурашка',
    video_url: 'https://www.youtube.com/watch?v=example2',
    category: 'other'
  },
  {
    title: 'Футбол',
    video_url: 'https://www.youtube.com/watch?v=example3',
    category: 'other'
  },
  {
    title: 'Лунтик',
    video_url: 'https://www.youtube.com/watch?v=example4',
    category: 'luntik'
  }
];
=======

const MONGODB_URI = 'mongodb://mongo:BhQCjOILatzKbeKXZsnuZmGNAdonJzSA@interchange.proxy.rlwy.net:12384';
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB успешно подключена');

    // Очищаем существующие данные
<<<<<<< HEAD
    await Promise.all([
      Category.deleteMany({}),
      Video.deleteMany({})
    ]);
    console.log('База данных очищена');

    // Добавляем категории
    const createdCategories = await Category.insertMany(initialCategories);
    console.log('Категории добавлены:', createdCategories.map(cat => cat.name).join(', '));

    // Добавляем видео
    const videos = initialVideos.map(video => ({
      ...video,
      category: createdCategories.find(cat => 
        cat.name.toLowerCase() === video.category || 
        cat.id === video.category
      )?.id || createdCategories.find(cat => cat.name === 'Другое').id
    }));

    const createdVideos = await Video.insertMany(videos);
    console.log('Видео добавлены:', createdVideos.map(video => video.title).join(', '));

    console.log('База данных успешно заполнена');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
=======
    await Video.deleteMany({});
    console.log('Существующие видео удалены');

    console.log('База данных успешно очищена');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при очистке базы данных:', error);
>>>>>>> 5c8780ed4f7592e737fd42210e46f8666155e80c
    process.exit(1);
  }
}

seedDatabase(); 