'use client'

// Home: grid layout, device-style cards on Brand Book tokens. No scroll on desktop.
import Link from 'next/link'
import { person, proof, bio, whatIDo, links, actions, organizers, talks, topics } from '@/lib/site'
import { Expandable, ExpandButton, useOpen } from './expandable'
import { ThemeToggle } from './chrome'
import type { PostMeta } from '@/lib/posts'

const label = 'label'
const h2 = 'text-3xl font-light tracking-[-0.02em] sm:text-5xl'

function ActionButton({ a }: { a: (typeof actions)[number] }) {
  const content = (
    <>
      {a.label} <span className="key-in flex h-8 w-8 shrink-0 items-center justify-center rounded-full">{a.icon}</span>
    </>
  )
  const cls = 'key-btn flex h-12 items-center justify-between pl-5 pr-2 text-sm font-medium'
  if (a.kind === 'link') return <Link href={a.href} className={cls}>{content}</Link>
  if (a.kind === 'mail') return <a href={a.href} className={cls}>{content}</a>
  return <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
}

// The whole metric tile opens the Speaking card; a small arrow hints it's expandable.
function SpeakingTile({ value, tileLabel }: { value: string; tileLabel: string }) {
  const open = useOpen()
  return (
    <button onClick={open} className="relative flex h-full w-full flex-col items-start justify-center text-left">
      <span aria-hidden className="absolute right-0 top-0 text-muted">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M9 7h8v8" /></svg>
      </span>
      <div className="text-base font-normal tracking-tight sm:text-xl xl:text-2xl">{value}</div>
      <div className="text-[10px] leading-tight text-muted sm:text-xs">{tileLabel}</div>
    </button>
  )
}

export default function GridHome({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="mx-auto max-w-[1400px] p-3 sm:p-4 lg:h-dvh lg:overflow-hidden">
      <div className="grid gap-3 sm:gap-4 lg:h-full lg:grid-cols-[1.35fr_1fr]">
        {/* Left column */}
        <div className="flex min-h-0 flex-col gap-3 sm:gap-4">
          {/* Row 1: photo (links to LinkedIn) + name + hero */}
          <div className="flex gap-3 sm:gap-4">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="key relative aspect-square w-28 shrink-0 overflow-hidden p-1.5 transition hover:opacity-90 sm:w-40 xl:w-44"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/jules.png" alt="Jules Chasles" width={352} height={352} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
            </a>
            <div className="key relative flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:px-5">
              <ThemeToggle className="key-btn absolute right-3 top-3" />
              <span className={`${label} flex items-center pr-10`}><span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{person.name} · {person.location}</span>
              <h1 className="mt-2 text-xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-3xl xl:text-[40px]">{person.headline}</h1>
            </div>
          </div>

          {/* Row 2: metrics; the last tile expands into the Speaking card */}
          <div className="key grid grid-cols-3 gap-1.5 p-1.5 sm:grid-cols-5 sm:gap-2 sm:p-2">
            {proof.slice(0, 4).map((p) => (
              <div key={p.label} className="key-in px-2.5 py-2 sm:px-3 sm:py-2.5">
                <div className="text-base font-normal tracking-tight sm:text-xl xl:text-2xl">{p.value}</div>
                <div className="text-[10px] leading-tight text-muted sm:text-xs">{p.label}</div>
              </div>
            ))}
            <Expandable title="Speaking" className="key-in relative px-2.5 py-2 sm:px-3 sm:py-2.5" detail={
              <>
                <p className={label}>Speaking</p>
                <h2 className={`mt-3 ${h2}`}>How buyers see your company, explained to the people building it.</h2>
                <p className="mt-5 max-w-xl text-muted">{proof[4].value} {proof[4].label} across the UAE, for founders, accelerators and universities.</p>
                <ul className="mt-8 flex flex-wrap gap-2">{organizers.map((o) => (<li key={o} className="key-in px-3 py-1 text-xs">{o}</li>))}</ul>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {talks.map((t, i) => (
                    <div key={t.title} className="key-in p-5">
                      <span className="text-xs font-medium text-signal">0{i + 1}</span>
                      <h3 className="mt-2 font-medium leading-snug">{t.title}</h3>
                      <p className="mt-1 text-sm text-muted">{t.blurb}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-sm text-muted">Topics: {topics.join(' · ')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={links.speaking} className="key-btn inline-flex h-12 items-center gap-4 pl-5 pr-2 text-sm font-medium">Book Jules to speak <span className="key-in flex h-8 w-8 items-center justify-center rounded-full">↗</span></a>
                  <Link href="/speaking" className="key-btn inline-flex h-12 items-center px-5 text-sm font-medium">Full speaking page →</Link>
                </div>
              </>
            }>
              <SpeakingTile value={proof[4].value} tileLabel={proof[4].label} />
            </Expandable>
          </div>

          {/* Row 3: bio, scrolls inside the card */}
          <Expandable title="About" className="key flex min-h-0 flex-1 flex-col p-4 sm:p-5" detail={
            <>
              <p className={label}>About</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">{person.headline}</h2>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">{bio.map((b) => <p key={b}>{b}</p>)}</div>
              <h3 className="mt-14 text-xl font-semibold">What I do</h3>
              <p className="mt-3 text-muted">{whatIDo.intro}</p>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {whatIDo.steps.map((st, i) => (
                  <li key={st.title} className="key-in p-5"><span className="text-xs font-medium text-signal">0{i + 1}</span><h4 className="mt-2 font-medium">{st.title}</h4><p className="mt-1 text-sm text-muted">{st.body}</p></li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted">{whatIDo.fees}</p>
              <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="key-btn mt-8 inline-flex h-14 items-center gap-4 pl-6 pr-3 text-sm font-medium">Check your deal readiness <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-white">↗</span></a>
            </>
          }>
            <div className="flex items-center justify-between gap-2">
              <span className={label}>About</span>
              <ExpandButton label="about" />
            </div>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
              <p>{whatIDo.intro} {whatIDo.fees}</p>
              {bio.map((b) => <p key={b}>{b}</p>)}
            </div>
          </Expandable>

          {/* Row 4: actions (first three of the six site-wide CTAs) */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {actions.slice(0, 3).map((a) => <ActionButton key={a.label} a={a} />)}
          </div>
        </div>

        {/* Right column: Thoughts */}
        <Expandable title="Thoughts" className="key flex min-h-0 flex-col p-4 sm:p-5" detail={
          <>
            <p className={label}>Thoughts</p>
            <h2 className={`mt-3 ${h2}`}>Notes on risk, decisions and simplicity.</h2>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block py-6">
                    <div className="flex items-baseline justify-between gap-4"><span className="text-xl font-medium group-hover:text-muted">{p.title}</span><span className="shrink-0 text-xs text-muted">{p.readMins} min</span></div>
                    <p className="mt-2 text-muted">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        }>
          <div className="flex items-center justify-between">
            <span className={label}>Thoughts</span>
            <ExpandButton label="thoughts" />
          </div>
          <ul className="mt-3 flex flex-col gap-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="key-in group block px-4 py-3 transition">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium group-hover:text-muted">{p.title}</span>
                    <span className="shrink-0 text-xs text-muted">{p.readMins} min</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
          {/* The other three of the six site-wide CTAs */}
          <div className="mt-3 grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3 lg:mt-3 lg:shrink-0">
            {actions.slice(3, 6).map((a) => <ActionButton key={a.label} a={a} />)}
          </div>
        </Expandable>
      </div>
    </main>
  )
}
