import Link from 'next/link'
import { getAllBooks } from '@/lib/books'

export default function BooksPage() {
  const books = getAllBooks()

  return (
    <main className="min-h-screen" style={{ padding: '5% 5% 5% 15%' }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <div className="text-sm mb-8 fixed-nav">
          <Link href="/" className="no-underline hover:opacity-70 transition-opacity">
            ← Home
          </Link>
        </div>

        <h1 className="text-4xl font-semibold mb-8">Books</h1>

        <p className="text-sm text-[#5A5A5A] mb-8 leading-relaxed">
          Books that have shaped how I think. Each one is worth your time.
        </p>

        {books.length === 0 ? (
          <p className="text-[#5A5A5A] text-sm">No books yet. Coming soon.</p>
        ) : (
          <div>
            <div className="flex items-baseline gap-4 mb-4" style={{ columnGap: '32px' }}>
              <span className="text-xs text-[#5A5A5A] tracking-wide" style={{ minWidth: '200px' }}>Title</span>
              <span className="text-xs text-[#5A5A5A] tracking-wide" style={{ minWidth: '150px' }}>Author</span>
              <span className="text-xs text-[#5A5A5A] tracking-wide">Why I recommend it</span>
            </div>
          <div className="space-y-0">
            {books.map((book) => (
              book.amazonUrl ? (
                <a
                  key={book.slug}
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline hover:opacity-70 transition-opacity no-underline w-full" style={{ gap: '32px' }}
                >
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ minWidth: '200px' }}>{book.title}</span>
                  <span className="text-sm text-[#5A5A5A] whitespace-nowrap" style={{ minWidth: '150px' }}>{book.author}</span>
                  {book.note && (
                    <span className="text-sm text-[#5A5A5A]">{book.note}</span>
                  )}
                </a>
              ) : (
                <div key={book.slug} className="flex items-baseline w-full" style={{ gap: '32px' }}>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ minWidth: '200px' }}>{book.title}</span>
                  <span className="text-sm text-[#5A5A5A] whitespace-nowrap" style={{ minWidth: '150px' }}>{book.author}</span>
                  {book.note && (
                    <span className="text-sm text-[#5A5A5A]">{book.note}</span>
                  )}
                </div>
              )
            ))}
          </div>
          </div>
        )}
      </div>
    </main>
  )
}
