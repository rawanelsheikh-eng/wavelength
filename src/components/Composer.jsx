import { useRef, useState } from 'react'
import clsx from 'clsx'
import { ImagePlus, Music2, X } from 'lucide-react'
import Avatar from './Avatar'
import Waveform from './Waveform'
import { useSocial } from '../context/SocialContext'
import { currentUser, tracks } from '../data/mockData'
import { formatDuration } from '../lib/format'

const PHOTO_OPTIONS = ['compose-alpha', 'compose-bravo', 'compose-charlie', 'compose-delta'].map((seed) => ({
  seed,
  url: `https://picsum.photos/seed/${seed}/400/400`,
}))

const trackList = Object.values(tracks)

export default function Composer() {
  const { addPost } = useSocial()
  const [text, setText] = useState('')
  const [attachMode, setAttachMode] = useState(null) // null | 'track' | 'photo'
  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef(null)

  const canPost = text.trim().length > 0 || selectedTrackId || selectedPhoto

  const reset = () => {
    setText('')
    setAttachMode(null)
    setSelectedTrackId(null)
    setSelectedPhoto(null)
    setFocused(false)
  }

  const handlePost = () => {
    if (!canPost) return
    const post = {
      id: `p-${Date.now()}`,
      authorId: currentUser.id,
      type: selectedTrackId ? 'track' : selectedPhoto ? 'photo' : 'text',
      text: text.trim(),
      trackId: selectedTrackId || undefined,
      photo: selectedPhoto || undefined,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      reposts: 0,
      likedByMe: false,
      repostedByMe: false,
    }
    addPost(post)
    reset()
  }

  const toggleAttach = (mode) => {
    setAttachMode((current) => (current === mode ? null : mode))
    if (mode === 'photo') setSelectedTrackId(null)
    if (mode === 'track') setSelectedPhoto(null)
  }

  return (
    <div className="border-b border-soft px-4 py-4 sm:px-6">
      <div className="flex gap-3">
        <Avatar user={currentUser} size="md" />
        <div className="min-w-0 flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Share a track, a thought, or a moment"
            rows={focused || text ? 3 : 1}
            className="w-full resize-none bg-transparent text-[17px] leading-snug text-primary outline-none placeholder:text-tertiary"
          />

          {attachMode === 'track' && (
            <div className="mb-3 max-h-56 space-y-1 overflow-y-auto rounded-2xl border border-default bg-surface p-2">
              {trackList.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTrackId(t.id)}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors',
                    selectedTrackId === t.id ? 'bg-brass-500/15' : 'hover:bg-surface-raised',
                  )}
                >
                  <img src={t.cover} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-primary">{t.title}</span>
                    <span className="block truncate text-xs text-secondary">{t.artist}</span>
                  </span>
                  <span className="font-mono text-xs text-tertiary">{formatDuration(t.duration)}</span>
                </button>
              ))}
            </div>
          )}

          {selectedTrackId && attachMode !== 'track' && (
            <AttachedTrackPreview trackId={selectedTrackId} onRemove={() => setSelectedTrackId(null)} />
          )}

          {attachMode === 'photo' && (
            <div className="mb-3 grid grid-cols-4 gap-2">
              {PHOTO_OPTIONS.map((p) => (
                <button
                  key={p.seed}
                  type="button"
                  onClick={() => setSelectedPhoto(p.url)}
                  className={clsx(
                    'aspect-square overflow-hidden rounded-xl ring-2 transition-all',
                    selectedPhoto === p.url ? 'ring-brass-500' : 'ring-transparent hover:ring-(--border)',
                  )}
                >
                  <img src={p.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {(focused || text || selectedTrackId || selectedPhoto) && (
            <div className="flex items-center justify-between border-t border-soft pt-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleAttach('track')}
                  className={clsx(
                    'rounded-full p-2 transition-colors',
                    attachMode === 'track' ? 'bg-brass-500/15 text-brass-500' : 'text-secondary hover:bg-surface hover:text-brass-500',
                  )}
                  aria-label="Attach a track"
                >
                  <Music2 className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleAttach('photo')}
                  className={clsx(
                    'rounded-full p-2 transition-colors',
                    attachMode === 'photo' ? 'bg-brass-500/15 text-brass-500' : 'text-secondary hover:bg-surface hover:text-brass-500',
                  )}
                  aria-label="Attach a photo"
                >
                  <ImagePlus className="h-5 w-5" />
                </button>
              </div>
              <button
                type="button"
                onClick={handlePost}
                disabled={!canPost}
                className="rounded-full bg-brass-500 px-5 py-1.5 text-sm font-semibold text-ink-950 transition-opacity hover:bg-brass-400 disabled:opacity-30"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AttachedTrackPreview({ trackId, onRemove }) {
  const track = trackList.find((t) => t.id === trackId)
  if (!track) return null
  return (
    <div className="relative mb-3 flex items-center gap-3 rounded-2xl border border-default bg-surface p-3">
      <img src={track.cover} alt="" className="h-12 w-12 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-primary">{track.title}</p>
        <Waveform seed={track.id} bars={20} size="sm" className="mt-1" />
      </div>
      <button type="button" onClick={onRemove} className="rounded-full p-1 text-tertiary hover:bg-surface-raised" aria-label="Remove track">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
