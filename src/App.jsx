import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import RequireAuth from './auth/RequireAuth';
import DashboardLayout from './layouts/DashboardLayout';
import DoctorDashboardd from './components/drDash';
import BookingStepper from "./pages/BookingStepper";
import PatientDash from './components/patientDash';
import DoctorsList from './pages/doctor/DoctorsList';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-panel" element={<DoctorDashboardd />} />
        <Route path="/patient-panel" element={<PatientDash />} />
        <Route path="book" element={<BookingStepper />} />

        {/* doctor list Routes */}
        <Route path="/doctors" element={<DoctorsList />} />

        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="patient" element={<PatientDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;
