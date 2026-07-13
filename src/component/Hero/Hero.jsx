import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../../assets/hero2.png';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';

export default function Hero() {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-cyan-500/30">
      <Navbar />
      
      <section className="flex-grow flex items-center justify-center relative overflow-hidden py-12 px-6 md:px-12">
        {/* Dynamic Abstract Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-3000"></div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          {/* Avatar Container with Pulsing Border */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500 shadow-xl shadow-cyan-500/20"></div>
            <img 
              src={pic} 
              alt="Muhammad Ahmad" 
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-slate-900 shadow-2xl group-hover:scale-102 transition-transform duration-300"
            />
          </div>

          {/* Core Text Copy */}
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Muhammad Ahmad</span>, <br className="hidden md:block"/>
            MERN & Full Stack Web Developer
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
            I engineer secure, production-ready full-stack applications. From sculpting dynamic user interfaces in React to deploying robust RESTful backend architectures with Node.js and AI integrations.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link 
              to="/Contact" 
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold tracking-wide rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Contact Me
            </Link>
            {/* Navigating to the Resume Page */}
            <Link 
              to="/resume" 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-medium tracking-wide rounded-xl border border-slate-800 hover:border-slate-700 transition-all text-center"
            >
              My Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}