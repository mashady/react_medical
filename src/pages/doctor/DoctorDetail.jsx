import React from "react";

export default function DoctorProfile() {
  return (
    <div className="bg-[#fff8f4] min-h-screen text-[#00292e]">
      {/* Header */}
      <div className="bg-[#00292e] text-center text-[#ffb492] py-6">
        <h1 className="text-xl font-bold">Dr. Elizabeth Foster</h1>
        <p className="text-sm mt-1">Home &gt; Our Team &gt; Dr. Elizabeth Foster</p>
      </div>

      {/* Doctor Info */}
      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-8 items-center">
        <img src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?semt=ais_items_boosted&w=740" alt="Dr. Elizabeth Foster" className="rounded-md" />
        <div className="bg-[#00292e] text-white p-6 rounded-md">
          <h3 className="text-sm text-[#ffb492] uppercase">Family Physician</h3>
          <h2 className="text-2xl font-semibold mt-1">Dr. Elizabeth Foster</h2>
          <p className="mt-4 text-sm">
            Dr. Elizabeth Foster is a highly respected and compassionate physician, serving as Chief Medical
            Officer with 15+ years of experience in family medicine. She is dedicated to improving
            the lives of her patients and strengthening local healthcare systems.
          </p>
          <div className="flex gap-4 mt-4">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
      </div>

      {/* Description + Opening Hours */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-10">
        <div className="md:col-span-2">
          <h4 className="text-xs text-[#ffb492] uppercase">Family Physician</h4>
          <h2 className="text-xl font-semibold mb-4">Dr. Elizabeth Foster</h2>
          <p className="text-sm text-[#444]">
            As a board-certified physician, Dr. Foster has an unparalleled commitment to delivering exceptional
            healthcare with a personal touch. Her extensive clinical expertise ensures accurate
            diagnosis and treatment, while her warm demeanor fosters trust and confidence.
            <br /><br />
            Patients appreciate her holistic approach, and her efforts to foster long-term relationships with
            those she serves. Dr. Foster currently practices at Urban Clinic in San Diego, CA.
          </p>
          <div className="flex gap-4 mt-4 text-[#ffb492]">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
        <div className="bg-[#f79e7e] text-white p-6 rounded-md">
          <div className="flex items-center mb-2">
            <i className="fas fa-clock text-xl mr-2"></i>
            <h3 className="text-lg font-semibold">Opening Hours</h3>
          </div>
          <ul className="text-sm leading-loose">
            <li>Monday–Friday: 8:00 – 7:00 pm</li>
            <li>Saturday: 9:00 – 4:00 pm</li>
            <li>Sunday: 10:00 – 4:00 pm</li>
          </ul>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-5xl mx-auto mt-12">
        <h4 className="text-xs text-[#ffb492] uppercase">Services</h4>
        <h2 className="text-xl font-semibold mb-4">My Service</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-[#444]">
          <p>World Health Solutions</p>
          <p>World Stroke Services</p>
          <p>Maternal Health &amp; Child Health</p>
          <p>Emergency Help Available 24/7</p>
          <p>Rapid Patient Improvement</p>
          <p>Medical Research Professionals</p>
          <p>Instant Medical Treatment</p>
        </div>
      </div>

      {/* Pediatrician */}
      <div className="max-w-5xl mx-auto mt-12">
        <h4 className="text-xs text-[#ffb492] uppercase">Pediatrician</h4>
        <h2 className="text-xl font-semibold mb-4">Maria Andaloro</h2>
        <div className="text-sm text-[#444] space-y-2">
          <p><strong>MBBS</strong> – University of Arizona</p>
          <p><strong>BNHS</strong> – Medical University of Harvard</p>
        </div>
      </div>

      {/* Awards */}
      <div className="max-w-5xl mx-auto mt-12">
        <h4 className="text-xs text-[#ffb492] uppercase">Awards</h4>
        <h2 className="text-xl font-semibold mb-4">My Awards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#444]">
          <p>Patient Choice Awards</p>
          <p>Patient Choice Awards</p>
          <p>Patient Choice Awards</p>
          <p>Patient Choice Awards</p>
        </div>
      </div>

      {/* Skills */}
      <div className="max-w-5xl mx-auto mt-12 mb-16">
        <h4 className="text-xs text-[#ffb492] uppercase">Skills</h4>
        <h2 className="text-xl font-semibold mb-4">My Skill</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1">Clinical Diagnosis</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-[#00292e] h-2 rounded-full w-[90%]"></div>
            </div>
          </div>
          <div>
            <p className="text-sm mb-1">Surgical Expertise</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-[#00292e] h-2 rounded-full w-[75%]"></div>
            </div>
          </div>
          <div>
            <p className="text-sm mb-1">Public Health Knowledge</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-[#00292e] h-2 rounded-full w-[85%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}