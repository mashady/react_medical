import React from 'react'
import Header from '../components/header'
import HeroSection from '../components/herosection'
import ContactServiceSection from '../components/serviceinfo'
import MedicalServicesComponent from '../components/medicalteam'
import MedicalFooter from '../components/footer'

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ContactServiceSection />
      <MedicalServicesComponent />
      <MedicalFooter />
    </div>
  )
}

export default Home
