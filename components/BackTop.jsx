'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function BackTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(window.scrollY > 600); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <AnimatePresence>{show && (
      <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-2 sm:right-3 bottom-16 sm:bottom-24 z-50 text-accent text-[10px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] [writing-mode:vertical-rl] border-l-2 border-accent pl-1.5 sm:pl-2 mix-blend-difference transition-opacity hover:opacity-80 py-1"
        aria-label="Back to top"
      >BACK TOP</motion.button>)}
    </AnimatePresence>
  )
}
