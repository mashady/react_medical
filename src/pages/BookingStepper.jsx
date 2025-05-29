import { useState } from 'react';
import { 
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaStar,
  FaMoneyBillWave
} from 'react-icons/fa';

export default function AppointmentBooking() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Booked:', formData);
    nextStep();
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

function ServiceSelection({ formData, setFormData, nextStep }) {
  const categories = ["Add", "Genealogy", "Nerontogy", "Predentoku", "Genealogy"];
  const doctors = [
    { id: 1, name: "Dr. Elizabeth Foster", duration: "30m", priority: "High", price: "$120", rating: 4.8 },
    { id: 2, name: "Dr. David Lee", duration: "30m", priority: "Medium", price: "$100", rating: 4.5 },
    { id: 3, name: "Dr. Ana White", duration: "30m", priority: "Low", price: "$90", rating: 4.2 },
    { id: 4, name: "Dr. Daniel Brown", duration: "30m", priority: "Medium", price: "$110", rating: 4.6 }
  ];

  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Select Category</h2>
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFormData({ ...formData, category })}
            className={`px-6 py-2 rounded-full border ${formData.category === category ? 'bg-[#07332F] text-white' : 'bg-white border-[#07332F]/30'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Select Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor.id}
            onClick={() => {
              setFormData({ ...formData, doctor: doctor.name });
              nextStep();
            }}
            className="border border-[#07332F]/20 rounded-lg p-6 hover:border-[#F7A582] cursor-pointer transition-all"
          >
            <div className="flex gap-4">
              <div className="bg-[#F7A582]/20 p-4 rounded-full self-start">
                <FaUserMd className="text-2xl text-[#F7A582]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-[#07332F]">{doctor.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <FaClock className="text-[#F7A582]" />
                  <span>{doctor.duration}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <FaStar className="text-[#F7A582]" />
                  <span>{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <FaMoneyBillWave className="text-[#F7A582]" />
                  <span>{doctor.price}</span>
                </div>
                <div className="mt-3">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    doctor.priority === 'High' ? 'bg-red-100 text-red-800' :
                    doctor.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {doctor.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-[#F7A582] text-white rounded-lg flex items-center gap-2 hover:bg-[#F7A582]/90 transition-colors"
        >
          Next: Date & Time <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

function DateTimePicker({ formData, setFormData, nextStep, prevStep }) {
  const months = ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"];
  
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const timeSlots = {
    "Morning": ["9:00 AM", "10:00 AM", "11:00 AM"],
    "Afternoon": ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
    "Evening": ["5:00 PM", "6:00 PM"]
  };

  const handleDateSelect = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    setFormData({ ...formData, date: date.toLocaleDateString() });
  };

  const handleMonthChange = (increment) => {
    setCurrentMonth(prev => {
      if (increment) return prev === 11 ? 0 : prev + 1;
      return prev === 0 ? 11 : prev - 1;
    });
    if (increment && currentMonth === 11) setCurrentYear(prev => prev + 1);
    if (!increment && currentMonth === 0) setCurrentYear(prev => prev - 1);
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Select Date & Time</h2>
      
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-[#07332F]">Select Date</h3>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleMonthChange(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &lt;
            </button>
            <span className="font-medium text-[#07332F]">
              {months[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={() => handleMonthChange(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 py-2 text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array(new Date(currentYear, currentMonth, 1).getDay()).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="h-12"></div>
          ))}
          
          {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
            const isSelected = selectedDate && 
                              selectedDate.getDate() === day && 
                              selectedDate.getMonth() === currentMonth;
            return (
              <button
                key={day}
                onClick={() => handleDateSelect(day)}
                className={`h-12 rounded-full flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[#F7A582] text-white' : 
                   'hover:bg-gray-100'}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-6 text-[#07332F]">Available Time Slots</h3>
        {Object.entries(timeSlots).map(([period, slots]) => (
          <div key={period} className="mb-6">
            <h4 className="font-medium mb-3 text-[#07332F]">{period}</h4>
            <div className="flex flex-wrap gap-3">
              {slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => {
                    setFormData({ ...formData, time: slot });
                    nextStep();
                  }}
                  className={`px-5 py-2 rounded-full border ${formData.time === slot ? 
                   'bg-[#F7A582] text-white border-[#F7A582]' : 
                   'border-[#07332F]/30 hover:border-[#F7A582]'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-12">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 text-[#07332F] hover:bg-gray-100 rounded-lg"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-8 py-3 bg-[#F7A582] text-white rounded-lg hover:bg-[#F7A582]/90 transition-colors"
        >
          Next: Your Details <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

function PatientDetails({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Your Details</h2>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#07332F]">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 border border-[#07332F]/30 rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#07332F]">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border border-[#07332F]/30 rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#07332F]">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 border border-[#07332F]/30 rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#07332F]">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full p-4 border border-[#07332F]/30 rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            placeholder="Any special requirements"
          />
        </div>

        <div className="flex justify-between mt-12">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-3 text-[#07332F] hover:bg-gray-100 rounded-lg"
          >
            <FaArrowLeft /> Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 bg-[#F7A582] text-white rounded-lg hover:bg-[#F7A582]/90 transition-colors"
          >
            Next: Summary <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}

function Summary({ formData, prevStep, handleSubmit }) {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Appointment Summary</h2>

      <div className="bg-[#07332F]/5 p-8 rounded-lg mb-8">
        <h3 className="text-xl font-medium mb-6 pb-2 border-b border-[#07332F]/20">Your Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Name:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Email:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Phone:</span>
            <span className="font-medium">{formData.phone}</span>
          </div>
          {formData.notes && (
            <div className="flex justify-between text-gray-700">
              <span>Notes:</span>
              <span className="font-medium">{formData.notes}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#07332F]/5 p-8 rounded-lg mb-12">
        <h3 className="text-xl font-medium mb-6 pb-2 border-b border-[#07332F]/20">Appointment Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Category:</span>
            <span className="font-medium">{formData.category}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Doctor:</span>
            <span className="font-medium">{formData.doctor}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Date:</span>
            <span className="font-medium">{formData.date}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Time:</span>
            <span className="font-medium">{formData.time}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 text-[#07332F] hover:bg-gray-100 rounded-lg"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-8 py-3 bg-[#F7A582] text-white rounded-lg hover:bg-[#F7A582]/90 transition-colors"
        >
          Book Appointment <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
