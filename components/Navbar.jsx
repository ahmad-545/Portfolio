'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import TLink from './TLink'
import { pages } from '@/data'
export default function Navbar() {
  const pathname = usePathname(), [open, setOpen] = useState(false), [hide, setHide] = useState(false), [solid, setSolid] = useState(false)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    let last = 0
    const f = () => { setSolid(scrollY > 40); setHide(scrollY > last && scrollY > 200); last = scrollY }
    addEventListener('scroll', f); return () => removeEventListener('scroll', f)
  }, [])
  const is = (p) => (p === '/' ? pathname === '/' : pathname.startsWith(p))
  return (<>
    <motion.header animate={{ y: hide && !open ? '-100%' : 0 }} transition={{ duration: 0.4 }}
      className={`fixed top-0 inset-x-0 z-[80] flex items-center justify-between px-4 sm:px-5 md:px-12 py-3 sm:py-4 text-white transition-colors ${solid || open ? 'bg-ink/70 backdrop-blur-md' : ''}`}>
      <TLink href="/" className="font-display font-bold text-lg sm:text-xl tracking-wider">AHMAD<span className="text-accent">.</span></TLink>
      <nav className="hidden lg:flex gap-8 text-sm">{pages.map(([p, l]) => (
        <TLink key={p} href={p} className="relative py-1 group"><span className={is(p) ? 'text-accent' : 'text-white/80 group-hover:text-white'}>{l}</span>
          <i className={`absolute left-0 -bottom-0.5 h-px bg-accent transition-all ${is(p) ? 'w-full' : 'w-0 group-hover:w-full'}`} /></TLink>))}
      </nav>
      <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5 w-8 p-1" aria-label="Toggle menu">
        <span className={`h-0.5 bg-white transition ${open ? 'rotate-45 translate-y-2' : ''}`} /><span className={`h-0.5 bg-white transition ${open ? 'opacity-0' : ''}`} /><span className={`h-0.5 bg-white transition ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
    </motion.header>
    <AnimatePresence>{open && (
      <motion.nav initial={{ clipPath: 'circle(0% at 95% 5%)' }} animate={{ clipPath: 'circle(150% at 95% 5%)' }} exit={{ clipPath: 'circle(0% at 95% 5%)' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[70] bg-ink text-white pt-20 sm:pt-24 pb-12 px-4 sm:px-6 md:px-16 overflow-y-auto overflow-x-hidden max-w-full flex flex-col gap-0.5 sm:gap-1">
        {pages.map(([p, l], i) => (
          <motion.div key={p} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.06 }}>
            <TLink href={p} className={`block font-display font-bold uppercase text-[clamp(1.6rem,9vw,4.5rem)] leading-[1.2] hover:text-accent transition-colors ${is(p) ? 'text-accent' : ''}`}>
              <sup className="text-[10px] sm:text-xs text-accent mr-1.5 sm:mr-2">{String(i + 1).padStart(2, '0')}</sup>{l}</TLink>
          </motion.div>))}
      </motion.nav>)}
    </AnimatePresence>
  </>)
}
