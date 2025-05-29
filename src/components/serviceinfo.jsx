import { FaCalendarAlt, FaUserMd, FaBriefcaseMedical } from "react-icons/fa";

export default function ContactServiceSection() {
  return (
    <div className="bg-[#fff5f1] py-10 px-6 md:px-16 mt-25">
      <div className="grid md:grid-cols-3 gap-0 overflow-hidden rounded-md shadow-lg h-[250px]">
       
      <div className="bg-[#f8a98b] text-white flex flex-col justify-between">
            <div className="text-xl md:text-2xl font-medium p-10 text-center">
                Don't <span className="font-bold">Hesitate</span> To Contact us
            </div>

            <button className="w-full h-20 bg-black text-white font-semibold py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#043933] transition-colors duration-300">
                Make Appointment <FaCalendarAlt />
            </button>
        </div>


        <div className="bg-[#043933] text-white p-6 border-l border-white/10">
          <div className="text-3xl mb-4 text-[#f8a98b]">
            <FaUserMd />
          </div>
          <h3 className="font-semibold text-lg mb-2">Need Family Health</h3>
          <p className="text-sm text-white/70">
            We understand the importance of family health overall well-being.
          </p>
        </div>

        <div className="bg-[#043933] text-white p-6 border-l border-white/10">
          <div className="text-3xl mb-4 text-[#f8a98b]">
            <FaBriefcaseMedical />
          </div>
          <h3 className="font-semibold text-lg mb-2">24 hours service</h3>
          <p className="text-sm text-white/70">
            We take pride in offering 24-hour medical services to ensure that you.
          </p>
        </div>
      </div>
    </div>
  );
}
