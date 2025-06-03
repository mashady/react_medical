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
  Stethoscope,
  Activity,
  Pill,
  Shield,
  AlertCircle,
  CheckCircle,
  X,
  Filter,
  Users,
  CheckCircle as CheckCircleIcon,
  XCircle
} from 'lucide-react';

const PatientDash = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [patientInfo] = useState({
    id: 1,
    name: 'mashady',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: 'Jane Smith - +1 (555) 987-6543',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    conditions: ['Hypertension', 'Diabetes Type 2']
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: '2024-05-30',
      time: '09:00 AM',
      status: 'confirmed',
      type: 'Follow-up',
      location: 'Room 201, Cardiology Wing',
      phone: '+1 (555) 111-2222'
    },
    {
      id: 2,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Neurology',
      date: '2024-06-05',
      time: '02:30 PM',
      status: 'pending',
      type: 'Consultation',
      location: 'Room 304, Neurology Department',
      phone: '+1 (555) 333-4444'
    },
    {
      id: 3,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: '2024-05-15',
      time: '10:00 AM',
      status: 'completed',
      type: 'Check-up',
      location: 'Room 201, Cardiology Wing',
      phone: '+1 (555) 111-2222'
    }
  ]);

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      rating: 4.9,
      experience: '15 years',
      location: 'Cardiology Wing',
      phone: '+1 (555) 111-2222',
      email: 'dr.chen@hospital.com',
      availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialty: 'Neurology',
      rating: 4.8,
      experience: '12 years',
      location: 'Neurology Department',
      phone: '+1 (555) 333-4444',
      email: 'dr.johnson@hospital.com',
      availableSlots: ['08:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      experience: '10 years',
      location: 'Pediatrics Ward',
      phone: '+1 (555) 555-6666',
      email: 'dr.rodriguez@hospital.com',
      availableSlots: ['09:30 AM', '11:30 AM', '02:30 PM', '04:30 PM'],
      image: '/api/placeholder/64/64'
    },
    {
      id: 4,
      name: 'Dr. Robert Kim',
      specialty: 'Gastrology',
      rating: 4.7,
      experience: '18 years',
      location: 'Gastrology Department',
      phone: '+1 (555) 777-8888',
      email: 'dr.kim@hospital.com',
      availableSlots: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'],
      image: '/api/placeholder/64/64'
    }
  ]);

  const [medicalRecords] = useState([
    {
      id: 1,
      date: '2024-05-15',
      doctor: 'Dr. Michael Chen',
      type: 'Cardiology Consultation',
      diagnosis: 'Hypertension monitoring',
      notes: 'Blood pressure well controlled. Continue current medication.',
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      files: ['blood_test_results.pdf', 'ecg_report.pdf']
    },
    {
      id: 2,
      date: '2024-04-20',
      doctor: 'Dr. Sarah Johnson',
      type: 'Neurology Consultation',
      diagnosis: 'Migraine evaluation',
      notes: 'Recommended lifestyle changes and stress management.',
      medications: ['Sumatriptan 50mg (as needed)'],
      files: ['mri_scan.pdf']
    }
  ]);

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
            <h3 className="font-semibold text-white">{patientInfo.name}</h3>
            <p className="text-sm" style={{ color: '#FFF0E9' }}>Patient Portal</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'appointments', label: 'My Appointments', icon: Calendar },
          { id: 'doctors', label: 'Find Doctors', icon: Stethoscope },
          { id: 'records', label: 'Medical Records', icon: FileText },
          { id: 'profile', label: 'My Profile', icon: User }
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

  const DashboardTab = () => {
    const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed' || apt.status === 'pending');
    const completedAppointments = appointments.filter(apt => apt.status === 'completed');
    
    return (
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
                <p className="text-sm font-medium text-gray-700">Medical Records</p>
                <p className="text-2xl font-bold text-gray-900">{medicalRecords.length}</p>
              </div>
              <FileText className="w-8 h-8" style={{ color: 'rgb(6, 45, 41)' }}/>
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
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Next Appointments</h3>
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 3).map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{apt.doctorName}</p>
                    <p className="text-sm text-gray-500">{apt.date} • {apt.time}</p>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Health Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Blood Type</span>
                <span className="font-semibold text-gray-900">{patientInfo.bloodType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Conditions</span>
                <span className="font-semibold text-gray-900">{patientInfo.conditions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Known Allergies</span>
                <span className="font-semibold text-gray-900">{patientInfo.allergies.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Check-up</span>
                <span className="font-semibold text-gray-900">2024-05-15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white shadow-sm border border-orange-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800">Health Reminder</h4>
              <p className="text-sm text-orange-700 mt-1">
                Your next cardiology follow-up is scheduled for May 30th. Please remember to take your medications as prescribed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AppointmentsTab = () => {
    const [localSearch, setLocalSearch] = useState(searchTerm);
    const [statusFilter, setStatusFilter] = useState('all');

    const handleSearch = () => {
      setSearchTerm(localSearch);
    };

    const filteredAppointments = appointments.filter(apt => {
      const matchesSearch = apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">My Appointments</h2>
          <button 
            onClick={() => setActiveTab('doctors')}
            className="px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            style={{ backgroundColor: 'rgb(6, 45, 41)', color: 'white' }}
          >
            <Plus className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{apt.doctorName}</p>
                        <p className="text-sm text-gray-500">{apt.specialty}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-gray-900">{apt.date}</p>
                        <p className="text-sm text-gray-500">{apt.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{apt.type}</td>
                    <td className="py-4 px-4 text-gray-900">{apt.location}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {apt.status !== 'completed' && (
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Reschedule">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status === 'completed' && (
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Download Report">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
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
  };

  const DoctorsTab = () => {
    const filteredDoctors = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });

    const [localSearch, setLocalSearch] = useState(searchTerm);

    const handleSearch = () => {
      setSearchTerm(localSearch);
    };

    return (
      <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Find Doctors</h2>
      
      <div className="p-6 rounded-lg bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
          type="text"
          placeholder="Search doctors or specialties..."
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
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Gastrology">Gastrology</option>
        </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f7a582' }}>
            <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-gray-600 font-medium">{doctor.specialty}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{doctor.rating} • {doctor.experience}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{doctor.location}</span>
            </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Available today:</p>
            <div className="flex flex-wrap gap-2 mb-4">
            {doctor.availableSlots.slice(0, 3).map(slot => (
              <span key={slot} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {slot}
              </span>
            ))}
            {doctor.availableSlots.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              +{doctor.availableSlots.length - 3} more
              </span>
            )}
            </div>
            <div className="flex space-x-2">
            <button 
              onClick={() => {
              setSelectedDoctor(doctor);
              setShowBookingModal(true);
              }}
              className="flex-1 px-4 py-2 rounded-lg text-white hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: 'rgb(6, 45, 41)' }}
            >
              Book Appointment
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              View Profile
            </button>
            </div>
          </div>
          </div>
        ))}
        </div>
      </div>
      </div>
    );
  };

  const RecordsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>
      
      <div className="space-y-4">
        {medicalRecords.map(record => (
          <div key={record.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{record.type}</h3>
                <p className="text-sm text-gray-600">{record.date} • {record.doctor}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Download className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                <p className="text-gray-700 mb-4">{record.diagnosis}</p>
                
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-700">{record.notes}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Medications</h4>
                <ul className="space-y-1 mb-4">
                  {record.medications.map((med, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Pill className="w-4 h-4 mr-2" style={{ color: '#f7a582' }} />
                      {med}
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                <div className="space-y-2">
                  {record.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{file}</span>
                      <button className="hover:text-gray-800" style={{ color: '#f7a582' }}>
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
        <button 
          className="px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          style={{ backgroundColor: 'rgb(6, 45, 41)', color: 'white' }}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-gray-900">{patientInfo.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-900">{patientInfo.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <p className="text-gray-900">{patientInfo.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Date of Birth</label>
              <p className="text-gray-900">{patientInfo.dateOfBirth}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Address</label>
              <p className="text-gray-900">{patientInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Blood Type</label>
              <p className="text-gray-900">{patientInfo.bloodType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
              <p className="text-gray-900">{patientInfo.emergencyContact}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Known Allergies</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientInfo.allergies.map((allergy, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 rounded-full text-sm"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientInfo.conditions.map((condition, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 rounded-full text-sm"
                    style={{ backgroundColor: 'rgba(247, 165, 130, 0.2)', color: '#f7a582' }}
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingModal = () => {
    if (!showBookingModal || !selectedDoctor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Book Appointment</h3>
            <button 
              onClick={() => setShowBookingModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">Doctor: <span className="font-medium text-gray-900">{selectedDoctor.name}</span></p>
            <p className="text-gray-600">Specialty: <span className="font-medium text-gray-900">{selectedDoctor.specialty}</span></p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
            <div className="grid grid-cols-2 gap-2">
              {selectedDoctor.availableSlots.map(slot => (
                <button 
                  key={slot}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setShowBookingModal(false);
                alert('Appointment booked successfully!');
              }}
              className="flex-1 px-4 py-2 rounded-lg text-white hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: 'rgb(6, 45, 41)' }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'appointments':
        return <AppointmentsTab />;
      case 'doctors':
        return <DoctorsTab />;
      case 'records':
        return <RecordsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600">Manage your appointments, view records, and connect with healthcare providers</p>
        </div>
        
        {renderActiveTab()}
      </div>
      
      <BookingModal />
    </div>
  );
};

export default PatientDash;