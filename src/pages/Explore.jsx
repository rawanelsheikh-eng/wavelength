import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Search } from 'lucide-react'
import Avatar from '../components/Avatar'
import FollowButton from '../components/FollowButton'
import { usePlayer } from '../context/PlayerContext'
import { currentUser, tracks, users } from '../data/mockData'
import { formatCount, formatDuration } from '../lib/format'

const allTracks = Object.values(tracks)

export default function Explore() {
  const [query, setQuery] = useState('')
  const { track: playingTrack, isPlaying, toggle } = usePlayer()

  const q = query.trim().toLowerCase()

  const matchedTracks = useMemo(
    () =>
      q ? allTracks.filter((t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)) : allTracks,
    [q],
  )

  const matchedPeople = useMemo(
    () =>
      users
        .filter((u) => u.id !== currentUser.id)
        .filter((u) => !q || u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q)),
    [q],
  )

  return (
    <div className="mx-auto max-w-150">
      <div className="sticky top-0 z-10 border-b border-soft bg-app/90 px-4 py-4 backdrop-blur-sm sm:px-6">
        <h1 className="mb-3 hidden font-display text-2xl text-primary md:block">Explore</h1>
        <div className="flex items-center gap-2 rounded-full border border-default bg-surface px-4 py-2.5">
          <Search className="h-4.5 w-4.5 text-tertiary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tracks, artists, or people"
            className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-tertiary"
          />
        </div>
      </div>

      <section className="border-b border-soft px-4 py-5 sm:px-6">
        <h2 className="mb-3 font-display text-lg text-primary">{q ? 'Tracks' : 'Trending now'}</h2>
        {matchedTracks.length === 0 ? (
          <p className="text-sm text-tertiary">No tracks match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {matchedTracks.map((track) => {
              const isThis = playingTrack?.id === track.id
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => toggle(track)}
                  className="group text-left"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <img src={track.cover} alt="" className="h-full w-full object-cover" />
                    <span
                      className={`absolute inset-0 grid place-items-center bg-ink-950/40 transition-opacity ${
                        isThis && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Play className="h-6 w-6 fill-bone text-bone" />
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-sm font-medium text-primary">{track.title}</p>
                  <p className="truncate text-xs text-secondary">{track.artist}</p>
                </button>
              )
            })}
          </div>
        )}
      </section>

      <section className="px-4 py-5 sm:px-6">
        <h2 className="mb-3 font-display text-lg text-primary">{q ? 'People' : 'Selectors worth following'}</h2>
        {matchedPeople.length === 0 ? (
          <p className="text-sm text-tertiary">No one matches &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="space-y-4">
            {matchedPeople.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <Link to={`/profile/${user.id}`}>
                  <Avatar user={user} size="md" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${user.id}`} className="block truncate font-medium text-primary hover:underline">
                    {user.name}
                  </Link>
                  <p className="truncate text-sm text-tertiary">
                    @{user.handle} · {formatCount(user.followers)} followers
                  </p>
                </div>
                <FollowButton userId={user.id} size="sm" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
