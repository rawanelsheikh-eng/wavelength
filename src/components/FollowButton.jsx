import { useState } from 'react'
import clsx from 'clsx'
import { useSocial } from '../context/SocialContext'

export default function FollowButton({ userId, size = 'md' }) {
  const { isFollowing, toggleFollow } = useSocial()
  const [hover, setHover] = useState(false)
  const following = isFollowing(userId)

  const padding = size === 'sm' ? 'px-3.5 py-1.5 text-sm' : 'px-4.5 py-2 text-sm'

  return (
    <button
      type="button"
      onClick={() => toggleFollow(userId)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={clsx(
        'rounded-full font-semibold transition-colors duration-150',
        padding,
        following
          ? hover
            ? 'border border-coral-500/50 bg-coral-500/10 text-coral-500'
            : 'border border-default text-primary'
          : 'bg-brass-500 text-ink-950 hover:bg-brass-400',
      )}
    >
      {following ? (hover ? 'Unfollow' : 'Following') : 'Follow'}
    </button>
  )
}
