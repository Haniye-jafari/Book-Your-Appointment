import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../utils/auth.js';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const normalizeUsername = (value = '') => value.trim().toLowerCase();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const users = getUsers();
    const safeUsers = Array.isArray(users) ? users : [];
    const normalizedUsername = normalizeUsername(username);
    const foundUser = safeUsers.find((user) => {
      const storedUsername = normalizeUsername(user.username || '');
      const storedEmail = normalizeUsername(user.email || '');
      return storedUsername === normalizedUsername || storedEmail === normalizedUsername;
    });

    if (!foundUser) {
      setError('This username does not exist');
      return;
    }

    if (foundUser.password !== password) {
      setError('Password is incorrect');
      return;
    }

    if (onLogin) {
      onLogin({ username: foundUser.username, password });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;