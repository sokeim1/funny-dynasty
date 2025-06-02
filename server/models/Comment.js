import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  videoId: mongoose.Schema.Types.ObjectId,
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema); 