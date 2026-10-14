import styles from "./TimePicker.module.css";
import { isAppointmentSlotBooked } from "../../utils/appointmentSlots";

function TimePicker({
  selectedTime,
  onSelectTime,
  selectedDate,
  visitType,
  appointments,
  availabilityStatus,
  availabilityError,
}) {

  if (!selectedDate) {
    return (
      <div className={styles.timePickerContainer}>
        <h3 className={styles.timePickerTitle}>Select a Time</h3>
        <p className={styles.timeInfo}>Please select a date first.</p>
      </div>
    );
  }


  const dayOfWeek = selectedDate?.getDay();

  if (dayOfWeek === 0) {
    return (
      <div className={styles.timePickerContainer}>
        <h3 className={styles.timePickerTitle}>Select a Time</h3>
        <p className={styles.timeInfo}>The clinic is closed on Sundays.</p>
      </div>
    );
  }

  if (availabilityStatus === "idle" || availabilityStatus === "loading") {
    return (
      <div className={styles.timePickerContainer}>
        <h3 className={styles.timePickerTitle}>Select a Time</h3>
        <p className={styles.timeInfo}>Loading available times…</p>
      </div>
    );
  }

  if (availabilityStatus !== "succeeded") {
    return (
      <div className={styles.timePickerContainer}>
        <h3 className={styles.timePickerTitle}>Select a Time</h3>
        <p className={styles.timeInfo} role="alert">
          {availabilityError || "Unable to load available times. Please try again."}
        </p>
      </div>
    );
  }


  const availableTimes = dayOfWeek === 6
    ? ["09:00", "10:00", "11:00", "12:00", "13:00"]
    : [
        "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00"
      ];


  const filteredTimes =
    dayOfWeek === 6
      ? availableTimes 
      : visitType === "in-person"
      ? availableTimes
      : []; 

  return (
    <div className={styles.timePickerContainer}>
      <h3 className={styles.timePickerTitle}>Select a Time</h3>


      {dayOfWeek === 6 && (
        <p className={styles.timeInfo}>
          Only video consultation is available on Saturdays.
        </p>
      )}

      {dayOfWeek !== 6 && (
        <p className={styles.timeInfo}>
          In-person appointments are available on this day.
        </p>
      )}

      <p className={styles.timeInfo}>Gray times are already reserved for this date.</p>

      <div className={styles.timeGrid}>
        {filteredTimes.length === 0 && (
          <p className={styles.timeInfo}>
            No available time slots for this appointment type.
          </p>
        )}

        {filteredTimes.map((time) => {
          const isBooked = isAppointmentSlotBooked(appointments, {
            date: selectedDate,
            time,
          });

          return (
            <button
              key={time}
              type="button"
              className={`${styles.timeButton} ${
                isBooked ? styles.bookedTime : ""
              } ${selectedTime === time ? styles.selectedTime : ""}`}
              disabled={isBooked}
              aria-label={isBooked ? `${time}, already booked` : time}
              title={isBooked ? "Already booked for this date" : undefined}
              onClick={() => onSelectTime(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimePicker;
