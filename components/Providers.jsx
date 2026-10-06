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

export default function Providers({ children }) {
  const router = useRouter(), pathname = usePathname()

  // loading = false by default (content always visible on SSR/mobile)
  // showPreloader = separately controls the animation overlay
  const [loading, setLoading] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [cover, setCover] = useState(false)
  const [origin, setOrigin] = useState('bottom')
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  useEffect(() => {
    // Only show preloader on desktop (non-touch, hover-capable devices)
    const isDesktop =
      !('ontouchstart' in window) &&
      navigator.maxTouchPoints === 0 &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (isDesktop) {
      setLoading(true)
      setShowPreloader(true)
      // Hard 3s max safety timeout — kabhi bhi page black nahi rahega
      const t = setTimeout(() => {
        setLoading(false)
        setShowPreloader(false)
      }, 3000)
      return () => clearTimeout(t)
    }
    // Mobile/tablet: content is immediately visible, no preloader
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

  const handlePreloaderDone = () => {
    setLoading(false)
    setShowPreloader(false)
  }

  return (
    <Ctx.Provider value={{ go }}>
      <CustomCursor />
      <ScrollProgress />

      {/* Preloader — only shown on desktop after JS detects non-touch device */}
      <AnimatePresence>
        {showPreloader && <Preloader onDone={handlePreloaderDone} />}
      </AnimatePresence>

      {/* Content — ALWAYS visible on mobile (no opacity:0 in SSR HTML) */}
      {loading ? (
        // Desktop: hidden while preloader runs (set via JS after mount, never in SSR)
        <div style={{ opacity: 0, visibility: 'hidden' }} className="w-full max-w-full relative">
          {children}
        </div>
      ) : (
        <div style={{ opacity: 1, transition: 'opacity 0.4s ease' }} className="w-full max-w-full relative">
          {children}
        </div>
      )}

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
