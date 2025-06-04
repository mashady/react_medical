import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  Heart, 
  FileText, 
  Search, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Plus, 
  Edit3, 
  Eye, 
  Download,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Users
} from 'lucide-react';
import { useSelector } from 'react-redux';

const PatientDash = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get patient profile from Redux store
  const { profileData } = useSelector(state => state.user);
  const patientId = profileData?.id;

  const [patientProfile, setPatientProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    bloodType: '',
    allergies: [],
    conditions: [],
    emergencyContact: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Load user profile data from localStorage when component mounts
    const loadProfileData = () => {
      const userData = JSON.parse(localStorage.getItem('profileData'));
      console.log(userData);
      if (userData) {
        setPatientProfile({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          dateOfBirth: userData.dateOfBirth || '',
          bloodType: userData.bloodType || '',
          allergies: userData.allergies || [],
          conditions: userData.conditions || [],
          emergencyContact: userData.emergencyContact || ''
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

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.doctor?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed' || apt.status === 'pending');
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
              <h3 className="font-semibold text-white">{userData.name || 'Patient'}</h3>
              <p className="text-sm" style={{ color: '#FFF0E9' }}>Patient Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: Heart },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
            </div>
            <Calendar className="w-8 h-8" style={{ color: 'rgb(6, 45, 41)' }}/>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Completed Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{completedAppointments.length}</p>
            </div>
            <CheckCircle className="w-8 h-8" style={{ color: 'rgb(6, 45, 41)' }}/>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Health Score</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <Heart className="w-8 h-8" style={{ color: 'rgb(6, 45, 41)' }}/>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Today's Appointments</h3>
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
                    <p className="font-medium text-gray-900">{apt.doctor?.name}</p>
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

        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Health Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blood Type</span>
              <span className="font-semibold text-gray-900">{patientProfile.bloodType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Conditions</span>
              <span className="font-semibold text-gray-900">{patientProfile.conditions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Known Allergies</span>
              <span className="font-semibold text-gray-900">{patientProfile.allergies.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Emergency Contact</span>
              <span className="font-semibold text-gray-900">{patientProfile.emergencyContact}</span>
            </div>
          </div>
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
          <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
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
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{apt.doctor?.name}</p>
                          <p className="text-sm text-gray-500">{apt.doctor?.specialty}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-gray-900">{apt.date}</p>
                          <p className="text-sm text-gray-500">{formatTime(apt.start_time)}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{apt.type || 'Consultation'}</td>
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

  const ProfileTab = () => {
    const [editProfile, setEditProfile] = useState(patientProfile);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      // Load profile data when tab becomes active
      if (activeTab === 'profile') {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        setEditProfile({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          dateOfBirth: userData.dateOfBirth || '',
          bloodType: userData.bloodType || '',
          allergies: userData.allergies || [],
          conditions: userData.conditions || [],
          emergencyContact: userData.emergencyContact || ''
        });
      }
    }, [activeTab]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditProfile({ ...editProfile, [name]: value });
    };

    const handleArrayChange = (field, index, value) => {
      const newArray = [...editProfile[field]];
      newArray[index] = value;
      setEditProfile({ ...editProfile, [field]: newArray });
    };

    const handleAddItem = (field) => {
      setEditProfile({
        ...editProfile,
        [field]: [...editProfile[field], '']
      });
    };

    const handleRemoveItem = (field, index) => {
      const newArray = [...editProfile[field]];
      newArray.splice(index, 1);
      setEditProfile({
        ...editProfile,
        [field]: newArray
      });
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
          `http://localhost:8000/api/patients/profile/${patientId}/`,
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
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
        bloodType: userData.bloodType || '',
        allergies: userData.allergies || [],
        conditions: userData.conditions || [],
        emergencyContact: userData.emergencyContact || ''
      });
      setIsEditing(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-medium mb-4 text-gray-900">Personal Information</h3>
            <div className="space-y-4">
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
                <label className="block text-sm font-medium mb-2 text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editProfile.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
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
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-medium mb-4 text-gray-900">Medical Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Blood Type</label>
                <input
                  type="text"
                  name="bloodType"
                  value={editProfile.bloodType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={editProfile.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Allergies</label>
                <div className="space-y-2">
                  {editProfile.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={allergy}
                        onChange={(e) => handleArrayChange('allergies', index, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('allergies', index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleAddItem('allergies')}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Allergy</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Medical Conditions</label>
                <div className="space-y-2">
                  {editProfile.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={condition}
                        onChange={(e) => handleArrayChange('conditions', index, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('conditions', index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleAddItem('conditions')}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Condition</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
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
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'appointments':
        return <AppointmentsTab />;
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
          <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and health information</p>
        </div>
        
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default PatientDash;