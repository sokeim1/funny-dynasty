import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  video_url: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: String,
    required: true
  }],
  views: {
    type: Number,
    default: 0
  },
  thumbnail: String,
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
videoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Video', videoSchema); 