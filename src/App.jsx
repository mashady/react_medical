import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDash from "./pages/patient/Panel";
import DoctorDashboard from "./pages/doctor/Panel";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorsList from "./pages/doctor/Doctorslist";
function App() {
  return (
    <div className="">
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="list" element={<DoctorsList />} />
        <Route path="patient-dashboard" element={<PatientDash />} />
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
