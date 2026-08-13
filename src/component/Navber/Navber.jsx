import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [mstatus, setMstatus] = useState(false);
  const [sticky, setSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/About' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/Services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 transition-all duration-300 ${
          sticky 
            ? "bg-slate-950/90 backdrop-blur-md shadow-xl shadow-cyan-500/5 py-3 border-b border-slate-800/80" 
            : "bg-slate-950 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className="group text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 transition-transform duration-300 hover:scale-105 flex items-center gap-1"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-rotate-6">MA</span>
          <span className="text-cyan-400 animate-pulse">.</span>
        </Link>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-slate-950 md:bg-transparent flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 px-6 py-8 md:p-0 border-b border-slate-800 md:border-none shadow-2xl md:shadow-none transition-all duration-300 ease-in-out ${
            mstatus 
              ? "opacity-100 visible translate-y-0" 
              : "opacity-0 invisible -translate-y-4 md:opacity-100 md:visible md:translate-y-0 md:flex"
          }`}
        >
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  onClick={() => setMstatus(false)} 
                  className={`font-medium tracking-wide text-sm transition-all duration-300 block py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 ${
                    isActive 
                      ? "text-cyan-400 after:w-full font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" 
                      : "text-slate-400 hover:text-cyan-300 after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bigger Animated Hamburger Menu Icon */}
        <div
          className="relative w-9 h-8 flex flex-col justify-between items-center md:hidden cursor-pointer group z-50 select-none py-1"
          onClick={() => setMstatus(!mstatus)}
        >
          <span className={`w-full h-1 bg-slate-300 group-hover:bg-cyan-400 transition-all duration-300 rounded-full ${mstatus ? 'rotate-45 translate-y-2.5 bg-cyan-400' : ''}`} />
          <span className={`w-full h-1 bg-slate-300 group-hover:bg-cyan-400 transition-all duration-300 rounded-full ${mstatus ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-full h-1 bg-slate-300 group-hover:bg-cyan-400 transition-all duration-300 rounded-full ${mstatus ? '-rotate-45 -translate-y-2.5 bg-cyan-400' : ''}`} />
        </div>
      </header>
      <div className="h-16 bg-slate-950"></div>
    </>
  );
}

export default Navbar;