import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import styles from './LogoutSection.module.css';

function LogoutSection() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoutCard}>
        <div className={styles.logoutIcon}>🔒</div>
        <h3 className={styles.logoutTitle}>Secure logout</h3>
        <p className={styles.logoutText}>
          Logging out ends your current session only. Your account and previously
          booked appointments will remain saved, and you can sign in again with
          the same username and password.
        </p>

        <div className={styles.buttonRow}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutSection;
