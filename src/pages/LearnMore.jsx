import { Link } from "react-router-dom";
import Styles from "./LearnMore.module.css";

function LearnMore() {
  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <section className={Styles.hero}>
          <h1>Exceptional Care for Every Stage of Life</h1>
          <p>
            Our medical team combines advanced technology, compassionate care,
            and personalized treatment plans to help you feel better and live
            healthier with confidence.
          </p>
          <div className={Styles.actions}>
            <Link to="/appointments" className={`${Styles.button} ${Styles.primary}`}>
              Book an Appointment
            </Link>
            <Link to="/about-us" className={`${Styles.button} ${Styles.secondary}`}>
              Meet Our Team
            </Link>
          </div>
        </section>

        <section className={Styles.grid}>
          <article className={Styles.card}>
            <h3>24/7 Support</h3>
            <p>Fast, reliable assistance whenever you need medical guidance.</p>
          </article>
          <article className={Styles.card}>
            <h3>Expert Doctors</h3>
            <p>Experienced specialists focused on your comfort and recovery.</p>
          </article>
          <article className={Styles.card}>
            <h3>Modern Facilities</h3>
            <p>Comfortable spaces equipped with the latest healthcare technology.</p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default LearnMore;