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
  MessageSquare,
  Cpu,
  Layers,
  Zap,
  Globe,
} from 'lucide-react';

function GithubIcon({ className = 'w-3.5 h-3.5 text-emerald-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/* ---------------------------------------------------------
   Custom Interactive Hooks
--------------------------------------------------------- */

function useTypewriter(words, { typingSpeed = 50, deletingSpeed = 25, pause = 1600 } = {}) {
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

function useCountUp(target, visible, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(easeOut * target));
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
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
      '--glow-x': `${px * 100}%`,
      '--glow-y': `${py * 100}%`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)' });
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
  '{ Next.js }',
  'const dev = true',
  'npm run dev',
  'git push origin main',
  'async/await',
  'MongoDB.connect()',
  'AI.predict()',
  '{ status: 200 }',
  'export default App',
  'useState<FullStack>()',
  'API.endpoint()',
];

const TECH_STACK = [
  { name: 'Next.js 15', tag: 'Full Stack' },
  { name: 'React.js 18', tag: 'Frontend' },
  { name: 'Node.js', tag: 'Backend' },
  { name: 'Express.js', tag: 'APIs' },
  { name: 'MongoDB', tag: 'Database' },
  { name: 'Tailwind CSS', tag: 'Styling' },
  { name: 'JavaScript (ES6+)', tag: 'Core' },
  { name: 'REST & GraphQL', tag: 'Architecture' },
  { name: 'AI & LLM Integrations', tag: 'Smart Apps' },
  { name: 'Git & GitHub', tag: 'VCS' },
  { name: 'Docker', tag: 'DevOps' },
  { name: 'PostgreSQL', tag: 'SQL' },
];

export default function Hero() {
  const [activeCodeTab, setActiveCodeTab] = useState('stack');

  const role = useTypewriter(
    [
      'Full-Stack Developer (MERN & Next.js)',
      'React.js • Next.js • Node.js • MongoDB',
      'AI-Powered Modern Web Applications',
      'Engineering Scalable & High-Speed Apps',
    ],
    { typingSpeed: 50, deletingSpeed: 25, pause: 1600 }
  );

  const skills = [
    {
      name: "Frontend & Next.js",
      icon: Code,
      badge: "UI / UX & SSR",
      desc: "Architecting lightning-fast user interfaces with Next.js, React 18, Tailwind CSS, and reactive state management."
    },
    {
      name: "Backend & RESTful APIs",
      icon: Server,
      badge: "High Concurrency",
      desc: "Developing secure RESTful endpoints, robust microservices, and high-performance server logic with Node.js and Express."
    },
    {
      name: "Database Architecture",
      icon: Database,
      badge: "MongoDB & SQL",
      desc: "Designing resilient schema models, connection pooling, optimized indexing, and smooth data workflows."
    },
    {
      name: "AI & Smart Automation",
      icon: Sparkles,
      badge: "LLMs & Agents",
      desc: "Integrating OpenAI models, custom intelligent chatbots, and AI workflow automation into web systems."
    }
  ];

  const projects = [
    {
      title: "AI-Powered Virtual Try-On",
      desc: "An advanced MERN stack & AI web application enabling users to seamlessly try on clothing items virtually in real-time.",
      tag: "Full Stack / AI",
      link: "https://trylo.store/",
      tech: ["Next.js", "React", "Node.js", "AI Model"]
    },
    {
      title: "AI Expense & Subscription Tracker",
      desc: "Smart finance intelligence platform that tracks recurring subscriptions and budgets, with an interactive Roman Urdu/English AI advisor.",
      tag: "Full Stack / AI",
      link: "https://expense-or-subcribtion-traker.vercel.app/",
      tech: ["React", "Express", "MongoDB", "OpenAI"]
    },
    {
      title: "Trylo Premium E-Commerce",
      desc: "Comprehensive online shopping platform featuring secure multi-vendor checkouts, dynamic cart management, and admin console.",
      tag: "MERN Stack",
      link: null,
      tech: ["React", "Node.js", "Express", "Stripe"]
    },
    {
      title: "High-Speed Connection Pooler",
      desc: "High-efficiency backend utility optimized for handling heavy concurrent database queries across MongoDB clusters.",
      tag: "Backend Engineering",
      link: null,
      tech: ["Node.js", "MongoDB", "Redis", "Docker"]
    }
  ];

  const [statsRef, statsVisible] = useReveal(0.2);
  const yearsExp = useCountUp(1, statsVisible);
  const projectsCount = useCountUp(80, statsVisible);
  const clientsCount = useCountUp(10, statsVisible);
  const codeQuality = useCountUp(100, statsVisible);

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
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200 text-slate-100 font-sans overflow-x-hidden">
      <style>{`
        @keyframes blinkCursor { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor-blink { animation: blinkCursor 1s steps(1) infinite; }

        @keyframes floatCode {
          0%   { transform: translateY(0) rotate(var(--rot, 0deg)); opacity: 0; }
          12%  { opacity: 0.45; }
          88%  { opacity: 0.45; }
          100% { transform: translateY(-130px) rotate(var(--rot, 0deg)); opacity: 0; }
        }
        .float-code { animation: floatCode linear infinite; }

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.2deg); }
        }
        .float-gentle { animation: floatGentle 5s ease-in-out infinite; }

        @keyframes floatBadge1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-8px, -14px); }
        }
        .float-badge-1 { animation: floatBadge1 4.5s ease-in-out infinite; }

        @keyframes floatBadge2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -12px); }
        }
        .float-badge-2 { animation: floatBadge2 5.5s ease-in-out infinite; }

        @keyframes floatBadge3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 10px); }
        }
        .float-badge-3 { animation: floatBadge3 6s ease-in-out infinite; }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spinSlow 12s linear infinite; }

        @keyframes spinSlowReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .spin-slow-reverse { animation: spinSlowReverse 18s linear infinite; }

        @keyframes gradientMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(35px, -25px) scale(1.1); }
          66% { transform: translate(-25px, 30px) scale(0.92); }
        }
        .gradient-move { animation: gradientMove 12s ease-in-out infinite; }
        .gradient-move-delay { animation: gradientMove 12s ease-in-out infinite; animation-delay: -6s; }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline { animation: scanline 5s linear infinite; }

        @keyframes panGrid {
          0% { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
        .pan-grid { animation: panGrid 6s linear infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .twinkle { animation: twinkle ease-in-out infinite; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 24s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
          100% { box-shadow: 0 0 0 16px rgba(52,211,153,0); }
        }
        .pulse-ring { animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        .tilt-card:hover .tilt-glow {
          opacity: 1;
          background: radial-gradient(220px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(52,211,153,0.15), transparent 70%);
        }

        .cyber-glass {
          background: rgba(10, 20, 16, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(52, 211, 153, 0.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .float-code, .float-gentle, .float-badge-1, .float-badge-2, .float-badge-3,
          .spin-slow, .spin-slow-reverse, .gradient-move, .gradient-move-delay,
          .animate-scanline, .pan-grid, .twinkle, .animate-marquee, .pulse-ring, .cursor-blink {
            animation: none !important;
          }
        }
      `}</style>

      <Navbar />

      {/* =========================================================================
          1. HERO SECTION - ULTRA MODERN REDESIGN & RICH ANIMATIONS
      ========================================================================= */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMove}
        className="min-h-[96vh] flex items-center justify-center relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 md:px-12"
      >
        {/* Dynamic Mouse Tracking Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${spot.x}% ${spot.y}%, rgba(52,211,153,0.14), rgba(16,185,129,0.04) 40%, transparent 75%)`,
          }}
        />

        {/* Ambient Glowing Aurora Blobs */}
        <div className="gradient-move absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="gradient-move-delay absolute bottom-1/4 right-10 w-[28rem] h-[28rem] bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="gradient-move absolute top-1/2 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Cyber Matrix Grid */}
        <div
          className="pan-grid pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Cyber Scanning Beam */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
          <div className="animate-scanline absolute inset-x-0 h-44 bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
        </div>

        {/* Twinkling Particle Constellation */}
        <div className="pointer-events-none absolute inset-0">
          {particles.map((p) => (
            <span
              key={p.id}
              className="twinkle absolute rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
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

        {/* Floating Developer Code Badges in Background */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          {CODE_GLYPHS.map((glyph, i) => {
            const left = (i * 31 + 7) % 94;
            const duration = 11 + (i % 4) * 2.5;
            const delay = -(i * 1.6);
            const rot = (i % 2 === 0 ? 1 : -1) * (5 + (i % 3) * 4);
            return (
              <span
                key={glyph}
                className="float-code absolute font-mono text-emerald-400/35 text-xs sm:text-sm select-none px-2.5 py-1 rounded-md bg-slate-900/40 border border-emerald-500/10 backdrop-blur-xs"
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

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* ================= LEFT COLUMN: HERO TEXT & CTAs ================= */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Live Status Pill with Radar Pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-[11px] sm:text-xs font-mono text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md max-w-full">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400 font-semibold truncate">AVAILABLE FOR NEW PROJECTS</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-emerald-400 font-bold">FULL-STACK & NEXT.JS</span>
            </div>

            {/* Main Greeting & Name Headline */}
            <div>
              <p className="text-xs sm:text-sm md:text-base font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Terminal size={16} /> Hello, World! I am
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-none text-white break-words">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  Muhammad
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 drop-shadow-[0_0_35px_rgba(52,211,153,0.25)]">
                  Ahmad
                </span>
              </h1>
            </div>

            {/* Dynamic Interactive Typewriter Console */}
            <div className="inline-block w-full">
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md shadow-inner">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 text-slate-400">~/ahmad/developer.ts</span>
                </div>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold font-mono text-slate-200 tracking-tight flex items-center justify-center lg:justify-start min-h-[2.5rem] flex-wrap">
                  <span className="text-emerald-400 mr-2 font-black">&gt;</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-green-400">
                    {role}
                  </span>
                  <span className="cursor-blink text-emerald-400 ml-1 font-bold">▍</span>
                </p>
              </div>
            </div>

            {/* Elevator Pitch Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transforming innovative ideas into scale-ready web platforms. Specializing in <span className="text-emerald-400 font-semibold">Next.js & React</span> frontend engineering, resilient <span className="text-teal-300 font-semibold">Node.js / Express</span> backend APIs, and smart <span className="text-green-400 font-semibold">AI integrations</span>.
            </p>

            {/* Quick Action Buttons (CTAs) */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center lg:justify-start pt-2">
              {/* Primary Glowing Button */}
              <Link
                to="/Contact"
                className="pulse-ring group relative w-full sm:w-auto overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 text-slate-950 font-black tracking-wider rounded-xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 text-center text-xs sm:text-sm uppercase flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">
                  <Zap size={16} className="fill-current text-slate-950 sm:w-[18px] sm:h-[18px]" />
                  Let's Talk Projects
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              {/* Secondary Projects Button */}
              <Link
                to="/work"
                className="group w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold tracking-wider rounded-xl border border-slate-700 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-500/15 hover:scale-105 active:scale-95 transition-all duration-300 text-center text-xs sm:text-sm uppercase flex items-center justify-center gap-2"
              >
                <Briefcase size={16} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                Explore Work
              </Link>

              {/* Resume Button */}
              <Link
                to="/resume"
                className="group w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-emerald-300 font-semibold tracking-wider rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all text-center text-xs sm:text-sm uppercase flex items-center justify-center gap-2"
              >
                <Terminal size={16} className="text-emerald-400" /> Resume
              </Link>
            </div>

            {/* Quick Social / Connect Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-xs font-mono text-slate-400">
              <a
                href="https://github.com/ahmad-545"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300 transition-all text-[11px] sm:text-xs"
              >
                <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
                github.com/ahmad-545
              </a>
              <a
                href="https://wa.me/923484236919?text=Hi%20Ahmad,%20I%20saw%20your%20portfolio!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300 transition-all text-[11px] sm:text-xs"
              >
                <MessageSquare size={14} className="text-emerald-400" />
                WhatsApp Direct
              </a>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: FUTURISTIC 3D DEVELOPER SHOWCASE ================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            
            {/* Interactive Outer Visual Container with Float Physics */}
            <div className="relative group float-gentle w-full max-w-xs sm:max-w-md mx-auto">
              
              {/* Rotating Holographic Conic Glow Ring */}
              <div className="spin-slow absolute -inset-3 sm:-inset-4 rounded-[2.5rem] bg-[conic-gradient(from_0deg,#10b981,#34d399,#059669,#10b981)] opacity-50 blur-xl group-hover:opacity-75 transition duration-700 pointer-events-none" />
              <div className="spin-slow-reverse absolute -inset-2 rounded-[2.5rem] bg-[conic-gradient(from_180deg,#34d399,#6ee7b7,#059669,#34d399)] opacity-30 blur-md pointer-events-none" />

              {/* Main Card Frame */}
              <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-3xl p-3 sm:p-3.5 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Developer Avatar with Holographic Overlay */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-square sm:aspect-[4/4.5] flex items-center justify-center">
                  <img
                    src={pic}
                    alt="Muhammad Ahmad - Full Stack Developer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  />

                  {/* Laser Scanline Beam on Hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 animate-scanline" />
                  </div>

                  {/* Corner Tech Accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none"></div>

                  {/* Bottom Avatar Status Card */}
                  <div className="absolute bottom-3 inset-x-3 p-2 sm:p-2.5 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-200">Muhammad Ahmad</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      MERN & NEXT.JS
                    </span>
                  </div>
                </div>

                {/* Floating Orbit Tech Badges */}
                {/* Top-Left: Next.js & React */}
                <div className="float-badge-1 absolute -top-3 -left-2 sm:-top-4 sm:-left-4 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl cyber-glass border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-mono font-bold shadow-xl shadow-emerald-500/10 flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="text-xs sm:text-sm">▲</span> Next.js & React 18
                </div>

                {/* Top-Right: Full Stack */}
                <div className="float-badge-2 absolute -top-3 -right-2 sm:-top-3 sm:-right-3 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl cyber-glass border border-teal-500/40 text-teal-300 text-[10px] sm:text-xs font-mono font-bold shadow-xl shadow-teal-500/10 flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <Cpu size={13} className="text-teal-400 sm:w-3.5 sm:h-3.5" /> Full Stack MERN
                </div>

                {/* Bottom-Right: AI Integrations */}
                <div className="float-badge-3 absolute -bottom-3 -right-2 sm:-bottom-3 sm:-right-3 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl cyber-glass border border-green-500/40 text-green-300 text-[10px] sm:text-xs font-mono font-bold shadow-xl shadow-green-500/10 flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <Sparkles size={13} className="text-green-400 sm:w-3.5 sm:h-3.5" /> AI & Smart APIs
                </div>
              </div>

              {/* Live Mini Code Console Below Avatar */}
              <div className="mt-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-2 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveCodeTab('stack')}
                      className={`px-2 py-0.5 rounded ${activeCodeTab === 'stack' ? 'bg-emerald-500/20 text-emerald-300' : 'hover:text-slate-200'}`}
                    >
                      Stack.json
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('metrics')}
                      className={`px-2 py-0.5 rounded ${activeCodeTab === 'metrics' ? 'bg-emerald-500/20 text-emerald-300' : 'hover:text-slate-200'}`}
                    >
                      Metrics.ts
                    </button>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>

                {activeCodeTab === 'stack' ? (
                  <pre className="text-[11px] sm:text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-emerald-400">const</span> developer = &#123;{'\n'}
                      {'  '}core: [<span className="text-emerald-300">"Next.js"</span>, <span className="text-teal-300">"React"</span>, <span className="text-green-300">"Node.js"</span>],{'\n'}
                      {'  '}database: <span className="text-emerald-300">"MongoDB & PostgreSQL"</span>,{'\n'}
                      {'  '}mindset: <span className="text-teal-300">"Clean Code & Performance"</span>{'\n'}
                      &#125;;
                    </code>
                  </pre>
                ) : (
                  <pre className="text-[11px] sm:text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-emerald-400">export const</span> metrics = &#123;{'\n'}
                      {'  '}projectsCompleted: <span className="text-amber-300">"80+"</span>,{'\n'}
                      {'  '}clientSatisfaction: <span className="text-emerald-300">"100%"</span>,{'\n'}
                      {'  '}deliverySpeed: <span className="text-emerald-300">"Lightning Fast"</span>{'\n'}
                      &#125;;
                    </code>
                  </pre>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. TECH STACK INFINITE MARQUEE WITH GLOW BADGES
      ========================================================================= */}
      <section className="relative py-7 border-y border-slate-900 bg-slate-950/90 overflow-hidden backdrop-blur-md">
        <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-marquee">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 sm:gap-2.5 mx-2 sm:mx-3 px-3 sm:px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap shadow-sm hover:shadow-emerald-500/10 transition-all duration-300 group cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 group-hover:scale-125 transition-transform" />
              <span className="font-semibold">{tech.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-sans">
                {tech.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. STATS & KEY IMPACT HIGHLIGHTS
      ========================================================================= */}
      <section ref={statsRef} className="py-12 md:py-14 border-b border-slate-900 bg-slate-900/30 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 text-center">
          {[
            { value: `${yearsExp}+`, label: 'Years Experience', sub: 'Industry Standard', color: 'from-emerald-400 to-teal-300', Icon: Award },
            { value: `${projectsCount}+`, label: 'Projects Completed', sub: 'MERN & Full-Stack', color: 'from-teal-300 to-green-400', Icon: Code },
            { value: `${clientsCount}+`, label: 'Satisfied Clients', sub: 'Global Collaborations', color: 'from-green-400 to-emerald-400', Icon: Globe },
            { value: `${codeQuality}%`, label: 'Code Quality & Dedication', sub: 'Clean Architecture', color: 'from-emerald-400 to-green-500', Icon: Sparkles },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`p-4 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800/70 hover:border-emerald-500/30 transition-all duration-700 ease-out hover:-translate-y-1 shadow-lg ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <stat.Icon size={18} className="mx-auto mb-2.5 sm:mb-3 text-emerald-400 opacity-80 sm:w-5 sm:h-5" />
              <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-1.5 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-slate-200 text-[11px] sm:text-xs md:text-sm font-bold tracking-wide uppercase font-mono">{stat.label}</p>
              <p className="text-slate-500 text-[10px] sm:text-[11px] mt-1 font-sans">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. ABOUT ME HIGHLIGHT / PHILOSOPHY
      ========================================================================= */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-slate-950 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Terminal size={14} /> Background & Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 text-white">
              Engineering with Scalability & Purpose
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 sm:mb-8">
              I am a dedicated full-stack developer who thrives at the intersection of slick interactive interfaces and robust server architectures. Whether engineering real-time data pipelines in Node.js or crafting responsive, SEO-ready web applications with Next.js & React, my approach guarantees speed, scalability, and code clarity.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 pt-2">
              {[
                "Next.js & SSR Ready",
                "Scalable Microservices",
                "Clean & Documented Code",
                "Performance First Mindset",
                "AI/LLM Integration"
              ].map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all text-slate-300 text-xs font-medium shadow-sm"
                >
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0 sm:w-3.5 sm:h-3.5" /> {badge}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          5. CORE EXPERTISE / SERVICES SUMMARY
      ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-slate-900 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest block mb-2">What I Do Best</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-4">Core Technical Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto rounded-full"></div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {skills.map((skill, index) => (
              <Reveal key={index} delay={index * 90}>
                <TiltCard className="h-full p-5 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-green-600 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                      <skill.icon size={24} className="sm:w-[26px] sm:h-[26px]" />
                    </div>
                    <div className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md mb-3 border border-emerald-500/20">
                      {skill.badge}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                  <div className="pt-4 sm:pt-5 mt-4 border-t border-slate-800/80 flex items-center text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore services &rarr;</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FEATURED PROJECTS SHOWCASE (FULLY RESPONSIVE ALL SCREENS)
      ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 md:mb-16 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                <Briefcase size={14} /> Portfolio Showcase
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">Featured Projects</h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-mono font-semibold group w-fit"
            >
              View Full Work Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((proj, idx) => (
              <Reveal key={idx} delay={idx * 90}>
                <TiltCard className="h-full bg-slate-900/60 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-colors duration-300 group shadow-2xl">
                  <div>
                    {/* Top tags & tech badges header */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 sm:mb-6">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold">
                        {proj.tag}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t, ti) => (
                          <span key={ti} className="text-[10px] font-mono text-slate-400 bg-slate-800/90 border border-slate-700/50 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 sm:mb-3 group-hover:text-emerald-300 transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed font-light">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-5 border-t border-slate-800/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                    <span className="text-[11px] sm:text-xs text-slate-500 font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Production Grade
                    </span>
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                      >
                        Live Demo <ExternalLink size={14} />
                      </a>
                    ) : (
                      <Link
                        to="/Contact"
                        className="text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                      >
                        Discuss Details <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CALL TO ACTION BANNER
      ========================================================================= */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-900 text-center overflow-hidden">
        <div className="gradient-move absolute top-0 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="gradient-move-delay absolute bottom-0 right-1/3 w-80 h-80 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <Reveal className="max-w-3xl mx-auto relative z-10 space-y-6">
          <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Let's Collaborate
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Have a project in mind or need a dedicated developer?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            I am available for freelance contracts, full-stack web applications, Next.js migrations, and full-time opportunities.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/Contact"
              className="pulse-ring group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 text-slate-950 font-black tracking-wider rounded-xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 transition-all text-xs sm:text-sm uppercase"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Start A Conversation <ArrowRight size={16} />
              </span>
            </Link>
            <a
              href="https://wa.me/923484236919?text=Hi%20Ahmad,%20let's%20discuss%20a%20project!"
              target="_blank"
              rel="noreferrer"
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold tracking-wider rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-all text-xs sm:text-sm uppercase flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} className="text-emerald-400" /> WhatsApp Chat
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}