import { useEffect, useState } from 'react';
import Banner from '../layouts/Banner';
import img from "../assets/image.3.png.png"
import InsuranceImg from "../assets/Insurance.png"
import ConsultationImg from "../assets/Consultation.png"
import SurgicalImg from "../assets/Surgical.png"
import MedicalTeam from "../assets/MedicalTeam.png"
import AboutUs from "../assets/AboutUs.png" 
import WhyChooseUs from "../assets/WhyChosseUs.png"
import Sticker from "../assets/sticker.png"
import Styles from "../pages/HomePage.module.css"
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
function HomePage() {
  
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {setActiveIndex((currentIndex)=> (currentIndex + 1) %3 )}, 5000)
    return () => clearInterval(interval);
  },[])
  return (
   
     <div>
  <Banner />

  <div className={Styles.HealthCare}>
    <h1>Heath Care</h1>
    <p>Our clinic provides essential primary care services with a focus on comfort, clarity, and reliable treatment. We support your everyday health with simple, accessible medical care.</p>
  </div>


  <div className={Styles.Services}>
    <div className={Styles.ServiceCard}>
      <h1>Medical Conditions</h1>
      <p>We evaluate and manage common health issues with careful attention and practical treatment options.</p>
      <img src={img} alt="cart" />
    </div>

    <div className={Styles.ServiceCard}>
      <h1>Consultation</h1>
      <p>Talk to our doctors and get straightforward advice you can trust. Were here to listen and help you make confident health decisions.</p>
      <img src={ConsultationImg} alt="Consultation" />
    </div>

    <div className={Styles.ServiceCard}>
      <h1>Surgical Care</h1>
      <p>We diagnose and treat a wide range of common health conditions with accuracy and care. Get the right treatment at the right time.</p>
      <img src={SurgicalImg} alt="Surgical" />
    </div>
  </div>


  <div className={Styles.InsuranceSupport}>
    <h1>Insurance Support</h1>
    <p>We work with many insurance plans to make your visits easier and more affordable. Just bring your card well handle the rest.</p>
    <img src={InsuranceImg} alt="insurance support" />
  </div>

  
  <div className={Styles.AdditionalInfo}>
    <div className={
  activeIndex === 0
    ? `${Styles.AdditionalInfoCard} ${Styles.active}`
    : Styles.AdditionalInfoCard
}>
      <h1 >Our Medical Team</h1>
      <p>Our team includes licensed physicians, nurses, and healthcare professionals dedicated to delivering accurate, evidence-based care across all primary services.</p>
      <div className={Styles.AdditionalInfoImg}>
         <img src={MedicalTeam} alt="MedicalTeam" />
      </div>
     
    </div>

    <div className={
  activeIndex === 1
    ? `${Styles.AdditionalInfoCard} ${Styles.active}`
    : Styles.AdditionalInfoCard
}>
      <h1>About Us</h1>
      <p>A modern clinic offering essential medical care for individuals and families. Simple access, clear communication, and dependable service.</p>
      <div className={Styles.AdditionalInfoImg}>
        <img src={AboutUs} alt="AboutUs" />
      </div>
      
    </div>

    <div className={
  activeIndex === 2
    ? `${Styles.AdditionalInfoCard} ${Styles.active}`
    : Styles.AdditionalInfoCard
}>
      <h1>Why Choose Us</h1>
      <p>Quick appointments, skilled staff, updated equipment, and a smooth patient experience from start to finish.</p>
      <div className={Styles.AdditionalInfoImg}>
         <img src={WhyChooseUs} alt="WhyChooseUs" />
      </div>
     
    </div>
<div>
    <img src={Sticker} alt="Sticker" className={Styles.sticker} />
  </div>
    <div className={Styles.buttonContainer}>
      <button onClick={() => setActiveIndex((currentIndex) => (currentIndex + 1)%3) }  className={Styles.controls}>
    <SlArrowLeft />
  </button>
  <button onClick={() => setActiveIndex((currentIndex) => (currentIndex - 1)%3) }  className={Styles.controls}>
    <SlArrowRight />
    </button>
  
</div> 
  </div>
  
</div>

  );
}

export default HomePage;
