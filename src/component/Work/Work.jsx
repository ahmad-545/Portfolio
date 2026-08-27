import React, { useEffect, useMemo, useRef, useState } from 'react';
import mywork_data from '../../assets/mywork_data';
import showmore from '../../assets/arrow_icon.svg';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { Terminal, ExternalLink, Code } from 'lucide-react';

/* ---------------------------------------------------------
   Small reusable hooks (matching Hero/About animations)
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

export default function Work() {
  const [visibleCount, setVisibleCount] = useState(6);

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

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 md:px-12 pt-10 md:pt-16 pb-20 relative z-20">
        
        {/* Section Header - Properly spaced and isolated */}
        <div className="w-full mb-14 text-center lg:text-left pt-4">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Terminal size={14} /> Portfolio Showcase
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight relative inline-block pb-3 after:absolute after:bottom-0 after:left-1/2 lg:after:left-0 after:transform after:-translate-x-1/2 lg:after:translate-x-0 after:w-20 after:h-1.5 after:bg-gradient-to-r after:from-emerald-400 after:to-teal-400 after:rounded-full">
              My Latest Work
            </h1>
          </div>
        </div>

        {/* Portfolio Gallery Grid with TiltCards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mywork_data.slice(0, visibleCount).map((value, i) => (
            <Reveal key={i} delay={i * 80}>
              <TiltCard className="h-full overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 flex flex-col justify-between group shadow-xl transition-colors">
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                    <h3 className="text-lg font-bold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Project {i + 1}
                    </h3>
                    <p className="text-emerald-400 text-xs font-semibold tracking-wider uppercase mt-1 flex items-center gap-1">
                      <Code size={12} /> MERN / Full Stack App
                    </p>
                  </div>
                  <img 
                    src={value.w_img} 
                    alt={`Showcase portfolio component module node ${i}`} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                </div>
                
                <div className="p-5 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                  <span className="text-xs text-slate-400 font-mono">Production Ready</span>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ExternalLink size={14} />
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Show More Trigger Component Button */}
        {visibleCount < mywork_data.length && (
          <Reveal className="flex justify-center">
            <button 
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white font-medium tracking-wide text-sm px-8 py-4 rounded-xl transition-all shadow-lg group shadow-emerald-500/5 hover:-translate-y-0.5"
            >
              <span>Show More Projects</span>
              <img 
                src={showmore} 
                alt="Arrow interaction pointer" 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform filter invert brightness-200"
              />
            </button>
          </Reveal>
        )}

      </main>

      <Footer />
    </div>
  );
}