'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Magnetic from '@/components/Magnetic'
import { me } from '@/data'
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })
export default function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', msg: '' }), [st, setSt] = useState({ s: 'idle', m: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    if (!f.name || !/^\S+@\S+\.\S+$/.test(f.email) || f.msg.length < 10) return setSt({ s: 'error', m: 'Please fill all fields correctly.' })
    setSt({ s: 'loading', m: '' })
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      if (!r.ok) throw new Error()
      setSt({ s: 'ok', m: 'Thanks! Your message was sent. I will reply soon.' }); setF({ name: '', email: '', msg: '' })
    } catch { setSt({ s: 'error', m: 'Something went wrong. Please email or WhatsApp me directly.' }) }
  }
  const inp = 'w-full bg-transparent border-b border-white/20 focus:border-accent outline-none py-4 text-base md:text-lg transition-colors'
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-white py-16 sm:py-20 md:py-32 px-4 sm:px-5 md:px-10 lg:px-16">
      <div className="absolute inset-0 opacity-40 pointer-events-none"><Scene variant="ico" /></div>
      <div className="relative grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase mb-5 text-white/60"><i className="w-2 h-2 rounded-full bg-accent" /><i className="h-px w-10 bg-white/30" />Contact</div>
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="font-display font-bold uppercase text-[clamp(1.8rem,7vw,6rem)] leading-none">Got a project? <span className="text-accent">Let&apos;s talk.</span></motion.h2>
          <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 text-white/70 text-sm md:text-base">
            <button onClick={() => navigator.clipboard.writeText(me.email)} className="block hover:text-accent text-left break-all" data-cursor="Copy">{me.email} (click to copy)</button>
            <a className="block hover:text-accent" href={`tel:${me.phoneRaw}`}>Call / Direct: {me.phone}</a>
            <a className="block hover:text-accent" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${me.whatsapp}`}>Chat on WhatsApp →</a>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-3 sm:space-y-4">
          <input className={inp} placeholder="Your name" value={f.name} onChange={set('name')} />
          <input className={inp} placeholder="Your email" value={f.email} onChange={set('email')} />
          <textarea className={inp + ' h-32 resize-none'} placeholder="Tell me about your project" value={f.msg} onChange={set('msg')} />
          {st.m && <p className={`text-sm ${st.s === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{st.m}</p>}
          <Magnetic><button disabled={st.s === 'loading'} className="bg-accent text-ink font-semibold px-7 sm:px-10 py-3 sm:py-4 text-sm sm:text-base rounded-full mt-3 sm:mt-4 disabled:opacity-60">{st.s === 'loading' ? 'Sending…' : 'Send message'}</button></Magnetic>
        </form>
      </div>
    </section>)
}
