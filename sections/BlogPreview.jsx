'use client'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import TLink from '@/components/TLink'
import { posts } from '@/data'
export default function BlogPreview({ bare = false }) {
  return (
    <section id="blog" className="bg-white text-ink py-20 md:py-28 px-5 md:px-16">
      {!bare && <SectionTitle label="Blog" title="Learn from the latest news & daily blogs" />}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{posts.map((p, i) => (
        <motion.div key={p.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <TLink href={`/blog/${p.slug}`} data-cursor="Read" className="block h-full rounded-3xl border border-black/10 p-5 md:p-6 hover:border-accent transition-colors">
            <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-slate-800 to-accent/70 mb-5" />
            <div className="text-xs text-black/50">{p.date} · {p.read}</div>
            <h3 className="font-display font-bold text-lg mt-2">{p.title}</h3>
          </TLink>
        </motion.div>))}</div>
      {!bare && <TLink href="/blog" className="inline-block mt-10 bg-accent font-semibold px-8 py-3 rounded-full">All articles</TLink>}
    </section>)
}
