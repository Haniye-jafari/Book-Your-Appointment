import { NavLink, useNavigate } from 'react-router-dom';
import StethoscopeIcon from '../components/icons/StethoscopeIcon';
import { useAuth } from '../contexts/AuthContext';
import styles from '../layouts/navbar.module.css';

function Navbar() {
  const navigate = useNavigate();
  const { authStatus, logout } = useAuth();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleDashboard = () => navigate('/patient/dashboard');

  return (
    <nav className="navbar">
      <div className={styles.navbar}>
        <StethoscopeIcon className={styles.Stethoscope} />
        <li className={styles.li}><NavLink to="/" className={styles.link}>Home</NavLink></li>
        <li className={styles.li}><NavLink to="/about-us" className={styles.link}>About Us</NavLink></li>
        <li className={styles.li}><NavLink to="/blog" className={styles.link}>Blog</NavLink></li>

        {authStatus === 'guest' ? (
          <>
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleRegister}>Register</button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleDashboard}>Dashboard</button>
            <button type="button" onClick={logout}>Logout</button>
          </>
        ) 
        } 
      </div>
    </nav>
  );
}

export default Navbar;