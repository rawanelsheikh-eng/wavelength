import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const PlayerContext = createContext(null)

const TICK_MS = 200

export function PlayerProvider({ children }) {
  const [track, setTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => clearTimer, [])

  const startTimer = useCallback((duration) => {
    clearTimer()
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + TICK_MS / 1000
        if (next >= duration) {
          clearTimer()
          setIsPlaying(false)
          return 0
        }
        return next
      })
    }, TICK_MS)
  }, [])

  const play = useCallback(
    (nextTrack) => {
      setTrack((current) => {
        if (current?.id === nextTrack.id) {
          setIsPlaying(true)
          startTimer(nextTrack.duration)
          return current
        }
        setElapsed(0)
        setIsPlaying(true)
        startTimer(nextTrack.duration)
        return nextTrack
      })
    },
    [startTimer],
  )

  const pause = useCallback(() => {
    clearTimer()
    setIsPlaying(false)
  }, [])

  const stop = useCallback(() => {
    clearTimer()
    setIsPlaying(false)
    setElapsed(0)
    setTrack(null)
  }, [])

  const toggle = useCallback(
    (nextTrack) => {
      if (track?.id === nextTrack.id && isPlaying) {
        pause()
      } else {
        play(nextTrack)
      }
    },
    [track, isPlaying, play, pause],
  )

  return (
    <PlayerContext.Provider value={{ track, isPlaying, elapsed, play, pause, stop, toggle }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
