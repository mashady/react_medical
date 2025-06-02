import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const fakeDoctors = [
  {
    id: 1,
    user: { first_name: "Heba", last_name: "Mahmoud" },
    specialty: { name: "Cardiology" },
    bio: "Experienced cardiologist with over 10 years in the field.",
    contact_number: "0123456789",
  },
  {
    id: 2,
    user: { first_name: "Mostafa", last_name: "Moknaa" },
    specialty: { name: "Neurology" },
    bio: "Expert in neurological disorders and brain health.",
    contact_number: "0987654321",
  },
  {
    id: 3,
    user: { first_name: "Mohamed", last_name: "Maged" },
    specialty: { name: "Pediatrics" },
    bio: "Passionate about children’s health and well-being.",
    contact_number: "0112233445",
  },
  {
    id: 4,
    user: { first_name: "Muhammed", last_name: "Samir" },
    specialty: { name: "Orthopedics" },
    bio: "Specializing in bone and joint health.",
    contact_number: "0223344556",
  },
  {
    id: 5,
    user: { first_name: "Abdalwahab", last_name: "Mohammed" },
    specialty: { name: "Dermatology" },
    bio: "Skincare expert with a focus on dermatological treatments.",
    contact_number: "0334455667",
  },
];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/doctors/")
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setDoctors(fakeDoctors);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50">
      <Header />

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
          Our Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden text-center group transition-all"
            >
              <div className="relative">
                <img
                  src={
                    doctor.id === 1
                      ? "https://randomuser.me/api/portraits/women/44.jpg"
                      : doctor.id === 2
                      ? "https://randomuser.me/api/portraits/men/75.jpg"
                      : doctor.id === 3
                      ? "https://randomuser.me/api/portraits/men/75.jpg"
                      : doctor.id === 4
                      ? "https://randomuser.me/api/portraits/men/75.jpg"
                      : "https://randomuser.me/api/portraits/men/75.jpg"
                  }
                  alt="doctor"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="text-white bg-green-600 p-2 rounded-full">
                    <FaFacebookF size={16} />
                  </a>
                  <a href="#" className="text-white bg-green-600 p-2 rounded-full">
                    <FaTwitter size={16} />
                  </a>
                  <a href="#" className="text-white bg-green-600 p-2 rounded-full">
                    <FaLinkedinIn size={16} />
                  </a>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  Dr. {doctor.user.first_name} {doctor.user.last_name}
                </h3>
                <p className="text-green-600 font-medium mt-1">
                  {doctor.specialty.name}
                </p>
                <p className="text-gray-600 mt-2 text-sm">{doctor.bio}</p>
                <p className="mt-3 text-gray-500 text-sm">
                  Contact: {doctor.contact_number}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorsList;
