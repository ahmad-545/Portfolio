'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import TLink from './TLink'
import { me } from '@/data'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/services', label: 'SERVICES', hasArrow: true },
  { href: '/projects', label: 'OUR WORK', hasArrow: true },
  { href: '/pricing', label: 'PACKAGES' },
  { href: '/blog', label: 'BLOG' },
  { href: '/#faq', label: 'FAQS' },
  { href: '/contact', label: 'CONTACT US' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hide, setHide] = useState(false)
  const [copied, setCopied] = useState(false)

  // Close drawer on page navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Scroll detection for background blur / auto-hide on scroll down
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      setSolid(window.scrollY > 40)
      setHide(window.scrollY > last && window.scrollY > 220)
      last = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ESC key listener to close drawer
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Copy email helper
  const handleCopyEmail = (e) => {
    e.stopPropagation()
    navigator.clipboard?.writeText(me.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isCurrent = (href) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Header Bar */}
      <motion.header
        animate={{ y: hide && !open ? '-100%' : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 inset-x-0 z-[80] flex items-center justify-between px-5 sm:px-8 md:px-12 py-3.5 sm:py-4 text-white transition-colors duration-300 ${
          solid || open ? 'bg-ink/85 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        {/* Brand Logo */}
        <TLink href="/" className="font-display font-bold text-xl sm:text-2xl tracking-wider select-none group">
          <span>AHMAD</span>
          <span className="text-accent group-hover:animate-ping inline-block">.</span>
        </TLink>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-accent/40 flex items-center justify-center transition-all shadow-md group"
          aria-label="Open navigation menu"
        >
          <div className="flex flex-col gap-1.5 w-5 items-end justify-center">
            <span className="h-0.5 w-5 bg-white group-hover:bg-accent rounded-full transition-all" />
            <span className="h-0.5 w-3.5 group-hover:w-5 bg-white group-hover:bg-accent rounded-full transition-all" />
          </div>
        </button>
      </motion.header>

      {/* Slide-Over Side Drawer Navigation (Left Drawer - matching Crewonix design) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Left Slide-Over Menu Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 bottom-0 left-0 z-[100] w-[85vw] max-w-[320px] sm:max-w-[360px] bg-[#070b14] border-r border-white/10 flex flex-col justify-between p-6 sm:p-7 shadow-2xl overflow-y-auto"
            >
              {/* Drawer Top Row: Logo & Close Icon */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <TLink href="/" onClick={() => setOpen(false)} className="font-display font-bold text-xl sm:text-2xl tracking-wider text-white">
                  <span>AHMAD</span>
                  <span className="text-accent">.</span>
                </TLink>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-accent hover:text-accent flex items-center justify-center text-white/70 hover:rotate-90 transition-all text-sm font-bold"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Vertical Navigation Links */}
              <nav className="flex flex-col py-5 sm:py-6 space-y-1">
                {navLinks.map((link, idx) => {
                  const active = isCurrent(link.href)
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.035 }}
                    >
                      <TLink
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-2.5 sm:py-3 px-2 rounded-lg text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition-all group ${
                          active
                            ? 'text-accent bg-white/[0.04]'
                            : 'text-white/85 hover:text-white hover:bg-white/[0.03] hover:translate-x-1'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                          <span>{link.label}</span>
                        </span>
                        {link.hasArrow ? (
                          <svg
                            className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                              active ? 'text-accent' : 'text-white/30 group-hover:text-white/70'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        ) : (
                          <span
                            className={`text-xs transition-transform group-hover:translate-x-1 ${
                              active ? 'text-accent' : 'text-white/30 group-hover:text-white/70'
                            }`}
                          >
                            ›
                          </span>
                        )}
                      </TLink>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Drawer Bottom Contact Footer (matching reference image) */}
              <div className="pt-5 border-t border-white/10 mt-auto space-y-4">
                <a
                  href={`mailto:${me.email}`}
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-accent/40 transition-all group cursor-pointer"
                  title="Click to email or copy"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center text-ink shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,163,0,0.3)]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Direct Email</p>
                      {copied && <span className="text-[10px] text-green-400 font-semibold">Copied!</span>}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white/90 truncate group-hover:text-accent transition-colors">{me.email}</p>
                  </div>
                </a>

                {/* Social icons row */}
                <div className="flex items-center justify-between px-1 text-xs text-white/50">
                  <a href={me.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
                  <span className="text-white/20">•</span>
                  <a href={me.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                  <span className="text-white/20">•</span>
                  <a href={`https://wa.me/${me.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
