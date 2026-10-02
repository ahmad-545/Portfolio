import PageHeader from '@/components/PageHeader'
import Pricing from '@/sections/Pricing'
import Faq from '@/sections/Faq'
export const metadata = { title: 'Pricing' }
export default function Page() { return <><PageHeader label="Pricing" title="Plans" sub="Simple starting prices. Final quote after a short call." /><Pricing /><Faq /></> }
