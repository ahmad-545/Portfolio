import React, { useEffect, useMemo, useRef, useState } from 'react';
import pic from "../../assets/hero2.png";
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { Terminal, Code, GitBranch } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

/* ---------------------------------------------------------
   Small reusable hooks (matching Hero page animations)
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
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;
    setStyle({
      transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
      '--glow-x': `${px * 100}%`,
      '--glow-y': `${py * 100}%`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: 'perspective(700px) rotateX(0deg) rotateY(0deg)' });
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

export default function About() {
  const skillsData = [
    {
      name: "MERN Stack Integration (MongoDB, Express, React, Node)",
      level: "85%",
      width: "w-[85%]",
      color: "from-cyan-400 via-teal-400 to-blue-500"
    },
    {
      name: "React.js Component Architecture",
      level: "85%",
      width: "w-[85%]",
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Node.js & Express.js RESTful APIs",
      level: "75%",
      width: "w-[75%]",
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "JavaScript (ES6+) Core Logic",
      level: "80%",
      width: "w-4/5",
      color: "from-teal-400 to-blue-500"
    },
    {
      name: "Tailwind CSS & Responsive UI Design",
      level: "95%",
      width: "w-[95%]",
      color: "from-cyan-500 to-teal-400"
    }
  ];

  const stats = [
    { metrics: "1+", label: "YEAR OF EXPERIENCE" },
    { metrics: "80+", label: "PROJECTS COMPLETE" },
    { metrics: "10+", label: "HAPPY CLIENTS" }
  ];

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/35 overflow-x-hidden relative">
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .float-bob { animation: floatBob 5s ease-in-out infinite; }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spinSlow 14s linear infinite; }

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
          background: radial-gradient(180px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(34,211,238,0.12), transparent 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .float-bob, .spin-slow, .gradient-move, .gradient-move-delay, .pan-grid, .twinkle {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background Animated Elements */}
      <div className="pan-grid pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="gradient-move absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="gradient-move-delay absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Twinkling Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="twinkle absolute rounded-full bg-cyan-300"
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

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 md:px-12 pt-10 md:pt-16 pb-20 relative z-20">

        {/* Title Section - Guaranteed gap before grid starts */}
        <Reveal className="mb-12 md:mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Terminal size={14} /> Get to Know Me
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight relative inline-block pb-4 after:absolute after:bottom-0 after:left-1/2 lg:after:left-0 after:transform after:-translate-x-1/2 lg:after:translate-x-0 after:w-20 after:h-1.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:rounded-full">
              About Me
            </h1>
          </div>
        </Reveal>

        {/* Content Grid - Using items-start to prevent layout overlap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16 md:mb-20">

          {/* Left Column: Floating Image Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <Reveal className="w-full max-w-sm">
              <div className="relative group float-bob">
                <div className="spin-slow absolute -inset-3 rounded-[2rem] bg-[conic-gradient(from_0deg,#22d3ee,#3b82f6,#22d3ee)] opacity-40 blur-md pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
                <div className="relative bg-slate-900 border border-slate-800 p-3 rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src={pic}
                    alt="Ahmad Profile Workspace"
                    className="rounded-2xl w-full h-[360px] sm:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Bio Paragraph + Technical Skills */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={100}>
              <TiltCard className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
                  I am a passionate <span className="text-cyan-400 font-medium">Full-Stack Developer</span> and MERN Stack specialist dedicated to building efficient, scale-ready web applications. I bridge the gap between design and robust server architecture—crafting rich, responsive user interfaces with React, managing database state with MongoDB, and engineering scalable backend systems utilizing Node.js and Express.
                </p>
              </TiltCard>
            </Reveal>

            {/* Technical Proficiency Progress Bars */}
            <Reveal delay={200}>
              <div className="space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-900 shadow-xl">
                <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                  <Code size={16} /> Technical Proficiency
                </h3>
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2 group">
                    <div className="flex justify-between text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
                      <p className="group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </p>
                      <span className="text-cyan-400 font-mono">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} ${skill.width} rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(34,211,238,0.3)]`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>

        {/* GitHub Contributions Section */}
        <Reveal delay={250} className="mb-16">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <GitBranch size={16} /> GitHub Contributions & Activity
              </h3>
              <a 
                href="https://github.com/ahmad-545" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
              >
                @ahmad-545 on GitHub &rarr;
              </a>
            </div>
            
            <div className="overflow-x-auto flex justify-center py-2 bg-slate-950/50 p-4 rounded-xl border border-slate-900">
              <GitHubCalendar 
                username="ahmad-545" 
                colorScheme="dark"
                fontSize={13}
                blockSize={12}
                blockMargin={4}
                theme={{
                  dark: ['#090d16', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* Counters / Stats Block */}
        <Reveal delay={300}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 text-center shadow-2xl">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="space-y-2 relative group py-4 sm:py-0 last:border-none border-b sm:border-b-0 sm:border-r border-slate-800/80"
              >
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.metrics}
                </h2>
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

      </main>

      <Footer />
    </div>
  );
}