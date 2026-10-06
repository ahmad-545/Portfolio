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
import ErrorBoundary from './ErrorBoundary'
import { store } from '@/lib/lenis'
import { pages } from '@/data'
gsap.registerPlugin(ScrollTrigger)

const Ctx = createContext({ go: () => {} })
export const useApp = () => useContext(Ctx)
const ease = [0.76, 0, 0.24, 1]

export default function Providers({ children }) {
  const router = useRouter(), pathname = usePathname()

  // Preloader overlay starts visible on mount and slides away when done
  const [showPreloader, setShowPreloader] = useState(true)
  const [cover, setCover] = useState(false)
  const [origin, setOrigin] = useState('bottom')
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  // Hard safety timeout — guarantees preloader unconditionally dismisses
  useEffect(() => {
    const t = setTimeout(() => {
      setShowPreloader(false)
    }, 2400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    store.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(1000, 16)
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

  const handlePreloaderDone = () => {
    setShowPreloader(false)
  }

  return (
    <Ctx.Provider value={{ go }}>
      <CustomCursor />
      <ScrollProgress />

      {/* Preloader overlay — slides up on complete; content is never hidden behind an opacity:0 block */}
      <AnimatePresence>
        {showPreloader && <Preloader onDone={handlePreloaderDone} />}
      </AnimatePresence>

      {/* Main Content — ALWAYS rendered and visible, protected by ErrorBoundary */}
      <ErrorBoundary>
        <div className="w-full max-w-full relative">
          {children}
        </div>
      </ErrorBoundary>

      {/* Page Transition Curtain */}
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
