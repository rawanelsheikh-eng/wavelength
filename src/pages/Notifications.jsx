import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Heart, MessageCircle, Repeat2, UserPlus } from 'lucide-react'
import Avatar from '../components/Avatar'
import { useSocial } from '../context/SocialContext'
import { postById, userById } from '../data/mockData'
import { formatRelativeTime } from '../lib/format'

const ICONS = {
  like: { Icon: Heart, className: 'text-coral-500', fill: true },
  comment: { Icon: MessageCircle, className: 'text-brass-500', fill: false },
  repost: { Icon: Repeat2, className: 'text-emerald-500', fill: false },
  follow: { Icon: UserPlus, className: 'text-brass-500', fill: false },
}

const COPY = {
  like: 'liked your track',
  comment: 'commented on your post',
  repost: 'reposted your track',
  follow: 'started following you',
}

export default function Notifications() {
  const { notifications, markAllRead } = useSocial()
  const sorted = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const hasUnread = notifications.some((n) => !n.read)

  return (
    <div className="mx-auto max-w-150 border-x border-soft">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-soft bg-app/90 px-4 py-4 backdrop-blur-sm sm:px-6">
        <h1 className="font-display text-2xl text-primary">Notifications</h1>
        {hasUnread && (
          <button type="button" onClick={markAllRead} className="text-sm font-medium text-brass-500 hover:underline">
            Mark all read
          </button>
        )}
      </div>

      {sorted.map((n) => {
        const actor = userById(n.actorId)
        const { Icon, className, fill } = ICONS[n.type]
        const post = n.postId ? postById(n.postId) : null
        const target = post ? `/profile/${post.authorId}` : `/profile/${actor.id}`

        return (
          <Link
            key={n.id}
            to={target}
            className={clsx('flex gap-3 border-b border-soft px-4 py-4 transition-colors hover:bg-surface sm:px-6', !n.read && 'bg-brass-500/5')}
          >
            <Icon className={clsx('mt-0.5 h-5 w-5 shrink-0', className)} fill={fill ? 'currentColor' : 'none'} />
            <Avatar user={actor} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-primary">
                <span className="font-semibold">{actor.name}</span> {COPY[n.type]}
                {post?.text ? <span className="text-tertiary"> — &ldquo;{post.text.slice(0, 40)}{post.text.length > 40 ? '…' : ''}&rdquo;</span> : null}
              </p>
              <p className="mt-0.5 text-xs text-tertiary">{formatRelativeTime(n.createdAt)}</p>
            </div>
            {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brass-500" />}
          </Link>
        )
      })}
    </div>
  )
}
