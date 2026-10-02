import PageHeader from '@/components/PageHeader'
import Services from '@/sections/Services'
import Process from '@/sections/Process'
import Faq from '@/sections/Faq'
export const metadata = { title: 'Services' }
export default function Page() { return <><PageHeader label="Services" title="What I do" sub="From custom web apps to AI agents that automate your daily work." /><Services /><Process /><Faq /></> }
