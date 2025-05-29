import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Calendar,
  Activity,
  Settings,
  Shield,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  LogOut,
  Database,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. Michael Chen",
      email: "dr.chen@hospital.com",
      role: "doctor",
      specialty: "Cardiology",
      status: "approved",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      email: "dr.johnson@hospital.com",
      role: "doctor",
      specialty: "Neurology",
      status: "pending",
      joinDate: "2024-05-28",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "patient",
      specialty: "",
      status: "approved",
      joinDate: "2024-03-10",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      role: "patient",
      specialty: "",
      status: "blocked",
      joinDate: "2024-02-20",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Smith",
      doctorName: "Dr. Michael Chen",
      date: "2024-05-30",
      time: "09:00 AM",
      status: "confirmed",
      specialty: "Cardiology",
    },
    {
      id: 2,
      patientName: "Emma Davis",
      doctorName: "Dr. Sarah Johnson",
      date: "2024-05-30",
      time: "10:30 AM",
      status: "pending",
      specialty: "Neurology",
    },
    {
      id: 3,
      patientName: "Mike Wilson",
      doctorName: "Dr. Michael Chen",
      date: "2024-05-31",
      time: "02:00 PM",
      status: "completed",
      specialty: "Cardiology",
    },
  ]);

  const [specialties, setSpecialties] = useState([
    { id: 1, name: "Cardiology", doctorCount: 5 },
    { id: 2, name: "Neurology", doctorCount: 3 },
    { id: 3, name: "Pediatrics", doctorCount: 4 },
    { id: 4, name: "Gastrology", doctorCount: 2 },
  ]);

  const updateUserStatus = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800",
      approved: "bg-teal-100 text-teal-800",
      blocked: "bg-red-100 text-red-800",
      confirmed: "bg-teal-100 text-teal-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const Sidebar = () => (
    <div className="w-64 bg-teal-800 shadow-lg h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-teal-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Admin Panel</h3>
            <p className="text-sm text-teal-200">System Administrator</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "users", label: "User Management", icon: Users },
          { id: "appointments", label: "Appointments", icon: Calendar },
          { id: "specialties", label: "Specialties", icon: Database },
          { id: "settings", label: "Settings", icon: Settings },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-teal-700 transition-colors ${
                activeTab === item.id
                  ? "bg-teal-700 text-orange-400 border-r-2 border-orange-400"
                  : "text-teal-100"
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
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-teal-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Doctors
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  users.filter(
                    (u) => u.role === "doctor" && u.status === "approved"
                  ).length
                }
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Appointments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-teal-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Approvals
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter((u) => u.status === "pending").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Users
          </h3>
          <div className="space-y-3">
            {users.slice(0, 4).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">
                      {user.role} • {user.joinDate}
                    </p>
                  </div>
                </div>
                <StatusBadge status={user.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Sessions</span>
              <span className="font-semibold text-gray-900">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today's Appointments</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">System Health</span>
              <span className="text-teal-600 font-semibold">Excellent</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Backup</span>
              <span className="font-semibold text-gray-900">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
        <button className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  User
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Specialty
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Join Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "doctor"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">
                    {user.specialty || "N/A"}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="py-4 px-4 text-gray-900">{user.joinDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {user.status === "pending" && (
                        <button
                          onClick={() => updateUserStatus(user.id, "approved")}
                          className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                          title="Approve"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      {user.status === "approved" && (
                        <button
                          onClick={() => updateUserStatus(user.id, "blocked")}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Block"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                      {user.status === "blocked" && (
                        <button
                          onClick={() => updateUserStatus(user.id, "approved")}
                          className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                          title="Unblock"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
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

  const AppointmentsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Appointments Overview
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Patient
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Doctor
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Date & Time
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Specialty
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {apt.patientName}
                  </td>
                  <td className="py-4 px-4 text-gray-900">{apt.doctorName}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-gray-900">{apt.date}</p>
                      <p className="text-sm text-gray-600">{apt.time}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{apt.specialty}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-teal-600 hover:bg-teal-50 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
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

  const SpecialtiesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Specialty Management
        </h2>
        <button className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Specialty</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{specialty.name}</h3>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-2xl font-bold text-teal-600">
              {specialty.doctorCount}
            </p>
            <p className="text-sm text-gray-600">Active Doctors</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "users":
        return <UsersTab />;
      case "appointments":
        return <AppointmentsTab />;
      case "specialties":
        return <SpecialtiesTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage users, appointments, and system settings
          </p>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;
