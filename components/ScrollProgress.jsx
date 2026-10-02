'use client'
import { motion, useScroll, useSpring } from 'framer-motion'
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll(), s = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX: s }} className="fixed top-0 inset-x-0 h-[3px] bg-accent origin-left z-[95]" />
}
