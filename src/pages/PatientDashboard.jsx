import { useState } from 'react';
import styles from './PatientDashboard.module.css';
import OnlineAppointment from '../components/appointments/OnlineAppointment';
import ReservedAppointments from '../components/appointments/ReservedAppointments';
import UploadDocuments from '../components/appointments/UploadDocuments';
import LogoutSection from '../components/appointments/LogoutSection';

const tabs = [
  {
    id: 'online-appointment',
    title: 'Online Appointment',
    description: 'Book a new appointment by selecting the doctor, time, and contact information.',
    details: [
    ],
  },
  {
    id: 'reserved-appointments',
    title: 'Reserved Appointments',
    description: 'View the list of appointments you have previously booked.',
    details: [
    ],
  },
  {
    id: 'upload-documents',
    title: 'Upload Documents',
    description: 'Submitting your insurance card, doctors prescription, or medical records for your file.',
    details: [
    ],
  },
  {
    id: 'logout',
    title: 'Logout',
    description: 'To maintain account security, please log out when you are finished.',
    details: [
    ],
  },
];

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <main className={styles.page}>
      <div className={styles.dashboardCard}>
        
       
        <aside className={styles.sidebar}>
          <h1 className={styles.title}>Patient Dashboard</h1>
          <p className={styles.subtitle}>Manage your services</p>

          <nav className={styles.menu}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.menuItem} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </nav>
        </aside>

        <section className={styles.content}>
          <h2 className={styles.panelTitle}>{currentTab.title}</h2>
          <p className={styles.contentText}>{currentTab.description}</p>

          {currentTab.id === 'online-appointment' && <OnlineAppointment />}
          {currentTab.id === 'reserved-appointments' && <ReservedAppointments />}
          {currentTab.id === 'upload-documents' && <UploadDocuments />}
          {currentTab.id === 'logout' && <LogoutSection />}
        </section>

      </div>
    </main>
  );
}

export default PatientDashboard;
