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

import PatientOverview from "./overView";
import EditPatientProfile from "./EditPatientProfile";
import PatientAppointments from "./PatientAppointments";


const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-64 bg-teal-800 shadow-lg h-screen fixed left-0 top-0">
    <div className="p-6 border-b border-teal-700">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">welcome Mostafa</h3>
          <p className="text-sm text-teal-200">Pateint</p>
        </div>
      </div>
    </div>

    <nav className="mt-6">
      {[
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "appointments", label: "Appointments", icon: Calendar },
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



const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mb-8">
            <div className="mb-6 flex items-center space-x-3">
                <User className="w-8 h-8 text-teal-700" />
                <h2 className="text-3xl font-bold text-teal-800">Patient Overview</h2>
            </div>
        </div>

        
        <div>
          {activeTab === "overview" &&  <PatientOverview />}
          {activeTab === "appointments" && <PatientAppointments />}
          {activeTab === "settings" && <EditPatientProfile />}
        </div>
      </div>
  );
};


export default PatientDashboard;
