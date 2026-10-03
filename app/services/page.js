import PageHeader from '@/components/PageHeader'
import Services from '@/sections/Services'
import Process from '@/sections/Process'
import Faq from '@/sections/Faq'

export const metadata = {
  title: 'Services — Full Stack Development & AI Automation',
  description:
    'Comprehensive web engineering & AI automation services: Custom Web Solutions, AI Automation with n8n/Make, MERN & Next.js full-stack development, and interactive 3D web experiences.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services — Full Stack Development & AI Automation | Muhammad Ahmad',
    description:
      'Explore high-performance web applications, SaaS dashboards, and automated AI workflows tailored for modern businesses.',
    url: '/services',
    type: 'website',
    images: [
      {
        url: '/images/hero-robot.png',
        width: 1200,
        height: 630,
        alt: 'Services by Muhammad Ahmad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Full Stack Development & AI Automation',
    description:
      'Custom Web Solutions, AI Automation with n8n & Make, and MERN & Next.js architectures by Muhammad Ahmad.',
    images: ['/images/hero-robot.png'],
  },
}

export default function Page() {
  return (
    <>
      <PageHeader
        label="Services"
        title="What I do"
        sub="From custom web apps to AI agents that automate your daily work."
      />
      <Services />
      <Process />
      <Faq />
    </>
  )
}
