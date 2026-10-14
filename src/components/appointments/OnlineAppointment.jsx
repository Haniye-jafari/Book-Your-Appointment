

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OnlineAppointment.module.css';
import VisitTypeSelector from './VisitTypeSelector';
import DateTimeStep from './DateTimeStep';
import UploadDocuments from './UploadDocuments';
import InPersonAppointment from './InPersonAppointment';
import VideoAppointment from './VideoAppointment';
import PaymentStep from "./PaymentStep"
import FinalConfirmation from "./FinalConfirmation"
import { getCurrentUser } from '../../utils/auth';
import { addAppointment } from '../../feature/patients/patientsSlice';
import { resetPatientForm, setDocuments } from '../../feature/patients/patientFormSlice';
import { APPOINTMENT_SLOT_TAKEN_ERROR } from '../../utils/appointmentSlots';
import logo from '../../assets/logo.png';


function OnlineAppointment() {
  const [visitType, setVisitType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const { personalInfo, appointmentInfo, documents } = useSelector((state) => state.patientForm);
  const { saveStatus, error } = useSelector((state) => state.patients);
  const stepLabels = ['Visit type', 'Date & time', 'Your details', 'Payment'];
  const activeStep = currentStep === 6 ? 4 : currentStep;
  const resetAppointment = () => {
    setVisitType(null);
    setCurrentStep(1);
    dispatch(resetPatientForm());
   
  };

  const saveAppointment = async () => {
    const currentUser = getCurrentUser();
    const appointment = {
      appointmentInfo: appointmentInfo,
      personalInfo: personalInfo,
      documents,
      type: visitType,
      meetingLink: visitType === 'video' ? personalInfo.meetingLink : null,
      status: 'Confirmed',
      paymentAmount: 45,
      paymentCurrency: 'USD',
      confirmedAt: new Date().toISOString(),
      patientUsername: currentUser?.username || null,
  
    };
   
    const result = await dispatch(addAppointment(appointment));
    if (addAppointment.fulfilled.match(result)) {
      dispatch(resetPatientForm());
      setCurrentStep(6);
    } else if (result.error.message === APPOINTMENT_SLOT_TAKEN_ERROR) {
      setCurrentStep(2);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.bookingShell} aria-label="Appointment booking">
        <header className={styles.header}>
          <div className={styles.logo}>
             <img src={logo} alt="logo" />
            <h1>Book an appointment</h1>
            <p>Choose a convenient way to meet with your care team.</p>
          </div>
           
        </header>
        <nav className={styles.stepper} aria-label="Booking progress">
          {stepLabels.map((label, index) => {
            const step = index + 1;
            return <div className={`${styles.step} ${step <= activeStep ? styles.stepActive : ''}`} key={label}>
              <span className={styles.stepNumber}>{step < activeStep ? '✓' : step}</span><span>{label}</span>
            </div>;
          })}
        </nav>
        <div className={styles.content}>
          <div className={styles.introRow}>
            <div><span className={styles.stepKicker}>STEP {activeStep} OF 4</span><h2>{currentStep === 6 ? 'Appointment confirmed' : stepLabels[activeStep - 1]}</h2></div>
            {currentStep !== 6 && <button className={styles.resetButton} type="button" onClick={resetAppointment}>Start over</button>}
          </div>
          <div className={styles.stage}>
      {currentStep === 1 && (
        <VisitTypeSelector
          onSelect={(type) => {
            setVisitType(type);
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <DateTimeStep
          onNext={() => {
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
          visitType={visitType}
        />
      )}

      {currentStep === 3 && (
        <>
          {visitType === "in-person" && (
            <InPersonAppointment
              onNext={() => {
                setCurrentStep(5);
              }}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {visitType === "video" && (
            <VideoAppointment
              onNext={() => {
                setCurrentStep(4);
              }}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </>
      )}

      {currentStep === 4 && visitType === "video" && (
        <UploadDocuments
          onNext={(documents) => {
            dispatch(setDocuments(documents));
            setCurrentStep(5);
          }}
        />
      )}

      {currentStep === 5 && (
  <PaymentStep
    isSaving={saveStatus === 'loading'}
    onNext={() => {
      saveAppointment();
    }}
  />
)}

            {currentStep === 5 && error && <p role="alert">{error}</p>}

            {currentStep === 6 && <FinalConfirmation onReset={resetAppointment} />}
          </div>
        </div>
      </section>
    </main>

  );
}

export default OnlineAppointment;
