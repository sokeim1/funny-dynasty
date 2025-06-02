import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: function() {
      // Генерируем id из названия, если оно есть
      if (this.name) {
        return this.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      }
      return 'category-' + new mongoose.Types.ObjectId().toString();
    }
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