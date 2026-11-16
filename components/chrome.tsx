'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, links, person, contactActions, leadMagnetActions } from '@/lib/site'
import type { ReactNode } from 'react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null)
  useEffect(() => {
    const t = document.documentElement.dataset.theme
    setDark(t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-fg transition ${className}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        {dark ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
      </svg>
    </button>
  )
}

export function Header() {
  const path = usePathname()
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="whitespace-nowrap text-sm font-semibold tracking-tight">{person.name}</Link>
        <nav className="flex items-center text-sm sm:gap-1">
          {nav.slice(1).map((n) => (
            <Link key={n.href} href={n.href} className={`rounded-full px-2 py-1.5 transition sm:px-3 ${path.startsWith(n.href) ? 'text-fg' : 'text-muted hover:text-fg'}`}>{n.label}</Link>
          ))}
          <ThemeToggle className="ml-1" />
        </nav>
      </div>
    </header>
  )
}

type Action = (typeof contactActions)[number]

export function ActionButton({ a }: { a: Action }) {
  const content: ReactNode = (
    <>
      {a.label} <span className="key-in flex h-8 w-8 shrink-0 items-center justify-center rounded-full">{a.icon}</span>
    </>
  )
  const cls = 'key-btn flex h-12 items-center justify-between pl-5 pr-2 text-sm font-medium'
  if (a.kind === 'link') return <Link href={a.href} className={cls}>{content}</Link>
  if (a.kind === 'mail') return <a href={a.href} className={cls}>{content}</a>
  return <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
}

function ActionButtonRow({ items }: { items: Action[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((a) => <ActionButton key={a.label} a={a} />)}
    </div>
  )
}

// The same six CTAs shown on the homepage, grouped the same way on every
// other page: contact first, lead magnets below.
export function ActionRow() {
  return (
    <div className="flex flex-col gap-3">
      <ActionButtonRow items={contactActions} />
      <ActionButtonRow items={leadMagnetActions} />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ActionRow />
        <div className="mt-8 flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{person.name}. {person.role}. {person.location}.</p>
          <a href={links.wusool} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Wusool Capital ↗</a>
        </div>
      </div>
    </footer>
  )
}

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-20">{children}</main>
      <Footer />
    </>
  )
}

export function Button({ href, children, external = true }: { href: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
  // mailto links open the mail app, never a blank tab
  const ext = external && !href.startsWith('mailto:') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} {...ext} className="key-btn inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-medium">
      {children}
    </a>
  )
}
