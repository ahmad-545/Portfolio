import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import pic from '../../assets/hero2.png';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import {
  Code,
  Server,
  Database,
  Sparkles,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Award,
  Terminal,
  ExternalLink,
} from 'lucide-react';

/* ---------------------------------------------------------
   Small reusable hooks (no external libraries needed)
--------------------------------------------------------- */

function useTypewriter(words, { typingSpeed = 65, deletingSpeed = 35, pause = 1400 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

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

function useCountUp(target, visible, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);

  return value;
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
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
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

const CODE_GLYPHS = [
  '</>',
  '{ }',
  '=>',
  'const',
  'npm run dev',
  'git commit',
  'async/await',
  'SELECT *',
  'AI.predict()',
  '{ status: 200 }',
];

const TECH_STACK = [
  'React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS',
  'REST APIs', 'JavaScript (ES6+)', 'Docker', 'Git & GitHub', 'LLM Integrations',
];

export default function Hero() {
  const role = useTypewriter(
    [
      'MERN & Full-Stack Web Developer',
      'React.js • Node.js • MongoDB',
      'Building AI-Powered Web Apps',
      'Turning Ideas Into Products',
    ],
    { typingSpeed: 55, deletingSpeed: 28, pause: 1500 }
  );

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
      tag: "Full Stack / AI",
      link: "https://trylo.store/",
    },
    {
      title: "AI Expense & Subscription Tracker",
      desc: "A smart finance dashboard that tracks expenses, subscriptions and budgets, with an AI advisor that answers questions about your spending in plain English or Roman Urdu.",
      tag: "Full Stack / AI",
      link: "https://expense-or-subcribtion-traker.vercel.app/",
    },
    {
      title: "Trylo Premium E-Commerce",
      desc: "A feature-rich online retail platform complete with secure checkout, dynamic product management, and admin dashboard.",
      tag: "MERN Stack",
      link: null,
    },
    {
      title: "Database Connection Pooler",
      desc: "High-efficiency backend utility optimized for managing heavy concurrent database queries across MongoDB and MySQL.",
      tag: "Backend Engineering",
      link: null,
    }
  ];

  const [statsRef, statsVisible] = useReveal(0.3);
  const dedication = useCountUp(100, statsVisible);

  const heroRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 40 });
  const handleHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
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
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-cyan-500/35 text-slate-100 font-sans overflow-x-hidden">
      <style>{`
        @keyframes blinkCursor { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor-blink { animation: blinkCursor 1s steps(1) infinite; }

        @keyframes floatCode {
          0%   { transform: translateY(0) rotate(var(--rot, 0deg)); opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-120px) rotate(var(--rot, 0deg)); opacity: 0; }
        }
        .float-code { animation: floatCode linear infinite; }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
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

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline { animation: scanline 6s linear infinite; }

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

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 22s linear infinite; }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(34,211,238,0.45); }
          100% { box-shadow: 0 0 0 14px rgba(34,211,238,0); }
        }
        .pulse-ring { animation: pulseRing 1.8s ease-out infinite; }

        .tilt-card:hover .tilt-glow {
          opacity: 1;
          background: radial-gradient(180px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(34,211,238,0.12), transparent 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .float-code, .float-bob, .spin-slow, .gradient-move, .gradient-move-delay,
          .animate-scanline, .pan-grid, .twinkle, .animate-marquee, .pulse-ring, .cursor-blink {
            animation: none !important;
          }
        }
      `}</style>

      <Navbar />

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMove}
        className="min-h-[92vh] flex items-center justify-center relative overflow-hidden py-20 px-6 md:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(34,211,238,0.07), transparent 70%)`,
          }}
        />

        <div
          className="pan-grid pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]">
          <div className="animate-scanline absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-cyan-300 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0">
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

        <div className="gradient-move absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="gradient-move-delay absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          {CODE_GLYPHS.map((glyph, i) => {
            const left = (i * 37) % 100;
            const duration = 10 + (i % 5) * 2;
            const delay = -(i * 1.7);
            const rot = (i % 2 === 0 ? 1 : -1) * (4 + (i % 3) * 3);
            return (
              <span
                key={glyph}
                className="float-code absolute font-mono text-cyan-400/40 text-xs sm:text-sm select-none"
                style={{
                  left: `${left}%`,
                  bottom: '-10%',
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  ['--rot']: `${rot}deg`,
                }}
              >
                {glyph}
              </span>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-slate-500">$</span> status --available
              <span className="text-cyan-300">true</span>
              <span className="cursor-blink text-cyan-300">▍</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-4 text-white">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Muhammad Ahmad
              </span>
            </h1>

            <p className="text-lg sm:text-2xl font-semibold text-slate-300 mb-4 tracking-wide font-mono min-h-[2.5rem]">
              <span className="text-cyan-400">&gt;</span> {role}
              <span className="cursor-blink text-cyan-300">▍</span>
            </p>

            <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              I transform complex requirements into clean, high-performance web applications. Specializing in modern React frontends, robust Node.js backends, and smart AI integrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Link
                to="/Contact"
                className="pulse-ring group relative w-full sm:w-auto overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:-translate-y-0.5 text-center text-sm uppercase"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">Let's Talk <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
              <Link
                to="/resume"
                className="group w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold tracking-wider rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all text-center text-sm uppercase flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Terminal size={16} className="text-cyan-400 transition-transform group-hover:scale-110" /> View Resume
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group float-bob">
              <div className="spin-slow absolute -inset-3 rounded-[2rem] bg-[conic-gradient(from_0deg,#22d3ee,#3b82f6,#22d3ee)] opacity-40 blur-md pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl overflow-hidden">
                <img
                  src={pic}
                  alt="Muhammad Ahmad"
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="pointer-events-none absolute inset-3 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-cyan-300/0 via-cyan-300/25 to-cyan-300/0 animate-scanline" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section className="relative py-6 border-y border-slate-900 bg-slate-950 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 mx-4 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-mono whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {tech}
            </span>
          ))}
        </div>
      </section>

      {/* QUICK STATS / HIGHLIGHTS BAR */}
      <section ref={statsRef} className="py-10 border-y border-slate-900 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: `${dedication}%`, label: 'Client Dedication', color: 'text-cyan-400', Icon: Award },
            { value: 'MERN', label: 'Stack Expertise', color: 'text-white', Icon: Code },
            { value: 'AI', label: 'Integration Ready', color: 'text-cyan-400', Icon: Sparkles },
            { value: '24/7', label: 'Problem Solving', color: 'text-white', Icon: Terminal },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`p-4 transition-all duration-700 ease-out ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <stat.Icon size={18} className={`mx-auto mb-2 ${stat.color} opacity-70`} />
              <h3 className={`text-3xl sm:text-4xl font-extrabold mb-1 ${stat.color}`}>{stat.value}</h3>
              <p className="text-slate-400 text-xs sm:text-sm tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section className="relative py-24 px-6 md:px-12 bg-slate-950 overflow-hidden">
        <pre className="pointer-events-none select-none absolute inset-0 flex items-center justify-center opacity-[0.04] font-mono text-xs sm:text-sm leading-6 text-cyan-300 whitespace-pre">
{`const developer = {
  name: "Muhammad Ahmad",
  role: "Full-Stack Engineer",
  stack: ["React", "Node.js", "MongoDB", "AI"],
  mindset: () => "clean code, scalable systems",
};`}
        </pre>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Terminal size={14} /> Background & Philosophy
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">Engineering with Purpose</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8"></div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-6">
              I am a dedicated full-stack developer who thrives at the intersection of design and clean backend logic. My approach focuses on building robust architectures that scale effortlessly while delivering crisp, highly responsive user experiences.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {["Clean Code", "Performance Optimization", "Scalable Architecture", "UI/UX Focus"].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all text-slate-300 text-xs font-medium">
                  <CheckCircle2 size={14} className="text-cyan-400" /> {badge}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. SKILLS / CORE EXPERTISE */}
      <section className="py-24 px-6 md:px-12 border-t border-slate-900 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-widest block mb-2">What I Do Best</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">Core Expertise</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Reveal key={index} delay={index * 90}>
                <TiltCard className="h-full p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                    <skill.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="py-24 px-6 md:px-12 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                <Briefcase size={14} /> Portfolio Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Featured Projects</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4 md:mt-0"></div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <Reveal key={idx} delay={idx * 90}>
                <TiltCard className="h-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-colors duration-300 group">
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
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                      >
                        Live Demo <ExternalLink size={16} />
                      </a>
                    ) : (
                      <Link to="/Contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-slate-900 text-center overflow-hidden">
        <div className="gradient-move absolute top-0 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="gradient-move-delay absolute bottom-0 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <Reveal className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Have a project in mind or want to collaborate?</h2>
          <p className="text-slate-400 text-base md:text-lg mb-8">Let's build something exceptional together. Get in touch and let's discuss your next big idea.</p>
          <Link
            to="/Contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold tracking-wider rounded-xl shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all text-sm uppercase hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Get In Touch Now</span>
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}