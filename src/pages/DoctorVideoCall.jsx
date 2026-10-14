import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VideoCallRoom.module.css";

const ROOM_NAME_PATTERN = /^care-connect-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function DoctorVideoCall() {
  const { roomName } = useParams();
  const isValidRoom = ROOM_NAME_PATTERN.test(roomName || "");
  const callContainerRef = useRef(null);
  const [callStatus, setCallStatus] = useState(null);
  const isCurrentCall = callStatus?.roomName === roomName;
  const callError = isCurrentCall && callStatus.status === "error" ? callStatus.message : "";
  const isLoading = isValidRoom && (!isCurrentCall || callStatus.status === "loading");

  useEffect(() => {
    if (!isValidRoom) return undefined;

    let cancelled = false;
    let callInstance;
    let script;

    const startCall = () => {
      if (cancelled || !callContainerRef.current) return;

      try {
        callInstance = new window.JitsiMeetExternalAPI("meet.jit.si", {
          roomName,
          parentNode: callContainerRef.current,
          width: "100%",
          height: "100%",
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: false,
          },
        });
        setCallStatus({ roomName, status: "connected" });
      } catch (error) {
        console.error("Unable to start the Jitsi video call.", error);
        setCallStatus({
          roomName,
          status: "error",
          message: "The video call could not be started. Please try again.",
        });
      }
    };

    if (window.JitsiMeetExternalAPI) {
      Promise.resolve().then(startCall);
    } else {
      script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = startCall;
      script.onerror = () => {
        if (cancelled) return;
        console.error("Unable to load the Jitsi Meet IFrame API.");
        setCallStatus({
          roomName,
          status: "error",
          message: "The video-call service could not be loaded. Check your connection and try again.",
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      callInstance?.dispose();
      if (script) {
        script.onload = null;
        script.onerror = null;
        script.remove();
      }
    };
  }, [isValidRoom, roomName]);

  return (
    <main className={styles.page}>
      <section className={styles.callPanel}>
        <header className={styles.header}>
          <div>
            <span className={styles.kicker}>CARE CONNECT</span>
            <h1>Video consultation</h1>
          </div>
          <Link className={styles.backLink} to="/appointments">Back to appointments</Link>
        </header>

        {isValidRoom ? (
          <>
            {isLoading && !callError && <p className={styles.loading}>Connecting to the video call…</p>}
            {callError ? (
              <p className={styles.error} role="alert">{callError}</p>
            ) : (
              <div className={styles.callFrame} ref={callContainerRef} />
            )}
          </>
        ) : (
          <p className={styles.error} role="alert">
            This video-call link is invalid or incomplete. Open the link from your appointment.
          </p>
        )}
      </section>
    </main>
  );
}

export default DoctorVideoCall