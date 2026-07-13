import React from 'react';
import pic from "../../assets/hero2.png";
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';

export default function About() {
  const skillsData = [
    { name: "MERN Stack Integration (MongoDB, Express, React, Node)", level: "85%", width: "w-[85%]", color: "from-cyan-400 via-teal-400 to-blue-500" },
    { name: "React.js Component Architecture", level: "85%", width: "w-[85%]", color: "from-cyan-500 to-blue-600" },
    { name: "Node.js & Express.js RESTful APIs", level: "75%", width: "w-[75%]", color: "from-blue-500 to-indigo-500" },
    { name: "JavaScript (ES6+) Core Logic", level: "80%", width: "w-4/5", color: "from-teal-400 to-blue-500" },
    { name: "Tailwind CSS & Responsive UI Design", level: "95%", width: "w-[95%]", color: "from-cyan-500 to-teal-400" }
  ];

  const stats = [
    { metrics: "1+", label: "YEAR OF EXPERIENCE" },
    { metrics: "80+", label: "PROJECTS COMPLETE" },
    { metrics: "10+", label: "HAPPY CLIENTS" }
  ];

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow py-16 px-6 md:px-12 max-w-6xl mx-auto w-full relative z-10 selection:bg-cyan-500/30">
        {/* Title Block */}
        <div className="text-center md:text-left mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight inline-block relative after:absolute after:-bottom-3 after:left-1/2 md:after:left-0 after:transform after:-translate-x-1/2 md:after:translate-x-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500">
            About Me
          </h1>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition duration-500"></div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-xl transform transition-transform duration-300 group-hover:scale-[1.01]">
                <img 
                  src={pic} 
                  alt="Ahmad Profile Workspace" 
                  className="rounded-xl w-full h-[400px] object-cover filter brightness-95 group-hover:brightness-100 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio Copy & Interactive Skill Bars */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-slate-300 text-lg font-light leading-relaxed">
              I am a passionate MERN Stack Developer dedicated to building efficient, scale-ready web applications[cite: 1, 2]. I specialize in crafting rich user interfaces with React, managing database state with MongoDB, and engineering robust backend systems utilizing Node.js and Express[cite: 1, 2]. From creating smooth interactive designs to deploying server logic, I focus on building high-performance solutions[cite: 1, 2].
            </p>

            {/* Rendered Skill Stack */}
            <div className="space-y-5">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-2 group">
                  <div className="flex justify-between text-sm font-semibold tracking-wide text-slate-300">
                    <p className="group-hover:text-cyan-400 transition-colors">{skill.name}</p>
                    <span className="text-cyan-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800/50">
                    <div className={`h-full bg-gradient-to-r ${skill.color} ${skill.width} rounded-full transition-all duration-500`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counters Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-900/40 backdrop-blur-sm border border-slate-900 rounded-2xl p-8 text-center shadow-xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2 relative group py-4 sm:py-0 last:border-none border-b sm:border-b-0 sm:border-r border-slate-800/60">
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-105 transition-transform duration-300 inline-block">
                {stat.metrics}
              </h2>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}