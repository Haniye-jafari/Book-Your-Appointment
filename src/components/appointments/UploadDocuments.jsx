import styles from './UploadDocuments.module.css';

function UploadDocuments() {
  return (
    <div className={styles.container}>
      <div className={styles.detailPanel}>
        <div className={styles.detailHeader}>
          <h3>Upload Your Medical Documents</h3>
          <span className={styles.infoBadge}>Secure upload</span>
        </div>

        <div className={styles.uploadBox}>
          <div className={styles.optionIcon}>📤</div>
          <strong>Drag & drop your files here</strong>
          <p>Accepted formats: PDF, JPG, PNG, DOC. Keep your insurance card and prescriptions ready.</p>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Document type</label>
            <select className={styles.fieldSelect} defaultValue="">
              <option value="" disabled>Select an option</option>
              <option>Insurance Card</option>
              <option>Prescription</option>
              <option>Medical Record</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Upload date</label>
            <input className={styles.fieldInput} type="date" />
          </div>
        </div>

        <div className={styles.field} style={{ marginTop: '18px' }}>
          <label className={styles.fieldLabel}>Notes</label>
          <textarea className={styles.textarea} placeholder="Add any additional details for the medical team..." />
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.primaryButton}>Upload Documents</button>
          <button className={styles.secondaryButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocuments;
