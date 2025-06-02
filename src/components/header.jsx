import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' fill='%23f7a582'/%3E%3Ctext x='60' y='25' font-family='Arial, sans-serif' font-size='16' font-weight='bold' text-anchor='middle' fill='%2307332f'%3EYour Logo%3C/text%3E%3C/svg%3E";

  const handleHoverEnter = (e) => {
    e.target.style.transform = "translateY(-2px)";
  };

  const handleHoverLeave = (e) => {
    e.target.style.transform = "translateY(0)";
  };

  const navItems = [
    { name: "Home", href: "#", active: false },
    { name: "About Us", href: "#", active: false },
    { name: "Services", href: "#", active: true },
    { name: "Pages", href: "#", active: false },
    { name: "Contact Us", href: "#", active: false },
  ];

  return (
    <header className="bg-[#07332f] text-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <div className="transition-transform duration-300 hover:scale-105">
              <img
                src={logo}
                alt="Company Logo"
                className="h-10 w-auto rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  item.active
                    ? "text-[#f7a582] bg-[#f7a582]/10 shadow-sm"
                    : "text-white hover:text-[#f7a582] hover:bg-white/5"
                }`}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                <span className="relative z-10">{item.name}</span>
                {!item.active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f7a582]/10 to-[#f7a582]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <button
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-[#f7a582] text-[#07332f] text-sm font-semibold rounded-full hover:bg-[#f7a582]/90 hover:shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#f7a582] focus:ring-offset-2 focus:ring-offset-[#07332f]"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Book Appointment
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:text-[#f7a582] hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-[#07332f]/95 backdrop-blur-sm border-t border-white/10">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "text-[#f7a582] bg-[#f7a582]/10"
                  : "text-white hover:text-[#f7a582] hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button
            className="w-full mt-4 px-4 py-3 bg-[#f7a582] text-[#07332f] text-sm font-semibold rounded-lg hover:bg-[#f7a582]/90 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
