// Home: grid layout, device-style cards on Brand Book tokens. No scroll on desktop.
import Link from 'next/link'
import { person, proof, bio, whatIDo, links } from '@/lib/site'
import { Expandable, ExpandButton } from './expandable'
import { ThemeToggle } from './chrome'
import type { PostMeta } from '@/lib/posts'

const label = 'label'
const h2 = 'text-3xl font-light tracking-[-0.02em] sm:text-5xl'

export default function GridHome({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="mx-auto max-w-[1400px] p-3 sm:p-4 lg:h-dvh lg:overflow-hidden">
      <div className="grid gap-3 sm:gap-4 lg:h-full lg:grid-cols-[1.35fr_1fr]">
        {/* Left column */}
        <div className="flex min-h-0 flex-col gap-3 sm:gap-4">
          {/* Row 1: photo + name + hero */}
          <div className="flex gap-3 sm:gap-4">
            <div className="key relative aspect-square w-28 shrink-0 overflow-hidden p-1.5 sm:w-40 xl:w-44">
              <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/jules.png" alt="Jules Chasles" width={352} height={352} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
            </div>
            <div className="key relative flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:px-5">
              <ThemeToggle className="key-btn absolute right-3 top-3" />
              <span className={`${label} flex items-center pr-10`}><span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{person.name} · {person.location}</span>
              <h1 className="mt-2 text-xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-3xl xl:text-[40px]">{person.headline}</h1>
            </div>
          </div>

          {/* Row 2: metrics */}
          <ul className="key grid grid-cols-3 gap-1.5 p-1.5 sm:grid-cols-5 sm:gap-2 sm:p-2">
            {proof.map((p) => (
              <li key={p.label} className="key-in px-2.5 py-2 sm:px-3 sm:py-2.5">
                <div className="text-base font-normal tracking-tight sm:text-xl xl:text-2xl">{p.value}</div>
                <div className="text-[10px] leading-tight text-muted sm:text-xs">{p.label}</div>
              </li>
            ))}
          </ul>


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

          {/* Row 4: actions */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="key-btn flex h-12 items-center justify-between pl-5 pr-2 text-sm font-medium">
              Deal readiness <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-white">↗</span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="key-btn flex h-12 items-center justify-between pl-5 pr-2 text-sm font-medium">
              LinkedIn <span className="key-in flex h-8 w-8 items-center justify-center rounded-full">↗</span>
            </a>
            <a href={`mailto:${links.email}`} className="key-btn flex h-12 items-center justify-between pl-5 pr-2 text-sm font-medium">
              Email <span className="key-in flex h-8 w-8 items-center justify-center rounded-full">@</span>
            </a>
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
          <ul className="mt-3 flex flex-col gap-2 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
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
        </Expandable>
      </div>
    </main>
  )
}
