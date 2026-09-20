import clsx from 'clsx'
import { Check } from 'lucide-react'

const SIZES = {
  xs: 'h-6 w-6',
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
}

const BADGE_SIZES = {
  xs: 'h-2.5 w-2.5',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-7 w-7',
}

export default function Avatar({ user, size = 'md', className, ring = false }) {
  if (!user) return null
  return (
    <div className={clsx('relative shrink-0', SIZES[size], className)}>
      <img
        src={user.avatar}
        alt={user.name}
        className={clsx('h-full w-full rounded-full object-cover', ring && 'ring-2 ring-(--surface)')}
      />
      {user.selector && (
        <span
          className={clsx(
            'absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full bg-brass-500 text-ink-950 ring-2 ring-(--surface)',
            BADGE_SIZES[size],
          )}
          title="Selector — a curator whose taste people follow"
        >
          <Check strokeWidth={3} className="h-[65%] w-[65%]" />
        </span>
      )}
    </div>
  )
}
