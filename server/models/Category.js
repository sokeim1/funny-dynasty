import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Создаем составной индекс для оптимизации поиска
categorySchema.index({ id: 1, name: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category; 