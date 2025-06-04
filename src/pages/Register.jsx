import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    role: "patient", 
    password: "",
    confirm_password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        phone_number: formData.phone_number
      };

      const response = await axios.post('/api/register/', payload);
      
      console.log('Registration successful:', response.data);
      
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('userData', JSON.stringify(response.data));
      
      if (response.data.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (response.data.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      }
      
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      
      if (error.response?.data) {
        setErrors(prev => ({
          ...prev,
          ...error.response.data
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#07332f' }}>
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
            <p className="text-teal-200 mb-8">You will be redirected shortly...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 relative overflow-hidden">
        <div className="w-full h-full">
          <img 
            src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/improving-img.jpg" 
            alt="Healthcare Team" 
            className="w-full h-full object-cover"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative" style={{ backgroundColor: '#07332f' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-white rounded-full"></div>
        </div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="flex items-center mb-12">
            <div className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #F7A582, #f09663)' }}>
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="text-white text-2xl font-bold">MediPro</span>
          </div>

          <div className="mb-8">
            <h1 className="text-white text-4xl font-light mb-3">
              Join Our 
              <span className="block font-semibold" style={{ color: '#F7A582' }}>Healthcare Family</span>
            </h1>
            <p className="text-teal-200 text-base leading-relaxed">
              Create your account and start experiencing premium healthcare services today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                First name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl py-4 pl-12 pr-4 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 ${
                    errors.first_name ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Enter your first name"
                />
              </div>
              {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Last name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl py-4 pl-12 pr-4 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 ${
                    errors.last_name ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Enter your last name"
                />
              </div>
              {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl py-4 pl-12 pr-4 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 ${
                    errors.username ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl py-4 pl-12 pr-4 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Phone number (optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300"
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-4 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 appearance-none"
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl py-4 pl-12 pr-12 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-teal-200 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl py-4 pl-12 pr-12 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:border-opacity-100 transition-all duration-300 ${
                    errors.confirm_password ? 'border-red-500' : 'border-white/20'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#F7A582',
                  }}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirm_password && <p className="mt-1 text-sm text-red-500">{errors.confirm_password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              style={{ 
                background: 'linear-gradient(135deg, #F7A582, #f09663)',
                '--tw-ring-color': '#F7A582',
                '--tw-ring-offset-color': '#07332f'
              }}
              onMouseEnter={(e) => !isSubmitting && (e.target.style.background = 'linear-gradient(135deg, #f09663, #eb8a4f)')}
              onMouseLeave={(e) => !isSubmitting && (e.target.style.background = 'linear-gradient(135deg, #F7A582, #f09663)')}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-teal-300 text-sm">
              Already have an account? <span className="cursor-pointer underline" style={{ color: '#F7A582' }}>Sign in here</span>
            </p>
          </div>

          <div className="mt-8">
            <p className="text-teal-400 text-xs text-center">
              © 2024 MediPro Healthcare - All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;