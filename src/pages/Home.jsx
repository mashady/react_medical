import React, { useEffect, useRef, useState } from "react";
import MedicalFooter from "../components/footer.jsx";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import logo from "../assets/logo.svg";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  Heart,
  Activity,
  Stethoscope,
  Users,
  Shield,
  Award,
  Clock,
  MapPin,
  Phone,
  User,
  Calendar,
  Microscope,
  Eye,
  Brain,
  Syringe,
  Pill,
  Baby,
  Dna,
  UserCheck,
  Thermometer,
  TestTube,
  HeartHandshake,
} from "lucide-react";

export default function MedicalClinicWebsite() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const cardsRef = useRef([]);
  const progressiveRef = useRef(null);
  const doctorsRef = useRef(null);
  const infrastructureRef = useRef(null);
  const doctors = [
    {
      name: "Dr. Elizabeth Porter",
      title: "Chief Medical Officer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. David Lee",
      title: "Cardiologist",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Dr. Ann Wilson",
      title: "Neurologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Dr. Daniel Roberts",
      title: "Pediatrician",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    script.onload = () => {
      const scrollTriggerScript = document.createElement("script");
      scrollTriggerScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
      scrollTriggerScript.async = true;
      scrollTriggerScript.onload = initAnimations;
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const initAnimations = () => {
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    gsap.fromTo(
      heroRef.current?.querySelector("h1"),
      { opacity: 0, x: -150, rotateX: 15 },
      { opacity: 1, x: 0, rotateX: 0, duration: 1.4, ease: "power3.out" }
    );

    gsap.fromTo(
      heroRef.current?.querySelector("p"),
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      servicesRef.current?.querySelector("h2"),
      { opacity: 0, x: 200, rotateY: 25 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: servicesRef.current?.querySelector("h2"),
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    cardsRef.current.forEach((card, index) => {
      if (card) {
        const isEven = index % 2 === 0;
        const fromSide = isEven ? -200 : 200;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromSide,
            rotateY: isEven ? -20 : 20,
            scale: 0.85,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -15,
            rotateX: 8,
            rotateY: isEven ? 3 : -3,
            duration: 0.4,
            ease: "back.out(1.2)",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    });

    if (progressiveRef.current) {
      const leftContent =
        progressiveRef.current.querySelector(".progressive-left");
      const rightContent =
        progressiveRef.current.querySelector(".progressive-right");

      gsap.fromTo(
        leftContent,
        { opacity: 0, x: -150, rotateX: 10 },
        {
          opacity: 1,
          x: 0,
          rotateX: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: progressiveRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightContent?.children,
        { opacity: 0, x: 150, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: progressiveRef.current,
            start: "top 75%",
            delay: 0.3,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (doctorsRef.current) {
      const doctorCards = doctorsRef.current.querySelectorAll(".doctor-card");
      doctorCards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        const fromSide = isEven ? -180 : 180;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromSide,
            rotateY: isEven ? -25 : 25,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: doctorsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    if (infrastructureRef.current) {
      gsap.fromTo(
        infrastructureRef.current.querySelector(".infra-text"),
        { opacity: 0, x: -200, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infrastructureRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const infraImages =
        infrastructureRef.current.querySelectorAll(".infra-image");
      infraImages.forEach((img, index) => {
        const isTopRow = index < 2;
        const isLeft = index % 2 === 0;
        const fromX = isLeft ? 150 : -150;
        const fromY = isTopRow ? -100 : 100;

        gsap.fromTo(
          img,
          {
            opacity: 0,
            x: fromX,
            y: fromY,
            rotateZ: isLeft ? -15 : 15,
            scale: 0.7,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateZ: 0,
            scale: 1,
            duration: 1.3,
            delay: index * 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: infrastructureRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    gsap.to(".floating-dot", {
      y: -20,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    });
  };

  const handleHoverEnter = () => setIsHovering(true);
  const handleHoverLeave = () => setIsHovering(false);

  return (
    <div className="min-h-screen bg-white relative cursor-none">
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

      <header className="bg-[#07332f] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="">
              <img src={logo} />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              About Us
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Services
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582] transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Pages
            </a>
            <a
              href="#"
              className="hover:text-[#F7A582]transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Contact Us
            </a>
            <button
              className="text-[#F7A582] hover:bg-[#3f2e27] px-4 py-2 rounded-full text-sm font-medium transition-colors"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Book Appointment
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="bg-[#07332f] from-teal-800 to-teal-900 text-white py-20 px-6 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-[#F7A582] font-medium text-sm tracking-wider uppercase">
                WE TAKE CARE OF YOUR HEALTH
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                We Are Providing
                <br />
                <span className="text-[#F7A582]">Best & Affordable</span>
                <br />
                Health Care.
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                Our is to deliver the highest quality healthcare services. We
                believe that everyone deserves access to excellent medical care
                without compromising on quality.
              </p>
              <div className="flex items-center space-x-6 pt-4">
                <button
                  className="bg-[#F7A582] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2"
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  <span>Read More</span>
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </button>
                <button
                  className="flex items-center space-x-3 text-white hover:text-[#F7A582] transition-colors"
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                  </div>
                  <span className="font-medium">Watch Video</span>
                </button>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative">
              {/* Main Doctor Image - Circular */}
              <div className="relative z-10">
                <div className="w-80 h-80 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full overflow-hidden shadow-2xl border-8 border-white/20 flex items-center justify-center">
                  <img
                    src={hero1}
                    alt="Doctor"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Secondary Image - Top Right */}
                <div className="absolute -top-8 -right-16 w-48 h-32 bg-white rounded-3xl shadow-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={hero2}
                    alt="Medical Team"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
              <div className="absolute top-20 -left-8 w-6 h-6 bg-[#F7A582] rounded-full opacity-80 floating-dot"></div>
              <div className="absolute bottom-32 -left-12 w-4 h-4 bg-white rounded-full opacity-60 floating-dot"></div>
              <div className="absolute top-40 right-8 w-3 h-3 bg-[#F7A582] rounded-full opacity-70 floating-dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={servicesRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
              Providing Medical Care For The Sickest
              <br />
              In Our Community.
            </h2>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Cardiology Clinic */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-teal-800 text-white p-8 rounded-2xl shadow-xl"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-[#f7a582] rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Cardiology Clinic</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                Our cardiology department provides comprehensive heart care with
                advanced diagnostic and treatment options for all cardiac
                conditions.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582]rounded-full"></div>
                  <span className="text-sm">Cardiac Ultrasound Radiology</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582] rounded-full"></div>
                  <span className="text-sm">Heart Disease Prevention</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582] rounded-full"></div>
                  <span className="text-sm">Arrhythmia Management</span>
                </li>
              </ul>
              <button
                className="bg-orange-500 hover:bg-[#f7a582] px-6 py-3 rounded-full font-medium transition-colors"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Read More
              </button>
            </div>

            {/* Neurology Clinic */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-teal-800 text-white p-8 rounded-2xl shadow-xl"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-[#f7a582] rounded-full flex items-center justify-center mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Neurology Clinic</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                Specialized neurological care focusing on disorders of the
                nervous system with cutting-edge diagnostic capabilities.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582] rounded-full"></div>
                  <span className="text-sm">Neurological Pathology</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Brain Imaging Services</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582] rounded-full"></div>
                  <span className="text-sm">Movement Disorders Care</span>
                </li>
              </ul>
              <button
                className="bg-orange-500 hover:bg-[#f7a582] px-6 py-3 rounded-full font-medium transition-colors"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Read More
              </button>
            </div>
            {/* Laboratory Analysis */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-teal-800 text-white p-8 rounded-2xl shadow-xl"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-[#f7a582] rounded-full flex items-center justify-center mb-6">
                <TestTube className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Laboratory Analysis</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                State-of-the-art laboratory services providing accurate and
                timely diagnostic testing for optimal patient care.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582] rounded-full"></div>
                  <span className="text-sm">Comprehensive Blood Tests</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#f7a582] rounded-full"></div>
                  <span className="text-sm">Molecular Diagnostics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Pathology Services</span>
                </li>
              </ul>
              <button
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-medium transition-colors"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Read More
              </button>
            </div>

            {/* Pediatric Clinic */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="bg-teal-800 text-white p-8 rounded-2xl shadow-xl"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <Baby className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pediatric Clinic</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                Dedicated pediatric care providing comprehensive medical
                services for infants, children, and adolescents.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Childhood Development</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Vaccination Programs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Pediatric Emergencies</span>
                </li>
              </ul>
              <button
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-medium transition-colors"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Read More
              </button>
            </div>

            {/* Ophthalmology Clinic */}
            <div
              ref={(el) => (cardsRef.current[4] = el)}
              className="bg-teal-800 text-white p-8 rounded-2xl shadow-xl"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ophthalmology Clinic</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                Complete eye care services from routine examinations to advanced
                surgical procedures for all ages.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Vision Testing & Correction</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Cataract Surgery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Retinal Treatments</span>
                </li>
              </ul>
              <button
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-medium transition-colors"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Read More
              </button>
            </div>

            {/* Emergency Clinic */}
            <div
              ref={(el) => (cardsRef.current[5] = el)}
              className="bg-teal-800 text-white p-8 rounded-2xl shadow-xl"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Emergency Clinic</h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                24/7 emergency medical services with rapid response capabilities
                for critical and urgent medical situations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Trauma Care</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Emergency Surgery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Critical Care Management</span>
                </li>
              </ul>
              <button
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-medium transition-colors"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Read More
              </button>
            </div>
          </div>

          {/* Progressive Medical Clinic Section */}
          <div
            ref={progressiveRef}
            className="bg-white rounded-3xl p-12 shadow-xl"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-orange-500 font-medium text-lg">
                  About MedPro
                </span>
                <h3 className="text-4xl font-bold text-teal-800 mb-6 leading-tight">
                  We Are a Progressive
                  <br />
                  Medical Clinic.
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  We have made a commitment to quality that extends well beyond
                  the general practitioner to every member of our healthcare
                  team. Excellence is not just our goal, it's our promise to
                  every patient who walks through our doors.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-800 mb-2">Oncology</h4>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Thermometer className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-800 mb-2">Therapeutics</h4>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Microscope className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-800 mb-2">Pathology</h4>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartHandshake className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-teal-800 mb-2">
                    Rehabilitation
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section ref={doctorsRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal-800 mb-4">
              Meet Our Doctors.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Compassionate, skilled, and experienced professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center group bg-white shadow-lg rounded-3xl p-6 transition duration-300"
              >
                <div className="w-48 h-64 rounded-3xl mb-6 mx-auto overflow-hidden relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <h4 className="text-xl font-bold text-teal-800 mb-2">
                  {doctor.name}
                </h4>
                <p className="text-gray-600 mb-4">{doctor.title}</p>
                <div className="flex justify-center gap-4 text-teal-600 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaLinkedin className="cursor-pointer hover:text-teal-800" />
                  <FaTwitter className="cursor-pointer hover:text-teal-800" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section ref={infrastructureRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="infra-text">
              <h2 className="text-4xl font-bold text-teal-800 mb-6">
                Our Infrastructure & Culture
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We pride ourselves on maintaining state-of-the-art medical
                facilities combined with a warm, patient-centered culture. Our
                infrastructure supports advanced medical procedures while our
                team ensures every patient receives compassionate, personalized
                care in a comfortable environment designed for healing and
                recovery.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl infra-image"></div>
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl infra-image"></div>
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl infra-image"></div>
              <div className="h-48 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl infra-image"></div>
            </div>
          </div>
        </div>
      </section>
      <MedicalFooter />
    </div>
  );
}