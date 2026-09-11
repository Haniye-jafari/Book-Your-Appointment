import styles from './LogoutSection.module.css';

function LogoutSection() {
  return (
    <div className={styles.container}>
      <div className={styles.logoutCard}>
        <div className={styles.logoutIcon}>🔒</div>
        <h3 className={styles.logoutTitle}>Secure logout</h3>
        <p className={styles.logoutText}>Please log out to keep your account secure and protect your personal health information.</p>

        <div className={styles.buttonRow}>
          <button className={styles.primaryButton}>Logout</button>
          <button className={styles.secondaryButton}>Stay signed in</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutSection;
