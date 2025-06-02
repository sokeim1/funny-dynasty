import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  author: { type: String, default: 'Пользователь' },
  parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema); 