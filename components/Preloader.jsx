'use client'
import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import Image from 'next/image'

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    })
    return () => c.stop()
  }, [onDone])

  // Dynamic automatic greeting / welcoming text as progress counts up
  const getGreeting = (val) => {
    if (val < 30) return '👋 Hey! Welcome to my portfolio'
    if (val < 65) return '⚡ Booting up Full Stack & AI automations...'
    if (val < 90) return '✨ Loading case studies & 3D experiences...'
    return "🚀 Ready! Welcome to Ahmad's world"
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] h-screen h-[100dvh] w-screen max-w-full bg-[#020617] text-white flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none overflow-hidden"
      exit={{
        y: '-100%',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background Radial Glow & Cyber Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgba(6,182,212,0.14),rgba(245,163,0,0.07),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="font-display font-bold text-base sm:text-lg tracking-wider">
            AHMAD<span className="text-accent">.</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] sm:text-[10px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI BOT ONLINE
          </span>
        </div>
        <div className="text-[9px] sm:text-xs text-white/50 font-mono tracking-widest uppercase">
          PAKISTAN // 2026
        </div>
      </div>

      {/* Center 3D Robot Mascot (Model Waves Its Own Hand saying 'Hey!') */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-1 sm:py-2 shrink min-h-0">
        {/* Waving Robot Hologram Stage */}
        <div className="relative w-36 h-44 sm:w-48 sm:h-56 md:w-60 md:h-68 max-h-[38vh] flex items-center justify-center">
          {/* Ambient Lighting Halo Behind Robot */}
          <div className="absolute inset-2 sm:inset-4 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none animate-pulse" />
          <div className="absolute inset-6 sm:inset-8 rounded-full bg-amber-500/15 blur-xl pointer-events-none" />

          {/* Automatic Body Floating Motion */}
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            animate={{
              y: [-7, 5, -7],
              rotate: [-1, 2, -1],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: 'bottom center' }}
          >
            {/* Robot Image Container */}
            <div className="relative w-32 h-40 sm:w-40 sm:h-48 md:w-52 md:h-60 max-h-[35vh] drop-shadow-[0_15px_30px_rgba(6,182,212,0.35)]">
              {/* Robot Body Base Layer */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/robot-waving-body.png"
                  alt="Robot Body"
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Robot Hand Itself Shaking/Waving 'Hey!' (pivoting at elbow joint) */}
              <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transformOrigin: '34.4% 42.7%' }}
                animate={{
                  rotate: [0, 22, -8, 25, -10, 22, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/images/robot-waving-hand.png"
                  alt="Robot Waving Hand"
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Futuristic Holographic Scan Line */}
              <motion.div
                className="absolute inset-x-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] pointer-events-none"
                animate={{ top: ['8%', '90%', '8%'], opacity: [0.3, 0.85, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Rotating Hologram Energy Floor Rings Under Robot Feet */}
          <div className="absolute -bottom-2 sm:-bottom-3 inset-x-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Outer Cyan Ring */}
            <motion.div
              className="w-32 sm:w-44 md:w-52 h-6 sm:h-8 rounded-full border border-cyan-400/40 border-dashed"
              style={{ transform: 'rotateX(75deg)' }}
              animate={{ rotateZ: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner Gold Ring */}
            <motion.div
              className="absolute w-20 sm:w-28 md:w-36 h-4 sm:h-6 rounded-full border border-accent/60 shadow-[0_0_15px_rgba(245,163,0,0.5)]"
              style={{ transform: 'rotateX(75deg)' }}
              animate={{ rotateZ: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Automatic Greeting / Welcome Speech Bubble */}
        <motion.div
          key={getGreeting(n)}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-2.5 sm:mt-4 max-w-[90vw] sm:max-w-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/90 border border-cyan-400/30 text-[11px] sm:text-xs md:text-sm font-display text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md flex items-center justify-center gap-2 text-center"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="font-semibold text-white/95 truncate sm:whitespace-normal">
            {getGreeting(n)}
          </span>
        </motion.div>

        {/* Sleek Gradient Progress Bar */}
        <div className="w-full max-w-[220px] sm:max-w-xs md:max-w-md mt-2 sm:mt-3 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 shrink-0">
          <motion.div
            className="h-full bg-gradient-to-r from-accent via-amber-400 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{ width: `${n}%` }}
          />
        </div>
      </div>

      {/* Bottom Footer: The Exact Counting Loader - Fully Visible on All Screen Heights */}
      <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-2.5 sm:pt-4 shrink-0 w-full">
        <div className="pr-2">
          <span className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.25em] text-accent font-semibold uppercase block">
            MUHAMMAD AHMAD
          </span>
          <p className="text-[9px] sm:text-[11px] text-white/50 tracking-wider uppercase mt-0.5">
            Full Stack &amp; AI Automation Engineer
          </p>
        </div>

        {/* Kinetic Number Counting Display (Proportionally Clamped for Any Screen) */}
        <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tabular-nums leading-none tracking-tight shrink-0">
          <span>{n}</span>
          <span className="text-accent">%</span>
        </div>
      </div>
    </motion.div>
  )
}
