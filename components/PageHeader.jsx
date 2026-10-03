'use client'
import { motion } from 'framer-motion'
const ease = [0.76, 0, 0.24, 1]
// Big animated title at the top of every inner page
export default function PageHeader({ label, title, sub }) {
  return (
    <header className="bg-ink text-white pt-24 sm:pt-28 md:pt-44 pb-10 sm:pb-14 md:pb-20 px-4 sm:px-5 md:px-10 lg:px-16 border-b border-white/10 overflow-hidden">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-accent tracking-[0.3em] text-xs uppercase mb-5">{label}</motion.p>
      <h1 className="font-display font-bold uppercase text-[clamp(2rem,10vw,9rem)] leading-[0.95]">
        <span className="block overflow-hidden pb-1"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.85 }}>{title}</motion.span></span>
      </h1>
      {sub && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-6 max-w-2xl text-white/60 text-base md:text-lg">{sub}</motion.p>}
    </header>)
}
