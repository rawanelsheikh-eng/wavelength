import { useMemo } from 'react'
import clsx from 'clsx'

function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return h
}

function mulberry32(seed) {
  let a = seed
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SIZES = {
  sm: { height: 16, width: 2, gap: 2 },
  md: { height: 26, width: 3, gap: 2.5 },
  lg: { height: 54, width: 4, gap: 3.5 },
}

/**
 * A deterministic waveform, seeded per track so the same track always draws the
 * same shape. `progress` (0-1) colors the "played" portion; `playing` pulses
 * every bar via a negative-delayed shared keyframe so bars desync instantly.
 */
export default function Waveform({ seed, bars = 28, progress = 0, playing = false, size = 'md', className }) {
  const dims = SIZES[size]

  const heights = useMemo(() => {
    const rand = mulberry32(hashSeed(seed))
    return Array.from({ length: bars }, () => 0.22 + rand() * 0.78)
  }, [seed, bars])

  const delays = useMemo(() => {
    const rand = mulberry32(hashSeed(`${seed}-d`))
    return Array.from({ length: bars }, () => -1 * rand() * 1.1)
  }, [seed, bars])

  const activeCount = Math.round(progress * bars)

  return (
    <div
      className={clsx('flex items-end', className)}
      style={{ height: dims.height, gap: dims.gap }}
      role="img"
      aria-label="Waveform"
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={clsx(
            'origin-bottom rounded-full transition-colors duration-300',
            i < activeCount ? 'bg-brass-500' : 'bg-ink-600',
          )}
          style={{
            width: dims.width,
            height: `${h * 100}%`,
            animation: playing ? 'bar 1.1s ease-in-out infinite' : 'none',
            animationDelay: playing ? `${delays[i]}s` : undefined,
          }}
        />
      ))}
    </div>
  )
}
