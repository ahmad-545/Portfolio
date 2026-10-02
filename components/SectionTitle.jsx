'use client'
import ScrollReveal from './ScrollReveal'
export default function SectionTitle({ label, title, dark = false, className = '' }) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <div className={`flex items-center gap-3 text-xs tracking-[0.25em] uppercase mb-5 ${dark ? 'text-white/60' : 'text-black/60'}`}>
        <i className="w-2 h-2 rounded-full bg-accent" />{label}<i className={`h-px w-10 ${dark ? 'bg-white/30' : 'bg-black/30'}`} />
      </div>
      <ScrollReveal text={title} className="text-[clamp(1.9rem,5.2vw,4.5rem)] max-w-5xl" />
    </div>)
}
