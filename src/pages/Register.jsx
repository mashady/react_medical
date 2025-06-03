import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Heart,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import login from "../assets/login.jpg"; // You can change this to a different image if needed

// Move FormField OUTSIDE of Register component
const FormField = ({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  hasToggle = false,
  className = "",
  formData,
  handleChange,
  focusedField,
  setFocusedField,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
}) => (
  <div className={`relative group ${className}`}>
    <label
      htmlFor={name}
      className={`block text-xs mb-2 font-medium transition-colors duration-300 ${
        focusedField === name ? "text-emerald-400" : "text-gray-400"
      }`}
    >
      {label}
    </label>
    <div className="relative">
      <Icon
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
          focusedField === name ? "text-emerald-400" : "text-gray-500"
        }`}
      />
      <input
        id={name}
        name={name}
        type={
          hasToggle
            ? name === "password"
              ? showPassword
                ? "text"
                : "password"
              : showConfirmPassword
              ? "text"
              : "password"
            : type
        }
        value={formData[name]}
        onChange={handleChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField("")}
        className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl py-2.5 pl-11 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 hover:bg-gray-800/70 text-sm"
        placeholder={placeholder}
        style={hasToggle ? { paddingRight: "2.5rem" } : {}}
      />
      {hasToggle && (
        <button
          type="button"
          onClick={() =>
            name === "password"
              ? setShowPassword((prev) => !prev)
              : setShowConfirmPassword((prev) => !prev)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors duration-300"
          aria-label={`${
            name === "password"
              ? showPassword
                ? "Hide"
                : "Show"
              : showConfirmPassword
              ? "Hide"
              : "Show"
          } password`}
        >
          {(name === "password" ? showPassword : showConfirmPassword) ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
          focusedField === name
            ? "bg-gradient-to-r from-emerald-400/10 to-green-400/10"
            : ""
        }`}
      ></div>
    </div>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Registration form submitted:", formData);
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-16 w-1 h-1 bg-green-300 rounded-full opacity-80 animate-ping"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-teal-300 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute top-60 left-1/3 w-1 h-1 bg-lime-300 rounded-full opacity-70 animate-pulse"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex relative overflow-hidden">
      <FloatingElements />

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Left Side - Form */}
      <div
        className={`flex-1 flex items-center justify-center p-6 relative z-10 transition-all duration-1000 ${
          isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        <div className="w-full max-w-lg">
          {/* Logo with enhanced styling */}
          <div
            className={`flex items-center mb-6 transition-all duration-700 delay-200 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl mr-3 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-white text-xl font-bold tracking-wide">
              CarePulse
            </span>
          </div>

          {/* Header with enhanced typography */}
          <div
            className={`mb-6 transition-all duration-700 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Join CarePulse
              </h1>
              <Sparkles
                className="w-5 h-5 text-yellow-400 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create your account and start your healthcare journey with us.
            </p>
          </div>

          {/* Enhanced Form */}
          <div
            className={`transition-all duration-700 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Two-column grid for compact layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Full name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                icon={User}
                formData={formData}
                handleChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <FormField
                label="Email address"
                name="emailAddress"
                type="email"
                placeholder="Enter your email address"
                icon={Mail}
                formData={formData}
                handleChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <FormField
                label="Phone number"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                icon={Phone}
                formData={formData}
                handleChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <FormField
                label="Date of birth"
                name="dateOfBirth"
                type="date"
                placeholder=""
                icon={Calendar}
                formData={formData}
                handleChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            </div>

            {/* Full-width fields */}
            <div className="space-y-4 mb-4">
              <FormField
                label="Address"
                name="address"
                type="text"
                placeholder="Enter your address"
                icon={MapPin}
                formData={formData}
                handleChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  icon={Lock}
                  hasToggle={true}
                  formData={formData}
                  handleChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  showPassword={showPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowPassword={setShowPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />

                <FormField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  icon={Lock}
                  hasToggle={true}
                  formData={formData}
                  handleChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  showPassword={showPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowPassword={setShowPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="group w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <button className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300 hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className={`flex-1 flex items-center justify-center relative transition-all duration-1000 delay-300 ${
          isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30px 30px, rgba(52,211,153,0.3) 2px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Floating accent elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-20 w-4 h-4 bg-emerald-400/60 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-2 h-2 bg-green-400/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-32 w-1 h-1 bg-teal-400/80 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Image Container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Image with enhanced styling */}
          <div className="relative mb-8">
            {/* Decorative background circles */}
            <div className="absolute inset-0 w-80 h-80 rounded-full blur-3xl opacity-20 transform scale-110 bg-gradient-to-br from-emerald-400 to-green-500"></div>

            {/* Main image */}
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-emerald-400/20">
              <img
                src={login}
                alt="Healthcare professional"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay gradient for better visual appeal */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating medical icons around the image */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-8 -right-8 w-6 h-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse delay-500 shadow-lg">
              <div className="w-3 h-0.5 bg-white"></div>
              <div className="absolute w-0.5 h-3 bg-white"></div>
            </div>
            <div className="absolute -bottom-2 -right-6 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce delay-1000 shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-12 -left-8 w-7 h-7 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center animate-pulse delay-700 shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Secure & Trusted
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
              Your personal health information is protected with
              enterprise-grade security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
