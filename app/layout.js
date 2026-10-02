import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackTop from '@/components/BackTop'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const metadata = {
  metadataBase: new URL(url),
  title: { default: 'Muhammad Ahmad — Full Stack Developer & AI Automation', template: '%s | Muhammad Ahmad' },
  description: 'Full Stack Web Developer specializing in MERN, Next.js, React, Node.js, MongoDB and AI automation. Building SaaS platforms, management systems and AI-powered web apps.',
  keywords: ['Muhammad Ahmad', 'Full Stack Developer', 'MERN Stack', 'Next.js', 'AI Automation', 'Web Developer Pakistan', 'SaaS Developer'],
  openGraph: { title: 'Muhammad Ahmad — Full Stack Developer & AI Automation', description: 'SaaS, MERN, Next.js and AI automation.', type: 'website' },
}
export const viewport = { themeColor: '#020617', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers><Navbar />{children}<Footer /><BackTop /></Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Muhammad Ahmad', jobTitle: 'Full Stack Developer & AI Automation Engineer', url }) }} />
      </body>
    </html>
  )
}
