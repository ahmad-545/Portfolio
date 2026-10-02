import PageHeader from '@/components/PageHeader'
import BlogPreview from '@/sections/BlogPreview'
export const metadata = { title: 'Blog' }
export default function Page() { return <><PageHeader label="Blog" title="Articles" sub="Notes on Next.js, SaaS, animation and AI automation." /><BlogPreview bare /></> }
