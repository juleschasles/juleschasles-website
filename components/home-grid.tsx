// Home: grid layout with neumorphic (hardware-style) cards. No scroll on desktop.
import Image from 'next/image'
import Link from 'next/link'
import { person, proof, bio, whatIDo, links, proofContext } from '@/lib/site'
import { Expandable, ExpandButton } from './expandable'
import { ThemeToggle } from './chrome'
import type { PostMeta } from '@/lib/posts'

const label = 'font-mono text-[11px] uppercase tracking-wider text-muted'
const h2 = 'text-3xl font-semibold tracking-[-0.03em] sm:text-5xl'

export default function GridHome({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:h-dvh lg:overflow-hidden">
      <div className="grid gap-4 sm:gap-5 lg:h-full lg:grid-cols-[1.35fr_1fr]">
        {/* Left column */}
        <div className="flex min-h-0 flex-col gap-4 sm:gap-5">
          {/* Photo + facts */}
          <div className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-4 sm:gap-5">
            <div className="neu relative aspect-[4/5] overflow-hidden p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface-2">
                <Image src="/jules.png" alt="Jules Chasles" fill priority sizes="(min-width:1024px) 22vw, 45vw" className="object-cover object-top" />
              </div>
            </div>
            <Expandable title="Track record" className="neu relative p-3 sm:p-5" detail={
              <>
                <p className={label}>Track record</p>
                <h2 className={`mt-3 ${h2}`}>Years on the buyer side, in numbers.</h2>
                <ul className="mt-10 divide-y divide-line border-y border-line">
                  {proof.map((p, i) => (
                    <li key={p.label} className="grid gap-1 py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
                      <span className="text-4xl font-semibold tracking-tight">{p.value}</span>
                      <div><div className="font-medium">{p.label}</div><p className="mt-1 text-muted">{proofContext[i]}</p></div>
                    </li>
                  ))}
                </ul>
              </>
            }>
            <ul className="grid h-full grid-cols-2 content-center gap-2 sm:gap-4">
              {proof.map((p, i) => (
                <li key={p.label} className={`neu-in px-2.5 py-2 sm:px-4 sm:py-3 `}>
                  <div className="text-base font-semibold tracking-tight sm:text-2xl">{p.value}</div>
                  <div className="text-[10px] leading-tight text-muted sm:text-xs">{p.label}</div>
                </li>
              ))}
              <li className="flex items-center justify-center"><ExpandButton label="track record" /></li>
            </ul>
            </Expandable>
          </div>

          {/* Bio */}
          <Expandable title="About" className="neu flex min-h-0 flex-1 flex-col p-6 sm:p-8" detail={
            <>
              <p className={label}>About</p>
              <h2 className={`mt-3 ${h2}`}>{person.headline}</h2>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">{bio.map((b) => <p key={b}>{b}</p>)}</div>
              <h3 className="mt-14 text-xl font-semibold">What I do</h3>
              <p className="mt-3 text-muted">{whatIDo.intro}</p>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {whatIDo.steps.map((st, i) => (
                  <li key={st.title} className="neu-in p-5"><span className="font-mono text-xs text-signal">0{i + 1}</span><h4 className="mt-2 font-medium">{st.title}</h4><p className="mt-1 text-sm text-muted">{st.body}</p></li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted">{whatIDo.fees}</p>
              <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="neu-btn mt-8 inline-flex h-14 items-center gap-4 pl-6 pr-3 text-sm font-medium">Check your deal readiness <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-white">↗</span></a>
            </>
          }>
            <div className="flex items-center justify-between gap-2">
              <span className={label}><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />{person.name} · {person.location}</span>
              <div className="flex gap-2"><ThemeToggle className="neu-btn border-0" /><ExpandButton label="about" /></div>
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl xl:text-5xl">{person.headline}</h1>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
              <p>{whatIDo.intro} {whatIDo.fees}</p>
              {bio.map((b) => <p key={b}>{b}</p>)}
            </div>
          </Expandable>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="neu-btn flex h-14 items-center justify-between pl-6 pr-3 text-sm font-medium">
              Deal readiness <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-white">↗</span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="neu-btn flex h-14 items-center justify-between pl-6 pr-3 text-sm font-medium">
              LinkedIn <span className="neu-in flex h-8 w-8 items-center justify-center rounded-full">↗</span>
            </a>
            <a href={`mailto:${links.email}`} className="neu-btn flex h-14 items-center justify-between pl-6 pr-3 text-sm font-medium">
              Email <span className="neu-in flex h-8 w-8 items-center justify-center rounded-full">@</span>
            </a>
          </div>
        </div>

        {/* Right column: Thoughts */}
        <Expandable title="Thoughts" className="neu flex min-h-0 flex-col p-6 sm:p-8" detail={
          <>
            <p className={label}>Thoughts</p>
            <h2 className={`mt-3 ${h2}`}>Notes on risk, decisions and simplicity.</h2>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block py-6">
                    <div className="flex items-baseline justify-between gap-4"><span className="text-xl font-medium group-hover:text-muted">{p.title}</span><span className="shrink-0 font-mono text-xs text-muted">{p.readMins} min</span></div>
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
          <ul className="mt-5 flex flex-col gap-3 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="neu-in group block px-5 py-4 transition">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium group-hover:text-muted">{p.title}</span>
                    <span className="shrink-0 font-mono text-[11px] text-muted">{p.readMins} min</span>
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
