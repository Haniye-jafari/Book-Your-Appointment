
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthContext from './contexts/AuthContext';
import Login from './contexts/Login';
import AboutUs from './pages/AboutUs';
import Register from './contexts/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AppointmentPage from './pages/AppointmentPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import DoctorLayout from './layouts/DoctorLayout';
import HomePage from './pages/HomePage';
import PrivateRoute from './PrivateRoute';
import Blog from './pages/Blog';
import LearnMore from './pages/LearnMore';
import Services from './pages/Services';
import { getCurrentUser, saveCurrentUser } from './utils/auth';

function App() {
  const storedUser = getCurrentUser();
  const [authStatus, setAuthStatus] = useState(storedUser ? 'loggedIn' : 'guest');
  const [user, setUser] = useState(storedUser || null);

  const login = (userData) => {
    const safeUser = userData ? { ...userData } : null;
    setUser(safeUser);
    setAuthStatus('loggedIn');
    saveCurrentUser(safeUser);
  };

  const logout = () => {
    setUser(null);
    setAuthStatus('guest');
    saveCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ authStatus, user, login, logout, setAuthStatus }}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog"  element={<Blog/>} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path="/LearnMore" element={<LearnMore />} />
        </Route>
         
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/patient/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
        </Route>

        <Route element={<DoctorLayout />}>
          <Route path="/doctor/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
