'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// Letters fill from gray to full color on scroll
export default function ScrollReveal({ text, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const t = gsap.fromTo(ref.current.querySelectorAll('.ch'), { opacity: 0.15 }, { opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 88%', end: 'bottom 45%', scrub: true } })
    return () => { t.scrollTrigger?.kill(); t.kill() }
  }, [])
  return (
    <Tag ref={ref} className={`font-display font-bold uppercase leading-[1.05] ${className}`}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">{[...w].map((c, j) => <span key={j} className="ch inline-block">{c}</span>)}</span>))}
    </Tag>)
}
