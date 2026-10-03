'use client'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import TLink from '@/components/TLink'
import { posts } from '@/data'
export default function BlogPreview({ bare = false }) {
  return (
    <section id="blog" className="bg-white text-ink py-14 sm:py-16 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16 overflow-hidden max-w-full">
      {!bare && <SectionTitle label="Blog" title="Learn from the latest news & daily blogs" />}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{posts.map((p, i) => (
        <motion.div key={p.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <TLink href={`/blog/${p.slug}`} data-cursor="Read" className="group block h-full rounded-2xl sm:rounded-3xl border border-black/10 p-4 sm:p-5 md:p-6 hover:border-accent hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-slate-900 relative">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-accent/70" />
              )}
            </div>
            <div className="text-xs text-black/50 font-medium">{p.date} · {p.read}</div>
            <h3 className="font-display font-bold text-lg mt-2 group-hover:text-accent transition-colors">{p.title}</h3>
          </TLink>
        </motion.div>))}</div>
      {!bare && <TLink href="/blog" className="inline-block mt-8 sm:mt-10 bg-accent font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full">All articles</TLink>}
    </section>)
}
