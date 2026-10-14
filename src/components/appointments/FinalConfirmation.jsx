
import styles from './FinalConfirmation.module.css';

function FinalConfirmation({ onReset }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>✓</div>
      <h3>Your appointment is confirmed</h3>
      <p>We have reserved your time with the care team. A confirmation has been sent to your phone.</p>
    <div className={styles.details}>
      <span>Confirmation number</span>
    <strong>CC-2048-91</strong>
    </div>
    <button type="button" onClick={onReset}>Book another appointment</button>
    
    </div>
  )
}

export default FinalConfirmation