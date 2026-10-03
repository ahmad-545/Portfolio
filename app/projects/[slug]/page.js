import { notFound } from 'next/navigation'
import TLink from '@/components/TLink'
import PageHeader from '@/components/PageHeader'
import { projects } from '@/data'
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))
export const generateMetadata = ({ params }) => ({ title: projects.find((p) => p.slug === params.slug)?.title || 'Project' })
export default function Page({ params }) {
  const i = projects.findIndex((p) => p.slug === params.slug)
  if (i < 0) notFound()
  const p = projects[i], next = projects[(i + 1) % projects.length]
  return (<>
    <PageHeader label={p.type} title={p.title} sub={p.desc} />
    <section className="bg-ink text-white py-10 sm:py-14 md:py-20 px-4 sm:px-5 md:px-10 lg:px-16">
      <div className="flex flex-wrap gap-1.5 sm:gap-2">{p.tech.map((t) => <span key={t} className="border border-white/20 rounded-full px-3 sm:px-4 py-0.5 sm:py-1 text-[13px] sm:text-sm">{t}</span>)}</div>
      {/* Showcase Image with Browser Mockup Frame */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden my-6 sm:my-8 md:my-10 border border-white/10 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="bg-white/5 border border-white/10 text-white/50 text-[10px] sm:text-xs px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full font-mono truncate max-w-[120px] sm:max-w-xs">
            https://{p.slug}.app
          </div>
          <div className="text-white/40 text-xs uppercase tracking-wider hidden sm:block">{p.type}</div>
        </div>
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-auto max-h-[750px] object-cover object-top"
          />
        ) : (
          <div className="aspect-video grid place-items-center text-white/30 font-display text-4xl md:text-5xl font-bold">
            {p.type}
          </div>
        )}
      </div>

      {p.highlights && (
        <div className="mb-8 sm:mb-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Key Highlights &amp; Features</h4>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {p.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 sm:gap-2.5 text-[13px] sm:text-sm text-white/90 bg-white/5 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/5">
                <span className="text-accent font-bold">✓</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">{[['Problem', p.problem], ['Solution', p.solution], ['Result', p.result]].map(([h, t]) => <div key={h} className="rounded-xl sm:rounded-2xl border border-white/10 p-5 sm:p-6 md:p-7"><h3 className="text-accent font-display font-bold uppercase mb-2 sm:mb-3 text-sm sm:text-base">{h}</h3><p className="text-white/70 text-[13px] sm:text-base">{t}</p></div>)}</div>
      <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10">
        <a href={p.live} className="bg-accent text-ink font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full">Live demo</a>
        <a href={p.github} className="border border-white/30 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full">GitHub</a>
        <TLink href="/projects" className="border border-white/30 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full">All projects</TLink>
      </div>
      <TLink href={`/projects/${next.slug}`} data-cursor="Next" className="block mt-12 sm:mt-16 border-t border-white/10 pt-6 sm:pt-8"><span className="text-white/50 text-[13px] sm:text-sm">Next project</span><div className="font-display font-bold uppercase text-xl sm:text-2xl md:text-5xl hover:text-accent transition-colors">{next.title} →</div></TLink>
    </section></>)
}
