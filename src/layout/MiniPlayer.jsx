import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, X } from 'lucide-react'
import Waveform from '../components/Waveform'
import { usePlayer } from '../context/PlayerContext'
import { formatDuration } from '../lib/format'

export default function MiniPlayer() {
  const { track, isPlaying, elapsed, toggle, stop } = usePlayer()

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-16 z-30 border-t border-soft bg-surface-raised shadow-[0_-8px_24px_var(--shadow-color)] md:bottom-0 md:left-19"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6">
            <img src={track.cover} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-primary">{track.title}</p>
              <p className="truncate text-xs text-secondary">{track.artist}</p>
            </div>
            <Waveform
              seed={track.id}
              bars={22}
              size="sm"
              progress={elapsed / track.duration}
              playing={isPlaying}
              className="hidden flex-1 sm:flex"
            />
            <span className="hidden shrink-0 font-mono text-xs text-tertiary sm:inline">
              {formatDuration(elapsed)} / {formatDuration(track.duration)}
            </span>
            <button
              type="button"
              onClick={() => toggle(track)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brass-500 text-ink-950 hover:bg-brass-400"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-4.5 w-4.5" fill="currentColor" /> : <Play className="h-4.5 w-4.5" fill="currentColor" />}
            </button>
            <button
              type="button"
              onClick={stop}
              className="hidden h-9 w-9 shrink-0 place-items-center rounded-full text-tertiary hover:bg-surface hover:text-primary sm:grid"
              aria-label="Dismiss player"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
