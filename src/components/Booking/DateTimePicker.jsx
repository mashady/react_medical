import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

export default function DateTimePicker({ formData, setFormData, nextStep, prevStep }) {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Hard-coded token as requested
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4OTc1NTU3LCJpYXQiOjE3NDg5NzUyNTcsImp0aSI6IjE3YTdhNjc2Y2IwNzQxYTg4YTFhZTdmZDE4M2IxMjU5IiwidXNlcl9pZCI6MTV9.HIwOQ-H08lUTyiGhmL1KfUDn4xjroT7MOxiatiMN024';

  // Days of the week mapping
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Fetch availabilities from API
  const fetchAvailabilities = async (doctor) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/availability/doctor/?doctor=${doctor.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      
      setAvailabilities(response.data);
    } catch (err) {
      console.error("Error fetching availabilities:", err);
      setError("Failed to load doctor's availability");
    } finally {
      setLoading(false);
    }
  };

  // Load availabilities when component mounts or doctor changes
  useEffect(() => {
    if (formData.doctor) {
      fetchAvailabilities(formData.doctor);
    }
  }, [formData.doctor]);

  // Generate future dates for the next 4 weeks that match doctor's available days
  const generateFutureDates = () => {
    const futureDates = [];
    const today = new Date();
    const availableDays = availabilities.map(avail => avail.day_of_week);
    
    // Generate dates for the next 4 weeks
    for (let week = 0; week < 1; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() + (week * 7) + day);
        
        const dayName = daysOfWeek[date.getDay()];
        
        if (availableDays.includes(dayName) && date >= today) {
          const availability = availabilities.find(avail => avail.day_of_week === dayName);
          futureDates.push({
            date: date,
            dayName: dayName,
            availability: availability
          });
        }
      }
    }
    
    return futureDates.sort((a, b) => a.date - b.date);
  };

  // Generate time slots for a specific availability
  const generateTimeSlots = (availability) => {
    const slots = [];
    const startTime = availability.start_time.substring(0, 5); // Remove seconds
    const endTime = availability.end_time.substring(0, 5);
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    // Generate 1-hour slots
    for (let minutes = startMinutes; minutes < endMinutes; minutes += 60) {
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;
      const slotStart = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      
      const nextHour = Math.floor((minutes + 60) / 60);
      const nextMin = (minutes + 60) % 60;
      const slotEnd = `${nextHour.toString().padStart(2, '0')}:${nextMin.toString().padStart(2, '0')}`;
      
      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        displayTime: formatTime(slotStart)
      });
    }
    
    return slots;
  };

  // Format time from 24h to 12h format
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Group time slots by period
  const categorizeTimeSlots = (slots) => {
    const categories = {
      "Morning": [],
      "Afternoon": [],
      "Evening": []
    };

    slots.forEach(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      if (hour < 12) {
        categories.Morning.push(slot);
      } else if (hour < 17) {
        categories.Afternoon.push(slot);
      } else {
        categories.Evening.push(slot);
      }
    });

    return categories;
  };

  // Handle date selection
  const handleDateSelect = (dateInfo) => {
    setSelectedDate(dateInfo);
    setSelectedTimeSlot(null);
    setFormData({ 
      ...formData, 
      date: dateInfo.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      time: null,
      availabilityId: dateInfo.availability.id,
      dayOfWeek: dateInfo.dayName
    });
  };

  // Handle time slot selection
  const handleTimeSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setFormData({ 
      ...formData, 
      time: timeSlot.displayTime,
      start_time: timeSlot.startTime,
      end_time: timeSlot.endTime
    });
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const futureDates = generateFutureDates();
  const timeSlots = selectedDate ? categorizeTimeSlots(generateTimeSlots(selectedDate.availability)) : {};

  if (!formData.doctor) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Please select a doctor first to view available dates and times.</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Select Date & Time</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="text-[#07332F]">Loading doctor's availability...</div>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h3 className="text-xl font-medium mb-6 text-[#07332F]">Available Dates</h3>
            
            {futureDates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No available dates found for this doctor
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {futureDates.map((dateInfo, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(dateInfo)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedDate?.date.getTime() === dateInfo.date.getTime()
                        ? 'border-[#F7A582] bg-[#F7A582]/10'
                        : 'border-gray-200 hover:border-[#F7A582]/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-[#07332F]">{dateInfo.dayName}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatDate(dateInfo.date)}
                    </div>
                    <div className="text-sm text-[#F7A582] mt-2">
                      {formatTime(dateInfo.availability.start_time)} - {formatTime(dateInfo.availability.end_time)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedDate && (
            <div>
              <h3 className="text-xl font-medium mb-6 text-[#07332F]">
                Available Time Slots for {formatDate(selectedDate.date)}
              </h3>
              
              {Object.entries(timeSlots).map(([period, slots]) => (
                slots.length > 0 && (
                  <div key={period} className="mb-6">
                    <h4 className="font-medium mb-3 text-[#07332F]">{period}</h4>
                    <div className="flex flex-wrap gap-3">
                      {slots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(slot)}
                          className={`px-5 py-2 rounded-full border transition-colors ${
                            selectedTimeSlot?.startTime === slot.startTime ? 
                            'bg-[#F7A582] text-white border-[#F7A582]' : 
                            'border-[#07332F]/30 hover:border-[#F7A582]'
                          }`}
                        >
                          {slot.displayTime}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-between mt-12">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 text-[#07332F] hover:bg-gray-100 rounded-lg"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={nextStep}
          disabled={!formData.time || !formData.date}
          className={`flex items-center gap-2 px-8 py-3 bg-[#F7A582] text-white rounded-lg hover:bg-[#F7A582]/90 transition-colors ${
            (!formData.time || !formData.date) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next: Your Details <FaArrowRight />
        </button>
      </div>
    </div>
  );
}