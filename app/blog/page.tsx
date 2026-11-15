import type { Metadata } from 'next'
import Link from 'next/link'
import { Page } from '@/components/chrome'
import { getAllPostMeta } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Thoughts',
  description: 'Short essays by Jules Chasles on risk, decisions and simplicity.',
  alternates: { canonical: '/blog' },
}

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function BlogPage() {
  const posts = getAllPostMeta()
  return (
    <Page>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Thoughts</h1>
        <p className="mt-4 text-muted">Notes drawn from reading, deals and conversations. They change as I learn.</p>
        <ul className="mt-12 divide-y divide-line border-t border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-medium tracking-tight group-hover:text-muted">{p.title}</h2>
                  <span className="shrink-0 font-mono text-xs text-muted">{p.readMins} min</span>
                </div>
                <p className="mt-2 line-clamp-2 text-muted">{p.excerpt}</p>
                <time className="mt-3 block font-mono text-xs text-muted">{fmt(p.date)}</time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  )
}
