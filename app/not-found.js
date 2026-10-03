import TLink from '@/components/TLink'

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <section className="min-h-screen bg-ink text-white grid place-items-center text-center px-4 sm:px-6 py-20">
      <div className="max-w-md w-full">
        <div className="font-display font-bold text-[26vw] sm:text-[22vw] md:text-[16rem] leading-none text-accent select-none">
          404
        </div>
        <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base">
          This page does not exist or has been moved.
        </p>
        <TLink
          href="/"
          className="inline-flex items-center justify-center bg-accent text-ink font-semibold px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base hover:bg-white transition-colors duration-300"
        >
          Back home
        </TLink>
      </div>
    </section>
  )
}
