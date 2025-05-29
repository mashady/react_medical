import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  Edit3, 
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
    name: 'Dr. Michael Chen',
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
    const colors = {
      pending: 'bg-orange-100 text-orange-800',
      confirmed: 'bg-teal-100 text-teal-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const Sidebar = () => (
    <div className="w-64 bg-teal-800 shadow-lg h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-teal-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{doctorProfile.name}</h3>
            <p className="text-sm text-teal-200">{doctorProfile.specialty}</p>
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
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-teal-700 transition-colors ${
                activeTab === item.id ? 'bg-teal-700 text-orange-400 border-r-2 border-orange-400' : 'text-teal-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full flex items-center space-x-3 px-4 py-2 text-teal-100 hover:bg-teal-700 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{pendingAppointments.length}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{completedAppointments.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-teal-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Users className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todayAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{apt.patientName}</p>
                  <p className="text-sm text-gray-600">{apt.time} - {apt.type}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
              <Plus className="w-5 h-5 text-teal-600" />
              <span className="text-teal-600 font-medium">Add New Appointment</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="text-orange-600 font-medium">Update Availability</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-teal-600" />
              <span className="text-teal-600 font-medium">Send Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AppointmentsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Appointments Management</h2>
        <button className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(apt => (
                <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{apt.patientName}</p>
                      <p className="text-sm text-gray-600">{apt.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-gray-900">{apt.date}</p>
                      <p className="text-sm text-gray-600">{apt.time}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{apt.type}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                            className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-1 text-teal-600 hover:bg-teal-50 rounded" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded" title="Add Notes">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AvailabilityTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Availability Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Schedule</h3>
        <div className="space-y-4">
          {availability.map((day, index) => (
            <div key={day.day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
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
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-600">Available</span>
              </div>
              
              {day.isAvailable && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">From:</span>
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => {
                        const newAvailability = [...availability];
                        newAvailability[index].startTime = e.target.value;
                        setAvailability(newAvailability);
                      }}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">To:</span>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => {
                        const newAvailability = [...availability];
                        newAvailability[index].endTime = e.target.value;
                        setAvailability(newAvailability);
                      }}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors">
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Profile Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={doctorProfile.name}
              onChange={(e) => setDoctorProfile({...doctorProfile, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
            <input
              type="text"
              value={doctorProfile.specialty}
              onChange={(e) => setDoctorProfile({...doctorProfile, specialty: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={doctorProfile.email}
              onChange={(e) => setDoctorProfile({...doctorProfile, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={doctorProfile.phone}
              onChange={(e) => setDoctorProfile({...doctorProfile, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              value={doctorProfile.experience}
              onChange={(e) => setDoctorProfile({...doctorProfile, experience: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
            <input
              type="text"
              value={doctorProfile.education}
              onChange={(e) => setDoctorProfile({...doctorProfile, education: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={doctorProfile.address}
            onChange={(e) => setDoctorProfile({...doctorProfile, address: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={doctorProfile.bio}
            onChange={(e) => setDoctorProfile({...doctorProfile, bio: e.target.value})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

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