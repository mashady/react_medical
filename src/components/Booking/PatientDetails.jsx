import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaNotesMedical } from 'react-icons/fa';


export default function PatientDetails({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUser className="text-[#F7A582]" />
        Patient Details
      </h2>

      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F7A582] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-4 py-2 text-[#07332F] hover:bg-gray-100 rounded"
          >
            <FaArrowLeft /> Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-4 py-2 bg-[#07332F] text-white rounded hover:bg-[#07332F]/90"
          >
            Continue <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}