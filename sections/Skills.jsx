import Marquee from '@/components/Marquee'
import SectionTitle from '@/components/SectionTitle'
import Tilt from '@/components/Tilt'
import { skills, skillGroups } from '@/data'
export default function Skills() {
  return (<>
    <Marquee items={skills} />
    <section id="skills" className="bg-ink text-white py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 lg:px-16">
      <SectionTitle label="Skills" title="My tech stack" dark={true} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">{skillGroups.map(([g, list]) => (
        <Tilt key={g} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-7">
          <h3 className="font-display font-bold uppercase text-accent mb-4 sm:mb-5">{g}</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">{list.map((s) => <span key={s} className="text-[11px] sm:text-xs border border-white/15 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-accent hover:text-ink transition-colors">{s}</span>)}</div>
        </Tilt>))}</div>
    </section></>)
}
