import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts().slice(0, 20)

  return (
    <main className="home-main" style={{ 
      height: '100vh',
      padding: '5% 5% 0 5%',
      overflow: 'hidden'
    }}>

      <div className="home-grid">
        {/* Left Column - Bio */}
        <div className="home-left">
          <h1 className="text-4xl font-semibold mb-3">
            Jules Chasles
          </h1>
          
          <p className="text-sm mb-8 text-[#5A5A5A]">
            Partner at <a href="https://www.dopaminecap.com" target="_blank" rel="noopener noreferrer" className="link-bold">Dopamine</a> — advising founders through hard problems
          </p>

          <div className="space-y-4 mb-10 text-sm leading-relaxed">
            <p>
              I am a Partner at Dopamine, a strategic capital advisory firm for emerging companies. We help founders raise the right capital, from the right investors, on the right terms. We guide them through their transactions. We help them understand fundraising dynamics, build their narrative, avoid irreversible mistakes, and structure deals properly (governance, legal, cap table), while making introductions to relevant investors.
            </p>
            
            <p>
              Before starting Dopamine, I was a Principal at Global Ventures, where I led value creation and the investment process: supporting founders on fundraising, governance, strategy, and scaling across the Middle East and Africa. Earlier, I invested in African tech startups at Outlierz Ventures in Morocco and worked in private equity at AfricInvest Group in Tunisia and Côte d'Ivoire, building expertise in due diligence, business modeling, and financial valuation.
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
            <a 
              href="https://www.dopaminecap.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-nav"
            >
              <span className="text-xs">↗</span>
              Book a Session
            </a>
          </div>
        </div>

        {/* Right Column - Blog Posts */}
        <div className="home-right">
          {/* Spacer to align "Thoughts" with the tagline text below the name */}
          <div className="text-4xl font-semibold mb-3 invisible" aria-hidden="true">&#8203;</div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold" style={{ margin: 0 }}>Thoughts</h2>
            <Link 
              href="/blog"
              className="text-xs text-[#5A5A5A] hover:text-[#2A2A2A] no-underline"
            >
              Read all →
            </Link>
          </div>

          <div className="space-y-2" style={{ marginTop: '1.5rem' }}>
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
                  <span className="text-sm text-[#5A5A5A] whitespace-nowrap">
                    Last updated {new Date(post.date).toLocaleDateString('en-US', {
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
      </div>
    </main>
  )
}