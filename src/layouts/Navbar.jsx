import { NavLink, useNavigate } from 'react-router-dom';
import StethoscopeIcon from '../components/icons/StethoscopeIcon';
import { useAuth } from '../contexts/useAuth';
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
      <button type="button" onClick={() => navigate('/doctor/login')} className={styles.stethbutton}>
        <StethoscopeIcon className={styles.Stethoscope} />
      </button>
        
        <div className={styles.link}>
          <li className={styles.li}>
          <NavLink to="/" className={styles.Home}>Home</NavLink>
          </li>
        <li className={styles.li}>
          <NavLink to="/about-us" className={styles.AboutUs}>About Us</NavLink>
          </li>
          <li  className={styles.li}> 
          <NavLink to="/services"  className={styles.Services}>Services</NavLink>
          </li>
        <li className={styles.li}>
          <NavLink to="/blog" className={styles.Blog}>Blog</NavLink>
          </li>
        </div>

        {authStatus === 'guest' ? (
          <>
            <button type="button" onClick={handleLogin} className={styles.Login}>Login</button>
            <button type="button" onClick={handleRegister}  className={styles.Register}>Register</button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleDashboard}  className={styles.Dashboard}>Dashboard</button>
            <button type="button" onClick={logout}  className={styles.Logout}>Logout</button>
          </>
        ) 
        } 
      </div>
    </nav>
  );
}

export default Navbar;