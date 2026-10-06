import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackTop from '@/components/BackTop'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-phi-roan-t4yp9fl334.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Muhammad Ahmad — Full Stack Developer & AI Automation Engineer',
    template: '%s | Muhammad Ahmad',
  },
  description:
    'Full Stack Web Developer specializing in MERN, Next.js, React, Node.js, MongoDB and AI automation. Building production-grade SaaS platforms, management systems, and intelligent workflow automations.',
  keywords: [
    'Muhammad Ahmad',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'AI Automation Engineer',
    'n8n Workflows',
    'Make Automation',
    'SaaS Builder',
    'Web Developer Pakistan',
    'Portfolio',
  ],
  authors: [{ name: 'Muhammad Ahmad', url: 'https://github.com/ahmad-545' }],
  creator: 'Muhammad Ahmad',
  publisher: 'Muhammad Ahmad',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Muhammad Ahmad — Full Stack Developer & AI Automation',
    description:
      'Production-grade SaaS platforms, MERN & Next.js web applications, and AI-powered workflow automations.',
    url: '/',
    siteName: 'Muhammad Ahmad Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        secureUrl: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Muhammad Ahmad — Full Stack Developer & AI Automation Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Ahmad — Full Stack Developer & AI Automation',
    description:
      'Production-grade SaaS platforms, MERN & Next.js web applications, and AI-powered workflow automations.',
    images: ['/images/og-image.png'],
    creator: '@ahmaddev545',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  category: 'technology',
}

export const viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Muhammad Ahmad',
      alternateName: 'Ahmad',
      jobTitle: 'Full Stack Developer & AI Automation Engineer',
      email: 'mailto:ahmaddev545@gmail.com',
      telephone: '+923484236919',
      url: siteUrl,
      image: `${siteUrl}/images/og-image.png`,
      sameAs: [
        'https://github.com/ahmad-545',
        'https://www.linkedin.com/in/muhammad-ahmad-9b031530a/',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'Node.js',
        'Express',
        'MongoDB',
        'PostgreSQL',
        'Tailwind CSS',
        'TypeScript',
        'AI Automation',
        'Model Training',
        'Model Integration',
        'n8n',
        'Make',
        'REST APIs',
        'SaaS Development',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Muhammad Ahmad — Full Stack Developer & AI Automation',
      description: 'Official portfolio of Muhammad Ahmad, Full Stack Web Developer & AI Automation Engineer.',
      publisher: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <BackTop />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </body>
    </html>
  )
}
