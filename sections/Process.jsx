'use client'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { process as steps } from '@/data'
export default function Process() {
  return (
    <section id="process" className="bg-white text-ink py-24 md:py-28 px-5 md:px-16">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-12">
        <div className="md:sticky md:top-24 h-[45vh] md:h-[80vh] rounded-3xl overflow-hidden relative shadow-2xl border border-black/10 group">
          <motion.img
            src="/images/process-collaboration.png"
            alt="Collaboration and Engineering Process"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/40 pointer-events-none" />

          {/* Top Pill */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
            <span className="bg-ink/70 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs text-white/90 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Communication &amp; Sprints
            </span>
          </div>

          {/* Bottom Card */}
          <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-ink/75 backdrop-blur-md border border-white/15 text-white pointer-events-none">
            <p className="text-accent text-xs font-semibold tracking-wider uppercase mb-1">Collaborative Workflow</p>
            <h4 className="font-display font-bold text-lg leading-snug">From Discovery &amp; Architecture to Production Launch</h4>
            <p className="text-white/70 text-xs mt-1">Transparent roadmap, weekly sprints, and tested deployments.</p>
          </div>
        </div>
        <div>
                    <SectionTitle label="Process" title="Proven method for high-impact products" dark={false} />
          <div className="space-y-5">{steps.map(([n, t, d]) => (
            <motion.div key={n} initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="flex gap-5 p-6 md:p-7 rounded-2xl border border-black/10 bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,.2)]">
              <span className="font-display text-4xl md:text-5xl font-bold text-accent">{n}</span>
              <div><h4 className="font-display font-bold uppercase mb-2">{t}</h4><p className="text-sm text-black/60">{d}</p></div>
            </motion.div>))}</div>
        </div>
      </div>
    </section>)
}
