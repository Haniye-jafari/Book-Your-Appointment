

// import styles from '../appointments/Component.module.css';
import { useState } from 'react';
import VisitTypeSelector from './VisitTypeSelector';
import DateTimeStep from './DateTimeStep';
import UploadDocuments from './UploadDocuments';
import InPersonAppointment from './InPersonAppointment';
import VideoAppointment from './VideoAppointment';
import PaymentStep from "./PaymentStep"
import FinalConfirmation from "./FinalConfirmation"



function OnlineAppointment() {
  const [visitType, setVisitType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
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
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
          visitType={visitType}
        />
      )}

      {currentStep === 3 && (
        <>
          {visitType === "in-person" && (
            <InPersonAppointment
              onNext={() => setCurrentStep(5)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {visitType === "video" && (
            <VideoAppointment
              onNext={() => setCurrentStep(4)}
            />
          )}
        </>
      )}

      {currentStep === 4 && visitType === "video" && (
        <UploadDocuments
          onNext={() => setCurrentStep(5)}
        />
      )}

      {currentStep === 5 && (
  <PaymentStep
    onNext={() => setCurrentStep(6)}
  />
)}

{currentStep === 6 && (
  <FinalConfirmation />
)}

    </>
    
  );
}

export default OnlineAppointment;

