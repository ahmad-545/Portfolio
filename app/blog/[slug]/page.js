import { notFound } from 'next/navigation'
import TLink from '@/components/TLink'
import PageHeader from '@/components/PageHeader'
import { posts } from '@/data'
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }))
export const generateMetadata = ({ params }) => ({ title: posts.find((p) => p.slug === params.slug)?.title || 'Article' })
export default function Page({ params }) {
  const p = posts.find((x) => x.slug === params.slug)
  if (!p) notFound()
  return (<>
    <PageHeader label={`${p.date} · ${p.read}`} title="Article" />
    <article className="bg-white text-ink py-10 sm:py-14 md:py-20 px-4 sm:px-5 md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl leading-tight">{p.title}</h2>
        {p.image && (
          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] shadow-lg border border-black/5 bg-slate-950">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-black/70 leading-relaxed">{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
        <TLink href="/blog" className="inline-block mt-10 sm:mt-12 bg-accent font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full">← All articles</TLink>
      </div>
    </article></>)
}
