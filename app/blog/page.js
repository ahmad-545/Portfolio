import PageHeader from '@/components/PageHeader'
import BlogPreview from '@/sections/BlogPreview'

export const metadata = {
  title: 'Blog & Engineering Insights — Next.js, SaaS & AI Automation',
  description:
    'In-depth technical articles and guides on Next.js App Router, SaaS architecture, web performance, and AI workflow automation by Muhammad Ahmad.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Engineering Insights — Muhammad Ahmad',
    description:
      'Guides and insights on Next.js, scalable SaaS architectures, web performance, and modern AI automation workflows.',
    url: '/blog',
    type: 'website',
    images: [
      {
        url: '/images/blog-ai-automation.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Muhammad Ahmad Engineering Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Engineering Insights — Muhammad Ahmad',
    description:
      'Guides and insights on Next.js, SaaS architectures, and AI automations.',
    images: ['/images/blog-ai-automation.png'],
  },
}

export default function Page() {
  return (
    <>
      <PageHeader
        label="Blog"
        title="Articles"
        sub="Notes on Next.js, SaaS, animation and AI automation."
      />
      <BlogPreview bare />
    </>
  )
}
