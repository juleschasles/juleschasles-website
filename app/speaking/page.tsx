import type { Metadata } from 'next'
import { Page, Button } from '@/components/chrome'
import { organizers, talks, topics, links, proof } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Jules Chasles speaks to founders on selling and valuing a business in the GCC. 20+ workshops and panels with Hub71, in5, Plug and Play, NYU Abu Dhabi and others.',
  alternates: { canonical: '/speaking' },
}

export default function Speaking() {
  return (
    <Page>
      <p className="label">Speaking</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">How buyers see your company, explained to the people building it.</h1>
      <p className="mt-5 max-w-xl text-muted">{proof[4].value} {proof[4].label} across the UAE, for founders, accelerators and universities.</p>
      <div className="mt-8"><Button href={links.speaking}>Book Jules to speak</Button></div>

      <section className="mt-16">
        <h2 className="label">Hosted by</h2>
        {/* [TO CONFIRM] Replace wordmarks with logo files and usage permission. */}
        <ul className="key mt-4 grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-4 sm:gap-2">
          {organizers.map((o) => (<li key={o} className="key-in flex h-20 items-center justify-center px-3 text-center text-sm font-semibold tracking-tight text-muted">{o}</li>))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">Headline talks</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {talks.map((t, i) => (
            <article key={t.title} className="key-in flex flex-col p-6">
              <span className="text-xs font-medium text-signal">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-medium leading-snug">{t.title}</h3>
              <p className="mt-2 text-sm text-muted">{t.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 className="text-xl font-semibold">Topics</h2>
        <ul className="divide-y divide-line border-y border-line">{topics.map((t) => <li key={t} className="py-3">{t}</li>)}</ul>
      </section>

      <section className="key mt-16 p-8 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight">Running an event for founders?</h2>
        <p className="mt-2 max-w-lg text-muted">Workshops, panels and fireside chats. Formats from 30 minutes to half a day.</p>
        <div className="mt-6"><Button href={links.speaking}>Book Jules to speak</Button></div>
      </section>
    </Page>
  )
}
