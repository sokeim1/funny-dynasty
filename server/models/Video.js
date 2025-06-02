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
    enum: ['barboskiny', 'smeshariki', 'lentyaevo', 'luntik', 'tomandjerry', 'tmnt', 'football', 'toy_story', 'kung_fu_panda'],
    trim: true
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
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
videoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Video = mongoose.model('Video', videoSchema);

export default Video; 