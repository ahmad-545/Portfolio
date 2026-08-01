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
            ? "bg-slate-950/80 backdrop-blur-md shadow-xl py-3 border-b border-slate-800/60" 
            : "bg-slate-950/20 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
       <Link 
          to="/" 
          className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:scale-105 transition-transform"
        >
          MA<span className="text-cyan-400">.</span>
        </Link>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-slate-950/95 md:bg-transparent flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 px-6 py-8 md:p-0 border-b border-slate-800 md:border-none transition-all duration-300 ease-in-out ${
            mstatus ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible md:flex"
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
                      ? "text-cyan-400 after:w-full" 
                      : "text-slate-400 hover:text-white after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger Menu Icon */}
        <div
          className="text-2xl text-slate-400 hover:text-cyan-400 cursor-pointer md:hidden block transition-colors select-none"
          onClick={() => setMstatus(!mstatus)}
        >
          {mstatus ? <span>&#10005;</span> : <span>&#9776;</span>}
        </div>
      </header>
      <div className="h-16 bg-slate-950"></div>
    </>
  );
}

export default Navbar;