import Composer from '../components/Composer'
import PostCard from '../components/PostCard'
import RightRail from '../components/RightRail'
import { useSocial } from '../context/SocialContext'

export default function Feed() {
  const { posts } = useSocial()
  const sorted = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="mx-auto flex max-w-6xl">
      <div className="min-h-screen w-full max-w-150 border-x border-soft">
        <div className="sticky top-0 z-10 hidden border-b border-soft bg-app/90 px-6 py-4 backdrop-blur-sm md:block">
          <h1 className="font-display text-2xl text-primary">Home</h1>
        </div>
        <Composer />
        {sorted.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div className="px-6 py-10 text-center text-sm text-tertiary">You&apos;re caught up on everyone you follow.</div>
      </div>
      <RightRail />
    </div>
  )
}
