export default function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/10 py-3 sm:py-4 md:py-6 bg-ink">
      <div className="flex gap-6 sm:gap-8 md:gap-12 w-max" style={{ animation: 'marquee 35s linear infinite' }}>
        {row.map((s, i) => <span key={i} className="font-display font-bold uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white/20 hover:text-accent transition-colors whitespace-nowrap">{s} <b className="text-accent">✦</b></span>)}
      </div>
    </div>)
}
