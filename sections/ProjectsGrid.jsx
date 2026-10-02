'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TLink from '@/components/TLink'
import Tilt from '@/components/Tilt'
import { projects } from '@/data'
export default function ProjectsGrid() {
  const types = ['All', ...new Set(projects.map((p) => p.type))], [f, setF] = useState('All')
  const list = projects.filter((p) => f === 'All' || p.type === f)
  return (
    <section className="bg-white text-ink py-16 md:py-24 px-5 md:px-16 min-h-[60vh]">
      <div className="flex flex-wrap gap-2 md:gap-3 mb-10">{types.map((t) => <button key={t} onClick={() => setF(t)} className={`px-4 md:px-5 py-2 rounded-full text-sm border transition-colors ${f === t ? 'bg-accent border-accent' : 'border-black/20 hover:border-accent'}`}>{t}</button>)}</div>
      <motion.div layout className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">{list.map((p) => (
          <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <TLink href={`/projects/${p.slug}`} data-cursor="View" className="block h-full">
              <Tilt className="rounded-3xl border border-black/10 p-6 md:p-7 h-full group bg-white hover:border-accent/40 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative bg-slate-950 border border-black/10 shadow-inner">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-ink via-slate-700 to-accent/80 grid place-items-center text-white/30 font-display text-3xl md:text-4xl font-bold group-hover:scale-[1.03] transition-transform">
                      {p.type}
                    </div>
                  )}
                  <div className="absolute top-3.5 right-3.5 bg-ink/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white/90">
                    {p.type}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-accent text-xs font-bold tracking-widest uppercase">{p.type}</span>
                  <span className="text-black/40 text-xs font-medium group-hover:text-ink transition-colors">View details →</span>
                </div>
                <h3 className="font-display font-bold uppercase text-xl md:text-2xl mt-2 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-black/60 text-sm mt-3 leading-relaxed">{p.desc}</p>
                {p.highlights && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-md">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-black/5">
                  {p.tech.map((t) => <span key={t} className="text-xs border border-black/10 rounded-full px-3 py-1 bg-black/[0.02]">{t}</span>)}
                </div>
              </Tilt>
            </TLink>
          </motion.div>))}</AnimatePresence>
      </motion.div>
    </section>)
}
