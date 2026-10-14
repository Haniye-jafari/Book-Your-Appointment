import { useState } from "react";
import styles from "./InPersonAppointment.module.css";
import insuranceOptions from "./insuranceOptions";
import { useDispatch } from "react-redux";
import { setPersonalInfo } from "../../feature/patients/patientFormSlice";

function InPersonAppointment({ onNext, onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [insurance, setInsurance] = useState("");
  const [insuranceMenuOpen, setInsuranceMenuOpen] = useState(false);
  const [note, setNote] = useState("");
  const [noteSubmitted, setNoteSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!note) return;

    setNoteSubmitted(true);
  };

  const handleNext = () => {
    if (!name || !phone) return;
    dispatch(
      setPersonalInfo({
        name,
        phone,
        insurance,
        note,
      })
    )
    onNext({ name, phone, insurance, note })
  
  }

  const handleInsuranceSelect = (selectedInsurance) => {
    setInsurance(selectedInsurance);
    setInsuranceMenuOpen(false);
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

        <div className={styles.fieldGroup}>
          <span className={styles.label}>Insurance provider</span>
          <div className={styles.selectWrapper}>
            <button
              type="button"
              className={`${styles.selectButton} ${insurance ? styles.selectButtonSelected : ""}`}
              onClick={() => setInsuranceMenuOpen((open) => !open)}
              aria-expanded={insuranceMenuOpen}
            >
              <span>{insurance || "Select insurance provider"}</span>
              <span className={`${styles.chevron} ${insuranceMenuOpen ? styles.chevronOpen : ""}`}>
                ⌃
              </span>
            </button>

            {insuranceMenuOpen && (
              <div className={styles.dropdownMenu} role="listbox" aria-label="Insurance providers">
                {insuranceOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => handleInsuranceSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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