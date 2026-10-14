import styles from './AboutUs.module.css';
import MedicalTeam from "../assets/MedicalTeam.png"
import phone from "../components/icons/phone.svg"
import calender from "../components/icons/calender.svg"
import hospital from "../components/icons/hospital.svg"
function AboutUs() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.imageArea}>
          <div className={styles.imagePlaceholder}>
              <img src={MedicalTeam} alt="MedicalTeam" />
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.description}>
            Our medical team is dedicated to providing compassionate, high-quality care in a welcoming environment.
            We believe that every patient deserves personalized attention, clear communication, and trusted treatment.
            With a focus on excellence and comfort, our clinic is committed to supporting your health journey every step of the way.
          </p>

          <div className={styles.infoGrid}>

            <div className={styles.infoBox}>
              <div className={styles.clinic}>
                  <img src={hospital} alt="hospital" />
              <h2>Clinic Address</h2> 
              </div>
           
              <p>12 Greenfield Road, London, United Kingdom</p>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.contactHeader}>
                 <img src={phone} alt="phone" />
                 <h2 >Contact</h2>
              </div>
              <p>Phone: +44 20 5555 0142</p>
            </div>
          </div>

          <div className={styles.hoursBox}>
            <div className={styles.calender}>
            <img src={calender} alt="calender" />
              <h2>Clinic Hours</h2>
             
            </div>
            
             <ul>
              <li>Monday to Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;