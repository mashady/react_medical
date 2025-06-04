import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom"; 
{
  Phone,
  Stethoscope,
  Search,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Filter,}
 from "lucide-react";
import Header from "../../components/Header";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock components and assets
const MedicalFooter = () => (
  <footer className="bg-[#07332f] text-white py-8 px-6 mt-16">
    <div className="max-w-6xl mx-auto text-center">
      <p>&copy; 2024 Urban Clinic. All rights reserved.</p>
    </div>
  </footer>
);

const logo = "https://via.placeholder.com/120x40/07332f/ffffff?text=LOGO";

const DoctorCard = ({ doctor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Added useNavigate hook

  const renderStars = (rating) => {
    rating = rating || 4.5;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-[#ffb492]">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-[#ffb492]">
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

  const doctorImage =
    doctor.image ||
    "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg";

  // Handle navigation
  const handleViewProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Navigating to doctor:", doctor.id);
    navigate(`/doctor/${doctor.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={doctorImage}
          alt={`Dr. ${doctor.user.first_name} ${doctor.user.last_name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Social Media Overlay */}
        <div
          className={`absolute inset-0 bg-[#00292e] bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex space-x-3">
            {[Instagram, Linkedin, Twitter, Facebook].map((Icon, index) => (
              <button
                key={index}
                className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center text-[#00292e] hover:bg-[#07332f] hover:text-[#ffb492] transition-colors duration-200 transform hover:scale-110"
                aria-label="Social Media"
                style={{ zIndex: 10, position: "relative" }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Specialty Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ffb492] text-[#00292e]">
            {doctor.specialty?.name || "General"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#00292e] mb-2">
          Dr. {doctor.user.first_name} {doctor.user.last_name}
        </h3>

        {/* Rating and Experience */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {renderStars(doctor.rating)}
            <span className="ml-2 text-sm text-gray-600">
              ({doctor.rating || "N/A"})
            </span>
          </div>
          <span className="text-sm text-[#ffb492] font-medium">
            {doctor.experience || "N/A"} years exp.
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {doctor.bio || "Professional healthcare provider"}
        </p>

        {/* Contact Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-[#ffb492]" />
            <span className="text-sm font-medium">
              {doctor.contact_number || "N/A"}
            </span>
          </div>

          {/* FIXED BUTTON */}
          <button
            onClick={handleViewProfile}
            className="bg-[#00292e] hover:bg-[#07332f] text-[#ffb492] px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
            style={{
              zIndex: 100,
              position: "relative",
              pointerEvents: "auto",
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);

  // Filter state
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef();
  const heroRef = useRef();
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/doctors/");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();

        const transformedDoctors = data.map((doctor) => ({
          ...doctor,
          rating: doctor.rating || 4.5,
          experience: doctor.experience || 5,
          image:
            doctor.image ||
            "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
        }));

        setDoctors(transformedDoctors);
        setFilteredDoctors(transformedDoctors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors.filter((doctor) => {
      const nameMatch = `${doctor.user.first_name} ${doctor.user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const specialtyMatch =
        selectedSpecialty === "All" ||
        (doctor.specialty && doctor.specialty.name === selectedSpecialty);

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
    setCurrentPage(1);
  }, [searchQuery, doctors, selectedSpecialty, experienceFilter, ratingFilter]);

  // Custom cursor functionality - FIXED to not interfere with clicks
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.1,
          ease: "power2.out",
        });
      }

      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX - 3,
          y: e.clientY - 3,
          duration: 0.05,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating dots animation
      gsap.to(".floating-dot", {
        y: -20,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Parallax effect for hero background
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cursor hover effects - FIXED
  const handleHoverEnter = () => {
    setIsHovering(true);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleHoverLeave = () => {
    setIsHovering(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Get unique specialties
  const specialties = [
    "All",
    ...new Set(
      doctors
        .map((doctor) => doctor.specialty?.name)
        .filter((name) => name !== undefined)
    ),
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
      <div className="min-h-screen bg-[#fff8f4] flex items-center justify-center">
        <div className="text-2xl text-[#00292e]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff8f4] flex items-center justify-center">
        <div className="text-2xl text-[#00292e]">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-[#fff8f4] min-h-screen text-[#00292e] relative"
    >
      {/* Custom Cursor - FIXED with proper pointer-events */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 bg-[#f7a582] rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${
          isHovering ? "scale-150 bg-teal-600" : "scale-100"
        }`}
        style={{ pointerEvents: "none" }} // Ensure cursor doesn't block clicks
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-12 h-12 border-2 border-[#f7a582] rounded-full pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          transform: `scale(${isHovering ? 1.5 : 1})`,
          pointerEvents: "none", // Ensure cursor doesn't block clicks
        }}
      />

      <Header />

      <section
        ref={heroRef}
        className="bg-[#07332f] from-teal-800 to-teal-900 text-white py-20 px-6 relative overflow-hidden"
      >
        <h1 className="text-[#F7A582] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center relative z-10">
          Our Medical Team
        </h1>
        <div className="space-y-6">
          <div className="absolute top-20 -left-8 w-6 h-6 bg-[#F7A582] rounded-full opacity-80 floating-dot"></div>
          <div className="absolute bottom-32 -left-12 w-4 h-4 bg-white rounded-full opacity-60 floating-dot"></div>
          <div className="absolute top-40 right-8 w-3 h-3 bg-[#F7A582] rounded-full opacity-70 floating-dot"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Controls */}
        <div className="space-y-4 mb-12">
          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search doctor by name..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffb492] focus:border-transparent shadow-sm bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-[#ffb492] text-[#00292e] rounded-lg hover:bg-[#07332f] hover:text-[#ffb492] transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <Filter size={18} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-[#00292e] text-white rounded-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-medium text-[#ffb492] mb-2">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffb492] focus:border-transparent text-[#00292e]"
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
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
                  <label className="block text-sm font-medium text-[#ffb492] mb-2">
                    Experience (years)
                  </label>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffb492] focus:border-transparent text-[#00292e]"
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
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
                  <label className="block text-sm font-medium text-[#ffb492] mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffb492] focus:border-transparent text-[#00292e]"
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                  >
                    <option value="All">All Ratings</option>
                    <option value="4.5+">4.5+ Stars</option>
                    <option value="4.7+">4.7+ Stars</option>
                    <option value="4.8+">4.8+ Stars</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-[#ffb492]">
                  Showing {filteredDoctors.length} doctor
                  {filteredDoctors.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-[#ffb492] hover:text-white font-medium"
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <Stethoscope className="mx-auto h-12 w-12 text-[#ffb492] mb-4" />
            <p className="text-xl text-[#00292e] mb-4">
              No doctors found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#00292e] text-[#ffb492] rounded-lg hover:bg-[#07332f] transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-[#00292e]">
                Showing {indexOfFirstDoctor + 1}-
                {Math.min(indexOfLastDoctor, filteredDoctors.length)} of{" "}
                {filteredDoctors.length} doctors
              </p>
              <p className="text-[#00292e]">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 border border-[#00292e] rounded-md text-[#00292e] hover:text-[#ffb492] hover:bg-[#00292e] disabled:opacity-50 disabled:cursor-not-allowed"
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
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
                              ? "bg-[#00292e] text-[#ffb492]"
                              : "text-[#00292e] hover:bg-[#ffb492] hover:text-[#00292e]"
                          }`}
                          onMouseEnter={handleHoverEnter}
                          onMouseLeave={handleHoverLeave}
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
                          className="px-2 py-2 text-[#00292e]"
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
                  className="flex items-center px-3 py-2 border border-[#00292e] rounded-md text-[#00292e] hover:text-[#ffb492] hover:bg-[#00292e] disabled:opacity-50 disabled:cursor-not-allowed"
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <MedicalFooter />
    </div>
  );
};

export default DoctorsList;
