'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { testimonials } from '@/data'
export default function Testimonials() {
  const wrap = useRef(null)
  return (
    <section id="testimonials" className="bg-white text-ink py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16 overflow-hidden max-w-full">
      <SectionTitle label="Reviews" title="Words from clients" dark={false} />
      <p className="text-black/50 text-sm mb-10">Drag →</p>
      <div ref={wrap} className="overflow-hidden w-full max-w-full">
        <motion.div drag="x" dragConstraints={wrap} className="flex gap-4 sm:gap-6 w-max touch-pan-y" data-cursor="Drag">{testimonials.map(([n, r, q]) => (
          <div key={n} className="w-[75vw] sm:w-[420px] rounded-2xl sm:rounded-3xl border border-black/10 p-5 sm:p-7 md:p-8 bg-white select-none">
            <div className="text-accent text-5xl sm:text-6xl font-display leading-none">“</div><p className="text-sm sm:text-base md:text-lg mt-2">{q}</p>
            <div className="mt-6 sm:mt-8 font-bold font-display uppercase text-sm sm:text-base">{n}</div><div className="text-[13px] sm:text-sm text-black/50">{r}</div>
          </div>))}</motion.div>
      </div>
    </section>)
}
