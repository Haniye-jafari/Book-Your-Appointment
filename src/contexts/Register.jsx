import { getUsers, saveUsers } from '../utils/auth.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../layouts/register.module.css';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordHint, setPasswordHint] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const normalizeUsername = (value = '') => value.trim().toLowerCase();

  const validateUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setUsernameError('Username is required');
      return false;
    }
    if (!usernameRegex.test(trimmedValue)) {
      setUsernameError('Use only letters, numbers, dot, underscore or hyphen');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const getPasswordStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    if (score <= 1) {
      return { score, label: 'Weak password', color: '#ef4444' };
    }
    if (score === 2) {
      return { score, label: 'Medium password', color: '#f59e0b' };
    }
    if (score === 3) {
      return { score, label: 'Strong password', color: '#22c55e' };
    }
    return { score, label: 'Very strong password', color: '#16a34a' };
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    const strength = getPasswordStrength(value);
    setPasswordStrength(strength.score);
    setPasswordHint(strength.label);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const normalizedUsername = normalizeUsername(trimmedUsername);
    const trimmedEmail = email.trim().toLowerCase();
  

    if (!validateUsername(trimmedUsername)) {
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const users = getUsers();
    const safeUsers = Array.isArray(users) ? users : [];
    const existUser = safeUsers.find((user) => {
      const storedUsername = normalizeUsername(user.username || '');
      return storedUsername === normalizedUsername || user.email?.toLowerCase() === trimmedEmail;
    });

    if (existUser) {
      setError('This email or username is already registered');
      return;
    }

    const newUser = {
      email: trimmedEmail,
      username: trimmedUsername,
      password,
    };

    const updatedUsers = [...safeUsers, newUser];
    saveUsers(updatedUsers);
    navigate('/login');
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={styles.input} type="text" placeholder="Username" value={username} onChange={(e) => {
        setUsername(e.target.value);
        validateUsername(e.target.value);
      }} />
      {usernameError && <p className={styles.error}>{usernameError}</p>}

      <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
      {password && (
        <div className={styles.passwordMeter}>
          <div className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{ width: `${(passwordStrength / 4) * 100}%`, backgroundColor: passwordStrength >= 3 ? '#22c55e' : passwordStrength === 2 ? '#f59e0b' : '#ef4444' }}
            />
          </div>
          <p className={styles.passwordHint}>{passwordHint}</p>
        </div>
      )}

      <input className={styles.input} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.submitButton} type="submit">Register</button>
      <Link className={styles.link} to="/login">Already have an account?</Link>
    </form>
  );
}

export default Register;