
import ConsultationImg from "../../assets/Consultation.png";
import VideoCall from "../../assets/VideoCall.png";

import styles from './VisitTypeSelector.module.css';



function VisitTypeSelector({ onSelect }) {
  const optionHandler = (type) => {
   onSelect(type)
};
  return (
    <div className={styles.container}>
      <div className={styles.selectionGrid}>
        <div className={styles.optionCard}>
          <div className={styles.optionImageWrap}>
            <img
              className={styles.optionImage}
              src={ConsultationImg}
              alt="Consultation"
            />
          </div>

          <div>
            <button
              type="button"
              className={styles.optionLabel}
              onClick={() => optionHandler("in-person")}
            >
              In-Person Visit
            </button>
          </div>
        </div>

        <div className={styles.optionCard}>
          <div className={styles.optionImageWrap}>
            <img
              className={styles.optionImage}
              src={VideoCall}
              alt="Video"
            />
          </div>

          <div>
            <button
              type="button"
              className={styles.optionLabel}
              onClick={() => optionHandler("video")}
            >
              Online Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitTypeSelector;