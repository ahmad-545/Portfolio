'use client'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import Counter from '@/components/Counter'
import { me, stats } from '@/data'
export default function About() {
  return (
    <section id="about" className="bg-white text-ink py-24 md:py-28 px-5 md:px-16">
      <SectionTitle label="About me" title="I turn ideas into products and tasks into automations" />
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 mt-12 items-center">
        <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="text-base md:text-lg text-black/70 leading-relaxed">{me.bio}</motion.p>
        <div className="grid grid-cols-2 gap-3 md:gap-4">{stats.map(([v, l]) => (
          <div key={l} className="rounded-2xl bg-ink text-white p-5 md:p-6"><div className="font-display font-bold text-4xl md:text-5xl text-accent"><Counter value={v} /></div><div className="text-xs md:text-sm text-white/60 mt-2">{l}</div></div>))}</div>
      </div>
    </section>)
}
