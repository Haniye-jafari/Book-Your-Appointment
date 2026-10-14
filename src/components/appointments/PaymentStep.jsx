
import { useState } from 'react';
import styles from './PaymentStep.module.css';

function PaymentStep({ onNext, isSaving }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div className={styles.container}>
      <div><span className={styles.kicker}>CHECKOUT</span><h3>Complete your booking</h3><p>Your payment details are encrypted and never stored on this device.</p><div className={styles.summary}><span>Consultation fee</span><strong>$45.00</strong></div></div>
      <div className={styles.form}><label>Card number<input inputMode="numeric" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="1234 5678 9012 3456" /></label><div className={styles.row}><label>Expiry<input value={expiry} onChange={(event) => setExpiry(event.target.value)} placeholder="MM / YY" /></label><label>CVC<input value={cvc} onChange={(event) => setCvc(event.target.value)} placeholder="123" /></label></div><button type="button" onClick={onNext} disabled={!cardNumber || !expiry || !cvc || isSaving}>{isSaving ? 'Saving appointment…' : 'Pay & confirm appointment'}</button></div>
    </div>
  )
}

export default PaymentStep