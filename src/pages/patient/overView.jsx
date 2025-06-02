// import React, { useEffect, useState } from "react";
// import api from "../api"; // axios instance with interceptors if needed
// import { User, Mail, Phone, MapPin, BadgeInfo } from "lucide-react";

// const PatientOverview = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/api/patient-profile/")
//       .then((res) => {
//         setProfile(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load patient profile", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-gray-600">Loading patient data...</div>;
//   }

//   if (!profile) {
//     return <div className="text-red-600">No profile data available.</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-teal-800 flex items-center space-x-2">
//         <User className="w-6 h-6 text-teal-600" />
//         <span>Patient Overview</span>
//       </h2>

//       <div className="space-y-3 text-gray-800">
//         <div className="flex items-center space-x-2">
//           <User className="w-5 h-5 text-teal-500" />
//           <span><strong>Username:</strong> {profile.username}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Mail className="w-5 h-5 text-teal-500" />
//           <span><strong>Email:</strong> {profile.email}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <User className="w-5 h-5 text-teal-500" />
//           <span><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <BadgeInfo className="w-5 h-5 text-teal-500" />
//           <span><strong>Role:</strong> {profile.role}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Phone className="w-5 h-5 text-teal-500" />
//           <span><strong>Phone:</strong> {profile.phone_number}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <MapPin className="w-5 h-5 text-teal-500" />
//           <span><strong>Address:</strong> {profile.address || "N/A"}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientOverview;

import React from "react";
import { User, Mail, Phone, MapPin, BadgeInfo } from "lucide-react";

const PatientOverview = () => {
  const profile = {
    username: "mashady",
    email: "muhammedmashady@gmail.com",
    first_name: "muhammed",
    last_name: "ahmed",
    phone_number: "0123456789",
    address: "123 Street, Cairo, Egypt",
  };

  const info = [
    { icon: <User className="w-5 h-5 text-teal-600" />, label: "Username", value: profile.username },
    { icon: <Mail className="w-5 h-5 text-teal-600" />, label: "Email", value: profile.email },
    { icon: <User className="w-5 h-5 text-teal-600" />, label: "Full Name", value: `${profile.first_name} ${profile.last_name}` },
    { icon: <Phone className="w-5 h-5 text-teal-600" />, label: "Phone", value: profile.phone_number },
    { icon: <MapPin className="w-5 h-5 text-teal-600" />, label: "Address", value: profile.address },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 max-w-4xl mx-auto transition hover:shadow-xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {info.map((item, index) => (
      <div
        key={index}
        className="flex items-start space-x-4 p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-teal-500 transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="mt-1">{item.icon}</div>
        <div>
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-lg font-medium text-gray-900">{item.value}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default PatientOverview;

