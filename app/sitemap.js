import { projects, posts, pages } from '@/data'

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-phi-roan-t4yp9fl334.vercel.app'

  const staticRoutes = pages.map(([p]) => ({
    url: `${base}${p}`,
    lastModified: new Date().toISOString(),
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1.0 : 0.8,
  }))

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date || Date.now()).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
