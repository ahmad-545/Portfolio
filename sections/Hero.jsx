'use client'
import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import Magnetic from '@/components/Magnetic'
import { useApp } from '@/components/Providers'
import { me, stats } from '@/data'
const Robot3D = dynamic(() => import('@/components/Robot3D'), { ssr: false })
const ease = [0.76, 0, 0.24, 1]
const Line = ({ children, d = 0 }) => (<span className="block overflow-hidden pb-1"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: d }}>{children}</motion.span></span>)

export default function Hero() {
  const ref = useRef(null), [i, setI] = useState(0), { go } = useApp()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]), y = useTransform(scrollYProgress, [0, 1], [0, -120])
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % me.roles.length), 2200); return () => clearInterval(t) }, [])
  return (
    <section id="hero" ref={ref} className="relative min-h-[110vh] bg-ink text-white">
      <div className="sticky top-0 min-h-screen min-h-[100dvh] overflow-hidden flex items-center px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 w-full max-w-full">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_70%_30%,rgba(6,182,212,0.07),transparent_70%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_20%_60%,rgba(245,163,0,0.05),transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-5rem)] lg:min-h-0 lg:grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column: Headline, CTAs and Mobile Stats */}
          <motion.div style={{ y, opacity }} className="relative z-20 w-full max-w-xl lg:max-w-none flex flex-col justify-center py-4 sm:py-6 lg:py-0">
            <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-accent tracking-[0.18em] sm:tracking-[0.25em] text-[11px] sm:text-xs font-semibold uppercase">{me.roles[i]}</p>
            </div>
            <h1 className="font-display font-bold uppercase text-[clamp(2.1rem,9.2vw,5.6rem)] leading-[0.98]">
              <Line d={0.2}>Full Stack</Line>
              <Line d={0.35}>&amp; AI Automation</Line>
            </h1>
            <ul className="mt-4 sm:mt-5 md:mt-7 space-y-2 sm:space-y-2.5 text-[13px] sm:text-sm text-white/85">
              {['Build SaaS, websites & management systems', 'Automate business with AI agents & workflows', 'Grow your business with MERN & Next.js'].map((t, k) => (
                <motion.li key={t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + k * 0.12 }} className="flex items-center">
                  <span className="text-accent font-bold mr-2.5 text-sm">✔</span>{t}
                </motion.li>))}
            </ul>
            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-3.5 relative z-30">
              <Magnetic><button onClick={() => go('/projects')} data-cursor="View" className="bg-accent text-ink font-semibold px-6 sm:px-7 py-3 text-sm sm:text-base rounded-full hover:shadow-[0_0_25px_rgba(245,163,0,0.4)] transition-shadow">View Projects</button></Magnetic>
              <Magnetic><button onClick={() => go('/contact')} className="border border-white/30 px-6 sm:px-7 py-3 text-sm sm:text-base rounded-full hover:border-white hover:bg-white/5 transition-all">Hire Me</button></Magnetic>
            </div>

            {/* Quick Proof Stats for Mobile: Fills vertical space cleanly without dead gaps */}
            <div className="mt-7 sm:mt-8 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-md lg:hidden">
              {stats.slice(0, 3).map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-lg sm:text-xl text-accent">{n}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/60 tracking-wider uppercase leading-tight mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Robot Interactive Model (Full-bleed ambient background on mobile/tablet, right column on desktop) */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="absolute lg:relative inset-0 lg:inset-auto w-full h-full lg:h-auto flex items-center justify-center pointer-events-none lg:pointer-events-auto z-0 lg:z-10 mt-0 overflow-hidden lg:overflow-visible"
          >
            {/* Ambient Cyber Glow Behind Robot */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] rounded-full bg-cyan-500/20 blur-[80px] sm:blur-[120px] pointer-events-none" />
            <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-accent/20 blur-[70px] sm:blur-[100px] pointer-events-none -bottom-8" />

            {/* Interactive 3D Robot Container */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] opacity-35 sm:opacity-45 lg:opacity-100 transition-opacity flex items-center justify-center">
              <Robot3D className="h-[380px] sm:h-[440px] md:h-[480px] lg:h-[540px]" />

              {/* Floating Badge 1 - AI Status (Desktop only to prevent clashing with mobile text) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="hidden lg:flex absolute top-2 sm:top-4 -right-1 sm:right-4 bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs text-white shadow-[0_10px_25px_rgba(6,182,212,0.25)] items-center gap-1.5 sm:gap-2 pointer-events-none"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-medium text-[9px] sm:text-[11px] tracking-wide text-cyan-200">3D AI Agent • Online</span>
              </motion.div>

              {/* Floating Badge 2 - Tech Stack (Desktop only) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="hidden lg:flex absolute bottom-4 sm:bottom-6 -left-1 sm:left-4 bg-slate-950/85 backdrop-blur-md border border-accent/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs text-white shadow-[0_10px_25px_rgba(245,163,0,0.25)] items-center gap-1.5 sm:gap-2 pointer-events-none"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                <span className="font-medium text-[9px] sm:text-[11px] tracking-wide text-accent">Full Stack &amp; Automation</span>
              </motion.div>

              {/* 3D Interactive Hint Pill (Desktop only) */}
              <div className="hidden lg:flex absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] text-white/50 tracking-wider uppercase pointer-events-none items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Interactive 3D • Move Cursor
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] tracking-[0.3em] text-white/50 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-none">
          SCROLL<i className="w-px h-6 sm:h-8 bg-accent animate-pulse" />
        </div>
      </div>
    </section>)
}
