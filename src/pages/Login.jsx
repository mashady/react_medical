import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserData, setProfileData, setLoading, setError } from '../features/auth/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchProfileData = async (userId, role) => {
    try {
      let profileUrl = '';
      if (role === 'doctor') {
        profileUrl = `http://localhost:8000/api/doctor/profile/${userId}/`;
      } else if (role === 'patient') {
        profileUrl = `http://localhost:8000/api/patients/by-user/${userId}/`;
      }

      if (profileUrl) {
        const response = await axios.get(profileUrl, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        dispatch(setProfileData(response.data));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      // You can choose to handle this error or ignore it if profile is not critical
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    dispatch(setLoading(true));
    
    try {
      const response = await axios.post('/api/login/', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login successful:', response.data);
      
      // Save tokens and user data
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      
      // Dispatch user data to Redux store
      dispatch(setUserData(response.data.user));
      
      // Fetch and store profile data based on user role
      await fetchProfileData(response.data.user.id, response.data.user.role);
      
      // Redirect based on role
      if (response.data.user.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (response.data.user.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (response.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      }
      
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      dispatch(setError(error.response?.data?.detail || 'Login failed'));
      
      if (error.response?.data) {
        if (error.response.data.detail) {
          setErrors({ serverError: error.response.data.detail });
        } else {
          setErrors(prev => ({
            ...prev,
            ...error.response.data
          }));
        }
      } else {
        setErrors({ serverError: 'An error occurred during login. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#07332f' }}>
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Login Successful!</h2>
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
              Welcome Back to 
              <span className="block font-semibold" style={{ color: '#F7A582' }}>Your Health Portal</span>
            </h1>
            <p className="text-teal-200 text-base leading-relaxed">
              Sign in to access your personalized healthcare dashboard.
            </p>
          </div>

          {errors.serverError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {errors.serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="text-right">
              <a href="/forgot-password" className="text-teal-300 text-sm hover:underline" style={{ color: '#F7A582' }}>
                Forgot password?
              </a>
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
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-teal-300 text-sm">
              Don't have an account? <a href="/register" className="underline" style={{ color: '#F7A582' }}>Register here</a>
            </p>
          </div>

          <div className="mt-8">
            <p className="text-teal-400 text-xs text-center">
              © 2024 MediPro Healthcare - All rights reserved
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="w-full h-full">
          <img 
            src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/home-faq-img.jpg" 
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
    </div>
  );
};

export default Login;