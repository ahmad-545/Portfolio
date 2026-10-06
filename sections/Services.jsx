'use client'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { services } from '@/data'
// Cards stack on top of each other while scrolling
export default function Services() {
  return (
    <section id="services" className="bg-ink text-white py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16">
      <SectionTitle label="Services" title="Offering strategic services for your growth" dark />
      <div className="space-y-4 sm:space-y-6 md:space-y-8 pb-10">{services.map(([n, t, pts], i) => (
        <motion.article key={n} data-cursor="Open" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ top: `${84 + i * 18}px` }} className="sticky grid md:grid-cols-[auto_1fr_1fr] gap-3 sm:gap-4 md:gap-12 items-center rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900 p-4 sm:p-6 md:p-10 hover:border-accent transition-all duration-300 shadow-xl">
          <span className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-accent">{n}</span>
          <h3 className="font-display font-bold uppercase text-lg sm:text-xl md:text-3xl">{t}</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-[13px] sm:text-sm text-white/60">{pts.map((p) => <li key={p} className="before:content-['•'] before:text-accent before:mr-2">{p}</li>)}</ul>
        </motion.article>))}</div>
    </section>)
}
