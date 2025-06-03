import React, { useState } from 'react';
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

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      date: '2024-05-30',
      time: '09:00 AM',
      status: 'confirmed',
      type: 'Consultation',
      phone: '+1234567890'
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      date: '2024-05-30',
      time: '10:30 AM',
      status: 'pending',
      type: 'Follow-up',
      phone: '+1234567891'
    },
    {
      id: 3,
      patientName: 'Mike Wilson',
      date: '2024-05-30',
      time: '02:00 PM',
      status: 'confirmed',
      type: 'Consultation',
      phone: '+1234567892'
    },
    {
      id: 4,
      patientName: 'Emma Davis',
      date: '2024-05-31',
      time: '11:00 AM',
      status: 'completed',
      type: 'Check-up',
      phone: '+1234567893'
    }
  ]);

  const [availability, setAvailability] = useState([
    { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'Saturday', startTime: '10:00', endTime: '14:00', isAvailable: false },
    { day: 'Sunday', startTime: '', endTime: '', isAvailable: false }
  ]);

  const [doctorProfile, setDoctorProfile] = useState({
    name: 'Dr. Muhammed Samir',
    specialty: 'Cardiology',
    email: 'dr.chen@hospital.com',
    phone: '+1234567890',
    address: '123 Medical Center Blvd',
    bio: 'Experienced cardiologist with 15+ years in cardiovascular medicine.',
    experience: '15 years',
    education: 'MD - Harvard Medical School'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayAppointments = appointments.filter(apt => apt.date === '2024-05-30');
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

  const Sidebar = () => (
    <div className="w-64 h-screen fixed left-0 top-0" style={{ backgroundColor: '#062D29' }}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f7a582' }}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{doctorProfile.name}</h3>
            <p className="text-sm" style={{ color: '#FFF0E9' }}>{doctorProfile.specialty}</p>
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
          <div className="space-y-3">
            {todayAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{apt.patientName}</p>
                  <p className="text-sm text-gray-500">{apt.time} - {apt.type}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="p-6 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg bg-blue-50 text-blue-700">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add New Appointment</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg bg-indigo-50 text-indigo-700">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Update Availability</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg bg-purple-50 text-purple-700">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Send Notifications</span>
            </button>
          </div>
        </div> */}
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
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
                        <p className="font-medium text-gray-900">{apt.patientName}</p>
                        <p className="text-sm text-gray-500">{apt.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-gray-900">{apt.date}</p>
                        <p className="text-sm text-gray-500">{apt.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{apt.type}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={apt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AvailabilityTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Availability Management</h2>
      
      <div className="p-6 rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Weekly Schedule</h3>
        <div className="space-y-4">
          {availability.map((day, index) => (
            <div key={day.day} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
              <div className="w-24">
                <span className="font-medium text-gray-900">{day.day}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={day.isAvailable}
                  onChange={(e) => {
                    const newAvailability = [...availability];
                    newAvailability[index].isAvailable = e.target.checked;
                    setAvailability(newAvailability);
                  }}
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
                      value={day.startTime}
                      onChange={(e) => {
                        const newAvailability = [...availability];
                        newAvailability[index].startTime = e.target.value;
                        setAvailability(newAvailability);
                      }}
                      className="px-3 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">To:</span>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => {
                        const newAvailability = [...availability];
                        newAvailability[index].endTime = e.target.value;
                        setAvailability(newAvailability);
                      }}
                      className="px-3 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 " style={{
              backgroundColor: 'rgb(6, 45, 41)',
            }}>
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => {
    const [editProfile, setEditProfile] = useState(doctorProfile);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditProfile({ ...editProfile, [name]: value });
    };

    const handleSave = () => {
      console.log(editProfile);

    };

    const handleCancel = () => {
      setEditProfile(doctorProfile);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile Management</h2>
        
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
            />
          </div>
          
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