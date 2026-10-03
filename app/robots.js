export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-phi-roan-t4yp9fl334.vercel.app'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
