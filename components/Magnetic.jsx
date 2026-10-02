'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
// Element is pulled toward the cursor
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null), x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 })
  return <motion.div ref={ref} style={{ x: sx, y: sy }} className={`inline-block ${className}`}
    onMouseMove={(e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength) }}
    onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}
