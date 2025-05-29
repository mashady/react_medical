import React from "react";
import Header from "../components/header";
import HeroSection from "../components/herosection";
import ContactServiceSection from "../components/serviceinfo";
import MedicalServicesComponent from "../components/medicalteam";
import MedicalFooter from "../components/footer";
import AdminDashboard from "./admin/AdminDashboard.jsx";
const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ContactServiceSection />
      <MedicalServicesComponent />
      <MedicalFooter />
      <AdminDashboard />
    </div>
  );
};

export default Home;
