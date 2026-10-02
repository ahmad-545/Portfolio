import PageHeader from '@/components/PageHeader'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Timeline from '@/sections/Timeline'
import Testimonials from '@/sections/Testimonials'
export const metadata = { title: 'About' }
export default function Page() { return <><PageHeader label="About" title="About me" sub="Full Stack Developer and AI Automation Engineer building SaaS, MERN and Next.js products." /><About /><Skills /><Timeline /><Testimonials /></> }
