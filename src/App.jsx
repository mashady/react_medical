import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import PatientDashboard from "./pages/patient/patientDashboard";

function App() {
  return (
    <div className="">
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route path="patient" element={<PatientDashboard />} />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
