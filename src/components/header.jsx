import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

const Header = () => {
  return (
    <div className="bg-[#063c37] text-white font-sans">
     
      <nav className="flex justify-between items-center px-8 py-4 border-b border-[#145F58] relative">
       
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="text-orange-500 text-3xl">✚</span>
          <span>Medi<span className="text-orange-500">Pro</span></span>
        </div>

        
        <ul className="flex gap-6 text-white/90 relative">
          <li className="hover:text-orange-400 cursor-pointer text-orange-400">Home</li>
          <li className="hover:text-orange-400 cursor-pointer">About Us</li>

          
          <li className="group relative cursor-pointer">
            <span className="hover:text-orange-400">Services</span>
            <ul className="absolute hidden group-hover:block bg-orange-300 text-black mt-2 py-2 w-40 rounded shadow-lg z-50">
              <li className="px-4 py-2 hover:bg-orange-100 hover:text-orange-600">General Checkup</li>
              <li className="px-4 py-2 hover:bg-orange-100 hover:text-orange-600">Pediatrics</li>
              <li className="px-4 py-2 hover:bg-orange-100 hover:text-orange-600">Diagnostics</li>
            </ul>
          </li>

          
          <li className="group relative cursor-pointer">
            <span className="hover:text-orange-400">Pages</span>
            <ul className="absolute hidden group-hover:block bg-orange-300 text-black mt-2 py-2 w-40 rounded shadow-lg z-50">
              <li className="px-4 py-2 hover:bg-orange-100 hover:text-orange-600">Our Team</li>
              <li className="px-4 py-2 hover:bg-orange-100 hover:text-orange-600">FAQ</li>
              <li className="px-4 py-2 hover:bg-orange-100 hover:text-orange-600">Testimonials</li>
            </ul>
          </li>

          <li className="hover:text-orange-400 cursor-pointer">Contact Us</li>
        </ul>

       
        <button className="flex items-center gap-2 bg-transparent border border-orange-400 text-orange-400 px-4 py-2 rounded-full hover:bg-orange-400 hover:text-white transition">
          Book Appointment
          <AiOutlineCalendar size={20} />
        </button>
      </nav>
    </div>
  );
};

export default Header;
