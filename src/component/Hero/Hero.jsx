import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../../assets/hero2.png';
import Navbar from '../Navber/Navber'; // Agar path theek karna pare toh apne folder ke mutabiq dekh lein
import Footer from '../Footer/Footer';
import { Code, Server, Database, Sparkles, ArrowRight, Briefcase, CheckCircle2, Award, Terminal } from 'lucide-react';

export default function Hero() {
  
  const skills = [
    { name: "Frontend Architecture", icon: Code, desc: "Building scalable, high-performance UIs with React, Tailwind CSS, and modern JavaScript." },
    { name: "Backend & APIs", icon: Server, desc: "Developing secure RESTful APIs, microservices, and handling server logic with Node.js & Express." },
    { name: "Database Management", icon: Database, desc: "Expertise in database connection pooling, schema design using MongoDB and SQL." },
    { name: "AI & Smart Agents", icon: Sparkles, desc: "Integrating LLMs, custom chatbots, and intelligent automation into web apps." }
  ];

  const projects = [
    { 
      title: "AI-Powered Virtual Try-On", 
      desc: "An advanced MERN stack web application enabling users to virtually try on clothing items using cutting-edge AI.", 
      tag: "Full Stack / AI" 
    },
    { 
      title: "Trylo Premium E-Commerce", 
      desc: "A feature-rich online retail platform complete with secure checkout, dynamic product management, and admin dashboard.", 
      tag: "MERN Stack" 
    },
    { 
      title: "Database Connection Pooler", 
      desc: "High-efficiency backend utility optimized for managing heavy concurrent database queries across MongoDB and MySQL.", 
      tag: "Backend Engineering" 
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-cyan-500/35 text-slate-100 font-sans">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="min-h-[92vh] flex items-center justify-center relative overflow-hidden py-20 px-6 md:px-12">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Available for Full-Stack Opportunities
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Muhammad Ahmad</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-semibold text-slate-300 mb-4 tracking-wide">
              MERN & Full-Stack Web Developer
            </p>

            <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              I transform complex requirements into clean, high-performance web applications. Specializing in modern React frontends, robust Node.js backends, and smart AI integrations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Link 
                to="/Contact" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:-translate-y-0.5 text-center text-sm uppercase"
              >
                Let's Talk
              </Link>
              <Link 
                to="/resume" 
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold tracking-wider rounded-xl border border-slate-800 hover:border-slate-700 transition-all text-center text-sm uppercase"
              >
                View Resume
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl overflow-hidden">
                <img 
                  src={pic} 
                  alt="Muhammad Ahmad" 
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK STATS / HIGHLIGHTS BAR */}
      <section className="py-10 border-y border-slate-900 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mb-1">100%</h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-wide uppercase">Client Dedication</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">MERN</h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-wide uppercase">Stack Expertise</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mb-1">AI</h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-wide uppercase">Integration Ready</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">24/7</h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-wide uppercase">Problem Solving</p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section className="py-24 px-6 md:px-12 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Terminal size={14} /> Background & Philosophy
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">Engineering with Purpose</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-6">
            I am a dedicated full-stack developer who thrives at the intersection of design and clean backend logic. My approach focuses on building robust architectures that scale effortlessly while delivering crisp, highly responsive user experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["Clean Code", "Performance Optimization", "Scalable Architecture", "UI/UX Focus"].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                <CheckCircle2 size={14} className="text-cyan-400" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SKILLS / CORE EXPERTISE */}
      <section className="py-24 px-6 md:px-12 border-t border-slate-900 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-widest block mb-2">What I Do Best</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">Core Expertise</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                  <skill.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="py-24 px-6 md:px-12 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-cyan-400 text-xs font-mono uppercase tracking-widest block mb-2">Portfolio Showcase</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Featured Projects</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4 md:mt-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all group">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full inline-block mb-6 font-semibold">
                    {proj.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Production Ready</span>
                  <Link to="/Contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-slate-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Have a project in mind or want to collaborate?</h2>
          <p className="text-slate-400 text-base md:text-lg mb-8">Let's build something exceptional together. Get in touch and let's discuss your next big idea.</p>
          <Link 
            to="/Contact" 
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold tracking-wider rounded-xl shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all text-sm uppercase"
          >
            Get In Touch Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}