import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  readMins: number
  excerpt: string
}

export type PostMeta = Omit<Post, 'content'>

function derive(content: string) {
  const words = content.trim().split(/\s+/).length
  const first = content.trim().split(/\n\s*\n/)[0].replace(/[*_#>`]/g, '')
  return { readMins: Math.max(1, Math.round(words / 230)), excerpt: first.length > 180 ? first.slice(0, 177).trimEnd() + '...' : first }
}

export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _c, ...m }) => m)
}

export function getAllPosts(): Post[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        content,
        ...derive(content),
      }
    })

  // Sort by date, newest first
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      content,
      ...derive(content),
    }
  } catch {
    return null
  }
}