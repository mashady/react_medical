import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ⬅️ مهم

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Registration form submitted:", formData);
    // يمكنك إرسال البيانات إلى الخادم هنا
  };

  const handleNavigateToLogin = () => {
    navigate("/login"); // ⬅️ توجيه إلى صفحة تسجيل الدخول
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-lg mr-3 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-white text-xl font-semibold">CarePulse</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-white text-3xl font-light mb-2">
              Create Account 📋
            </h1>
            <p className="text-gray-400 text-sm">
              Join CarePulse for better healthcare management.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {/* Full Name */}
            <InputField
              id="fullName"
              name="fullName"
              icon={<User />}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              label="Full name"
            />

            {/* Email */}
            <InputField
              id="emailAddress"
              name="emailAddress"
              icon={<Mail />}
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Enter your email address"
              label="Email address"
            />

            {/* Phone */}
            <InputField
              id="phoneNumber"
              name="phoneNumber"
              icon={<Phone />}
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              label="Phone number"
            />

            {/* Date of Birth */}
            <InputField
              id="dateOfBirth"
              name="dateOfBirth"
              icon={<Calendar />}
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              label="Date of birth"
            />

            {/* Address */}
            <InputField
              id="address"
              name="address"
              icon={<MapPin />}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              label="Address"
            />

            {/* Emergency Contact */}
            <InputField
              id="emergencyContact"
              name="emergencyContact"
              icon={<UserCheck />}
              type="tel"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Emergency contact number"
              label="Emergency contact"
            />

            {/* Password */}
            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              show={showPassword}
              setShow={setShowPassword}
            />

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <button
              onClick={handleNavigateToLogin}
              className="text-green-500 hover:text-green-400 font-medium"
            >
              Sign In
            </button>
          </p>

          {/* Copyright */}
          <p className="mt-8 text-gray-600 text-xs text-center">
            © itsmeankur copyright
          </p>
        </div>
      </div>

      {/* Right Side Illustration */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
          <div className="relative w-80 h-96 bg-gradient-to-b from-green-200 to-green-300 rounded-2xl opacity-90 flex flex-col items-center justify-center">
            <div className="text-8xl mb-4">📋</div>
            <div className="text-2xl mb-2">🏥</div>
            <div className="flex space-x-2">
              <div className="text-3xl">👨‍⚕️</div>
              <div className="text-3xl">👩‍⚕️</div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center opacity-70">
              <div className="text-2xl">✅</div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-200 rounded-full flex items-center justify-center opacity-70">
              <div className="text-3xl">🔒</div>
            </div>
            <div className="absolute top-1/4 -left-8 w-12 h-12 bg-green-200 rounded-full flex items-center justify-center opacity-60">
              <div className="text-xl">📱</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable input component
const InputField = ({
  id,
  name,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  label,
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-400 text-sm mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500">
        {icon}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
      />
    </div>
  </div>
);

// Reusable password field with toggle
const PasswordField = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  show,
  setShow,
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-400 text-sm mb-1">
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

export default Register;
