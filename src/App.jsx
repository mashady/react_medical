import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppointmentBooking from "./pages/AppointmentBooking";

function App() {
  return (
    <div className="">
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="book" element={<AppointmentBooking />} />
      </Routes>
    </div>
  );
}

export default App;
