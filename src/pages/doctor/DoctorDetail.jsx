import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const doctorsData = {
  "david-lee": {
    name: "Dr. David Lee",
    specialty: "Cardiologist",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    description:
      "Dr. David Lee is a highly accomplished and compassionate physician, serving as our Chief Medical Officer with 12+ years of experience in cardiology. He is dedicated to improving the lives of his patients and strengthening local healthcare systems.",
    longDescription:
      "As a board-certified cardiologist, Dr. David Lee has specialized expertise in diagnosing and treating heart-related conditions. His dedication to patient care and innovative treatment approaches have made him a respected leader in the medical community.\n\nDr. Lee is known for his thorough approach to patient care, combining cutting-edge medical technology with compassionate bedside manner. He currently practices at Urban Clinic in San Diego, CA.",
    openingHours: {
      "Monday–Friday": "8:00 – 7:00 pm",
      Saturday: "9:00 – 4:00 pm",
      Sunday: "10:00 – 4:00 pm",
    },
    services: [
      "Cardiac Health Solutions",
      "Heart Disease Prevention",
      "Cardiovascular Surgery",
      "Emergency Cardiac Care 24/7",
      "Rapid Patient Assessment",
      "Cardiac Research Programs",
      "Advanced Heart Treatment",
    ],
    education: [
      { degree: "MD", institution: "University of California" },
      {
        degree: "Cardiology Fellowship",
        institution: "Stanford Medical Center",
      },
    ],
    awards: [
      "Best Cardiologist Award",
      "Patient Choice Awards",
      "Medical Excellence Award",
      "Innovation in Healthcare",
    ],
    skills: [
      { name: "Cardiac Diagnosis", percentage: 95 },
      { name: "Surgical Expertise", percentage: 88 },
      { name: "Patient Care", percentage: 92 },
    ],
  },
};

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [currentDoctorId, setCurrentDoctorId] = useState("david-lee");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef();
  const heroRef = useRef();
  const doctorInfoRef = useRef();
  const descriptionRef = useRef();
  const servicesRef = useRef();
  const educationRef = useRef();
  const awardsRef = useRef();
  const skillsRef = useRef();
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  useEffect(() => {
    const doctorData = doctorsData[currentDoctorId];
    setDoctor(doctorData);
  }, [currentDoctorId]);

  // Custom cursor functionality
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      gsap.to(cursorRef.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(cursorDotRef.current, {
        x: e.clientX - 3,
        y: e.clientY - 3,
        duration: 0.05,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!doctor) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current.querySelector("h1"), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Floating dots animation
      gsap.to(".floating-dot", {
        y: -20,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Doctor info section
      gsap.from(doctorInfoRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: doctorInfoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Description section
      gsap.from(descriptionRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Services grid animation
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Education cards
      gsap.from(".education-card", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: educationRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Awards animation
      gsap.from(".award-card", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: awardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Skills bars animation
      gsap.from(".skill-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate skill bars
      gsap.from(".skill-bar", {
        width: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax effect for hero background
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
    }, containerRef);

    return () => ctx.revert();
  }, [doctor]);

  // Cursor hover effects
  const handleHoverEnter = () => {
    setIsHovering(true);
    gsap.to(cursorRef.current, {
      scale: 2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleHoverLeave = () => {
    setIsHovering(false);
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#fff8f4] flex items-center justify-center">
        <div className="text-2xl text-[#00292e]">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-[#fff8f4] min-h-screen text-[#00292e] relative"
    >
      {/* Custom Cursor */}
      <div
        className={`fixed top-0 left-0 w-6 h-6 bg-[#f7a582] rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${
          isHovering ? "scale-150 bg-teal-600" : "scale-100"
        }`}
        style={{
          transform: `translate(${cursorPos.x - 12}px, ${cursorPos.y - 12}px)`,
        }}
      />
      <div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-[#f7a582] rounded-full pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          transform: `translate(${cursorPos.x - 24}px, ${
            cursorPos.y - 24
          }px) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      <header className="bg-[#07332f] text-white py-4 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              About Us
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Services
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Pages
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Contact Us
            </a>
            <button
              className="text-[#F7A582] hover:bg-[#3f2e27] px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Book Appointment
            </button>
          </nav>
        </div>
      </header>

      <section
        ref={heroRef}
        className="bg-[#07332f] from-teal-800 to-teal-900 text-white py-20 px-6 relative overflow-hidden"
      >
        <h1 className="text-[#F7A582] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center relative z-10">
          {doctorsData["david-lee"].name}
        </h1>
        <div className="space-y-6">
          <div className="absolute top-20 -left-8 w-6 h-6 bg-[#F7A582] rounded-full opacity-80 floating-dot"></div>
          <div className="absolute bottom-32 -left-12 w-4 h-4 bg-white rounded-full opacity-60 floating-dot"></div>
          <div className="absolute top-40 right-8 w-3 h-3 bg-[#F7A582] rounded-full opacity-70 floating-dot"></div>
        </div>
      </section>

      {/* Doctor Info */}
      <div
        ref={doctorInfoRef}
        className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-8 items-center"
      >
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="bg-[#00292e] text-white p-8 rounded-lg shadow-lg">
          <h3 className="text-sm text-[#ffb492] uppercase font-semibold tracking-wider">
            {doctor.specialty}
          </h3>
          <h2 className="text-3xl font-bold mt-2 mb-6">{doctor.name}</h2>
          <p className="leading-relaxed text-gray-200">{doctor.description}</p>
          <div className="flex gap-4 mt-6">
            <div
              className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center cursor-none hover:bg-opacity-80 transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <i className="fab fa-facebook-f text-[#00292e]"></i>
            </div>
            <div
              className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center cursor-none hover:bg-opacity-80 transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <i className="fab fa-twitter text-[#00292e]"></i>
            </div>
            <div
              className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center cursor-none hover:bg-opacity-80 transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <i className="fab fa-linkedin-in text-[#00292e]"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Opening Hours */}
      <div
        ref={descriptionRef}
        className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 mt-16"
      >
        <div className="md:col-span-2">
          <h4 className="text-sm text-[#ffb492] uppercase font-semibold tracking-wider">
            {doctor.specialty}
          </h4>
          <h2 className="text-2xl font-bold mb-6">{doctor.name}</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            {doctor.longDescription.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <div
              className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center cursor-none hover:bg-opacity-80 transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <i className="fab fa-facebook text-white"></i>
            </div>
            <div
              className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center cursor-none hover:bg-opacity-80 transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <i className="fab fa-twitter text-white"></i>
            </div>
            <div
              className="w-10 h-10 bg-[#ffb492] rounded-full flex items-center justify-center cursor-none hover:bg-opacity-80 transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <i className="fab fa-linkedin text-white"></i>
            </div>
          </div>
        </div>
        <div className="bg-[#ffb492] text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-clock text-lg"></i>
            </div>
            <h3 className="text-xl font-bold">Opening Hours</h3>
          </div>
          <ul className="space-y-2">
            {Object.entries(doctor.openingHours).map(([day, time]) => (
              <li key={day} className="flex justify-between text-sm">
                <span className="font-medium">{day}:</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services */}
      <div ref={servicesRef} className="max-w-6xl mx-auto px-4 mt-16">
        <h4 className="text-sm text-[#ffb492] uppercase font-semibold tracking-wider">
          Services
        </h4>
        <h2 className="text-2xl font-bold mb-8">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctor.services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#ffb492] hover:shadow-md transition-shadow cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <p className="text-gray-700 font-medium">{service}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div ref={educationRef} className="max-w-6xl mx-auto px-4 mt-16">
        <h4 className="text-sm text-[#ffb492] uppercase font-semibold tracking-wider">
          Education
        </h4>
        <h2 className="text-2xl font-bold mb-8">
          {doctor.name.split(" ")[1]} {doctor.name.split(" ")[2]}
        </h2>
        <div className="space-y-4">
          {doctor.education.map((edu, index) => (
            <div
              key={index}
              className="education-card bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#00292e]"
            >
              <p className="text-lg font-bold text-[#00292e]">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div ref={awardsRef} className="max-w-6xl mx-auto px-4 mt-16">
        <h4 className="text-sm text-[#ffb492] uppercase font-semibold tracking-wider">
          Awards
        </h4>
        <h2 className="text-2xl font-bold mb-8">My Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctor.awards.map((award, index) => (
            <div
              key={index}
              className="award-card bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-none"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-[#ffb492] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-trophy text-white text-2xl"></i>
              </div>
              <p className="text-gray-700 font-medium">{award}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div ref={skillsRef} className="max-w-6xl mx-auto px-4 mt-16 mb-16">
        <h4 className="text-sm text-[#ffb492] uppercase font-semibold tracking-wider">
          Skills
        </h4>
        <h2 className="text-2xl font-bold mb-8">My Skills</h2>
        <div className="space-y-6">
          {doctor.skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-800">{skill.name}</p>
                <span className="text-sm font-bold text-[#00292e]">
                  {skill.percentage}%
                </span>
              </div>
              <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="skill-bar bg-gradient-to-r from-[#00292e] to-[#ffb492] h-full rounded-full"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MedicalFooter />
    </div>
  );
}
