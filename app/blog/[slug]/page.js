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
    <article className="bg-white text-ink py-14 md:py-20 px-5 md:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">{p.title}</h2>
        <div className="mt-10 space-y-6 text-base md:text-lg text-black/70 leading-relaxed">{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
        <TLink href="/blog" className="inline-block mt-12 bg-accent font-semibold px-8 py-3 rounded-full">← All articles</TLink>
      </div>
    </article></>)
}
