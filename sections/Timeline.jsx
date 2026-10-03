'use client'
import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { experience } from '@/data'
export default function Timeline() {
  const ref = useRef(null), { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  return (
    <section id="experience" className="bg-ink text-white py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16">
      <SectionTitle label="Experience" title="Experience that shapes my work" dark={true} />
      <div ref={ref} className="relative pl-6 sm:pl-8 md:pl-12 max-w-4xl overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
        <motion.div style={{ scaleY: scrollYProgress, originY: 0 }} className="absolute left-0 top-0 bottom-0 w-px bg-accent" />
        {experience.map(([d, t, s]) => (
          <motion.div key={t} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }} className="relative mb-12">
            <i className="absolute -left-[29px] sm:-left-[37px] md:-left-[53px] top-2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
            <span className="text-accent text-sm tracking-widest">{d}</span>
            <h3 className="font-display font-bold uppercase text-base sm:text-lg md:text-2xl mt-1">{t}</h3>
            <p className="text-white/60 mt-1.5 sm:mt-2 text-sm sm:text-base">{s}</p>
          </motion.div>))}
      </div>
    </section>)
}
