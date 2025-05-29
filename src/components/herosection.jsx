import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
const HeroSection = () => {
  return (
    <div className="bg-[#063c37] text-white min-h-screen font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        
        <div className="max-w-lg space-y-4">
          <p className="uppercase tracking-widest text-sm text-white/60">
            We tack care of your health
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 leading-tight">
            We Are Providing <br />
            Best & Affordable <br />
            Health Care.
          </h1>
          <p className="text-white/80 text-sm mt-4">
            Our is to deliver the highest quality healthcare services. <br />
            We believe that everyone deserves access to excellent <br />
            medical care without compromising on quality.
          </p>
          <div className="flex gap-6 items-center">
            <button className="flex items-center gap-2 border border-orange-400 text-orange-400 px-6 py-2 rounded-full hover:bg-orange-400 hover:text-white transition">
              Read More <AiOutlineRight />
            </button>
            <button className="flex items-center gap-2 text-white hover:text-orange-400 transition">
              <BsPlayCircle size={28} /> Watch Video
            </button>
          </div>
        </div>

       
        <div className="relative flex gap-6 mt-10 md:mt-0 items-end">
  
            <div className="absolute -top-6 -left-6 z-0 w-28 h-28 grid grid-cols-4 gap-1 opacity-50">
                {Array(16)
                .fill()
                .map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                ))}
            </div>

            
            <div className="relative z-50 w-52 h-100 rounded-full overflow-hidden shadow-xl -mt-10">
                <img
                src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/hero-img-2.jpg"
                alt="Doctor 1"
                className="w-full h-full object-cover"
                />
            </div>

            
            <div className="relative z-0 w-52 h-100 rounded-full overflow-hidden shadow-xl">
                <img
                src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/hero-img-1.jpg"
                alt="Doctor 2"
                className="w-full h-full object-cover"
                />
            </div>
            </div>

      </div>
    </div>
  );
};

export default HeroSection;
