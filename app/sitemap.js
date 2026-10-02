import { projects, posts, pages } from '@/data'
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return [...pages.map(([p]) => p), ...projects.map((p) => `/projects/${p.slug}`), ...posts.map((p) => `/blog/${p.slug}`)].map((u) => ({ url: base + u, lastModified: new Date() }))
}
