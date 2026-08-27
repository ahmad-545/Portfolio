import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { Terminal, Download, ExternalLink } from 'lucide-react';

/* ---------------------------------------------------------
   Small reusable hooks (matching Hero/About/Work/Services animations)
--------------------------------------------------------- */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 4;
    const rotateX = (0.5 - py) * 4;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
      '--glow-x': `${px * 100}%`,
      '--glow-y': `${py * 100}%`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out', ...style }}
      className={`tilt-card relative ${className}`}
    >
      <div className="tilt-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
      {children}
    </div>
  );
}

export default function Resume() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 2.5 + Math.random() * 3.5,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/35 selection:text-emerald-200 overflow-x-hidden relative">
      <style>{`
        @keyframes gradientMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.08); }
          66% { transform: translate(-20px, 25px) scale(0.95); }
        }
        .gradient-move { animation: gradientMove 12s ease-in-out infinite; }
        .gradient-move-delay { animation: gradientMove 12s ease-in-out infinite; animation-delay: -6s; }

        @keyframes panGrid {
          0% { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
        .pan-grid { animation: panGrid 6s linear infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }
        .twinkle { animation: twinkle ease-in-out infinite; }

        .tilt-card:hover .tilt-glow {
          opacity: 1;
          background: radial-gradient(180px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(52,211,153,0.15), transparent 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-move, .gradient-move-delay, .pan-grid, .twinkle {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background Animated Elements */}
      <div className="pan-grid pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="gradient-move absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="gradient-move-delay absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Twinkling Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="twinkle absolute rounded-full bg-emerald-300"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full relative z-20 text-slate-300">
        
        {/* Header Options */}
        <Reveal className="flex justify-between items-center mb-10 border-b border-slate-800/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1">
              <Terminal size={14} /> Official Document
            </div>
            <h1 className="text-3xl font-black text-white">Curriculum Vitae</h1>
          </div>
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-400 uppercase tracking-widest transition-all shadow-md group"
          >
            <span>Print / Download PDF</span>
            <Download size={14} className="transform group-hover:translate-y-0.5 transition-transform" />
          </button>
        </Reveal>

        {/* Resume Sheet */}
        <Reveal delay={100}>
          <TiltCard className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-6 md:p-10 shadow-2xl space-y-8 transition-colors">
            
            {/* Top Identity Block */}
            <div className="text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800/60">
              <div>
                <h2 className="text-3xl font-black text-white">MUHAMMAD AHMAD</h2>
                <p className="text-emerald-400 font-semibold tracking-wide text-sm mt-1">Full Stack Developer</p>
              </div>
              <div className="text-sm text-slate-400 space-y-1 text-center sm:text-right w-full sm:w-auto font-mono text-xs">
                <p>📧 ahmaddev545@gmail.com | 📱 +92 348 4236919</p>
                <p>📍 Lahore, Pakistan</p>
                <p className="text-emerald-400/80">github.com/ahmad-545 | linkedin.com/in/muhammad-ahmad-9b031530a</p>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Professional Summary</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Full Stack Developer skilled in building responsive, user-friendly, and scalable web applications using the MERN stack[cite: 1]. Experienced in developing RESTful APIs, secure authentication systems, database-driven applications, and modern React interfaces[cite: 1]. Skilled in AI integration and building real-world applications with a strong focus on clean code, performance, and problem-solving[cite: 1].
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Technical Skill Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-950/60 p-5 rounded-xl border border-slate-900">
                <p><strong className="text-white font-mono text-xs text-emerald-300">Tech Stack:</strong> MongoDB, Express.js, React.js, Node.js (MERN)[cite: 1]</p>
                <p><strong className="text-white font-mono text-xs text-emerald-300">Languages:</strong> JavaScript, Python[cite: 1]</p>
                <p className="sm:col-span-2"><strong className="text-white font-mono text-xs text-emerald-300">Tools & AI Integration:</strong> GitHub, Version Control, REST APIs, JWT Authentication, Postman, Responsive UI Design[cite: 1]</p>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Key Engineering Projects</h3>
              
              {/* Project 1 */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    Virtual Try-On Clothing Web Application <span className="text-slate-500 text-xs font-normal font-mono">(Final Year Project)</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">2026[cite: 1]</span>
                </div>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <ExternalLink size={12} /> Live: trylo.store[cite: 1]
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1.5 font-light">
                  <li>Built a full MERN stack e-commerce clothing store solving a major online shopping problem: customers being unable to preview how clothes look on them before buying[cite: 1].</li>
                  <li>Integrated an AI-powered virtual try-on feature using the VITON-HD model, allowing users to upload a photo and see a realistic 3D preview[cite: 1].</li>
                  <li>Designed a clean product catalog, secure user account management, and encrypted data storage to support a production-style shopping experience[cite: 1].</li>
                  <li>Implemented RESTful APIs and authentication flows connecting the React.js frontend with a Node.js/Express backend and MongoDB database[cite: 1].</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="space-y-2 pt-2 border-t border-slate-800/40">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h4 className="text-lg font-bold text-white">AI-Powered Personal Expense & Subscription Tracker</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">2026[cite: 1]</span>
                </div>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <ExternalLink size={12} /> Live: Expense AI[cite: 1]
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1.5 font-light">
                  <li>Built a MERN stack financial management platform for tracking personal expenses, subscriptions, budgets, cards, and financial activity in one place[cite: 1].</li>
                  <li>Implemented JWT authentication, expense and subscription management, budget limits, interactive dashboards, reports, and data export[cite: 1].</li>
                  <li>Integrated AI-powered spending analysis for personalized saving suggestions and budget warnings[cite: 1].</li>
                  <li>Added automated subscription renewal alerts and reminders using Node-cron. Developed the interface with React.js, Tailwind CSS, and MongoDB Atlas[cite: 1].</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="space-y-2 pt-2 border-t border-slate-800/40">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h4 className="text-lg font-bold text-white">Personal Portfolio Website</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">2025[cite: 1]</span>
                </div>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <ExternalLink size={12} /> Live: Portfolio[cite: 1]
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1.5 font-light">
                  <li>Developed a fully responsive personal portfolio using React.js to showcase skills, projects, and contact details[cite: 1].</li>
                  <li>Built modern, reusable UI components with smooth navigation and cross-device responsiveness[cite: 1].</li>
                  <li>Integrated a working contact form via Email API for direct visitor messages and optimized the site for performance and accessibility[cite: 1].</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3 pt-2 border-t border-slate-800/40">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Education</h3>
              <div className="space-y-1 bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h4 className="text-base font-bold text-white">BS in Computer Science[cite: 1]</h4>
                  <span className="text-xs font-mono font-bold text-slate-400">2022 - 2026[cite: 1]</span>
                </div>
                <p className="text-sm text-emerald-300 font-medium">Minhaj University Lahore[cite: 1]</p>
                <p className="text-xs text-slate-400 font-light pt-1">
                  Graduated with a strong foundation in Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), and Programming Fundamentals[cite: 1].
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2 pt-2 border-t border-slate-800/40">
              <p className="text-xs text-slate-400"><strong className="text-emerald-400 uppercase tracking-wider text-[10px] font-mono font-bold mr-2">Languages:</strong> English, Urdu</p>
            </div>

          </TiltCard>
        </Reveal>

      </main>

      <Footer />
    </div>
  );
}