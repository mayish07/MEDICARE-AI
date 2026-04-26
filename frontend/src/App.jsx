import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SplashScreen from './pages/SplashScreen';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HospitalsPage from './pages/HospitalsPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import AIChatPage from './pages/AIChatPage';
import HealthRecordsPage from './pages/HealthRecordsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import EmergencyPage from './pages/EmergencyPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return localStorage.getItem('seenSplash') !== 'true';
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem('seenSplash', 'true');
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          showSplash ? <SplashScreen onGetStarted={handleSplashComplete} /> : <LandingPage />
        } />
        <Route path="/splash" element={<SplashScreen onGetStarted={handleSplashComplete} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorProfilePage />} />
        <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
        <Route path="/ai-chat" element={<AIChatPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/book-appointment" element={
          <ProtectedRoute>
            <BookAppointmentPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute>
            <AppointmentsPage />
          </ProtectedRoute>
        } />
        <Route path="/health-records" element={
          <ProtectedRoute>
            <HealthRecordsPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;