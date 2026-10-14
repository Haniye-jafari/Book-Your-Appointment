import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DoctorDashboard.module.css";
import { fetchAppointments } from "../feature/patients/patientsSlice";

const getLocalDateString = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, "0"),
  String(date.getDate()).padStart(2, "0"),
].join("-");

const getTimeInMinutes = (value = "") => {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return Number.POSITIVE_INFINITY;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem) {
    hours %= 12;
    if (meridiem === "PM") hours += 12;
  }

  return hours * 60 + minutes;
};

const getDaysUntil = (date, today) => {
  const [year, month, day] = date.split("-").map(Number);
  const [todayYear, todayMonth, todayDay] = today.split("-").map(Number);
  const appointmentDay = Date.UTC(year, month - 1, day);
  const currentDay = Date.UTC(todayYear, todayMonth - 1, todayDay);
  return Math.round((appointmentDay - currentDay) / 86400000);
};

const formatAppointmentDate = (value) => new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(`${value}T00:00:00`));

function TodayPatients() {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const today = getLocalDateString(new Date());
  const upcomingAppointments = appointments
    .map((appointment) => ({
      ...appointment,
      appointmentInfo: appointment.appointmentInfo || appointment,
      personalInfo: appointment.personalInfo || appointment,
    }))
    .filter(({ appointmentInfo }) => {
      const date = appointmentInfo.date;
      return date && /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= today;
    })
    .sort((first, second) => {
      const dateOrder = first.appointmentInfo.date.localeCompare(second.appointmentInfo.date);
      if (dateOrder !== 0) return dateOrder;
      return getTimeInMinutes(first.appointmentInfo.time) - getTimeInMinutes(second.appointmentInfo.time);
    });

  return (
    <div className={styles.patientsPage}>
      <div className={styles.patientsHeader}>
        <h2>Upcoming Appointments</h2>
        <span>
          {upcomingAppointments.length}{" "}
          {upcomingAppointments.length === 1 ? "appointment" : "appointments"}
        </span>
      </div>

      {status === "loading" ? (
        <p className={styles.emptyPatients}>Loading appointments...</p>
      ) : error ? (
        <p className={styles.emptyPatients} role="alert">{error}</p>
      ) : upcomingAppointments.length === 0 ? (
        <p className={styles.emptyPatients}>No appointments are scheduled from today onward.</p>
      ) : (
        <div className={styles.patientList}>
          {upcomingAppointments.map((appointment) => {
            const { appointmentInfo, personalInfo } = appointment;
            const daysUntil = getDaysUntil(appointmentInfo.date, today);
            const countdown = daysUntil === 0
              ? "Today"
              : daysUntil === 1
                ? "Tomorrow"
                : `In ${daysUntil} days`;

            return (
            <article className={styles.patientRow} key={appointment.id}>
              <div className={styles.patientIdentity}>
                <strong>{personalInfo.name || appointment.patientUsername || "Patient details unavailable"}</strong>
                <span>{personalInfo.phone || appointment.phone || "Phone not provided"}</span>
              </div>

              <div className={styles.patientDetail}>
                <span>Date &amp; time</span>
                <strong>
                  {formatAppointmentDate(appointmentInfo.date)} · {appointmentInfo.time || "Time not provided"}
                </strong>
                <span className={styles.appointmentCountdown}>{countdown}</span>
              </div>

              <div className={styles.patientDetail}>
                <span>Visit type</span>
                <strong>
                  {appointment.type === "video" ? "Video" : "In person"}
                </strong>
              </div>

              <div className={styles.patientDetail}>
                <span>Status</span>
                <strong>{appointment.status || "Confirmed"}</strong>
              </div>

              {(appointment.documents || personalInfo.documents)?.length > 0 && (
                <p className={styles.patientNote}>Documents uploaded</p>
              )}
              {appointment.type === "video" && (appointment.meetingLink || personalInfo.meetingLink) && (
                <a
                  className={styles.videoCallLink}
                  href={appointment.meetingLink || personalInfo.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join video call
                </a>
              )}
            </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TodayPatients;
