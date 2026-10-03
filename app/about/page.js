import PageHeader from '@/components/PageHeader'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Timeline from '@/sections/Timeline'
import Testimonials from '@/sections/Testimonials'

export const metadata = {
  title: 'About Me — Full Stack & AI Automation Developer',
  description:
    'Discover Muhammad Ahmad’s journey as a Full Stack & AI Automation Engineer with 3+ years experience delivering 25+ projects across MERN, Next.js, and automated workflows.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Muhammad Ahmad — Full Stack & AI Automation Developer',
    description:
      '3+ years experience, 25+ projects delivered. Specializing in MERN, Next.js, and intelligent workflow automation.',
    url: '/about',
    type: 'profile',
    images: [
      {
        url: '/images/hero-robot.png',
        width: 1200,
        height: 630,
        alt: 'About Muhammad Ahmad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Muhammad Ahmad — Full Stack & AI Automation Developer',
    description:
      'Discover Muhammad Ahmad’s journey delivering 25+ production projects across SaaS, Next.js, and AI automation.',
    images: ['/images/hero-robot.png'],
  },
}

export default function Page() {
  return (
    <>
      <PageHeader
        label="About"
        title="About me"
        sub="Full Stack Developer and AI Automation Engineer building SaaS, MERN and Next.js products."
      />
      <About />
      <Skills />
      <Timeline />
      <Testimonials />
    </>
  )
}
