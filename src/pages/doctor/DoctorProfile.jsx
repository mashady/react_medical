import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Header from "../../components/Header";
import MedicalFooter from "../../components/footer.jsx";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const logo = "https://via.placeholder.com/120x40/07332f/ffffff?text=LOGO";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef();
  const heroRef = useRef();
  const doctorInfoRef = useRef();
  const descriptionRef = useRef();
  const servicesRef = useRef();
  const educationRef = useRef();
  const awardsRef = useRef();
  const skillsRef = useRef();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/doctors/${id}`
        );

        const doctorData = {
          name: `Dr. ${response.data.user.first_name} ${response.data.user.last_name}`,
          specialty: response.data.specialty.name,
          image:
            "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
          description: response.data.bio,
          longDescription: response.data.bio,
          openingHours: {
            "Monday–Friday": "8:00 – 7:00 pm",
            Saturday: "9:00 – 4:00 pm",
            Sunday: "10:00 – 4:00 pm",
          },
          services: [
            `${response.data.specialty.name} Consultation`,
            `${response.data.specialty.name} Diagnosis`,
            `${response.data.specialty.name} Treatment`,
            "Follow-up Care",
            "Preventive Care",
          ],
          education: [
            { degree: "MD", institution: "University of Medicine" },
            {
              degree: `${response.data.specialty.name} Fellowship`,
              institution: "Medical Center",
            },
          ],
          awards: ["Medical Excellence Award", "Patient Choice Award"],
          skills: [
            { name: "Diagnosis", percentage: 90 },
            { name: "Treatment", percentage: 85 },
            { name: "Patient Care", percentage: 95 },
          ],
          contact: response.data.contact_number,
        };

        setDoctor(doctorData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  // Custom cursor functionality
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
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
      gsap.from(descriptionRef.current?.querySelectorAll("*"), {
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
  };

  const handleHoverLeave = () => {
    setIsHovering(false);
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

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#fff8f4] flex items-center justify-center">
        <div className="text-2xl text-[#00292e]">Doctor not found</div>
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

      <Header />

      <section
        ref={heroRef}
        className="bg-[#07332f] from-teal-800 to-teal-900 text-white py-20 px-6 relative overflow-hidden "
      >
        <h1 className="text-[#F7A582] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center relative z-10">
          {doctor.name}
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
        className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg"
      >
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 bg-[#003b36] text-white p-10 flex flex-col justify-center">
          <h3 className="text-sm uppercase tracking-widest text-[#ffb492] font-semibold">
            {doctor.specialty}
          </h3>
          <h2 className="text-3xl font-bold text-[#ffb492] mt-2 mb-4">
            {doctor.name}
          </h2>
          <p className="text-gray-200 leading-relaxed">{doctor.description}</p>

          {/* Contact Info */}
          <div className="mt-4">
            <p className="text-gray-200">
              <span className="font-semibold">Contact:</span> {doctor.contact}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-[#ffb492] text-xl">
            <a href="#" className="hover:text-orange-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-orange-400">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="hover:text-orange-400">
              <i className="fab fa-facebook-f"></i>
            </a>
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
      <MedicalFooter />
    </div>
  );
}
