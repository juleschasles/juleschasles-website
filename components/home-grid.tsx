'use client'

// Direction A: bento grid, no scroll on desktop, cards expand in place.
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { person, proof, whatIDo, bio, talks, topics, organizers, links } from '@/lib/site'
import { ThemeToggle } from './chrome'
import type { PostMeta } from '@/lib/posts'

type Key = 'what' | 'about' | 'speaking' | 'thoughts' | null

function Card({ id, open, setOpen, label, title, className = '', children, detail }: {
  id: Exclude<Key, null>; open: Key; setOpen: (k: Key) => void; label: string; title: React.ReactNode; className?: string; children?: React.ReactNode; detail: React.ReactNode
}) {
  const isOpen = open === id
  return (
    <section
      className={`group relative flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ${isOpen ? 'lg:absolute lg:inset-0 lg:z-10 shadow-xl' : ''} ${open && !isOpen ? 'lg:opacity-30' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{label}</span>
        <button
          onClick={() => setOpen(isOpen ? null : id)}
          aria-expanded={isOpen}
          aria-label={isOpen ? `Close ${label}` : `Open ${label}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition group-hover:text-fg"
        >
          <span className={`transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
        </button>
      </div>
      <h2 className="mt-2 text-lg font-medium leading-snug tracking-tight">{title}</h2>
      {!isOpen && children}
      <div className={`${isOpen ? 'block' : 'hidden'} mt-4 overflow-y-auto`}>{detail}</div>
    </section>
  )
}

export default function GridHome({ posts }: { posts: PostMeta[] }) {
  const [open, setOpen] = useState<Key>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="mx-auto max-w-[1400px] p-3 sm:p-4 lg:h-dvh">
      <div className="relative grid gap-3 lg:h-full lg:grid-cols-12 lg:grid-rows-6">
        {/* Hero */}
        <section className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-6 lg:row-span-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{person.name}</span>
            <ThemeToggle />
          </div>
          <div className="mt-16 lg:mt-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{person.role}</p>
            <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl xl:text-6xl">{person.headline}</h1>
            <p className="mt-4 max-w-md text-muted">{person.sub} {person.short}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg hover:opacity-90">Check your deal readiness ↗</a>
              <a href={links.contact} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium hover:bg-surface-2">Talk to Jules</a>
            </div>
          </div>
        </section>

        {/* Photo */}
        <section className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 aspect-square lg:aspect-auto lg:col-span-3 lg:row-span-4">
          <Image src="/jules.png" alt="Jules Chasles" fill priority sizes="(min-width:1024px) 25vw, 100vw" className="object-cover object-top grayscale" />
          <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1 font-mono text-[11px] uppercase tracking-wider">{person.location}</span>
        </section>

        {/* Proof */}
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-3 lg:row-span-4 lg:grid-cols-1">
          {proof.map((p, i) => (
            <div key={p.label} className={`flex flex-col justify-center bg-surface px-5 py-4 ${i === 4 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <span className="text-2xl font-semibold tracking-tight">{p.value}</span>
              <span className="text-xs text-muted">{p.label}</span>
            </div>
          ))}
        </section>

        <Card id="what" open={open} setOpen={setOpen} label="What I do" title="Full sell-side process, from preparation to close." className="lg:col-span-3 lg:row-span-2"
          detail={<div className="max-w-2xl space-y-5">
            <p className="text-muted">{whatIDo.intro}</p>
            <ol className="grid gap-3 sm:grid-cols-2">{whatIDo.steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-line p-4"><span className="font-mono text-xs text-muted">0{i + 1}</span><h3 className="mt-1 font-medium">{s.title}</h3><p className="mt-1 text-sm text-muted">{s.body}</p></li>))}
            </ol>
            <p className="text-sm text-muted">{whatIDo.fees}</p>
            <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg">Check your deal readiness ↗</a>
          </div>}
        />

        <Card id="about" open={open} setOpen={setOpen} label="About" title="I spent years as the buyer." className="lg:col-span-3 lg:row-span-2"
          detail={<div className="max-w-2xl space-y-4 text-muted">{bio.map((b) => <p key={b}>{b}</p>)}
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block text-fg underline underline-offset-4">LinkedIn ↗</a></div>}
        />

        <Card id="speaking" open={open} setOpen={setOpen} label="Speaking" title="Workshops and panels on selling and valuing a business." className="lg:col-span-3 lg:row-span-2"
          detail={<div className="space-y-6">
            <ul className="flex flex-wrap gap-2">{organizers.map((o) => <li key={o} className="rounded-full border border-line px-3 py-1 text-xs">{o}</li>)}</ul>
            <div className="grid gap-3 md:grid-cols-3">{talks.map((t) => (
              <div key={t.title} className="rounded-xl border border-line p-4"><h3 className="font-medium">{t.title}</h3><p className="mt-1 text-sm text-muted">{t.blurb}</p></div>))}</div>
            <p className="text-sm text-muted">Topics: {topics.join(' · ')}</p>
            <div className="flex gap-2"><a href={links.speaking} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg">Book Jules to speak</a>
              <Link href="/speaking" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm">Speaking page</Link></div>
          </div>}
        />

        <Card id="thoughts" open={open} setOpen={setOpen} label="Thoughts" title={posts[0]?.title ?? 'Notes on decisions'} className="lg:col-span-3 lg:row-span-2"
          detail={<ul className="max-w-2xl divide-y divide-line">{posts.map((p) => (
            <li key={p.slug}><Link href={`/blog/${p.slug}`} className="flex items-baseline justify-between gap-4 py-3 hover:text-muted"><span>{p.title}</span><span className="font-mono text-xs text-muted">{p.readMins} min</span></Link></li>))}
            <li className="pt-3"><Link href="/blog" className="text-sm underline underline-offset-4">All thoughts</Link></li></ul>}
        >
          <p className="mt-1 text-sm text-muted">{posts.length} essays on risk, decisions and simplicity.</p>
        </Card>
      </div>
    </main>
  )
}
