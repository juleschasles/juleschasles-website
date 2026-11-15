'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, links, person } from '@/lib/site'

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
          {nav.slice(1).map((n) => {
            const cls = `rounded-full px-2 py-1.5 transition sm:px-3 ${n.external ? 'hidden sm:inline' : ''} ${!n.external && path.startsWith(n.href) ? 'text-fg' : 'text-muted hover:text-fg'}`
            return n.external ? (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className={cls}>{n.label} ↗</a>
            ) : (
              <Link key={n.href} href={n.href} className={cls}>{n.label}</Link>
            )
          })}
          <ThemeToggle className="ml-1" />
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{person.name}. {person.role}. {person.location}.</p>
        <div className="flex gap-5">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn ↗</a>
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

export function Button({ href, children, primary = false, external = true }: { href: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
  const cls = primary
    ? 'bg-accent text-accent-fg hover:opacity-90'
    : 'border border-line text-fg hover:bg-surface-2'
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} {...ext} className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition ${cls}`}>
      {children}
    </a>
  )
}
