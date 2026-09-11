import styles from "../pages/Blog.module.css"
import first from "../assets/first.png"
import second from "../assets/second.png"
import forth from "../assets/forth.png"
import fifth from "../assets/the fifth.png"
import third from "../assets/Third.png"
import sixth from "../assets/sixth.png"
function Blog() {
  return (
    <div className={styles.page}>
      <div className={styles.blogGrid}>
      <div className={styles.card}>
        <h1>Why Do We Feel Tired All the Time?</h1>
        <img src={first} alt="Why Do We Feel Tired All the Time?" />
        <p className={styles.overlay}>Feeling constantly tired is one of the most common concerns patients mention. Fatigue can come from poor sleep, stress, dehydration, vitamin deficiencies, or even underlying medical conditions. Many people ignore persistent tiredness, assuming it’s normal, but long‑term fatigue deserves attention. Tracking sleep habits, improving diet, and scheduling a basic health checkup can help identify the root cause. Understanding your body’s signals is the first step toward restoring your energy.</p>
      </div>
       <div className={styles.card}>
        <h1>When Should You See a Doctor About Headaches?</h1>
        <img src={second} alt="When Should You See a Doctor About Headaches?"/>
        <p className={styles.overlay}>Headaches happen to almost everyone, but frequent or severe headaches can be a sign of something more serious. Many users wonder when it’s time to seek medical help. If your headaches occur daily, interrupt your routine, or come with symptoms like dizziness or blurred vision, it’s important to consult a doctor. Stress, dehydration, eye strain, and hormonal changes are common triggers. Keeping a headache diary helps identify patterns and makes diagnosis easier.</p>
      </div>
       <div className={styles.card}>
        <h1>Understanding Period Pain: When Is It Serious?</h1>
         <img src={forth} alt="Understanding Period Pain: When Is It Serious?"/>
        <p className={styles.overlay}>Period pain is common for many teenagers and adults, often caused by natural hormonal changes during the menstrual cycle. Mild cramps, lower abdominal pressure, and fatigue are usually normal. However, some people experience pain that feels unusually intense or lasts longer than expected. Severe cramps, pain that spreads to the back or legs, nausea, or symptoms that interfere with daily activities may signal an underlying issue. If period pain becomes persistent, worsens over time, or feels different from your usual cycle, it’s important to speak with a healthcare professional. Early evaluation helps ensure that symptoms are understood and properly managed.</p>
      </div>
       <div className={styles.card}>
        <h1>Why Does My Heart Beat Fast Sometimes?</h1>
         <img src={third} alt="Why Does My Heart Beat Fast Sometimes?"/>
        <p className={styles.overlay}>A sudden fast heartbeat can feel scary, and it’s a question many patients bring up. Occasional palpitations can be caused by stress, caffeine, dehydration, or lack of sleep. However, if your heart races frequently, lasts longer than a few minutes, or comes with chest pain or shortness of breath, you should seek medical advice. Monitoring triggers and lifestyle habits helps doctors understand the cause. Most palpitations are harmless, but it’s always better to check.</p>
      </div>
       <div className={styles.card}>
        <h1>How Do I Know If My Symptoms Are Serious?</h1>
         <img src={fifth} alt="How Do I Know If My Symptoms Are Serious?"/>
        <p className={styles.overlay}>One of the most common medical questions is how to tell the difference between mild symptoms and something serious. Many conditions start with subtle signs—fatigue, mild pain, or changes in appetite. The key is consistency: if a symptom lasts more than a couple of weeks, worsens over time, or affects daily life, it’s worth discussing with a healthcare provider. Early evaluation prevents complications and gives peace of mind. Listening to your body is essential.</p>
      </div>
       <div className={styles.card}>
        <h1>Why Am I Feeling Anxious for No Clear Reason?</h1>
         <img src={sixth} alt="Why Am I Feeling Anxious for No Clear Reason?"/>
        <p className={styles.overlay}>Unexplained anxiety is a frequent concern among patients. Even without an obvious trigger, stress can build up from lifestyle habits, sleep problems, or hormonal changes. Many people wonder whether anxiety is “just in their head,” but it’s a real medical issue that affects both mind and body. Practicing breathing exercises, improving sleep, and reducing caffeine can help. If anxiety becomes persistent or overwhelming, speaking with a professional provides clarity and support.</p>
      </div>
      </div>
    </div>
  )
}

export default Blog