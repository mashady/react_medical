import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaNotesMedical } from 'react-icons/fa';



export default function ServiceSelection({ formData, setFormData, nextStep }) {
  const categories = ["ALL", "Conditiony", "Nonordery", "Prednisolous", "Contendency"];
  const doctors = [
    { id: 1, name: "Dr. David Lee", duration: "30m", specialty: "Cardiology", status: "Available" },
    { id: 2, name: "Dr. Sarah Smith", duration: "45m", specialty: "Pediatrics", status: "Available" },
    { id: 3, name: "Dr. Michael Johnson", duration: "30m", specialty: "Orthopedics", status: "Limited" }
  ];

  const filteredDoctors = formData.category === 'ALL' 
    ? doctors 
    : doctors.filter(doc => doc.specialty.toLowerCase().includes(formData.category.toLowerCase()));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUser className="text-[#F7A582]" />
        Select Service
      </h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Select Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFormData({ ...formData, category: cat })}
              className={`px-4 py-2 rounded-full text-sm ${formData.category === cat ? 
                'bg-[#07332F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Available Doctors</h3>
        <div className="space-y-3">
          {filteredDoctors.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => {
                setFormData({ ...formData, doctor: doc.name });
                nextStep();
              }}
              className={`p-4 border rounded-lg cursor-pointer transition-all
                ${formData.doctor === doc.name ? 'border-[#F7A582] bg-[#F7A582]/10' : 
                'hover:border-[#F7A582]'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{doc.name}</h4>
                  <p className="text-sm text-gray-600">{doc.specialty}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full 
                  ${doc.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                  {doc.status}
                </span>
              </div>
              <p className="mt-2 text-sm">Duration: {doc.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}