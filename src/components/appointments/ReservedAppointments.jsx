import { useState } from 'react';
import styles from './ReservedAppointments.module.css';
import { getCurrentUser, getUserAppointments } from '../../utils/auth';

const formatAppointmentDate = (value) => {
  if (!value) return 'No date selected';

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

function ReservedAppointments() {
  const [appointments] = useState(() => {
    const currentUser = getCurrentUser();
    return currentUser?.username ? getUserAppointments(currentUser.username) : [];
  });

  return (
    <div className={styles.container}>
      <div className={styles.detailPanel}>
        <div className={styles.detailHeader}>
          <h3>Your Reserved Appointments</h3>
          <span className={styles.infoBadge}>{appointments.length} upcoming</span>
        </div>

        {appointments.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No appointments saved yet.</p>
          </div>
        ) : (
          <div className={styles.list}>
            {appointments.map((appointment) => (
              <div key={appointment.id || `${appointment.date}-${appointment.time}`} className={styles.appointmentCard}>
                <div className={styles.appointmentTop}>
                  <strong>{appointment.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}</strong>
                  <span className={styles.statusBadge}>{appointment.status || 'Confirmed'}</span>
                </div>
                <p className={styles.detailText}>{appointment.type === 'video' ? 'Online appointment' : 'Clinic visit'}</p>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>📅 {formatAppointmentDate(appointment.date)}</span>
                  <span className={styles.metaItem}>⏰ {appointment.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservedAppointments;
