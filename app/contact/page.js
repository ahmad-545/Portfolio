import ContactForm from '@/sections/ContactForm'
import Faq from '@/sections/Faq'

export const metadata = {
  title: 'Contact Muhammad Ahmad — Hire Full Stack & AI Developer',
  description:
    'Start your project with Muhammad Ahmad. Get in touch for custom SaaS development, MERN & Next.js applications, and business AI automation. Email: ahmaddev545@gmail.com | Phone: 03484236919.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Muhammad Ahmad — Let’s Build Together',
    description:
      'Got a project? Send a message or chat directly via WhatsApp (03484236919) or email (ahmaddev545@gmail.com).',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Contact Muhammad Ahmad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Muhammad Ahmad — Let’s Build Together',
    description:
      'Inquire about full stack web development and AI workflow automation. Fast turnaround & clear communication.',
    images: ['/images/og-image.png'],
  },
}

export default function Page() {
  return (
    <>
      <div className="h-16 bg-ink" />
      <ContactForm />
      <Faq />
    </>
  )
}
