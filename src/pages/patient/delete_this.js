import React, { useEffect, useState } from "react";
import {
  Phone,
  Stethoscope,
  Search,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const fakeDoctors = [
  {
    id: 1,
    user: { first_name: "Elizabeth", last_name: "Foster" },
    specialty: { name: "Cardiology" },
    bio: "Compassionate care for all ages.",
    contact_number: "0123456789",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    experience: 15,
    rating: 4.9,
  },
  {
    id: 2,
    user: { first_name: "David", last_name: "Lee" },
    specialty: { name: "Neurology" },
    bio: "Skilled hands, transforming lives.",
    contact_number: "0987654321",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    experience: 12,
    rating: 4.8,
  },
  {
    id: 3,
    user: { first_name: "Ava", last_name: "White" },
    specialty: { name: "Pediatrics" },
    bio: "Specializes in heart-related conditions.",
    contact_number: "0112233445",
    image:
      "https://images.unsplash.com/photo-1594824885935-fbb16723790d?w=400&h=400&fit=crop&crop=face",
    experience: 8,
    rating: 4.7,
  },
  {
    id: 4,
    user: { first_name: "Daniel", last_name: "Brown" },
    specialty: { name: "Dermatology" },
    bio: "Focuses on skin, hair disorders.",
    contact_number: "0223344556",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    experience: 10,
    rating: 4.6,
  },
  {
    id: 5,
    user: { first_name: "Jennifer", last_name: "Lee" },
    specialty: { name: "Dermatology" },
    bio: "Focuses on autoimmune diseases.",
    contact_number: "0334455667",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face",
    experience: 14,
    rating: 4.9,
  },
  {
    id: 6,
    user: { first_name: "Samantha", last_name: "Taylor" },
    specialty: { name: "Orthopedic Surgery" },
    bio: "Deals with conditions and injuries related.",
    contact_number: "0445566778",
    image:
      "https://images.unsplash.com/photo-1594824885935-fbb16723790d?w=400&h=400&fit=crop&crop=face",
    experience: 18,
    rating: 4.8,
  },
  {
    id: 7,
    user: { first_name: "Michael", last_name: "Johnson" },
    specialty: { name: "Neurology" },
    bio: "Treats disorders of the nervous system.",
    contact_number: "0556677889",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    experience: 20,
    rating: 4.9,
  },
  {
    id: 8,
    user: { first_name: "Laura", last_name: "Robinson" },
    specialty: { name: "General Surgery" },
    bio: "Common medical conditions, care and advice.",
    contact_number: "0667788990",
    image:
      "https://images.unsplash.com/photo-1594824885935-fbb16723790d?w=400&h=400&fit=crop&crop=face",
    experience: 16,
    rating: 4.7,
  },
  {
    id: 9,
    user: { first_name: "Robert", last_name: "Jones" },
    specialty: { name: "General Practitioner" },
    bio: "Provides primary care and guiding.",
    contact_number: "0778899001",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    experience: 11,
    rating: 4.5,
  },
  {
    id: 10,
    user: { first_name: "Sarah", last_name: "Wilson" },
    specialty: { name: "Cardiology" },
    bio: "Expert in cardiovascular diseases.",
    contact_number: "0889900112",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face",
    experience: 13,
    rating: 4.8,
  },
  {
    id: 11,
    user: { first_name: "James", last_name: "Miller" },
    specialty: { name: "Pediatrics" },
    bio: "Caring for children's health needs.",
    contact_number: "0990011223",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    experience: 9,
    rating: 4.6,
  },
  {
    id: 12,
    user: { first_name: "Emma", last_name: "Davis" },
    specialty: { name: "Orthopedic Surgery" },
    bio: "Specializing in joint replacement.",
    contact_number: "0101122334",
    image:
      "https://images.unsplash.com/photo-1594824885935-fbb16723790d?w=400&h=400&fit=crop&crop=face",
    experience: 17,
    rating: 4.9,
  },
];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);

  // Filter state
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(fakeDoctors);
      setFilteredDoctors(fakeDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = doctors.filter((doctor) => {
      const nameMatch = `${doctor.user.first_name} ${doctor.user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const specialtyMatch =
        selectedSpecialty === "All" ||
        doctor.specialty.name === selectedSpecialty;

      const experienceMatch =
        experienceFilter === "All" ||
        (experienceFilter === "0-5" && doctor.experience <= 5) ||
        (experienceFilter === "6-10" &&
          doctor.experience >= 6 &&
          doctor.experience <= 10) ||
        (experienceFilter === "11-15" &&
          doctor.experience >= 11 &&
          doctor.experience <= 15) ||
        (experienceFilter === "15+" && doctor.experience > 15);

      const ratingMatch =
        ratingFilter === "All" ||
        (ratingFilter === "4.5+" && doctor.rating >= 4.5) ||
        (ratingFilter === "4.7+" && doctor.rating >= 4.7) ||
        (ratingFilter === "4.8+" && doctor.rating >= 4.8);

      return nameMatch && specialtyMatch && experienceMatch && ratingMatch;
    });

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, doctors, selectedSpecialty, experienceFilter, ratingFilter]);

  // Get unique specialties
  const specialties = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialty.name)),
  ];

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSelectedSpecialty("All");
    setExperienceFilter("All");
    setRatingFilter("All");
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-600">
            Loading doctors...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Our Medical Team
          </h1>

          {/* Search and Filter Controls */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search doctor by name..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Filter Toggle Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Filter size={18} />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="bg-gray-100 rounded-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Specialty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience (years)
                    </label>
                    <select
                      value={experienceFilter}
                      onChange={(e) => setExperienceFilter(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Experience</option>
                      <option value="0-5">0-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Ratings</option>
                      <option value="4.5+">4.5+ Stars</option>
                      <option value="4.7+">4.7+ Stars</option>
                      <option value="4.8+">4.8+ Stars</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredDoctors.length} doctor
                    {filteredDoctors.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <Stethoscope className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              No doctors found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                Showing {indexOfFirstDoctor + 1}-
                {Math.min(indexOfLastDoctor, filteredDoctors.length)} of{" "}
                {filteredDoctors.length} doctors
              </p>
              <p className="text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentDoctors.map((doctor) => {
                const [isHovered, setIsHovered] = useState(false);

                const getSpecialtyColor = (specialty) => {
                  const colors = {
                    Cardiology: "bg-red-100 text-red-800",
                    Neurology: "bg-purple-100 text-purple-800",
                    Pediatrics: "bg-blue-100 text-blue-800",
                    Orthopedics: "bg-green-100 text-green-800",
                    Dermatology: "bg-pink-100 text-pink-800",
                    "Orthopedic Surgery": "bg-orange-100 text-orange-800",
                    "General Surgery": "bg-indigo-100 text-indigo-800",
                    "General Practitioner": "bg-teal-100 text-teal-800",
                  };
                  return colors[specialty] || "bg-gray-100 text-gray-800";
                };

                const renderStars = (rating) => {
                  const stars = [];
                  const fullStars = Math.floor(rating);
                  const hasHalfStar = rating % 1 !== 0;

                  for (let i = 0; i < fullStars; i++) {
                    stars.push(
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    );
                  }
                  if (hasHalfStar) {
                    stars.push(
                      <span key="half" className="text-yellow-400">
                        ☆
                      </span>
                    );
                  }
                  for (let i = stars.length; i < 5; i++) {
                    stars.push(
                      <span key={i} className="text-gray-300">
                        ★
                      </span>
                    );
                  }
                  return stars;
                };

                return (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={`Dr. ${doctor.user.first_name} ${doctor.user.last_name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Social Media Overlay */}
                      <div
                        className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="flex space-x-3">
                          {[Instagram, Linkedin, Twitter, Facebook].map(
                            (Icon, index) => (
                              <button
                                key={index}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200 transform hover:scale-110"
                                aria-label="Social Media"
                              >
                                <Icon size={18} />
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Specialty Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getSpecialtyColor(
                            doctor.specialty.name
                          )}`}
                        >
                          {doctor.specialty.name}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Dr. {doctor.user.first_name} {doctor.user.last_name}
                      </h3>

                      {/* Rating and Experience */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          {renderStars(doctor.rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({doctor.rating})
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                          {doctor.experience} years exp.
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {doctor.bio}
                      </p>

                      {/* Contact Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm font-medium">
                            {doctor.contact_number}
                          </span>
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;

                    // Show first page, last page, current page, and pages around current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-md font-medium ${
                            isCurrentPage
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) ||
                      (pageNumber === currentPage + 2 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="px-2 py-2 text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
