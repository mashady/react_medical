import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function PatientDetails({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-8 text-[#07332F]">Additional Info</h2>

      <form className="space-y-6">
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