import Link from 'next/link'
import { getAllBooks } from '@/lib/books'

export default function BooksPage() {
  const books = getAllBooks()

  return (
    <main className="min-h-screen" style={{ padding: '5%' }}>
      <div style={{ maxWidth: '65ch' }}>
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
          <div className="space-y-6">
            {books.map((book) => (
              <div key={book.slug} className="flex justify-between items-start gap-4">
                <div>
                  {book.amazonUrl ? (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:opacity-70 transition-opacity no-underline"
                    >
                      {book.title}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold">{book.title}</span>
                  )}
                  <span className="text-sm text-[#5A5A5A]"> — {book.author}</span>
                  {book.note && (
                    <p className="text-sm text-[#5A5A5A] mt-1" style={{ margin: '0.25rem 0 0 0' }}>{book.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
