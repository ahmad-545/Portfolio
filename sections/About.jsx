'use client'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import Counter from '@/components/Counter'
import { me, stats } from '@/data'
export default function About() {
  return (
    <section id="about" className="bg-white text-ink py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16 overflow-hidden max-w-full">
      <SectionTitle label="About me" title="I turn ideas into products and tasks into automations" />
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-10 sm:mt-12 items-center">
        <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="text-base md:text-lg text-black/70 leading-relaxed">{me.bio}</motion.p>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">{stats.map(([v, l]) => (
          <div key={l} className="rounded-2xl bg-ink text-white p-4 sm:p-5 md:p-6"><div className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-accent"><Counter value={v} /></div><div className="text-[11px] sm:text-xs md:text-sm text-white/60 mt-1.5 sm:mt-2">{l}</div></div>))}</div>
      </div>
    </section>)
}
