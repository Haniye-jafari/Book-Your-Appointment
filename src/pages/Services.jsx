import styles from './Services.module.css';

import Calendar from "../components/icons/calender.svg";
import hospital from "../components/icons/hospital.svg";
import nurse from "../components/icons/nurse.svg"
import heart from "../components/icons/heart.svg";

function Services() {
  const services = [
    {
      icon: heart,
      title: 'Medical Monitoring & Consultation',
      text: 'Here, you can benefit from consultations with specialized doctors and receive careful guidance to maintain your health.'
    },
    {
      icon: Calendar,
      title: 'Fast Appointment Booking',
      text: 'Online appointment booking allows you to access medical services in the shortest possible time. You can also take advantage of video call options, so book your appointment as soon as possible...'
    },
    {
      icon: hospital,
      title: 'Full Insurance Support',
      text: 'We provide the information and guidance you need regarding insurance coverage to make your treatment process easier.'
    },
    {
      icon: nurse,
      title: 'Experienced Medical Team',
      text: 'Access experienced specialists across different medical fields for accurate and professional care.'
    }
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Services</h1>

        <p className={styles.heroText}>
          We strive to offer you a smooth, fast, and reliable healthcare experience.
          From appointment booking to medical support, everything is designed with
          your comfort in mind.
        </p>
      </section>

      <section className={styles.grid}>
        {services.map((service) => (
          <article key={service.title} className={styles.card}>

            <div className={styles.cardHeading}>
             
                <img
                  src={service.icon}
                  alt=""
                  className={styles.icon}
                />
        

              <h2 className={styles.cardTitle}>
                {service.title}
              </h2>
            </div>

            <p className={styles.cardText}>
              {service.text}
            </p>

          </article>
       ) )}
      </section>

      <a href="/" className={styles.cta}>
        Back to Home
      </a>
    </div>
  );
}

export default Services;
