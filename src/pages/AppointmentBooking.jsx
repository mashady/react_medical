import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { 
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaChevronRight
} from 'react-icons/fa';
import ServiceSelection from '../components/Booking/ServiceSelection';
import DateTimePicker from '../components/Booking/DateTimePicker';
import PatientDetails from '../components/Booking/PatientDetails';
import Summary from '../components/Booking/Summary';
import axios from 'axios';

export default function AppointmentBooking() {
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    doctor: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4OTc4MzcwLCJpYXQiOjE3NDg5NzgwNzAsImp0aSI6IjJjZjllMDg3MTFlODQ4ZjhhYmU1N2YzYTdkOTRhZTE2IiwidXNlcl9pZCI6MTV9._R4YHlGzvgx6ovgirrJBZfZWfDAaLsE54PVK0Zs-bKo';

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Appointment Booked:', formData);
    await axios.post('/api/appointments/', {
        doctor: formData.doctor.id,
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        notes: formData.notes,
    }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
    }).then((res) => {
      console.log('Appointment booked successfully:', res.data);
      toast("Appointment booked successfully!", {
            type: 'success',
            autoClose: 3000,
            position: "top-right"
      });
      setTimeout(() => {
            setStep(1); // Reset to first step on error
            navigate('/book');
      }, 3000); // Wait 1 second before navigating
    }).catch((err) => {
        console.error('Error booking appointment:', err);

        const detail =
            err.response?.data?.detail ||
            err.response?.data?.non_field_errors?.[0] ||
            "Failed to book appointment";

        toast(detail, {
            type: 'error',
            autoClose: 5000,
            position: "top-right"
        });
        setStep(1); // Reset to first step on error
        navigate('/book');
    });
    // After successful submission, navigate to appointments page
    // You can also reset formData if needed
    setFormData({
      category: '',
      doctor: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <ToastContainer />
      {/* Enhanced Header */}
      <div className="bg-[#07332F] text-white" style={{ minHeight: '30vh' }}>
        <div className="max-w-6xl mx-auto p-8 flex flex-col justify-end h-full">
          <div className="flex items-center text-sm mb-4">
            <FaHome className="mr-2" />
            <span>Home</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span className="font-medium">Book an Appointment</span>
          </div>
          <h1 className="text-4xl font-bold">Book an Appointment</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar with shadow and spacing */}
        <div className="w-64 bg-white p-6 hidden md:block shadow-lg mr-6 my-6 rounded-lg">
          <h2 className="text-xl font-medium mb-8 text-[#07332F]">Appointment Steps</h2>
          <div className="space-y-8">
            {[
              { step: 1, icon: <FaUserMd className="text-[#F7A582]" />, label: "Select Doctor" },
              { step: 2, icon: <FaCalendarAlt className="text-[#F7A582]" />, label: "Date & Time" },
              { step: 3, icon: <FaUser className="text-[#F7A582]" />, label: "Your Details" },
              { step: 4, icon: <FaFileAlt className="text-[#F7A582]" />, label: "Confirmation" }
            ].map((item) => (
              <div 
                key={item.step}
                className={`flex items-center gap-3 p-3 rounded-lg ${step >= item.step ? 'bg-[#07332F]/10 border-l-4 border-[#F7A582]' : 'text-gray-500'}`}
              >
                <div className="w-6">
                  {item.icon}
                </div>
                <span className={`${step >= item.step ? 'text-[#07332F]' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content with shadow */}
        <div className="flex-1 p-8 bg-white shadow-lg my-6 rounded-lg">
          {step === 1 && (
            <ServiceSelection 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={nextStep} 
            />
          )}
          {step === 2 && (
            <DateTimePicker 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
            />
          )}
          {step === 3 && (
            <PatientDetails 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
            />
          )}
          {step === 4 && (
            <Summary 
              formData={formData} 
              prevStep={prevStep} 
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}