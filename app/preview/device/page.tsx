import DeviceHome from '@/components/home-device'
import { getAllPostMeta } from '@/lib/posts'

export const metadata = { title: 'Preview: device', robots: { index: false } }

export default function Preview() {
  return <DeviceHome posts={getAllPostMeta()} />
}
