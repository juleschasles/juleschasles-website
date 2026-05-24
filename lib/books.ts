import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const booksDirectory = path.join(process.cwd(), 'content/books')

export interface Book {
  slug: string
  title: string
  author: string
  date: string
  note: string
}

export function getAllBooks(): Book[] {
  if (!fs.existsSync(booksDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(booksDirectory)
  const books = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(booksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        author: data.author || '',
        date: data.date || '',
        note: data.note || '',
      }
    })

  return books.sort((a, b) => (a.date > b.date ? -1 : 1))
}
