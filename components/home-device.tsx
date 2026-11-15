'use client'

// Direction B: hardware-inspired neumorphic panel. Keys switch what the screen shows.
import Link from 'next/link'
import { useState } from 'react'
import { person, proof, whatIDo, talks, links, bio } from '@/lib/site'
import { ThemeToggle } from './chrome'
import type { PostMeta } from '@/lib/posts'

const modes = ['Intro', 'Proof', 'Process', 'Talks'] as const
type Mode = (typeof modes)[number]

export default function DeviceHome({ posts }: { posts: PostMeta[] }) {
  const [mode, setMode] = useState<Mode>('Intro')
  return (
    <main className="flex min-h-dvh items-center justify-center p-4 sm:p-8">
      <div className="neu w-full max-w-[980px] p-3 sm:p-5">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* Screen: always dark */}
          <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0d0d0d] p-6 text-[#efefec] sm:min-h-[520px] sm:p-8">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#8a8a86]">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-signal" />{person.name}</span>
              <span>{mode}</span>
            </div>

            {mode === 'Intro' && (
              <div>
                <h1 className="text-3xl font-light leading-[1.1] tracking-tight sm:text-5xl">{person.headline}</h1>
                <p className="mt-4 max-w-md text-sm text-[#a5a5a1]">{person.sub} {person.short}</p>
              </div>
            )}
            {mode === 'Proof' && (
              <ul className="grid grid-cols-2 gap-x-6 gap-y-5">
                {proof.map((p) => (
                  <li key={p.label}><div className="text-3xl font-light tracking-tight sm:text-4xl">{p.value}</div><div className="font-mono text-[11px] uppercase tracking-wider text-[#8a8a86]">{p.label}</div></li>
                ))}
              </ul>
            )}
            {mode === 'Process' && (
              <ol className="space-y-4">
                {whatIDo.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4"><span className="font-mono text-xs text-signal">0{i + 1}</span><div><div className="font-medium">{s.title}</div><div className="text-sm text-[#a5a5a1]">{s.body}</div></div></li>
                ))}
                <li className="pt-2 font-mono text-[11px] uppercase tracking-wider text-[#8a8a86]">{whatIDo.fees}</li>
              </ol>
            )}
            {mode === 'Talks' && (
              <ul className="space-y-4">
                {talks.map((t) => (<li key={t.title}><div className="font-medium">{t.title}</div><div className="text-sm text-[#a5a5a1]">{t.blurb}</div></li>))}
                <li><Link href="/speaking" className="font-mono text-[11px] uppercase tracking-wider text-signal">Speaking page →</Link></li>
              </ul>
            )}

            {/* Progress rule, echoing a waveform scrubber */}
            <div className="flex items-center gap-1" aria-hidden>
              {Array.from({ length: 48 }).map((_, i) => {
                const active = i < (modes.indexOf(mode) + 1) * 12
                return <span key={i} className={`w-[2px] rounded-full ${active ? 'bg-[#efefec]' : 'bg-[#3a3a38]'}`} style={{ height: 6 + ((i * 37) % 17) }} />
              })}
            </div>
          </div>

          {/* Control side */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="neu-in flex h-10 items-center rounded-xl px-3 font-mono text-[11px] uppercase tracking-wider text-muted">Dubai · GCC</div>
              <div className="speaker h-10 flex-1 rounded-xl" />
              <ThemeToggle className="neu-btn border-0" />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4">
              {modes.map((m) => (
                <button key={m} onClick={() => setMode(m)} aria-pressed={mode === m}
                  className={`flex min-h-24 flex-col items-start justify-between rounded-2xl p-4 text-left transition ${mode === m ? 'neu-in' : 'neu'}`}>
                  <span className={`h-2 w-2 rounded-full ${mode === m ? 'bg-signal' : 'bg-line'}`} />
                  <span className="text-sm font-medium">{m}</span>
                </button>
              ))}
            </div>
            <a href={links.dealReadiness} target="_blank" rel="noopener noreferrer" className="neu-btn flex h-14 items-center justify-between px-6 text-sm font-medium">
              Check your deal readiness <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal text-white">↗</span>
            </a>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a href={links.contact} target="_blank" rel="noopener noreferrer" className="neu-btn flex h-12 items-center justify-center text-sm">Talk to Jules</a>
              <Link href="/blog" className="neu-btn flex h-12 items-center justify-center text-sm">Thoughts ({posts.length})</Link>
            </div>
          </div>
        </div>
        <p className="mt-4 px-2 text-xs text-muted">{bio[0]}</p>
      </div>
    </main>
  )
}
