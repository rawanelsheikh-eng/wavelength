import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import Avatar from './Avatar'
import Waveform from './Waveform'
import FollowButton from './FollowButton'
import { usePlayer } from '../context/PlayerContext'
import { trackById, userById } from '../data/mockData'
import { trending, suggestedToFollow } from '../data/mockData'
import { formatDuration } from '../lib/format'

export default function RightRail() {
  const { track: playingTrack, isPlaying, toggle } = usePlayer()

  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto px-5 py-6 xl:block">
      <section>
        <h2 className="font-display text-lg text-primary">On repeat</h2>
        <div className="mt-3 space-y-1">
          {trending.map((id) => {
            const track = trackById(id)
            const isThis = playingTrack?.id === track.id
            return (
              <button
                key={id}
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
                  <Waveform seed={track.id} bars={10} size="sm" playing={isPlaying} className="h-4 shrink-0" />
                ) : (
                  <span className="shrink-0 font-mono text-xs text-tertiary">{formatDuration(track.duration)}</span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg text-primary">Selectors to follow</h2>
        <div className="mt-3 space-y-3">
          {suggestedToFollow.map((id) => {
            const user = userById(id)
            return (
              <div key={id} className="flex items-center gap-3">
                <Link to={`/profile/${user.id}`}>
                  <Avatar user={user} size="sm" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${user.id}`} className="block truncate text-sm font-medium text-primary hover:underline">
                    {user.name}
                  </Link>
                  <p className="truncate text-xs text-tertiary">@{user.handle}</p>
                </div>
                <FollowButton userId={user.id} size="sm" />
              </div>
            )
          })}
        </div>
      </section>

      <p className="mt-8 px-2 text-xs text-tertiary">
        Wavelength is a portfolio demo — every post, track, and message is fictional.
      </p>
    </aside>
  )
}
