import React, { useEffect, useMemo, useRef, useState } from 'react';
import arrowIcon from '../../assets/arrow_icon.svg';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { Terminal, Sparkles } from 'lucide-react';

/* ---------------------------------------------------------
   Small reusable hooks (matching Hero/About/Work animations)
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

export default function Services() {
  const customServices = [
    {
      s_no: "01",
      s_name: "Full Stack Web Development",
      s_desc: "Building scalable, secure, and hyper-responsive web applications using the MERN stack. From pixel-perfect React interfaces to robust Node.js backend systems and optimized MongoDB databases."
    },
    {
      s_no: "02",
      s_name: "AI Model Integration",
      s_desc: "Connecting advanced AI capabilities into standard web applications. Experienced in training, configuring, and deploying complex deep learning datasets and computer vision models (like VITON-HD) into dynamic full-stack environments."
    },
    {
      s_no: "03",
      s_name: "Digital Marketing & SEO",
      s_desc: "Optimizing web platforms for maximum search engine visibility and high traffic conversion. Implementing technical SEO, programmatic optimization, metadata engineering, and performance audits to amplify your digital footprint."
    }
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

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-8 sm:pt-10 md:pt-16 pb-16 md:pb-20 relative z-20">
        
        {/* Title Container - Properly spaced */}
        <div className="w-full mb-10 sm:mb-14 text-center lg:text-left pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Terminal size={14} /> What I Offer
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight relative inline-block pb-3.5 after:absolute after:bottom-0 after:left-1/2 lg:after:left-0 after:transform after:-translate-x-1/2 lg:after:translate-x-0 after:w-20 after:h-1.5 after:bg-gradient-to-r after:from-emerald-400 after:to-teal-400 after:rounded-full">
              My Services
            </h1>
          </div>
        </div>

        {/* Dynamic Grid with TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {customServices.map((value, i) => (
            <Reveal key={i} delay={i * 100}>
              <TiltCard className="h-full bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 p-5 sm:p-7 md:p-8 rounded-2xl shadow-xl transition-colors duration-300 group flex flex-col justify-between min-h-[auto] md:min-h-[320px]">
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
                      {value.s_no}
                    </span>
                    <Sparkles size={16} className="text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {value.s_name}
                  </h2>
                  
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {value.s_desc}
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-slate-800/80 mt-5 sm:mt-6 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors font-mono">
                    Learn More
                  </span>
                  <img 
                    src={arrowIcon} 
                    alt="Arrow icon interaction trigger" 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform filter invert brightness-200" 
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}