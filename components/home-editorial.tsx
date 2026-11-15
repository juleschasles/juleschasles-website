// Direction C: editorial scroll page, large type, ruled sections.
import Image from 'next/image'
import Link from 'next/link'
import { person, proof, whatIDo, bio, organizers, talks, links } from '@/lib/site'
import { Header, Footer, Button } from './chrome'
import type { PostMeta } from '@/lib/posts'

export default function EditorialHome({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <section className="pt-14 sm:pt-24">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{person.role}</p>
          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-7xl">
            {person.name}<br /><span className="text-muted">Exit advisor.</span>
          </h1>
        </section>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-surface-2 sm:aspect-[21/8]">
          <Image src="/jules.png" alt="Jules Chasles" fill priority sizes="100vw" className="object-contain object-bottom grayscale" />
        </div>

        <section className="grid gap-10 border-b border-line py-14 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <p className="text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
            {person.headline} <span className="text-muted">{person.sub}</span>
          </p>
          <div className="md:border-l md:border-line md:pl-10">
            <dl className="grid grid-cols-2 gap-6">
              {proof.map((p) => (<div key={p.label}><dt className="text-2xl font-semibold tracking-tight">{p.value}</dt><dd className="text-xs text-muted">{p.label}</dd></div>))}
            </dl>
          </div>
        </section>

        <section className="grid gap-10 border-b border-line py-14 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {whatIDo.steps.map((s, i) => (
              <li key={s.title} className="bg-bg p-5"><span className="font-mono text-xs text-muted">0{i + 1}</span><h3 className="mt-2 font-medium">{s.title}</h3><p className="mt-1 text-sm text-muted">{s.body}</p></li>
            ))}
          </ol>
          <div className="flex flex-col md:border-l md:border-line md:pl-10">
            <h2 className="text-xl font-semibold">What I do</h2>
            <p className="mt-3 text-sm text-muted">{whatIDo.intro}</p>
            <p className="mt-3 text-sm text-muted">{whatIDo.fees}</p>
            <div className="mt-6 flex flex-col gap-2 md:mt-auto"><Button href={links.dealReadiness} primary>Check your deal readiness ↗</Button><Button href={links.contact}>Talk to Jules</Button></div>
          </div>
        </section>

        <section className="grid gap-10 border-b border-line py-14 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <h2 className="text-xl font-semibold">About</h2>
          <div className="space-y-4 text-muted">{bio.map((b) => <p key={b}>{b}</p>)}</div>
        </section>

        <section className="border-b border-line py-14">
          <div className="flex items-baseline justify-between"><h2 className="text-xl font-semibold">Speaking</h2><Link href="/speaking" className="text-sm text-muted hover:text-fg">All talks →</Link></div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-lg font-semibold tracking-tight text-muted">{organizers.map((o) => <li key={o}>{o}</li>)}</ul>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{talks.map((t) => (<div key={t.title}><h3 className="font-medium">{t.title}</h3><p className="mt-1 text-sm text-muted">{t.blurb}</p></div>))}</div>
        </section>

        <section className="py-14">
          <div className="flex items-baseline justify-between"><h2 className="text-xl font-semibold">Thoughts</h2><Link href="/blog" className="text-sm text-muted hover:text-fg">All →</Link></div>
          <ul className="mt-4 divide-y divide-line">{posts.slice(0, 5).map((p) => (
            <li key={p.slug}><Link href={`/blog/${p.slug}`} className="flex items-baseline justify-between gap-4 py-4 hover:text-muted"><span className="font-medium">{p.title}</span><span className="font-mono text-xs text-muted">{p.readMins} min</span></Link></li>))}</ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
