'use client'
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './Preloader'
import CustomCursor from './CustomCursor'
import ScrollProgress from './ScrollProgress'
import { store } from '@/lib/lenis'
import { pages } from '@/data'
gsap.registerPlugin(ScrollTrigger)

const Ctx = createContext({ go: () => {} })
export const useApp = () => useContext(Ctx)
const ease = [0.76, 0, 0.24, 1]

// Detect touch/mobile — preloader skip karo mobile pe
function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

export default function Providers({ children }) {
  const router = useRouter(), pathname = usePathname()

  // Mobile pe loading false se start — preloader skip
  // Desktop pe true se start — preloader show
  const [loading, setLoading] = useState(true)
  const [cover, setCover] = useState(false)
  const [origin, setOrigin] = useState('bottom')
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  useEffect(() => {
    // Agar mobile/touch device hai toh immediately show karo
    if (isTouchDevice()) {
      setLoading(false)
      return
    }
    // Desktop ke liye hard 3s safety timeout — kabhi bhi black screen nahi
    const t = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    store.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      store.lenis = null
    }
  }, [])

  useEffect(() => {
    store.lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      if (busy.current) {
        setOrigin('top')
        setCover(false)
        busy.current = false
      }
    }, 200)
    return () => clearTimeout(t)
  }, [pathname])

  const go = useCallback((href) => {
    if (busy.current) return
    if (href === pathname) return store.lenis?.scrollTo(0)
    try { router.prefetch(href) } catch (_) {}
    busy.current = true
    setLabel(pages.find(([p]) => p === href)?.[1] || href.split('/')[1] || 'Home')
    setOrigin('bottom')
    setCover(true)
    setTimeout(() => router.push(href), 750)
  }, [pathname, router])

  return (
    <Ctx.Provider value={{ go }}>
      <CustomCursor />
      <ScrollProgress />
      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* visibility + opacity dono use karo — mobile pe reliable hai */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          visibility: loading ? 'hidden' : 'visible',
          transition: 'opacity 0.4s ease',
        }}
        className="w-full max-w-full relative"
      >
        {children}
      </div>

      <motion.div
        className="fixed inset-0 z-[90] bg-accent pointer-events-none flex items-center justify-center p-4 text-center overflow-hidden max-w-full"
        style={{ transformOrigin: origin }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: cover ? 1 : 0 }}
        transition={{ duration: 0.75, ease }}
      >
        <span className="font-display text-3xl sm:text-5xl md:text-8xl font-bold text-ink uppercase tracking-tight">
          {label}
        </span>
      </motion.div>
    </Ctx.Provider>
  )
}
