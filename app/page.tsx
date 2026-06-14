import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getAllBooks } from '@/lib/books'

export default function Home() {
  const posts = getAllPosts().slice(0, 10)
  const books = getAllBooks().slice(0, 10)

  return (
    <main className="home-main">
      <div className="home-grid">

        {/* Left Column - Bio */}
        <div className="home-left">
          <h1 className="text-4xl font-semibold mb-3">
            Jules Chasles
          </h1>

          <p className="text-sm mb-8 text-[#5A5A5A]">
            Co-founder and COO at <a href="https://www.wusoolcapital.com" target="_blank" rel="noopener noreferrer" className="link-bold">Wusool Capital</a> — M&A advisory for UAE business owners, supporting them navigate their most important transaction.
          </p>
          <p className="text-sm mb-8 text-[#5A5A5A]">
            Co-founder and Partner at <a href="https://www.dopaminecap.com" target="_blank" rel="noopener noreferrer" className="link-bold">Dopamine</a> — investing in consumer companies in the GCC.
          </p>

          <div className="space-y-4 mb-10 text-sm leading-relaxed">
            <p>
              I am Co-founder and COO of Wusool Capital, an M&A advisory firm for business owners in the UAE and GCC. We run full sell-side processes for founders looking to exit businesses valued between $1M and $20M — from preparing for market through buyer outreach, negotiation, and closing. No retainer. We earn when the deal closes.            
            </p>
            <p>
              My background spans 100+ transactions across the GCC and Africa, including time at Global Ventures advising portfolio founders on M&A and fundraising. I advise on deal preparation, valuation positioning, buyer selection, and negotiation strategy.
            </p>
            <p>
              I studied at HEC Paris (MBA), Bocconi University (MSc), and Warwick Business School (BSc). I'm based in Dubai, UAE.
            </p>
          </div>

          <div className="link-nav-container text-sm">
            <a
              href="https://www.linkedin.com/in/jules-chasles/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-nav"
            >
              <span className="text-xs">↗</span>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="home-right">

          {/* Spacer to align with bio */}
          <div className="text-4xl font-semibold mb-3 invisible" aria-hidden="true">&#8203;</div>

          {/* Thoughts Section */}
          <div className="right-section">
            <div className="flex items-baseline justify-between mb-64">
              <span className="section-heading">Thoughts</span>
              <Link href="/blog" className="text-xs text-[#5A5A5A] hover:text-[#2A2A2A] no-underline">
                Read all →
              </Link>
            </div>
            <div className="space-y-2">
              {posts.length === 0 ? (
                <p className="text-[#5A5A5A] text-sm">No posts yet.</p>
              ) : (
                posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex justify-between items-baseline gap-4 hover:opacity-70 transition-opacity no-underline"
                  >
                    <span className="text-sm font-normal">{post.title}</span>
                    <span className="text-xs text-[#5A5A5A] whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Books Section */}
          <div className="right-section" style={{ marginTop: '3rem' }}>
            <div className="flex items-baseline justify-between mb-64">
              <span className="section-heading">Book Recommendations</span>
              <Link href="/books" className="text-xs text-[#5A5A5A] hover:text-[#2A2A2A] no-underline">
                See all →
              </Link>
            </div>
            <div className="space-y-2">
              {books.length === 0 ? (
                <p className="text-[#5A5A5A] text-sm">No books yet.</p>
              ) : (
                books.map((book) => (
                  book.amazonUrl ? (
                    <a
                      key={book.slug}
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between items-baseline gap-4 hover:opacity-70 transition-opacity no-underline"
                    >
                      <span className="text-sm font-normal">{book.title}</span>
                      <span className="text-sm text-[#5A5A5A] whitespace-nowrap">{book.author}</span>
                    </a>
                  ) : (
                    <div key={book.slug} className="flex justify-between items-baseline gap-4">
                      <span className="text-sm font-normal">{book.title}</span>
                      <span className="text-sm text-[#5A5A5A] whitespace-nowrap">{book.author}</span>
                    </div>
                  )
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
