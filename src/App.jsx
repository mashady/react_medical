import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDash from "./pages/patient/Panel";
import DoctorDashboard from "./pages/doctor/Panel";
import { store } from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="">
          <Provider store={store}>
<Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="patient-dashboard" element={<PatientDash />} />
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>

          </Provider>
      
    </div>
  );
}

export default App;
