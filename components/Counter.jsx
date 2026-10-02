'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView, animate } from 'framer-motion'
export default function Counter({ value }) {
  const ref = useRef(null), inView = useInView(ref, { once: true }), [n, setN] = useState(0)
  const num = parseInt(value), suffix = value.replace(/[0-9]/g, '')
  useEffect(() => { if (inView) animate(0, num, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) }) }, [inView, num])
  return <span ref={ref}>{n}{suffix}</span>
}
