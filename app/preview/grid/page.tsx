import GridHome from '@/components/home-grid'
import { getAllPostMeta } from '@/lib/posts'

export const metadata = { title: 'Preview: grid', robots: { index: false } }

export default function Preview() {
  return <GridHome posts={getAllPostMeta()} />
}
