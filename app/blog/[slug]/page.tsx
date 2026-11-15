import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Page } from '@/components/chrome'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { SITE_URL, person, links } from '@/lib/site'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date, authors: [person.name] },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug)
  if (!post) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  const share = encodeURIComponent(url)
  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, datePublished: post.date,
    description: post.excerpt, url, author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: person.name, url: SITE_URL, sameAs: [links.linkedin] },
  }

  return (
    <Page>
      <article className="mx-auto max-w-[68ch]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Link href="/blog" className="text-sm text-muted hover:text-fg">← Thoughts</Link>
        <h1 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{post.title}</h1>
        <p className="mt-4 font-mono text-xs text-muted">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.readMins} min read
        </p>
        <div className="prose-read mt-10"><ReactMarkdown>{post.content}</ReactMarkdown></div>
        <div className="mt-14 flex gap-6 border-t border-line pt-6 text-sm text-muted">
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Share on LinkedIn ↗</a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${share}`} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Share on X ↗</a>
        </div>
      </article>
    </Page>
  )
}
