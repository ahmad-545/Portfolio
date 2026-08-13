import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Terminal, Send, Mail, MapPin } from 'lucide-react';

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
    const rotateY = (px - 0.5) * 6;
    const rotateX = (0.5 - py) * 6;
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

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Fields Validation
    if (!name || !email || !message) {
      toast.warning("Please fill in all the fields!", {
        position: "top-right",
      });
      return;
    }

    try {
      // Web3Forms API Submission Data setup
      const submissionData = new FormData();
      submissionData.append("name", name);
      submissionData.append("email", email);
      submissionData.append("message", message);
      submissionData.append("access_key", "fff54e3c-49ac-48a4-956b-b7e75fe397f0");

      const object = Object.fromEntries(submissionData);
      const json = JSON.stringify(object);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast.success("Message sent successfully!", {
          position: "top-right",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      toast.error("Network error or invalid response!");
    }
  };

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/35 overflow-x-hidden relative">
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
          background: radial-gradient(180px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(34,211,238,0.12), transparent 70%);
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-move, .gradient-move-delay, .pan-grid, .twinkle {
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

      <section id="contact" className="flex-grow flex items-center py-16 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Block copywriting content */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2 justify-center md:justify-start">
                <Terminal size={14} /> Get In Touch
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight inline-block relative pb-3 after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:transform after:-translate-x-1/2 md:after:translate-x-0 after:w-16 after:h-1.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:rounded-full">
                Let's Connect
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed pt-2">
                Got an adaptive web workspace blueprints layout, an enterprise web application architecture, or a modern user experience interface to build? Drop a direct note here.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-4 text-sm font-medium text-slate-300 pt-2 inline-block md:block text-left">
                <p className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                  <span className="text-base text-cyan-400"><Mail size={18} /></span> ahmaddev545@gmail.com
                </p>
                <p className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                  <span className="text-base text-cyan-400"><MapPin size={18} /></span> Lahore, Pakistan
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right side interactive card layout form with TiltCard */}
          <div className="md:col-span-7">
            <Reveal delay={150} className="w-full">
              <TiltCard className="bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold tracking-wider uppercase text-xs text-slate-950 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span> <Send size={14} />
                  </button>
                </form>
              </TiltCard>
            </Reveal>
          </div>

        </div>
      </section>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Contact;