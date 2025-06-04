import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

export default function Summary({ formData, prevStep, handleSubmit }) {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Appointment Summary</h2>
      <div className="bg-[#07332F]/5 p-8 rounded-lg mb-12">
        <h3 className="text-xl font-medium mb-6 pb-2 border-b border-[#07332F]/20">Appointment Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Category:</span>
            <span className="font-medium">{formData.category}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Doctor:</span>
            <span className="font-medium">{formData.doctor.user.username}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Date:</span>
            <span className="font-medium">{formData.date}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Time:</span>
            <span className="font-medium">{formData.time}</span>
          </div>
          {formData.notes && (
            <div className="flex justify-between text-gray-700">
              <span>Notes:</span>
              <span className="font-medium">{formData.notes}</span>
            </div>
          )}
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