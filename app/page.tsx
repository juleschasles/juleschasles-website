import GridHome from '@/components/home-grid'
import { getAllPostMeta } from '@/lib/posts'

// Default direction until one is chosen. Alternatives live under /preview/*.
export default function Home() {
  return <GridHome posts={getAllPostMeta()} />
}
