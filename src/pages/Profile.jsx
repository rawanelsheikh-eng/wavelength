import { useParams, Navigate, Link } from 'react-router-dom'
import { MapPin, Play } from 'lucide-react'
import Avatar from '../components/Avatar'
import FollowButton from '../components/FollowButton'
import PostCard from '../components/PostCard'
import Waveform from '../components/Waveform'
import { useSocial } from '../context/SocialContext'
import { usePlayer } from '../context/PlayerContext'
import { currentUser, trackById, userById } from '../data/mockData'
import { formatCount, formatDuration } from '../lib/format'

export default function Profile() {
  const { id } = useParams()
  const { posts } = useSocial()
  const { track: playingTrack, isPlaying, toggle } = usePlayer()
  const user = userById(id)

  if (!user) return <Navigate to="/home" replace />

  const isMe = user.id === currentUser.id
  const userPosts = posts
    .filter((p) => p.authorId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="mx-auto max-w-150 border-x border-soft">
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-soft bg-app/90 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div>
          <h1 className="font-display text-xl text-primary">{user.name}</h1>
          <p className="text-xs text-tertiary">
            {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-start justify-between">
          <Avatar user={user} size="xl" />
          {isMe ? (
            <button type="button" className="rounded-full border border-default px-4 py-2 text-sm font-semibold text-primary hover:bg-surface">
              Edit profile
            </button>
          ) : (
            <FollowButton userId={user.id} />
          )}
        </div>

        <h2 className="mt-4 font-display text-2xl text-primary">{user.name}</h2>
        <p className="text-sm text-tertiary">@{user.handle}</p>
        <p className="mt-3 leading-relaxed text-primary">{user.bio}</p>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-tertiary">
          <MapPin className="h-4 w-4" />
          {user.location}
        </div>

        <div className="mt-4 flex gap-5 text-sm">
          <span className="text-primary">
            <span className="font-semibold">{formatCount(user.following)}</span>{' '}
            <span className="text-tertiary">Following</span>
          </span>
          <span className="text-primary">
            <span className="font-semibold">{formatCount(user.followers)}</span>{' '}
            <span className="text-tertiary">Followers</span>
          </span>
        </div>

        {user.topTracks?.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 font-display text-lg text-primary">Top tracks this month</h3>
            <div className="space-y-1">
              {user.topTracks.map((trackId) => {
                const track = trackById(trackId)
                const isThis = playingTrack?.id === track.id
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => toggle(track)}
                    className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-surface"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                      <img src={track.cover} alt="" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 grid place-items-center bg-ink-950/40 opacity-0 group-hover:opacity-100">
                        <Play className="h-4 w-4 fill-bone text-bone" />
                      </span>
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-primary">{track.title}</span>
                      <span className="block truncate text-xs text-secondary">{track.artist}</span>
                    </span>
                    {isThis ? (
                      <Waveform seed={track.id} bars={12} size="sm" playing={isPlaying} className="h-4 shrink-0" />
                    ) : (
                      <span className="shrink-0 font-mono text-xs text-tertiary">{formatDuration(track.duration)}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-soft">
        {userPosts.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-tertiary">
            {isMe ? "You haven't posted yet." : `${user.name} hasn't posted yet.`}
          </p>
        ) : (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
