
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../feature/patients/patientsSlice";
import styles from "./Management.module.css";

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatDate = (value) => {
  if (!value) return "Date not provided";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

function Management() {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.patients);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAppointments());
  }, [dispatch, status]);

  const confirmedPayments = appointments.filter((appointment) =>
    appointment.status?.toLowerCase() === "confirmed" &&
    Number.isFinite(Number(appointment.paymentAmount))
  );
  const totalBalance = confirmedPayments.reduce(
    (total, appointment) => total + Number(appointment.paymentAmount),
    0
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>DOCTOR ACCOUNT</span>
          <h1>Management</h1>
          <p>Confirmed patient payments and account balance</p>
        </div>
        <span className={styles.accountStatus}><span /> Account active</span>
      </header>

      <section className={styles.summary} aria-label="Doctor account summary">
        <div className={styles.balancePanel}>
          <span className={styles.summaryLabel}>Total confirmed payments</span>
          <strong>{formatMoney(totalBalance)}</strong>
          <span className={styles.balanceNote}>From completed appointment checkouts</span>
        </div>
      </section>

      <section className={styles.transactions} aria-labelledby="payments-heading">
        <div className={styles.sectionHeader}>
          <h2 id="payments-heading">Payment history</h2>
        </div>

        {status === "loading" ? (
          <p className={styles.message}>Loading payment records...</p>
        ) : error ? (
          <p className={styles.message} role="alert">{error}</p>
        ) : confirmedPayments.length === 0 ? (
          <p className={styles.message}>No confirmed payments recorded yet.</p>
        ) : (
          <div className={styles.paymentList}>
            {confirmedPayments.map((appointment) => {
              const personalInfo = appointment.personalInfo || appointment;
              const appointmentInfo = appointment.appointmentInfo || appointment;

              return (
                <article className={styles.paymentRow} key={appointment.id}>
                  <div className={styles.patientInfo}>
                    <strong>{personalInfo.name || appointment.patientUsername || "Patient"}</strong>
                    <span>{formatDate(appointmentInfo.date)} · {appointment.type === "video" ? "Video visit" : "In-person visit"}</span>
                  </div>
                  <span className={styles.confirmedBadge}>Confirmed</span>
                  <strong className={styles.paymentAmount}>
                    {formatMoney(Number(appointment.paymentAmount))}
                  </strong>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default Management