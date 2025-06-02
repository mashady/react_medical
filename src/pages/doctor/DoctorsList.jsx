import React, { useEffect, useState } from "react";
import { Phone, Stethoscope, Search } from "lucide-react";
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
    image: "#",
  },
  {
    id: 2,
    user: { first_name: "Mostafa", last_name: "Moknaa" },
    specialty: { name: "Neurology" },
    bio: "Expert in neurological disorders and brain health.",
    contact_number: "0987654321",
    image: "#",
  },
  {
    id: 3,
    user: { first_name: "Mohamed", last_name: "Maged" },
    specialty: { name: "Pediatrics" },
    bio: "Passionate about children’s health and well-being.",
    contact_number: "0112233445",
    image: "#",
  },
  {
    id: 4,
    user: { first_name: "Muhammed", last_name: "Samir" },
    specialty: { name: "Orthopedics" },
    bio: "Specializing in bone and joint health.",
    contact_number: "0223344556",
    image: "#",
  },
  {
    id: 5,
    user: { first_name: "Abdalwahab", last_name: "Mohammed" },
    specialty: { name: "Dermatology" },
    bio: "Skincare expert with a focus on dermatological treatments.",
    contact_number: "0334455667",
    image: "#",
  },
];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/doctors/")
      .then((response) => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.warn("API not working, using fake data instead.");
        setDoctors(fakeDoctors);
        setFilteredDoctors(fakeDoctors);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) =>
      `${doctor.user.first_name} ${doctor.user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          List of Doctors
        </h1>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search doctor by name..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-md p-5 border border-green-100 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-72 rounded-t-2xl overflow-hidden mb-5">
                  <img
                    src={doctor.image || "https://via.placeholder.com/300"}
                    alt={`Dr. ${doctor.user.first_name} ${doctor.user.last_name}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Social Icons Overlay */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                    {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                        aria-label="Social Media"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  Dr. {doctor.user.first_name} {doctor.user.last_name}
                </h2>

                <div className="flex items-center justify-center gap-2 text-gray-700 mb-3">
                  <Stethoscope className="w-6 h-6 text-green-500" />
                  <span className="font-medium">Specialty:</span>{" "}
                  {doctor.specialty.name}
                </div>

                <p className="text-gray-600 mb-4 text-center">
                  <span className="font-medium">About:</span> {doctor.bio}
                </p>

                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Phone className="w-6 h-6 text-green-500" />
                  <span>{doctor.contact_number}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DoctorsList;
