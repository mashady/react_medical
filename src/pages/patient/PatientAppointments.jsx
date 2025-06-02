import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  XCircle,
  Pencil,
  CheckCircle,
  X,
} from "lucide-react";

const appointmentsData = [
  { id: 1, date: "2025-06-05", time: "10:00 AM", location: "Clinic A, Cairo", status: "Scheduled" },
  { id: 2, date: "2025-06-10", time: "2:30 PM", location: "Clinic B, Giza", status: "Scheduled" },
  { id: 3, date: "2025-06-12", time: "9:00 AM", location: "Clinic C, Alexandria", status: "Scheduled" },
  { id: 4, date: "2025-06-15", time: "11:00 AM", location: "Clinic D, Luxor", status: "Scheduled" },
  { id: 5, date: "2025-06-18", time: "1:00 PM", location: "Clinic E, Aswan", status: "Scheduled" },
  { id: 6, date: "2025-06-20", time: "3:00 PM", location: "Clinic F, Hurghada", status: "Scheduled" },
];

const PAGE_SIZE = 3;

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [currentPage, setCurrentPage] = useState(1);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  
  const totalPages = Math.ceil(appointments.length / PAGE_SIZE);
  const currentAppointments = appointments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "Canceled" } : appt
      )
    );
  };

  const openRescheduleModal = (appt) => {
    setSelectedAppointment(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
    setNewDate("");
    setNewTime("");
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!newDate || !newTime) return alert("Please select both date and time.");

    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedAppointment.id
          ? { ...appt, date: newDate, time: newTime, status: "Rescheduled" }
          : appt
      )
    );

    closeModal();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center space-x-2">
        <CalendarDays className="w-6 h-6 text-teal-600" />
        <span>My Appointments</span>
      </h2>

      <div className="space-y-6">
        {currentAppointments.map((appt) => (
          <div
            key={appt.id}
            className="border rounded-xl p-5 shadow-sm bg-gray-50 hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <div className="space-y-1">
                <p className="flex items-center space-x-2 text-gray-700">
                  <CalendarDays className="w-5 h-5 text-teal-500" />
                  <span>{appt.date}</span>
                </p>
                <p className="flex items-center space-x-2 text-gray-700">
                  <Clock className="w-5 h-5 text-teal-500" />
                  <span>{appt.time}</span>
                </p>
                <p className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  <span>{appt.location}</span>
                </p>
                <p className="flex items-center space-x-2 text-sm text-gray-600">
                  {appt.status === "Canceled" ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : appt.status === "Rescheduled" ? (
                    <Pencil className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span>Status: {appt.status}</span>
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="px-4 py-1 text-sm text-red-600 border border-red-500 rounded-md hover:bg-red-100"
                  disabled={appt.status !== "Scheduled"}
                >
                  Cancel
                </button>
                <button
                  onClick={() => openRescheduleModal(appt)}
                  className="px-4 py-1 text-sm text-blue-600 border border-blue-500 rounded-md hover:bg-blue-100"
                  disabled={appt.status !== "Scheduled"}
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

     
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-teal-800">Reschedule Appointment</h3>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  New Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  New Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
