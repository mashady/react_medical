import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaNotesMedical } from 'react-icons/fa';


export default function DateTimePicker({ formData, setFormData, nextStep, prevStep }) {
  const months = ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"];
  
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Generate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Time slots
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
    if (increment) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-[#F7A582]" />
        Select Date & Time
      </h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Date</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleMonthChange(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              &lt;
            </button>
            <span className="font-medium">
              {months[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={() => handleMonthChange(true)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center text-sm font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array(firstDayOfMonth).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="h-10"></div>
          ))}
          
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const isSelected = selectedDate && 
                              selectedDate.getDate() === day && 
                              selectedDate.getMonth() === currentMonth;
            return (
              <button
                key={day}
                onClick={() => handleDateSelect(day)}
                className={`h-10 rounded-full flex items-center justify-center
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
        <h3 className="text-lg font-medium mb-3">Available Time Slots</h3>
        {Object.entries(timeSlots).map(([period, slots]) => (
          <div key={period} className="mb-4">
            <h4 className="font-medium mb-2">{period}</h4>
            <div className="flex flex-wrap gap-2">
              {slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => {
                    setFormData({ ...formData, time: slot });
                    nextStep();
                  }}
                  className={`px-4 py-2 rounded-full text-sm
                    ${formData.time === slot ? 
                     'bg-[#07332F] text-white' : 
                     'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-4 py-2 text-[#07332F] hover:bg-gray-100 rounded"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
    </div>
  );
}