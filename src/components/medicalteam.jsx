import React from 'react';
import { FaPlay, FaArrowRight } from 'react-icons/fa'; // Correct import

const MedicalServicesComponent = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-pink-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Images */}
          <div className="relative">
            {/* Decorative dots pattern */}
            <div className="absolute top-20 left-20 w-32 h-32 opacity-30">
              <div className="grid grid-cols-8 gap-1">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Main doctor image */}
            <div className="relative z-10 bg-white rounded-3xl p-6 shadow-xl mb-8 max-w-sm">
            </div>

            {/* Floating medical team card */}
            <div className="absolute top-8 right-0 bg-white rounded-2xl p-4 shadow-xl max-w-xs z-20">
              <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl h-40 flex items-center justify-center mb-3">
                  <div className="relative z-0 w-52 h-100 rounded-full overflow-hidden shadow-xl">
                        <img
                        src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/about-img-2.jpg"
                        alt="Doctor 2"
                        className="w-full h-full object-cover"
                        />
                  </div>
              </div>
            </div>

            {/* Video consultation card */}
            <div className="absolute bottom-0 left-12 bg-white rounded-2xl p-4 shadow-xl max-w-xs z-20">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl h-32 flex items-center justify-center mb-3 relative">
              <div className="relative z-50 w-52 h-100 rounded-full overflow-hidden shadow-xl -mt-10">
                    <img
                      src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/about-img-1.jpg"
                      alt="Doctor 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
              </div>
              <div className="text-sm font-medium text-gray-800 text-center">Watch Video</div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <div className="text-orange-400 text-sm font-medium tracking-wider uppercase mb-4">
                ABOUT MEDICALIFE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Our Best Services &<br />
                Popular Treatment<br />
                Here.
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We take pride in offering a wide range of best-in-class medical services and popular treatments to cater to your diverse healthcare needs.
              </p>
            </div>

            {/* Services list */}
            <div className="space-y-4">
              {[
                'Mental health Solutions',
                'Rapid Patient Improvement',
                'World Class Treatment',
              ].map((text, idx) => (
                <div className="flex items-center space-x-4" key={idx}>
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-800 font-medium text-lg">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="inline-flex items-center space-x-3 border-2 border-orange-300 text-orange-500 px-8 py-4 rounded-full font-medium hover:bg-orange-50 transition-colors">
                <span>Read More</span>
                <FaArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalServicesComponent;
