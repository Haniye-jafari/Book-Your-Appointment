

import styles from './Services.module.css';

function Services() {
  const services = [
    {
      icon: '🩺',
      title: 'Medical Monitoring & Consultation',
      text: 'Here, you can benefit from consultations with specialized doctors and receive careful guidance to maintain your health.'
    },
    {
      icon: '📅',
      title: 'Fast Appointment Booking',
      text: 'Online appointment booking is simple and hassle-free, allowing you to access the care you need in the shortest time possible.'
    },
    {
      icon: '💙',
      title: 'Full Insurance Support',
      text: 'We provide the information and guidance you need regarding insurance coverage to make your treatment process easier.'
    },
    {
      icon: '🧑‍⚕️',
      title: 'Experienced Medical Team',
      text: 'Access experienced specialists across different medical fields for accurate and professional care.'
    }
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Services</h1>
        <p className={styles.heroText}>
          We strive to offer you a smooth, fast, and reliable healthcare experience. From appointment booking to medical support, everything is designed with your comfort in mind.
        </p>
      </section>

      <section className={styles.grid}>
        {services.map((service) => (
          <article key={service.title} className={styles.card}>
            <div className={styles.icon}>{service.icon}</div>
            <h2 className={styles.cardTitle}>{service.title}</h2>
            <p className={styles.cardText}>{service.text}</p>
          </article>
        ))}
      </section>

      <a href="/" className={styles.cta}>Back to Home</a>
    </div>
  );
}

export default Services;