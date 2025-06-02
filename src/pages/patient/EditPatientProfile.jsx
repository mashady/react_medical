import React, { useState } from "react";
import { User, Mail, Phone, MapPin, BadgeInfo, Save } from "lucide-react";

const EditPatientProfile = () => {
  const [formData, setFormData] = useState({
    username: "mashady",
    email: "muhammedmashady@gmail.com",
    first_name: "muhammed",
    last_name: "ahmed",
    phone_number: "0123456789",
    address: "123 Street, Cairo, Egypt",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 max-w-3xl mx-auto transition hover:shadow-xl">
      <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center space-x-2">
        <User className="w-6 h-6 text-teal-600" />
        <span>Edit Patient Profile</span>
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Username", name: "username", icon: <User /> },
          { label: "Email", name: "email", icon: <Mail /> },
          { label: "First Name", name: "first_name", icon: <User /> },
          { label: "Last Name", name: "last_name", icon: <User /> },
          { label: "Phone Number", name: "phone_number", icon: <Phone /> },
          { label: "Address", name: "address", icon: <MapPin /> },
        ].map((field, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <label className="text-sm text-gray-600 flex items-center space-x-2">
              <span className="text-teal-600">{field.icon}</span>
              <span>{field.label}</span>
            </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-gray-800"
            />
          </div>
        ))}

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientProfile;
