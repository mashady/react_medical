import React, { useState } from 'react';
import {
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
} from 'react-icons/fa';

const MedicalFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <div className="bg-teal-900 text-white">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center font-bold text-xl text-white">
              +
            </div>
            <h3 className="text-2xl font-bold">MediPro</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Our family-centered approach to healthcare ensures that each member of your family receives personalized attention.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 bg-orange-400 hover:bg-orange-500 rounded-full flex items-center justify-center transition">
              <FaLinkedinIn className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 bg-orange-400 hover:bg-orange-500 rounded-full flex items-center justify-center transition">
              <FaYoutube className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 bg-orange-400 hover:bg-orange-500 rounded-full flex items-center justify-center transition">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 bg-orange-400 hover:bg-orange-500 rounded-full flex items-center justify-center transition">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 bg-orange-400 hover:bg-orange-500 rounded-full flex items-center justify-center transition">
              <FaFacebookF className="text-white" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-orange-400 mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-300">
            {['Home', 'About Us', 'Doctors', 'Services', 'Contact Us'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-orange-400 mb-6">Contact Details</h3>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              <span>Jl. Raya Kuta No.70, Kuta</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-orange-400" />
              <span>healthcare@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-orange-400" />
              <span>+01 547 547 5478</span>
            </div>
            <div className="flex items-start space-x-3">
              <FaClock className="text-orange-400 mt-1" />
              <span>8 AM - 5 PM, Monday - Saturday</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold text-orange-400 mb-6">Newsletter</h3>
          <p className="text-gray-300 mb-3">Subscribe To Our Newsletter</p>
          <p className="text-sm text-gray-400 mb-4">
            Stay informed and never miss out on the latest news, health tips.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full bg-transparent border-2 border-teal-600 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 transition"
            />
            <button
              onClick={handleSubscribe}
              className="bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-teal-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400">
          <p>
            Copyright 2024 ©{' '}
            <span className="text-orange-400 font-medium">MediPro</span> All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalFooter;
