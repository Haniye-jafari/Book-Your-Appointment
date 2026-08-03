import img from "../assets/Drpicture.png.png";
import Styles from "../layouts/Banner.module.css"
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className={Styles.Banner}>
      <img
        src={img}
        alt="Banner"
        className={Styles.img}
        
      />
      <div className={Styles.TypewriterWrapper}>
        <Typewriter
          words={[
            "Trusted Medical Care with Modern Technology and Compassionate Specialists",
            "Your Health Deserves Exceptional Care from Experienced Medical Professionals",
            "Book Your Appointment Online in Just a Few Simple Clicks",
            "24/7 Emergency Support Whenever You and Your Family Need Us Most",
            "Delivering Excellence in Every Patient Experience with Personalized Treatment",
            "Helping You and Your Family Live Healthier Lives with Confidence",
            "Modern Healthcare Solutions Designed Around Your Comfort and Well-Being"
          ]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={40}
          delaySpeed={1800}
        />
      </div>
      <div className={Styles.Appointment}>
        <a href="/appointments">
         
          Book Your Appointment</a>
         
      </div>
     <div>
      <p className={Styles.LearnMore}>
        <Link to="/LearnMore">Learn More</Link>
      </p>
       <svg className={Styles.svg} viewBox="0 0 20 20">
	<path fill="none" d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
	l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
	c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
	c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
	S1.293,9.212,1.729,9.212z"></path>
           </svg>
     </div>
    </div>
  );
}

export default Banner;