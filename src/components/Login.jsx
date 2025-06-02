import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'sokeim' && password === '2355789') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Неверные учетные данные');
    }
  };

  return (
    <div style={{ 
      maxWidth: '300px', 
      margin: '20px auto', 
      padding: '20px',
      backgroundColor: '#2a2a2a',
      borderRadius: '8px'
    }}>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#3a3a3a',
              border: '1px solid #444',
              color: 'white',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#3a3a3a',
              border: '1px solid #444',
              color: 'white',
              borderRadius: '4px'
            }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login; 