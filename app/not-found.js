import TLink from '@/components/TLink'
export default function NotFound() {
  return <section className="min-h-screen bg-ink text-white grid place-items-center text-center px-5"><div><div className="font-display font-bold text-[30vw] md:text-[18rem] leading-none text-accent">404</div><p className="text-white/60 mb-6">This page does not exist.</p><TLink href="/" className="bg-accent text-ink font-semibold px-8 py-3 rounded-full">Back home</TLink></div></section>
}
