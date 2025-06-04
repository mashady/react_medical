import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Bell,
  Settings,
  LogOut,
  Plus,
  Filter,
  Search,
  Eye,
  FileText
} from 'lucide-react';
import { useSelector } from 'react-redux';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);
  
  // Get doctor profile from Redux store
  const { profileData } = useSelector(state => state.user);
  const doctorId = profileData?.id;

  // Initialize with all days of week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const initialAvailability = daysOfWeek.map(day => ({
    id: null,
    day_of_week: day,
    start_time: '',
    end_time: '',
    isAvailable: false
  }));

  const [availability, setAvailability] = useState(initialAvailability);
  const [doctorProfile, setDoctorProfile] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    experience: '',
    education: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Load user profile data from localStorage when component mounts
    const loadProfileData = () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log(userData)
      if (userData) {
        setDoctorProfile({
          name: userData.name || '',
          specialty: userData.specialty || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          bio: userData.bio || '',
          experience: userData.experience || '',
          education: userData.education || ''
        });
      }
    };

    loadProfileData();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const axios = (await import('axios')).default;
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(
          'http://localhost:8000/api/appointments/my-appointments/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Fetched appointments:', response.data);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (doctorId && activeTab === 'availability') {
      fetchAvailability();
    }
  }, [doctorId, activeTab]);

  const fetchAvailability = async () => {
    if (!doctorId) return;
    
    setAvailabilityLoading(true);
    setAvailabilityError(null);
    
    try {
      const axios = (await import('axios')).default;
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(
        `http://localhost:8000/api/availability/doctor/?doctor_id=${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      console.log('Fetched availability:', response.data);
      
      // Merge API data with our initial structure
      const updatedAvailability = initialAvailability.map(day => {
        const apiDay = response.data.find(d => d.day_of_week === day.day_of_week);
        if (apiDay) {
          return {
            ...apiDay,
            isAvailable: true,
            start_time: apiDay.start_time ? apiDay.start_time.slice(0, 5) : '', // Remove seconds
            end_time: apiDay.end_time ? apiDay.end_time.slice(0, 5) : '' // Remove seconds
          };
        }
        return day;
      });
      
      setAvailability(updatedAvailability);
    } catch (err) {
      console.error('Error fetching availability:', err);
      setAvailabilityError(err.response?.data?.message || err.message);
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const saveAvailability = async () => {
    if (!doctorId) return;
    
    setAvailabilityLoading(true);
    setAvailabilityError(null);
    
    try {
      const axios = (await import('axios')).default;
      const accessToken = localStorage.getItem('accessToken');
      
      // Prepare data for API - only include available days
      const availabilityData = availability
        .filter(item => item.isAvailable)
        .map(item => ({
          id: item.id || null, // Include ID for updates, null for new entries
          day_of_week: item.day_of_week,
          start_time: item.start_time ? `${item.start_time}:00` : null,
          end_time: item.end_time ? `${item.end_time}:00` : null,
          doctor: doctorId
        }));
      
      // First, delete all existing availability
      await axios.delete(
        `http://localhost:8000/api/availability/doctor/delete-all/?doctor_id=${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      // Then create new availability entries
      const response = await axios.post(
        'http://localhost:8000/api/availability/create-multiple/',
        availabilityData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      console.log('Saved availability:', response.data);
      // Refresh availability data
      await fetchAvailability();
    } catch (err) {
      console.error('Error saving availability:', err);
      setAvailabilityError(err.response?.data?.message || err.message);
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  const StatusBadge = ({ status }) => {
    const bgColors = {
      pending: '#F59E0B',
      confirmed: '#3B82F6',
      completed: '#10B981',
      cancelled: '#EF4444'
    };
    
    return (
      <span 
        className="px-2 py-1 rounded-full text-xs font-medium text-white"
        style={{ backgroundColor: bgColors[status] }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const Sidebar = () => {
    // Get user data from localStorage for sidebar display
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    return (
      <div className="w-64 h-screen fixed left-0 top-0" style={{ backgroundColor: '#062D29' }}>
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f7a582' }}>
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{userData.name || 'Doctor'}</h3>
              <p className="text-sm" style={{ color: '#FFF0E9' }}>{userData.specialty || 'Specialty'}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: Calendar },
            { id: 'appointments', label: 'Appointments', icon: Clock },
            { id: 'availability', label: 'Availability', icon: Settings },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  isActive ? 'border-r-2' : ''
                }`}
                style={{
                  backgroundColor: isActive ? 'rgba(247, 165, 130, 0.2)' : 'transparent',
                  color: isActive ? '#f7a582' : '#FFF0E9',
                  borderColor: isActive ? '#f7a582' : 'transparent'
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg"
            style={{ color: '#FFF0E9' }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" style={{
              color: 'rgb(6, 45, 41)',
            }}/>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{pendingAppointments.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" style={{
              color: 'rgb(6, 45, 41)',
            }}/>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{completedAppointments.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" style={{
              color: 'rgb(6, 45, 41)',
            }}/>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Users className="w-8 h-8 text-indigo-500" style={{
              color: 'rgb(6, 45, 41)',
            }}/>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Today's Schedule</h3>
          {loading ? (
            <p>Loading appointments...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : todayAppointments.length === 0 ? (
            <p>No appointments scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todayAppointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{apt.patient.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatTime(apt.start_time)} - {apt.notes || 'No notes'}
                    </p>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const AppointmentsTab = () => {
    const [localSearch, setLocalSearch] = useState(searchTerm);

    const handleSearch = () => {
      setSearchTerm(localSearch);
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Appointments Management</h2>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                style={{ backgroundColor: 'rgb(6, 45, 41)' }}
              >
                Search
              </button>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <p>Loading appointments...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredAppointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Notes</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{apt.patient.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-gray-900">{apt.date}</p>
                          <p className="text-sm text-gray-500">
                            {formatTime(apt.start_time)} - {formatTime(apt.end_time)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{apt.notes || '-'}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={apt.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AvailabilityTab = () => {
    const handleTimeChange = (index, field, value) => {
      const newAvailability = [...availability];
      newAvailability[index][field] = value;
      setAvailability(newAvailability);
    };

    const handleAvailabilityToggle = (index, isAvailable) => {
      const newAvailability = [...availability];
      newAvailability[index].isAvailable = isAvailable;
      
      // Reset times if making unavailable
      if (!isAvailable) {
        newAvailability[index].start_time = '';
        newAvailability[index].end_time = '';
      }
      
      setAvailability(newAvailability);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Availability Management</h2>
        
        {availabilityError && (
          <div className="p-4 rounded-lg bg-red-100 text-red-700">
            {availabilityError}
          </div>
        )}
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Weekly Schedule</h3>
          
          {availabilityLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {availability.map((day, index) => (
                <div key={day.day_of_week} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                  <div className="w-24">
                    <span className="font-medium text-gray-900">{day.day_of_week}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={day.isAvailable}
                      onChange={(e) => handleAvailabilityToggle(index, e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">Available</span>
                  </div>
                  
                  {day.isAvailable && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">From:</span>
                        <input
                          type="time"
                          value={day.start_time || ''}
                          onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)}
                          className="px-3 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">To:</span>
                        <input
                          type="time"
                          value={day.end_time || ''}
                          onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)}
                          className="px-3 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              style={{ backgroundColor: 'rgb(6, 45, 41)' }}
              onClick={saveAvailability}
              disabled={availabilityLoading}
            >
              {availabilityLoading ? 'Saving...' : 'Save Availability'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProfileTab = () => {
    const [editProfile, setEditProfile] = useState(doctorProfile);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      // Load profile data when tab becomes active
      if (activeTab === 'profile') {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        setEditProfile({
          name: userData.name || '',
          specialty: userData.specialty || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          bio: userData.bio || '',
          experience: userData.experience || '',
          education: userData.education || ''
        });
      }
    }, [activeTab]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditProfile({ ...editProfile, [name]: value });
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = async () => {
      try {
        const axios = (await import('axios')).default;
        const accessToken = localStorage.getItem('accessToken');
        
        // Update profile in backend
        const response = await axios.put(
          `http://localhost:8000/api/doctor/profile/${doctorId}/`,
          editProfile,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          }
        );
        
        console.log('Profile updated:', response.data);
        
        // Update localStorage
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const updatedUserData = { ...userData, ...editProfile };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        
        setIsEditing(false);
      } catch (err) {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      }
    };

    const handleCancel = () => {
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      setEditProfile({
        name: userData.name || '',
        specialty: userData.specialty || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || '',
        experience: userData.experience || '',
        education: userData.education || ''
      });
      setIsEditing(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Profile Management</h2>
          {!isEditing ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              style={{ backgroundColor: 'rgb(6, 45, 41)' }}
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          ) : null}
        </div>
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={editProfile.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Specialty</label>
              <input
                type="text"
                name="specialty"
                value={editProfile.specialty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editProfile.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={editProfile.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                value={editProfile.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Education</label>
              <input
                type="text"
                name="education"
                value={editProfile.education}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={editProfile.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              disabled={!isEditing}
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={editProfile.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              disabled={!isEditing}
            />
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                style={{ backgroundColor: 'rgb(6, 45, 41)' }}
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'appointments':
        return <AppointmentsTab />;
      case 'availability':
        return <AvailabilityTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and availability</p>
        </div>
        
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default DoctorDashboard;