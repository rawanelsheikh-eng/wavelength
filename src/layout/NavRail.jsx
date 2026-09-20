import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Bell, Compass, Home, Mail, Moon, Sun, User } from 'lucide-react'
import Avatar from '../components/Avatar'
import Logo from '../components/Logo'
import { useTheme } from '../context/ThemeContext'
import { useSocial } from '../context/SocialContext'
import { currentUser } from '../data/mockData'

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/messages', label: 'Messages', icon: Mail },
]

export default function NavRail() {
  const { theme, toggleTheme } = useTheme()
  const { notifications } = useSocial()
  const unread = notifications.some((n) => !n.read)

  return (
    <nav className="fixed inset-y-0 left-0 z-30 hidden w-19 flex-col items-center border-r border-soft bg-app py-5 md:flex">
      <NavLink to="/home" className="mb-6 grid h-11 w-11 place-items-center rounded-xl text-brass-500 hover:bg-surface" aria-label="Wavelength home">
        <Logo className="h-6 w-6" />
      </NavLink>

      <ul className="flex flex-1 flex-col items-center gap-1.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to} className="relative">
            <NavLink
              to={to}
              title={label}
              className={({ isActive }) =>
                clsx(
                  'grid h-12 w-12 place-items-center rounded-2xl transition-colors',
                  isActive ? 'bg-brass-500 text-ink-950' : 'text-secondary hover:bg-surface hover:text-primary',
                )
              }
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              <span className="sr-only">{label}</span>
            </NavLink>
            {label === 'Notifications' && unread && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral-500 ring-2 ring-(--bg)" />
            )}
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="grid h-10 w-10 place-items-center rounded-full text-secondary hover:bg-surface hover:text-primary"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>
        <NavLink to={`/profile/${currentUser.id}`} title="Your profile" aria-label="Your profile">
          {({ isActive }) => (
            <Avatar user={currentUser} size="sm" className={clsx('rounded-full ring-2', isActive ? 'ring-brass-500' : 'ring-transparent')} />
          )}
        </NavLink>
      </div>
    </nav>
  )
}

export function ProfileNavIcon() {
  return <User className="h-5 w-5" />
}
