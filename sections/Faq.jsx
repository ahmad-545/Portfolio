'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { faqs } from '@/data'
export default function Faq() {
  const [o, setO] = useState(0)
  return (
    <section id="faq" className="bg-ink text-white py-24 md:py-28 px-5 md:px-16">
      <SectionTitle label="FAQ" title="Frequently asked questions" dark={true} />
      <div className="max-w-4xl">{faqs.map(([q, a], i) => (
        <div key={q} className="border-b border-white/10">
          <button onClick={() => setO(o === i ? -1 : i)} className="w-full flex justify-between items-center gap-4 py-5 md:py-6 text-left font-display text-base md:text-xl font-bold">{q}<motion.span animate={{ rotate: o === i ? 45 : 0 }} className="text-accent text-3xl">+</motion.span></button>
          <AnimatePresence initial={false}>{o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-white/60 pb-6">{a}</motion.p>}</AnimatePresence>
        </div>))}</div>
    </section>)
}
