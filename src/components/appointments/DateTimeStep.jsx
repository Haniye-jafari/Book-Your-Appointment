import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarComponent from "./CalendarComponent";
import TimePicker from "./TimePicker";
import styles from "./DateTimeStep.module.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { setAppointmentInfo } from "../../feature/patients/patientFormSlice";
import { fetchAppointments } from "../../feature/patients/patientsSlice";


function DateTimeStep({ onNext, onBack, visitType }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleNext = () => {
    if (selectedDate && selectedTime && status === "succeeded") {
      const appointmentInfo = {
        date: [
        selectedDate.getFullYear(),
        String(selectedDate.getMonth() + 1).padStart(2, "0"),
        String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-"),
        time: selectedTime,
      };

      dispatch(setAppointmentInfo(appointmentInfo));
      onNext(appointmentInfo);
    }
  };

  return (
    <div className={styles.dateTimeContainer}>
      <div className={styles.animationWrap}>
                <DotLottieReact
                  src="https://lottie.host/4c8899e8-bcc9-4153-8bd9-2617573500f5/mSc9sLFvYl.lottie"
                  loop
                  autoplay
                />
              </div>
      <div className={styles.dateTimeGrid}>
        <CalendarComponent
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
        />

        <TimePicker
          selectedTime={selectedTime}
          onSelectTime={(time) => setSelectedTime(time)}
          selectedDate={selectedDate}
          visitType={visitType}
          appointments={appointments}
          availabilityStatus={status}
          availabilityError={error}
        />
      </div>

      
      <div className={styles.navigationButtons}>
        <button
          type="button"
          className={styles.nextButton}
          disabled={!selectedDate || !selectedTime || status !== "succeeded"}
          onClick={handleNext}
        >
          Next
        </button>

        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default DateTimeStep;
