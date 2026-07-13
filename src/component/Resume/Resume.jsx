import React from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';

export default function Resume() {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-cyan-500/30">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full text-slate-300">
        {/* Header Options */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">My Curriculum Vitae</h1>
          <button 
            onClick={() => window.print()} 
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-cyan-400 uppercase tracking-widest transition-all"
          >
            Print / Download PDF
          </button>
        </div>

        {/* Resume Sheet */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl space-y-8">
          
          {/* Top Identity Block */}
          <div className="text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800/60">
            <div>
              <h2 className="text-3xl font-black text-white">MUHAMMAD AHMAD</h2>
              <p className="text-cyan-400 font-semibold tracking-wide text-sm mt-1">MERN Stack Developer</p>
            </div>
            <div className="text-sm text-slate-400 space-y-1 text-center sm:text-right w-full sm:w-auto">
              <p>📧 ahmaddev545@gmail.com | 📱 +92 348 4236919</p>
              <p>📍 Lahore, Pakistan</p>
              <p className="text-cyan-400/80 text-xs font-mono">github.com/ahmad-545 | linkedin.com/in/muhammad-ahmad</p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Professional Summary</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              MERN Stack Developer skilled in building clean, responsive, and user-friendly web applications. Experienced in integrating AI models (e.g., VITON-HD) into e-commerce solutions, developing RESTful APIs, secure authentication systems, and interactive user interfaces. Focused on writing performant, real-world full-stack solutions.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Technical Skill Matrix</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-950/40 p-4 rounded-xl border border-slate-900">
              <p><strong className="text-white">Tech Stack:</strong> MongoDB, Express.js, React.js, Node.js (MERN)</p>
              <p><strong className="text-white">Languages:</strong> JavaScript, Python</p>
              <p className="sm:col-span-2"><strong className="text-white">Tools & Concepts:</strong> Git & GitHub, REST APIs, JWT Authentication, Postman, Responsive UI Design</p>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Key Engineering Projects</h3>
            
            {/* Project 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h4 className="text-lg font-bold text-white">Virtual Try-On Clothing Web Application <span className="text-slate-500 text-sm font-normal">(Final Year Project)</span></h4>
                <span className="text-xs font-bold text-slate-500">2026</span>
              </div>
              <p className="text-xs text-cyan-400 font-mono">Live Deployment: trylo.store</p>
              <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1 font-light">
                <li>Built a full MERN stack e-commerce clothing store solving high return rates by enabling digital preview parameters.</li>
                <li>Integrated an AI-powered virtual try-on feature using the VITON-HD model, rendering photorealistic 3D user visualizations.</li>
                <li>Implemented secure RESTful API flows and token authentication connecting React views to Node routers and MongoDB.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h4 className="text-lg font-bold text-white">Personal Portfolio Architecture</h4>
                <span className="text-xs font-bold text-slate-500">2025</span>
              </div>
              <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1 font-light">
                <li>Engineered an optimized modular SPA in React leveraging utility styling compilation for fluid cross-device layouts.</li>
                <li>Configured custom secure form capture handling bound to Email APIs for zero-latency visitor metrics routing.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Education</h3>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h4 className="text-base font-bold text-white">BS in Computer Science</h4>
                <span className="text-xs font-bold text-slate-500">2022 - 2026</span>
              </div>
              <p className="text-sm text-slate-400 font-light">Minhaj University Lahore</p>
              <p className="text-xs text-slate-500 font-light">Graduated with a strong foundation in Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), and Programming Fundamentals.</p>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2 pt-2 border-t border-slate-800/40">
            <p className="text-xs text-slate-500"><strong className="text-slate-400 uppercase tracking-wider text-[10px] font-bold mr-2">Languages:</strong> English, Urdu</p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}