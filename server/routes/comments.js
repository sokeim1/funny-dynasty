import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Получить все комментарии для видео
router.get('/videos/:videoId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавить новый комментарий
router.post('/videos/:videoId/comments', async (req, res) => {
  try {
    const { text, author, parentId } = req.body;
    const comment = new Comment({
      videoId: req.params.videoId,
      text,
      author,
      parentId
    });
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удалить комментарий
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }
    
    // Удаляем комментарий и все ответы на него
    await Comment.deleteMany({
      $or: [
        { _id: req.params.commentId },
        { parentId: req.params.commentId }
      ]
    });
    
    res.json({ message: 'Комментарий удален' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 