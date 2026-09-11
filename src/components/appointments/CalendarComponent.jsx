import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarComponent.module.css";
import { useState } from "react";

function CalendarComponent({ selectedDate, onSelectDate }) {
  const [date, setDate] = useState(selectedDate);

  const handleDateChange = (nextDate) => {
    setDate(nextDate);
    onSelectDate(nextDate);
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />

      {date && <p>You selected: {date.toDateString()}</p>}
    </div>
  );
}

export default CalendarComponent;
