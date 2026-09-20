import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, MessageCircle, Pause, Play, Repeat2 } from 'lucide-react'
import clsx from 'clsx'
import Avatar from './Avatar'
import Waveform from './Waveform'
import { useSocial } from '../context/SocialContext'
import { usePlayer } from '../context/PlayerContext'
import { trackById, userById } from '../data/mockData'
import { formatCount, formatDuration, formatRelativeTime } from '../lib/format'

function TrackCard({ track }) {
  const { track: playingTrack, isPlaying, elapsed, toggle } = usePlayer()
  const isThisTrack = playingTrack?.id === track.id
  const progress = isThisTrack ? elapsed / track.duration : 0

  return (
    <div className="mt-3 flex items-center gap-4 rounded-2xl border border-default bg-surface p-3">
      <button
        type="button"
        onClick={() => toggle(track)}
        className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
        aria-label={isThisTrack && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
      >
        <img src={track.cover} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-ink-950/40 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {isThisTrack && isPlaying ? (
            <Pause className="h-6 w-6 fill-bone text-bone" />
          ) : (
            <Play className="h-6 w-6 fill-bone text-bone" />
          )}
        </span>
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-primary">{track.title}</p>
        <p className="truncate text-sm text-secondary">{track.artist}</p>
        <div className="mt-2 flex items-center gap-2">
          <Waveform seed={track.id} bars={34} size="sm" progress={progress} playing={isThisTrack && isPlaying} className="flex-1" />
          <span className="shrink-0 font-mono text-xs text-tertiary">
            {isThisTrack ? formatDuration(elapsed) : formatDuration(track.duration)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function PostCard({ post }) {
  const { toggleLike, toggleRepost, addComment } = useSocial()
  const [showComments, setShowComments] = useState(false)
  const [draft, setDraft] = useState('')
  const [justLiked, setJustLiked] = useState(false)

  const author = userById(post.authorId)
  const track = post.trackId ? trackById(post.trackId) : null

  const handleLike = () => {
    if (!post.likedByMe) {
      setJustLiked(true)
      setTimeout(() => setJustLiked(false), 400)
    }
    toggleLike(post.id)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    addComment(post.id, text)
    setDraft('')
  }

  return (
    <article className="border-b border-soft px-4 py-4 sm:px-6">
      <div className="flex gap-3">
        <Link to={`/profile/${author.id}`}>
          <Avatar user={author} size="md" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-1.5 text-[15px]">
            <Link to={`/profile/${author.id}`} className="font-semibold text-primary hover:underline">
              {author.name}
            </Link>
            <span className="text-tertiary">@{author.handle}</span>
            <span className="text-tertiary">·</span>
            <span className="text-tertiary">{formatRelativeTime(post.createdAt)}</span>
          </div>

          {post.text && <p className="mt-1 whitespace-pre-line leading-relaxed text-primary">{post.text}</p>}

          {track && <TrackCard track={track} />}

          {post.photo && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-default">
              <img src={post.photo} alt="" className="max-h-[420px] w-full object-cover" />
            </div>
          )}

          <div className="mt-3 flex max-w-sm items-center justify-between">
            <button
              type="button"
              onClick={() => setShowComments((v) => !v)}
              className={clsx(
                'group flex items-center gap-1.5 text-sm transition-colors',
                showComments ? 'text-brass-500' : 'text-tertiary hover:text-brass-500',
              )}
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              <span>{formatCount(post.comments.length)}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleRepost(post.id)}
              className={clsx(
                'flex items-center gap-1.5 text-sm transition-colors',
                post.repostedByMe ? 'text-emerald-500' : 'text-tertiary hover:text-emerald-500',
              )}
            >
              <Repeat2 className="h-[19px] w-[19px]" />
              <span>{formatCount(post.reposts)}</span>
            </button>

            <button
              type="button"
              onClick={handleLike}
              className={clsx(
                'relative flex items-center gap-1.5 text-sm transition-colors',
                post.likedByMe ? 'text-coral-500' : 'text-tertiary hover:text-coral-500',
              )}
            >
              <motion.span animate={justLiked ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.35 }}>
                <Heart className="h-[18px] w-[18px]" fill={post.likedByMe ? 'currentColor' : 'none'} />
              </motion.span>
              <span>{formatCount(post.likes)}</span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 border-t border-soft pt-3">
                  {post.comments.map((c) => {
                    const commenter = userById(c.authorId)
                    return (
                      <div key={c.id} className="flex gap-2.5">
                        <Avatar user={commenter} size="xs" />
                        <div className="min-w-0">
                          <p className="text-sm leading-snug">
                            <span className="font-semibold text-primary">{commenter.name}</span>{' '}
                            <span className="text-primary">{c.text}</span>
                          </p>
                          <p className="mt-0.5 text-xs text-tertiary">{formatRelativeTime(c.createdAt)}</p>
                        </div>
                      </div>
                    )
                  })}
                  <form onSubmit={handleSubmitComment} className="flex items-center gap-2 pt-1">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Add a comment"
                      className="flex-1 rounded-full border border-default bg-surface px-3.5 py-1.5 text-sm text-primary outline-none placeholder:text-tertiary focus:border-brass-500"
                    />
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      className="text-sm font-semibold text-brass-500 disabled:opacity-30"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}
