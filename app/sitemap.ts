import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/speaking', '/blog'].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }))
  const posts = getAllPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date ? new Date(p.date) : new Date() }))
  return [...pages, ...posts]
}
