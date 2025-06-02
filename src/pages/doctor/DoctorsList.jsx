import React, { useEffect, useState } from 'react';
import { Phone, UserCircle, Stethoscope, Search } from 'lucide-react';

import footer from '../../components/footer';
import Header from '../../components/Header';
import axios from 'axios';

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
    user: { first_name: "Mostafa", last_name: "moknaa" },
    specialty: { name: "Neurology" },
    bio: "Expert in neurological disorders and brain health.",
    contact_number: "0987654321",
  },
  {
    id: 3,
    user: { first_name: "mohamed", last_name: "maged" },
    specialty: { name: "Pediatrics" },
    bio: "Passionate about children’s health and well-being.",
    contact_number: "0112233445",
  },
    {
        id: 4,
        user: { first_name: "muhammed", last_name: "samir" },
        specialty: { name: "Orthopedics" },
        bio: "Specializing in bone and joint health.",
        contact_number: "0223344556",
    },
    {
        id: 5,
        user: { first_name: "abdalwahab", last_name: "mohammed" },
        specialty: { name: "Dermatology" },
        bio: "Skincare expert with a focus on dermatological treatments.",
        contact_number: "0334455667",
    },
];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/doctors/')
      .then(response => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.warn('API not working, using fake data instead.');
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
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">List of Doctors</h1>

    
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <UserCircle className="w-10 h-10 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Dr. {doctor.user.first_name} {doctor.user.last_name}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Stethoscope className="w-5 h-5 text-green-500" />
                <span className="font-medium">Specialty:</span> {doctor.specialty.name}
              </div>
              <p className="text-gray-600 mb-2"><span className="font-medium">About:</span> {doctor.bio}</p>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-green-500" />
                <span>{doctor.contact_number}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
