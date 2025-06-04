import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDash from "./pages/patient/Panel";
import DoctorDashboard from "./pages/doctor/Panel";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorsList from "./pages/doctor/Doctorslist";
import AppointmentBooking from "./pages/AppointmentBooking";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <div className="">
        <Routes>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
          />
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="list" element={<DoctorsList />} />
          <Route path="patient-dashboard" element={<PatientDash />} />
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="book" element={<AppointmentBooking />} />
        </Routes>
      </div>

  );
}

export default App;
