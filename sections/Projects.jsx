'use client'
import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tilt from '@/components/Tilt'
import TLink from '@/components/TLink'
import { projects } from '@/data'
gsap.registerPlugin(ScrollTrigger)
// Home page: section pins and cards scroll sideways (desktop). Mobile: swipe row. Cards open their own page.
export default function Projects() {
  const wrap = useRef(null), track = useRef(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
      gsap.to(track.current, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } })
    })
    return () => mm.revert()
  }, [])
  return (
    <section id="projects" ref={wrap} className="bg-white text-ink md:h-screen overflow-hidden py-14 sm:py-16 md:py-0 flex flex-col justify-center max-w-full">
      <div className="px-4 sm:px-5 md:px-10 lg:px-16 mb-6 sm:mb-8 md:mb-10">
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-3 sm:mb-4 text-black/60"><i className="w-2 h-2 rounded-full bg-accent" />Case studies<i className="h-px w-8 sm:w-10 bg-black/30" /></div>
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="font-display font-bold uppercase text-[clamp(1.5rem,5vw,4rem)] leading-[1.05]">Discover case studies<br className="hidden md:block" /> and creations <span className="text-accent text-base align-middle ml-2 hidden md:inline">scroll →</span></motion.h2>
      </div>
      <div className="overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full max-w-full">
        <div ref={track} className="flex gap-4 sm:gap-5 md:gap-8 px-4 sm:px-5 md:px-10 lg:px-16 w-max">
          {projects.map((p, i) => (
            <TLink key={p.slug} href={`/projects/${p.slug}`} data-cursor="View" className="snap-center shrink-0 w-[75vw] sm:w-[60vw] md:w-[440px]">
              <Tilt className="rounded-2xl sm:rounded-3xl border border-black/10 p-4 sm:p-5 md:p-6 h-full group bg-white hover:border-accent/40 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 relative bg-slate-950 border border-black/10 shadow-inner">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-ink via-slate-700 to-accent/80 grid place-items-center text-white/30 font-display text-3xl font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-ink/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-semibold text-white/90">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-accent text-xs font-bold tracking-widest uppercase">{p.type}</span>
                  <span className="text-black/40 text-xs font-medium group-hover:text-ink transition-colors">Case study →</span>
                </div>
                <h3 className="font-display font-bold uppercase text-lg sm:text-xl md:text-2xl mt-1.5 group-hover:text-accent transition-colors line-clamp-1">{p.title}</h3>
                <p className="text-black/60 text-[13px] sm:text-sm mt-1.5 sm:mt-2 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">{p.tech.slice(0, 4).map((t) => <span key={t} className="text-[11px] sm:text-xs border border-black/10 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 bg-black/[0.02]">{t}</span>)}</div>
              </Tilt>
            </TLink>))}
          <TLink href="/projects" data-cursor="All" className="shrink-0 w-[50vw] sm:w-[60vw] md:w-[260px] grid place-items-center rounded-2xl sm:rounded-3xl bg-accent font-display font-bold uppercase text-lg sm:text-xl md:text-2xl text-center p-5 sm:p-6">View all projects →</TLink>
        </div>
      </div>
    </section>)
}
