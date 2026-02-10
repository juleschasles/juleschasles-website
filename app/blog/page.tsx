import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen" style={{ padding: '5%' }}>
      <div style={{ maxWidth: '65ch' }}>
        <div className="text-sm mb-8 fixed-nav">
          <Link href="/" className="no-underline hover:opacity-70 transition-opacity">
            ← Home
          </Link>
        </div>

        <div style={{ height: '3rem' }} />

        <h1 className="text-4xl font-semibold mb-8">Thoughts</h1>

        {posts.length === 0 ? (
          <p className="text-[#5A5A5A] text-sm">No posts yet. Coming soon.</p>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                target="_blank"
                className="flex justify-between items-baseline gap-4 hover:opacity-70 transition-opacity no-underline"
              >
                <span className="text-sm font-normal">{post.title}</span>
                <span className="text-sm text-[#5A5A5A] whitespace-nowrap">
                  Last updated {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}