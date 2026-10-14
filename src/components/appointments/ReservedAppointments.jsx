import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ReservedAppointments.module.css';
import { getCurrentUser } from '../../utils/auth';
import { fetchAppointments } from '../../feature/patients/patientsSlice';


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
  const dispatch = useDispatch();
  const { appointments: allAppointments, status, error } = useSelector((state) => state.patients);
  const currentUser = getCurrentUser();
  const username = currentUser?.username?.toLowerCase();
  const appointments = username
    ? allAppointments.filter((appointment) => appointment.patientUsername?.toLowerCase() === username)
    : [];

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAppointments());
  }, [dispatch, status]);

  return (
    <div className={styles.container}>
      <div className={styles.detailPanel}>
        <div className={styles.detailHeader}>
          <h3>Your Reserved Appointments</h3>
          <span className={styles.infoBadge}>{appointments.length} upcoming</span>
        </div>

        {status === 'loading' ? (
          <div className={styles.emptyState}><p>Loading appointments…</p></div>
        ) : error ? (
          <div className={styles.emptyState} role="alert"><p>{error}</p></div>
        ) : appointments.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No appointments saved yet.</p>
          </div>
        ) : (
          <div className={styles.list}>
            {appointments.map((appointment) => {
              const appointmentInfo = appointment.appointmentInfo || appointment;
              const personalInfo = appointment.personalInfo || appointment;

              return (
              <div key={appointment.id || `${appointmentInfo.date}-${appointmentInfo.time}`} className={styles.appointmentCard}>
                <div className={styles.appointmentTop}>
                  <strong>{appointment.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}</strong>
                  <span className={styles.statusBadge}>{appointment.status || 'Confirmed'}</span>
                </div>
                <p className={styles.detailText}>{appointment.type === 'video' ? 'Online appointment' : 'Clinic visit'}</p>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>📅 {formatAppointmentDate(appointmentInfo.date)}</span>
                  <span className={styles.metaItem}>⏰ {appointmentInfo.time}</span>
                </div>
                <div className={styles.patientRow}>
                  <span><strong>Patient:</strong> {personalInfo.name || 'Not provided'}</span>
                  <span><strong>Phone:</strong> {personalInfo.phone || 'Not provided'}</span>
                  <span><strong>Insurance:</strong> {personalInfo.insurance || 'Not provided'}</span>
                  <span><strong>Note:</strong> {personalInfo.note || 'No note added'}</span>
                </div>
                {appointment.type === 'video' && (appointment.meetingLink || personalInfo.meetingLink) && (
                  <a
                    className={styles.videoCallLink}
                    href={appointment.meetingLink || personalInfo.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join video call
                  </a>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservedAppointments;
