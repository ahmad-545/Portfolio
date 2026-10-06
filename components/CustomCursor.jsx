'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 400, damping: 30 })
  const sy = useSpring(y, { stiffness: 400, damping: 30 })
  const [label, setLabel] = useState('')
  const [big, setBig] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only activate cursor if true mouse pointer is present
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasMouse) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const el = e.target.closest?.('[data-cursor],a,button')
      setBig(!!el)
      setLabel(el?.dataset?.cursor || '')
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:flex items-center justify-center rounded-full border border-accent text-[11px] font-semibold text-ink"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: big ? (label ? 84 : 56) : 18,
        height: big ? (label ? 84 : 56) : 18,
        backgroundColor: label ? '#F5A300' : 'rgba(245,163,0,0)',
      }}
      transition={{ duration: 0.25 }}
    >
      {label}
    </motion.div>
  )
}
