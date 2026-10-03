import PageHeader from '@/components/PageHeader'
import ProjectsGrid from '@/sections/ProjectsGrid'

export const metadata = {
  title: 'Projects & Case Studies — Full Stack & AI Automation',
  description:
    'Featured client and SaaS projects engineered by Muhammad Ahmad: Trylo AI virtual try-on fashion platform, ExpenseAI finance tracker, EduManage CMS school platform, and Phonify e-commerce ecosystem.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies — Muhammad Ahmad',
    description:
      'Explore production-grade SaaS platforms, management systems, and AI workflows built with Next.js and MERN.',
    url: '/projects',
    type: 'website',
    images: [
      {
        url: '/images/expense-ai.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Ahmad Featured Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects & Case Studies — Muhammad Ahmad',
    description:
      'Featured production-grade SaaS platforms and AI automation systems.',
    images: ['/images/expense-ai.png'],
  },
}

export default function Page() {
  return (
    <>
      <PageHeader
        label="Case studies"
        title="Projects"
        sub="Selected SaaS, management systems and AI automation work."
      />
      <ProjectsGrid />
    </>
  )
}
