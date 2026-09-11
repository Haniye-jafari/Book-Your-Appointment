import { useState } from "react";
import styles from "./InPersonAppointment.module.css";

function InPersonAppointment({ onNext, onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [noteSubmitted, setNoteSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!note) return;

   
    setNoteSubmitted(true);
  };

  const handleNext = () => {
    if (!name || !phone) 
      return;
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.kicker}>Appointment details</span>
        <h3 className={styles.title}>In-person consultation</h3>
        <p className={styles.subtitle}>
          Share your contact details and any notes for the clinic team.
        </p>
      </div>

      <div className={styles.formGrid}>
        <label className={styles.fieldGroup}>
          <span className={styles.label}>Full name</span>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={styles.fieldGroup}>
          <span className={styles.label}>Phone number</span>
          <input
            type="tel"
            className={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label className={styles.fieldGroup}>
          <span className={styles.label}>Additional note</span>
          <textarea
            className={styles.textarea}
            placeholder="Anything the doctor should know?"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteSubmitted(false);
            }}
          />
        </label>
      </div>

      <div className={styles.footer}>
        <span className={styles.hint}>We’ll confirm your visit by phone.</span>

        <button
          type="button"
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={!note || noteSubmitted}
        >
          Submit Message
        </button>
      </div>

      <div className={styles.navigationButtons}>
        <button
          type="button"
          className={styles.nextButton}
          onClick={handleNext}
          disabled={!name || !phone}
        >
          Next
        </button>

        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default InPersonAppointment;