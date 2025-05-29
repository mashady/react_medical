import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaNotesMedical } from 'react-icons/fa';


export default function Summary({ formData, prevStep, handleSubmit }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaCheck className="text-[#F7A582]" />
        Appointment Summary
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4 border-b pb-2">Your Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formData.name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{formData.email || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{formData.phone || 'Not provided'}</span>
          </div>
        </div>

        <h3 className="text-lg font-medium mt-6 mb-4 border-b pb-2">Appointment Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Doctor:</span>
            <span className="font-medium">{formData.doctor || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{formData.date || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{formData.time || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Notes:</span>
            <span className="font-medium">{formData.notes || 'None'}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-[#07332F]">$100.00</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-4 py-2 text-[#07332F] hover:bg-gray-100 rounded"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-[#07332F] text-white rounded-lg hover:bg-[#07332F]/90"
        >
          Confirm Appointment <FaCheck />
        </button>
      </div>
    </div>
  );
}