import { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import TimePicker from "./TimePicker";
import styles from "./DateTimeStep.module.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function DateTimeStep({ onNext, onBack, visitType }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext();
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
        />
      </div>

      
      <div className={styles.navigationButtons}>
        <button
          type="button"
          className={styles.nextButton}
          disabled={!selectedDate || !selectedTime}
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
