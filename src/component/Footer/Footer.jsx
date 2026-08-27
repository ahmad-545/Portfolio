import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/user_icon.svg';
import { Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-8 px-6 md:px-12 w-full selection:bg-emerald-500/35 selection:text-emerald-200 relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        
        {/* Column 1: Brand & Bio */}
        <div className="md:col-span-5 space-y-4">
          <Link 
            to="/" 
            className="group text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 inline-flex items-center gap-1"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-rotate-6">MA</span>
            <span className="text-emerald-400 animate-pulse">.</span>
          </Link>
          <p className="text-slate-400 font-light leading-relaxed text-sm max-w-sm">
            MERN & Full Stack Web Developer specialized in building scalable backend architectures, dynamic user interfaces, and smart AI solutions.
          </p>
          
          {/* Social Links with Real URLs */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://github.com/ahmad-545" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5"
            >
              GitHub <ExternalLink size={12} className="opacity-60" />
            </a>
            <a 
              href="https://www.linkedin.com/in/muhammad-ahmad-9b031530a?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5"
            >
              LinkedIn <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-white font-semibold text-base tracking-wide font-mono">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li><Link to="/About" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link to="/work" className="hover:text-emerald-400 transition-colors">Work</Link></li>
            <li><Link to="/Services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Newsletter & Updates */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-white font-semibold text-base tracking-wide font-mono">Stay Updated</h3>
          <p className="text-slate-400 text-sm font-light">
            Subscribe to get latest updates about my projects and tech articles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="relative flex-grow">
              <img 
                src={userIcon} 
                alt="Email envelope indicator" 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 filter brightness-75"
              />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 text-slate-950 font-bold rounded-xl text-sm transition-all hover:from-emerald-300 hover:to-green-400 tracking-wide whitespace-nowrap shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <hr className="border-slate-900 mb-6 max-w-6xl mx-auto" />

      {/* Bottom Copyright & Legal */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
        <p className="text-center sm:text-left flex items-center justify-center sm:justify-start gap-1">
          &copy; 2026 Muhammad Ahmad. Crafted with <Heart size={12} className="text-emerald-400 fill-emerald-400 animate-pulse" /> All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
          <Link to="/contact" className="hover:text-slate-400 cursor-pointer transition-colors">Connect With Me</Link>
        </div>
      </div>
    </footer>
  );
}