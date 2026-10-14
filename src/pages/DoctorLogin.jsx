import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import styles from "../pages/DoctorLogin.module.css"


function DoctorLogin() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthStatus } = useAuth();

  const SubmitHandler = (e) => {
    e.preventDefault();
    
    const DoctorUsername = "Dr.smit1985";
    const Doctorpassword = "DS.1985?@1234";


    if (!userName || !password) {
      setError("Please fill all fields");
      return;
    }

    if (userName === DoctorUsername && password === Doctorpassword) {
      localStorage.setItem("doctorLoggedIn", "true");
      setAuthStatus("loggedIn");
      navigate("/doctor/dashboard");
    } else {
      setError("your username or password is not valid");
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={SubmitHandler} className={styles.form}>
        <p className={styles.text}>Doctor Login</p>
        <input
          type="text"
          placeholder="DoctorUsername"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.submit}>Submit</button>
        <p className={styles.error}>{error}</p>
      </form>
    </div>
  );
}

export default DoctorLogin;
