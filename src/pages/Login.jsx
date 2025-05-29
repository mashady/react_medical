import React, { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <div className="w-8 h-8 bg-green-500 rounded-lg mr-3 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-white text-xl font-semibold">CarePulse</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-light mb-2">
              Hi there, 👋
            </h1>
            <p className="text-gray-400 text-sm">
              Get Started with Appointments.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-gray-400 text-sm mb-2"
              >
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="name"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-gray-400 text-sm mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="email"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-gray-400 text-sm mb-2"
              >
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="phone number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Get Started
            </button>
          </div>

          {/* Copyright */}
          <div className="mt-12">
            <p className="text-gray-600 text-xs text-center">
              © itsmeankur copyright
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Healthcare Professional Image Placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Main doctor figure */}
              <div className="w-80 h-96 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full opacity-90 flex items-end justify-center">
                <div className="w-32 h-40 bg-white rounded-t-full mb-8 flex items-center justify-center">
                  <div className="text-6xl">👩‍⚕️</div>
                </div>
              </div>

              {/* Background figures */}
              <div className="absolute -left-16 top-8 w-24 h-32 bg-blue-200 rounded-full opacity-60 flex items-end justify-center">
                <div className="w-8 h-12 bg-white rounded-t-full mb-2 flex items-center justify-center">
                  <div className="text-xl">👨‍⚕️</div>
                </div>
              </div>

              <div className="absolute -right-12 top-16 w-20 h-28 bg-blue-200 rounded-full opacity-60 flex items-end justify-center">
                <div className="w-6 h-10 bg-white rounded-t-full mb-2 flex items-center justify-center">
                  <div className="text-lg">👨‍⚕️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
