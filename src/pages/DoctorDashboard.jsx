import { useState } from "react"
import styles from "../pages/DoctorDashboard.module.css"
import TodayPatients from "./TodayPatients"
import ArchivePatient from "./ArchivePatient"
import Management from "./Management"

const tabs = [
  { id: "today", title: "Upcoming Appointments" },
  { id: "archive", title: "Archive" },
  { id: "Management", title: "Management" },
];

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("today")
  

  return (
    <div className={styles.DoctorDashboard}>
     
      <aside className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>Doctor Dashboard</h1>
        <p className={styles.sidebarSubtitle}>Manage appointments and patients</p>

        <nav className={styles.sidebarMenu} aria-label="Doctor dashboard">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.sidebarMenuItem} ${activeTab === tab.id ? styles.sidebarMenuItemActive : ""}`}
              aria-current={activeTab === tab.id ? "page" : undefined}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </aside>
      <div className={styles.content}>
        { activeTab === "today" && <TodayPatients/>}
        { activeTab === "archive" && <ArchivePatient/>}
        { activeTab === "Management" && <Management/>}
        
      </div>
    </div>
  )
}

export default DoctorDashboard