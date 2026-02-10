import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const shareUrl = encodeURIComponent(`https://juleschasles.com/blog/${post.slug}`)
  const shareText = encodeURIComponent(post.title)
  
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`

  return (
    <main className="min-h-screen" style={{ padding: '5%' }}>
      <article style={{ maxWidth: '65ch' }}>
        <div className="text-sm fixed-nav flex">
          <Link href="/" className="no-underline hover:opacity-70 transition-opacity">
            ← Home
          </Link>
          <Link href="/blog" className="no-underline hover:opacity-70 transition-opacity" style={{ marginLeft: '3rem' }}>
            ← Thoughts
          </Link>
        </div>

        <div style={{ height: '3rem' }} />

        <h1 className="text-4xl font-semibold mb-3" style={{ marginTop: 0 }}>
          {post.title}
        </h1>
        
        <time className="text-sm text-[#5A5A5A] block mb-8">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>

        <div className="text-sm leading-relaxed space-y-4 markdown-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E0E0E0] link-nav-container text-sm">
          <a 
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-nav"
          >
            <span className="text-xs">↗</span>
            Share on X
          </a>
          <a 
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-nav"
          >
            <span className="text-xs">↗</span>
            Share on LinkedIn
          </a>
        </div>
      </article>
    </main>
  )
}