import GridHome from '@/components/home-grid'
import { getAllPostMeta } from '@/lib/posts'

export default function Home() {
  return <GridHome posts={getAllPostMeta()} />
}
