'use client'
import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const c = animate(0, 100, { duration: 2, ease: 'easeInOut', onUpdate: (v) => setN(Math.round(v)), onComplete: () => setTimeout(onDone, 250) })
    return () => c.stop()
  }, [onDone])
  return (
    <motion.div className="fixed inset-0 z-[100] bg-ink text-white flex items-end justify-between p-4 sm:p-6 md:p-14"
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
      <span className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-accent pb-1 sm:pb-2">MUHAMMAD AHMAD</span>
      <span className="font-display text-5xl sm:text-7xl md:text-9xl font-bold tabular-nums leading-none">{n}<span className="text-accent">%</span></span>
    </motion.div>
  )
}
