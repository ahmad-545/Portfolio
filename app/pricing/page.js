import PageHeader from '@/components/PageHeader'
import Pricing from '@/sections/Pricing'
import Faq from '@/sections/Faq'

export const metadata = {
  title: 'Pricing & Packages — Web Development & AI Automation',
  description:
    'Clear, upfront investment tiers for custom websites, SaaS MVPs, and business AI automation by Muhammad Ahmad. Tailored solutions with post-launch support.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing & Packages — Muhammad Ahmad',
    description:
      'Transparent pricing packages for high-performance websites, SaaS MVPs, and AI automation workflows.',
    url: '/pricing',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Muhammad Ahmad Packages & Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Packages — Muhammad Ahmad',
    description:
      'Transparent pricing packages for high-performance websites, SaaS MVPs, and AI automation.',
    images: ['/images/og-image.png'],
  },
}

export default function Page() {
  return (
    <>
      <PageHeader
        label="Pricing"
        title="Plans"
        sub="Simple starting prices. Final quote after a short call."
      />
      <Pricing />
      <Faq />
    </>
  )
}
