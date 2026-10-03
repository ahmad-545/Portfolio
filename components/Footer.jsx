import TLink from './TLink'
import { me, pages } from '@/data'
export default function Footer() {
  return (
    <footer className="bg-ink text-white px-4 sm:px-5 md:px-10 lg:px-16 pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 border-t border-white/10 overflow-hidden max-w-full">
      <TLink href="/contact" data-cursor="Talk" className="block font-display font-bold uppercase text-[clamp(1.8rem,9vw,8rem)] leading-none hover:text-accent transition-colors">Let&apos;s work<br />together →</TLink>
      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-[13px] sm:text-sm text-white/70">{pages.map(([p, l]) => <TLink key={p} href={p} className="hover:text-accent">{l}</TLink>)}</div>
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-between gap-4 sm:gap-5 text-[12px] sm:text-sm text-white/60 border-t border-white/10 pt-5 sm:pt-6">
        <span className="flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="hidden sm:inline">Available for freelance &amp; automation projects</span><span className="sm:hidden">Available for freelance</span></span>
        <div className="flex gap-5"><a href={me.github}>GitHub</a><a href={me.linkedin}>LinkedIn</a><a href={`https://wa.me/${me.whatsapp}`}>WhatsApp</a></div>
        <span>© {new Date().getFullYear()} {me.name}</span>
      </div>
    </footer>)
}
