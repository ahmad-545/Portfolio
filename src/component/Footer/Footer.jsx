import React from 'react';
import userIcon from '../../assets/user_icon.svg';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900/60 pt-12 pb-6 px-6 md:px-12 w-full selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
        
        {/* Left Grid Layout Info Section */}
        <div className="md:col-span-5 space-y-3">
          <h2 className="text-xl font-black text-white tracking-wide">Coder<span className="text-cyan-400">.</span></h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-sm">
            MERN & Full Stack Web Developer specialized in building scalable backend architectures and dynamic user interfaces.
          </p>
        </div>

        {/* Right Grid Newsletter Interaction Panel */}
        <div className="md:col-span-7 w-full flex flex-col sm:flex-row gap-3 sm:items-center md:justify-end">
          <div className="relative flex-grow max-w-md">
            <img 
              src={userIcon} 
              alt="Email envelope indicator" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 filter brightness-75"
            />
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button className="px-6 py-3 bg-slate-100 hover:bg-white text-slate-950 font-semibold rounded-xl text-sm transition-colors tracking-wide shadow-md shadow-white/5 whitespace-nowrap">
            Subscribe
          </button>
        </div>

      </div>

      <hr className="border-slate-900/80 mb-6 max-w-6xl mx-auto" />

      {/* Bottom Block Information */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
        <p className="text-center sm:text-left">&copy; 2026 Muhammad Ahmad. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">Connect With Me</span>
        </div>
      </div>
    </footer>
  );
}