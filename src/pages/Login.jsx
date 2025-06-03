import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Heart, Sparkles, ArrowRight } from "lucide-react";
import login from "../assets/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment form submitted:", formData);
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 left-10 w-2 h-2 rounded-full opacity-60 animate-pulse"
        style={{ backgroundColor: "#07332f" }}
      ></div>
      <div
        className="absolute top-40 right-16 w-1 h-1 rounded-full opacity-80 animate-ping"
        style={{ backgroundColor: "#07332f" }}
      ></div>
      <div
        className="absolute bottom-32 left-20 w-3 h-3 rounded-full opacity-40 animate-bounce"
        style={{ backgroundColor: "#07332f" }}
      ></div>
      <div
        className="absolute top-60 left-1/3 w-1 h-1 rounded-full opacity-70 animate-pulse"
        style={{ backgroundColor: "#07332f" }}
      ></div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex relative overflow-hidden"
      style={{ backgroundColor: "#07332f" }}
    >
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
        className={`flex-1 flex items-center justify-center p-8 relative z-10 transition-all duration-1000 ${
          isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        <div className="w-full max-w-md">
          {/* Logo with enhanced styling */}
          <div
            className={`flex items-center mb-12 transition-all duration-700 delay-200 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
          >
            <div className="relative">
              <div
                className="w-10 h-10 rounded-xl mr-4 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: "#f7a582" }}
              >
                <Heart className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: "#f7a582" }}
              ></div>
            </div>
            <span className="text-white text-2xl font-bold tracking-wide">
              CarePulse
            </span>
          </div>

          {/* Header with enhanced typography */}
          <div
            className={`mb-10 transition-all duration-700 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome back
              </h1>
              <Sparkles
                className="w-6 h-6 text-yellow-400 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Ready to manage your health journey? Let's get started.
            </p>
          </div>

          {/* Enhanced Form */}
          <div
            className={`space-y-8 transition-all duration-700 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Full Name */}
            <div className="relative group">
              <label
                htmlFor="fullName"
                className={`block text-sm mb-3 font-medium transition-colors duration-300 ${
                  focusedField === "fullName"
                    ? "text-gray-400"
                    : "text-gray-400"
                }`}
                style={{
                  color: focusedField === "fullName" ? "#f7a582" : "#9ca3af",
                }}
              >
                Full name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "fullName"
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                  style={{
                    color: focusedField === "fullName" ? "#f7a582" : "#6b7280",
                  }}
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField("")}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-gray-800/70"
                  style={{
                    borderColor:
                      focusedField === "fullName" ? "#f7a582" : "#374151",
                    "--tw-ring-color": "#f7a582",
                  }}
                  placeholder="Enter your full name"
                />
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                    focusedField === "fullName" ? "" : ""
                  }`}
                  style={{
                    background:
                      focusedField === "fullName"
                        ? `linear-gradient(to right, rgba(247, 165, 130, 0.1), rgba(247, 165, 130, 0.1))`
                        : "transparent",
                  }}
                ></div>
              </div>
            </div>

            {/* Email Address */}
            <div className="relative group">
              <label
                htmlFor="emailAddress"
                className={`block text-sm mb-3 font-medium transition-colors duration-300 ${
                  focusedField === "emailAddress"
                    ? "text-gray-400"
                    : "text-gray-400"
                }`}
                style={{
                  color:
                    focusedField === "emailAddress" ? "#f7a582" : "#9ca3af",
                }}
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "emailAddress"
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                  style={{
                    color:
                      focusedField === "emailAddress" ? "#f7a582" : "#6b7280",
                  }}
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("emailAddress")}
                  onBlur={() => setFocusedField("")}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-gray-800/70"
                  style={{
                    borderColor:
                      focusedField === "emailAddress" ? "#f7a582" : "#374151",
                    "--tw-ring-color": "#f7a582",
                  }}
                  placeholder="Enter your email address"
                />
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                    focusedField === "emailAddress" ? "" : ""
                  }`}
                  style={{
                    background:
                      focusedField === "emailAddress"
                        ? `linear-gradient(to right, rgba(247, 165, 130, 0.1), rgba(247, 165, 130, 0.1))`
                        : "transparent",
                  }}
                ></div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="relative group">
              <label
                htmlFor="phoneNumber"
                className={`block text-sm mb-3 font-medium transition-colors duration-300 ${
                  focusedField === "phoneNumber"
                    ? "text-gray-400"
                    : "text-gray-400"
                }`}
                style={{
                  color: focusedField === "phoneNumber" ? "#f7a582" : "#9ca3af",
                }}
              >
                Phone number
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "phoneNumber"
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                  style={{
                    color:
                      focusedField === "phoneNumber" ? "#f7a582" : "#6b7280",
                  }}
                />
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField("")}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-gray-800/70"
                  style={{
                    borderColor:
                      focusedField === "phoneNumber" ? "#f7a582" : "#374151",
                    "--tw-ring-color": "#f7a582",
                  }}
                  placeholder="Enter your phone number"
                />
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                    focusedField === "phoneNumber" ? "" : ""
                  }`}
                  style={{
                    background:
                      focusedField === "phoneNumber"
                        ? `linear-gradient(to right, rgba(247, 165, 130, 0.1), rgba(247, 165, 130, 0.1))`
                        : "transparent",
                  }}
                ></div>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="group w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden"
              style={{
                backgroundColor: "#f7a582",
                "--tw-ring-color": "#f7a582",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e6915b";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f7a582";
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center justify-center gap-2 relative z-10">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Enhanced Copyright */}
          <div
            className={`mt-16 transition-all duration-700 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          ></div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className={`flex-1 flex items-center justify-center relative transition-all duration-1000 delay-300 ${
          isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        {/* Background with subtle pattern */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#07332f" }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, rgba(247,165,130,0.3) 2px, transparent 0)`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>
        </div>

        {/* Floating accent elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-16 right-20 w-4 h-4 rounded-full animate-pulse"
            style={{ backgroundColor: "rgba(247, 165, 130, 0.6)" }}
          ></div>
          <div
            className="absolute bottom-20 left-16 w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: "rgba(247, 165, 130, 0.4)" }}
          ></div>
          <div
            className="absolute top-1/3 right-32 w-1 h-1 rounded-full animate-pulse delay-1000"
            style={{ backgroundColor: "rgba(247, 165, 130, 0.8)" }}
          ></div>
        </div>

        {/* Image Container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Image with enhanced styling */}
          <div className="relative mb-8">
            {/* Decorative background circle */}
            <div
              className="absolute inset-0 w-80 h-80 rounded-full blur-3xl opacity-20 transform scale-110"
              style={{ backgroundColor: "#f7a582" }}
            ></div>

            {/* Main image */}
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10">
              <img
                src={login}
                alt="Healthcare professional"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating medical icons around the image */}
            <div
              className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center animate-bounce shadow-lg"
              style={{ backgroundColor: "rgba(247, 165, 130, 0.9)" }}
            >
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div
              className="absolute top-8 -right-8 w-6 h-6 rounded-full flex items-center justify-center animate-pulse delay-500 shadow-lg"
              style={{ backgroundColor: "rgba(247, 165, 130, 0.8)" }}
            >
              <div className="w-3 h-0.5 bg-white"></div>
              <div className="absolute w-0.5 h-3 bg-white"></div>
            </div>
            <div
              className="absolute -bottom-2 -right-6 w-10 h-10 rounded-full flex items-center justify-center animate-bounce delay-1000 shadow-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: "#f7a582" }} />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h2 className="text-white text-3xl font-bold mb-4">
              Your Health, Our Priority
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
              Join thousands of patients who trust CarePulse for their
              healthcare management needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
