'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/components/Providers'
import SectionTitle from '@/components/SectionTitle'
import Tilt from '@/components/Tilt'
import { pricing } from '@/data'
export default function Pricing() {
  const { go } = useApp()
  return (
    <section id="pricing" className="bg-ink text-white py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16 overflow-hidden max-w-full">
      <SectionTitle label="Pricing" title="Choose the right plan for you" dark />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">{pricing.map(([n, price, sub, feats, hot], i) => (
        <motion.div key={n} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}>
          <Tilt className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-6 md:p-8 h-full ${hot ? 'border-accent bg-accent/10' : 'border-white/10 bg-white/[0.03]'}`}>
            {hot && <span className="absolute top-5 right-5 text-[10px] bg-accent text-ink font-bold px-3 py-1 rounded-full">POPULAR</span>}
            <h3 className="font-display font-bold uppercase text-lg sm:text-xl">{n}</h3>
            <div className="font-display font-bold text-3xl sm:text-4xl text-accent mt-3 sm:mt-4">{price}</div>
            <p className="text-white/60 text-sm mt-1">{sub}</p>
            <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-[13px] sm:text-sm">{feats.map((f) => <li key={f}><span className="text-accent mr-2">✔</span>{f}</li>)}</ul>
            <button onClick={() => go('/contact')} className={`block w-full text-center mt-6 sm:mt-8 rounded-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold ${hot ? 'bg-accent text-ink' : 'border border-white/30'}`}>Get started</button>
          </Tilt>
        </motion.div>))}</div>
    </section>)
}
