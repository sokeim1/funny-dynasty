import React, { useState, useEffect } from 'react';
import { getComments, addComment, deleteComment } from '../api/comments';
import '../styles/Comments.css';

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await getComments(videoId);
      setComments(fetchedComments);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке комментариев');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const commentData = {
        text: newComment.trim(),
        author: 'Пользователь', // В будущем здесь будет имя авторизованного пользователя
        parentId: replyTo
      };

      const addedComment = await addComment(videoId, commentData);
      setComments(prev => [addedComment, ...prev]);
      setNewComment('');
      setReplyTo(null);
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
      alert('Не удалось добавить комментарий');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот комментарий?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => 
        comment._id !== commentId && comment.parentId !== commentId
      ));
    } catch (err) {
      console.error('Ошибка при удалении комментария:', err);
      alert('Не удалось удалить комментарий');
    }
  };

  const renderComment = (comment) => {
    const replies = comments.filter(c => c.parentId === comment._id);
    const isReply = comment.parentId !== null;

    return (
      <div key={comment._id} className={`comment ${isReply ? 'reply' : ''}`}>
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="comment-text">{comment.text}</div>
        <div className="comment-actions">
          {!isReply && (
            <button 
              className="reply-button"
              onClick={() => setReplyTo(comment._id)}
            >
              Ответить
            </button>
          )}
          <button 
            className="delete-button"
            onClick={() => handleDelete(comment._id)}
          >
            Удалить
          </button>
        </div>
        {replies.length > 0 && (
          <div className="replies">
            {replies.map(reply => renderComment(reply))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="comments-loading">Загрузка комментариев...</div>;
  }

  if (error) {
    return <div className="comments-error">{error}</div>;
  }

  const rootComments = comments.filter(comment => !comment.parentId);

  return (
    <div className="comments-section">
      <h3>Комментарии</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyTo ? "Написать ответ..." : "Написать комментарий..."}
          required
        />
        <div className="form-actions">
          {replyTo && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setReplyTo(null)}
            >
              Отменить
            </button>
          )}
          <button type="submit" className="submit-button">
            {replyTo ? "Ответить" : "Отправить"}
          </button>
        </div>
      </form>

      <div className="comments-list">
        {rootComments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
}

export default Comments; 