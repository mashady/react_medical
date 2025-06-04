import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  FaUserMd,
  FaArrowRight,
  FaClock,
  FaStar,
  FaMoneyBillWave
} from 'react-icons/fa';

export default function ServiceSelection({ formData, setFormData, nextStep }) {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [isAllSelected, setAIsAllSelected] = useState(true);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5MDgwMzk5LCJpYXQiOjE3NDkwNDQzOTksImp0aSI6IjQ4ZWNkZTIxYmVhNDQ4ODNhZDI4NDRiMWI3ZDUzYzJmIiwidXNlcl9pZCI6MTV9.IW60UO_zFQ9ySPN_HPXKt22f1rXqWfx60Dm2iK4hvS0';
  // This is running onComponentLoad =>
  useEffect(() => {
    axios.get(`/api/specialties/`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then((res) => {
      console.log(res.data);
      setSpecialities(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
    });

    axios.get(`/api/doctors/by-specialty/`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then((res) => {
      console.log(res.data);
      setDoctors(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
    });

  }, []);

  // This is running onSpecialityChange =>
  function fetchRelatedDoctors(specialtyName) {
    axios.get(`/api/doctors/by-specialty/?specialty=${encodeURIComponent(specialtyName)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setDoctors(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching doctors:", err.response?.data || err.message);
    });
  }

  // Handle specialty selection
  const handleSpecialtySelect = (specialty) => {
    setFormData({ ...formData, speciality: specialty.id });
    setSelectedSpecialtyId(specialty.id);
    fetchRelatedDoctors(specialty.name);
    setAIsAllSelected(false);
  };

  // Handle "All" button click
  const handleAllSelect = () => {
    setFormData({ ...formData, speciality: null });
    setSelectedSpecialtyId(null);
    fetchRelatedDoctors("");
    setAIsAllSelected(true);
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setFormData({
      ...formData,
      doctor: doctor, 
      category: doctor.specialty?.name || ''
    });
    setIsSelected(true);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Select Speciality</h2>
      
      {loading && (
        <div className="text-center py-4">
          <div className="text-[#07332F]">Loading...</div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={handleAllSelect}
          disabled={loading}
          className={`px-6 py-2 rounded-full border cursor-pointer transition-colors ${
            isAllSelected 
              ? 'bg-[#07332F] text-white' 
              : 'bg-white border-[#07332F]/30 hover:border-[#07332F]/50'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          All
        </button>

        {specialities.map((speciality) => (
          <button
            key={speciality.id}
            onClick={() => handleSpecialtySelect(speciality)}
            disabled={loading}
            className={`px-6 py-2 rounded-full border cursor-pointer transition-colors ${
              selectedSpecialtyId === speciality.id 
                ? 'bg-[#07332F] text-white' 
                : 'bg-white border-[#07332F]/30 hover:border-[#07332F]/50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {speciality.name}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Select Doctor</h2>
      
      {doctors.length === 0 && !loading ? (
        <div className="text-center py-8 text-gray-500">
          No doctors available for the selected specialty
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              onClick={() => !loading && handleDoctorSelect(doctor)}
              className={`border border-[#07332F]/20 rounded-lg p-6 hover:border-[#F7A582] cursor-pointer transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="bg-[#F7A582]/20 p-4 rounded-full self-start">
                  <FaUserMd className="text-2xl text-[#F7A582]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-[#07332F]">
                    {doctor.user.username}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaClock className="text-[#F7A582]" />
                    <span>1h</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!isSelected || loading}
          className={`px-8 py-3 bg-[#F7A582] text-white rounded-lg flex items-center gap-2 hover:bg-[#F7A582]/90 transition-colors ${
            (!isSelected || loading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next: Date & Time <FaArrowRight />
        </button>
      </div>
    </div>
  );
}