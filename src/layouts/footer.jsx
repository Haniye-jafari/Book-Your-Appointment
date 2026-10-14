import styles from "./footer.module.css"
import instagramIcon  from "../components/icons/instagramIcon.svg"
import Telegram from "../components/icons/Telegram.svg"
import FaceBook from "../components/icons/FaceBook.svg"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
function Footer() {
    const { authStatus } = useAuth();
    const appointmentPath = authStatus === "loggedIn" ? "/appointments" : "/register";
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.appointment}>
          <h1 className={styles.title}>Book Your Appointments</h1>
          <Link to={appointmentPath}>
            <p>Appointment</p>
          </Link>
        </div>

        <div className={styles.Location}>
          <h1 className={styles.title}>Location</h1>
          <p>12 Greenfield Road, London, United Kingdom</p>
        </div>

        <div className={styles.contactUs}>
          <h1 className={styles.title}>Contact Us</h1>
          <p>Phone Namber:+44 20 5555 0142</p>
        </div>

        <div className={styles.Follow}>
          <h1 className={styles.title}>Follow Us</h1>
          <div className={styles.icons}>
            <img src={instagramIcon} alt="instagram" className={styles.img} />
            <img src={Telegram} alt="Telegram" className={styles.img} />
            <img src={FaceBook} alt="FaceBook" className={styles.img} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;