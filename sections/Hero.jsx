'use client'
import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import Magnetic from '@/components/Magnetic'
import { useApp } from '@/components/Providers'
import { me } from '@/data'
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
      <div className="sticky top-0 min-h-screen overflow-hidden flex items-center px-5 md:px-16 py-16">
        {/* Subtle Ambient Background - 3D background model removed as requested */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_70%_30%,rgba(6,182,212,0.07),transparent_70%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_20%_60%,rgba(245,163,0,0.05),transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-12">
          {/* Left Column: Headline and CTAs */}
          <motion.div style={{ y, opacity }} className="pt-6 lg:pt-0">
            <p className="text-accent tracking-[0.25em] text-[11px] md:text-xs mb-4 h-4 font-semibold">{me.roles[i].toUpperCase()}</p>
            <h1 className="font-display font-bold uppercase text-[clamp(2.1rem,6.5vw,5.6rem)] leading-[0.96]">
              <Line d={0.2}>Full Stack</Line>
              <Line d={0.35}>&amp; AI Automation</Line>
            </h1>
            <ul className="mt-5 md:mt-7 space-y-2 text-[13px] md:text-sm text-white/80">
              {['Build SaaS, websites & management systems', 'Automate business with AI agents & workflows', 'Grow your business with MERN & Next.js'].map((t, k) => (
                <motion.li key={t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + k * 0.12 }} className="flex items-center">
                  <span className="text-accent font-bold mr-2.5">✔</span>{t}
                </motion.li>))}
            </ul>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
              <Magnetic><button onClick={() => go('/projects')} data-cursor="View" className="bg-accent text-ink font-semibold px-7 py-3 rounded-full hover:shadow-[0_0_25px_rgba(245,163,0,0.4)] transition-shadow">View Projects</button></Magnetic>
              <Magnetic><button onClick={() => go('/contact')} className="border border-white/30 px-7 py-3 rounded-full hover:border-white hover:bg-white/5 transition-all">Hire Me</button></Magnetic>
            </div>
          </motion.div>

          {/* Right Column: 3D Robot Interactive Model */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="relative flex items-center justify-center order-first lg:order-last mt-4 lg:mt-0"
          >
            {/* Ambient Cyber Glow Behind Robot */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />
            <div className="absolute w-60 h-60 rounded-full bg-accent/15 blur-[90px] pointer-events-none -bottom-8" />

            {/* Interactive 3D Robot Container */}
            <div className="relative z-10 w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px]">
              <Robot3D />

              {/* Floating Badge 1 - AI Status */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute top-4 -right-1 sm:right-4 bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 px-3.5 py-1.5 rounded-full text-xs text-white shadow-[0_10px_25px_rgba(6,182,212,0.25)] flex items-center gap-2 pointer-events-none"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-medium text-[11px] tracking-wide text-cyan-200">3D AI Agent • Online</span>
              </motion.div>

              {/* Floating Badge 2 - Tech Stack */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-6 -left-1 sm:left-4 bg-slate-950/85 backdrop-blur-md border border-accent/40 px-3.5 py-1.5 rounded-full text-xs text-white shadow-[0_10px_25px_rgba(245,163,0,0.25)] flex items-center gap-2 pointer-events-none"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-medium text-[11px] tracking-wide text-accent">Full Stack &amp; Automation</span>
              </motion.div>

              {/* 3D Interactive Hint Pill */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white/50 tracking-wider uppercase pointer-events-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Interactive 3D • Move Cursor
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/50 flex flex-col items-center gap-2 pointer-events-none">
          SCROLL<i className="w-px h-8 bg-accent animate-pulse" />
        </div>
      </div>
    </section>)
}
