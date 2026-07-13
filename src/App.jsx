import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Iske andar saare pages (Hero, About, Services) render honge */}
      <Outlet />

     
      <a
        href="https://wa.me/923484236919?text=Hi%20Ahmad,%20I%20visited%20your%20portfolio%20and%20want%20to%20discuss%20a%20project!"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {/* Pulsing Outer Radar Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:hidden"></span>
        
        {/* SVG WhatsApp Icon (Bina kisi FontAwesome package ki dependency ke) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          className="w-7 h-7 fill-current drop-shadow-md"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-93.8-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 88.6-184.5 184.6-184.5 46.6 0 90.3 18.2 123.3 51.2c33 33 51.2 76.7 51.2 123.3 0 101.7-88.6 184.4-184.6 184.4zm103.8-141.2c-5.7-2.9-33.9-16.7-39.2-18.7-5.3-2-9.2-2.9-13.1 2.9-3.9 5.8-15 18.7-18.4 22.7-3.4 3.9-6.8 4.4-12.5 1.5-5.7-2.9-23.9-8.8-45.6-28.1-16.9-15.1-28.3-33.7-31.6-39.4-3.4-5.7-.4-8.8 2.6-11.6 2.7-2.6 5.7-5.8 8.6-8.7 2.9-2.9 3.9-4.9 5.8-8.2 2-3.4 1-6.4-.5-9.3-1.5-2.9-13.1-31.5-18-43.3-4.8-11.7-9.7-10.1-13.1-10.3-3.4-.2-7.3-.2-11.2-.2s-10.2 1.5-15.5 7.3c-5.3 5.8-20.4 20-20.4 48.7s14.5 56.4 16.5 59.1c2 2.7 28.5 43.5 69 60.8 9.6 4.1 17.1 6.6 23 8.5 9.7 3.1 18.5 2.7 25.5 1.6 7.8-1.2 23.9-9.8 27.3-19.3 3.4-9.5 3.4-17.7 2.4-19.4-1.1-1.7-3.9-2.7-9.6-5.6z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;