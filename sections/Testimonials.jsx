'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { testimonials } from '@/data'
export default function Testimonials() {
  const wrap = useRef(null)
  return (
    <section id="testimonials" className="bg-white text-ink py-24 md:py-28 px-5 md:px-16 overflow-hidden">
      <SectionTitle label="Reviews" title="Words from clients" dark={false} />
      <p className="text-black/50 text-sm mb-10">Drag →</p>
      <div ref={wrap} className="overflow-hidden">
        <motion.div drag="x" dragConstraints={wrap} className="flex gap-6 w-max" data-cursor="Drag">{testimonials.map(([n, r, q]) => (
          <div key={n} className="w-[80vw] sm:w-[420px] rounded-3xl border border-black/10 p-7 md:p-8 bg-white select-none">
            <div className="text-accent text-6xl font-display leading-none">“</div><p className="text-base md:text-lg mt-2">{q}</p>
            <div className="mt-8 font-bold font-display uppercase">{n}</div><div className="text-sm text-black/50">{r}</div>
          </div>))}</motion.div>
      </div>
    </section>)
}
