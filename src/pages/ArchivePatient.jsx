import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchAppointments } from "../feature/patients/patientsSlice";
import styles from "./ArchivePatient.module.css";

const formatLocalDate = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, "0"),
  String(date.getDate()).padStart(2, "0"),
].join("-");

const getDateSixMonthsAgo = (date) => {
  const month = date.getMonth() - 6;
  const lastDayOfTargetMonth = new Date(date.getFullYear(), month + 1, 0).getDate();

  return new Date(
    date.getFullYear(),
    month,
    Math.min(date.getDate(), lastDayOfTargetMonth),
  );
};

const formatAppointmentDate = (value) => new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date(`${value}T00:00:00`));

function ArchivePatient() {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.patients);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = getDateSixMonthsAgo(today);
  const selectedDateString = formatLocalDate(selectedDate);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAppointments());
  }, [dispatch, status]);

  const appointmentsForSelectedDate = appointments
    .map((appointment) => ({
      ...appointment,
      appointmentInfo: appointment.appointmentInfo || appointment,
      personalInfo: appointment.personalInfo || appointment,
    }))
    .filter(({ appointmentInfo }) => appointmentInfo.date === selectedDateString)
    .sort((first, second) => (first.appointmentInfo.time || "").localeCompare(second.appointmentInfo.time || ""));

  const bookedDates = useMemo(
    () => new Set(appointments.map((appointment) => (
      appointment.appointmentInfo || appointment
    )).map(({ date }) => date).filter(Boolean)),
    [appointments],
  );

  return (
    <section className={styles.archive} aria-labelledby="archive-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>PATIENT RECORDS</span>
          <h2 id="archive-title">Appointment archive</h2>
          <p>Select a date to view its booked appointments from the last six months.</p>
        </div>
        <span className={styles.dateRange}>Last 6 months · through today</span>
      </header>

      <div className={styles.archiveGrid}>
        <div className={styles.calendarPanel}>
          <Calendar
            aria-label="Appointment archive calendar"
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={minDate}
            maxDate={today}
            maxDetail="month"
            minDetail="month"
            locale="en-US"
            tileContent={({ date, view }) => (
              view === "month" && bookedDates.has(formatLocalDate(date))
                ? <span className={styles.appointmentDot} aria-label="Appointments booked" />
                : null
            )}
          />
          <p className={styles.calendarLegend}>
            <span className={styles.appointmentDot} aria-hidden="true" />
            Days with booked appointments
          </p>
        </div>

        <section className={styles.appointmentsPanel} aria-live="polite">
          <div className={styles.appointmentsHeader}>
            <div>
              <span className={styles.eyebrow}>SELECTED DAY</span>
              <h3>{formatAppointmentDate(selectedDateString)}</h3>
            </div>
            <span className={styles.countBadge}>
              {appointmentsForSelectedDate.length} {appointmentsForSelectedDate.length === 1 ? "patient" : "patients"}
            </span>
          </div>

          {status === "idle" || status === "loading" ? (
            <p className={styles.emptyState}>Loading appointments...</p>
          ) : error ? (
            <p className={styles.emptyState} role="alert">{error}</p>
          ) : appointmentsForSelectedDate.length === 0 ? (
            <p className={styles.emptyState}>No appointments are booked for this day.</p>
          ) : (
            <div className={styles.patientList}>
              {appointmentsForSelectedDate.map((appointment, index) => {
                const { personalInfo, appointmentInfo } = appointment;

                return (
                  <article
                    className={styles.patientCard}
                    key={appointment.id || `${appointmentInfo.date}-${appointmentInfo.time}-${index}`}
                  >
                    <div className={styles.patientHeader}>
                      <strong>{personalInfo.name || appointment.patientUsername || "Patient details unavailable"}</strong>
                      <span className={styles.statusBadge}>{appointment.status || "Confirmed"}</span>
                    </div>
                    <div className={styles.patientDetails}>
                      <span><strong>Time:</strong> {appointmentInfo.time || "Not provided"}</span>
                      <span><strong>Visit:</strong> {appointment.type === "video" ? "Video consultation" : "In-person visit"}</span>
                      <span><strong>Phone:</strong> {personalInfo.phone || "Not provided"}</span>
                      {personalInfo.insurance && (
                        <span><strong>Insurance:</strong> {personalInfo.insurance}</span>
                      )}
                      {personalInfo.note && (
                        <span className={styles.patientNote}><strong>Note:</strong> {personalInfo.note}</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default ArchivePatient;
