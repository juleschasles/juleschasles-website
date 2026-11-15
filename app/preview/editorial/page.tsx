import EditorialHome from '@/components/home-editorial'
import { getAllPostMeta } from '@/lib/posts'

export const metadata = { title: 'Preview: editorial', robots: { index: false } }

export default function Preview() {
  return <EditorialHome posts={getAllPostMeta()} />
}
