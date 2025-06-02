import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    index: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  parentId: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Обновляем updatedAt перед сохранением
commentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment; 