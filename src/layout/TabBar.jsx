import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Bell, Compass, Home, Mail, User } from 'lucide-react'
import { useSocial } from '../context/SocialContext'
import { currentUser } from '../data/mockData'

const TAB_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/messages', label: 'Messages', icon: Mail },
  { to: `/profile/${currentUser.id}`, label: 'Profile', icon: User },
]

export default function TabBar() {
  const { notifications } = useSocial()
  const unread = notifications.some((n) => !n.read)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-soft bg-app pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      {TAB_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className="relative flex h-full flex-1 items-center justify-center" aria-label={label}>
          {({ isActive }) => (
            <>
              <Icon className={clsx('h-5.5 w-5.5', isActive ? 'text-brass-500' : 'text-tertiary')} strokeWidth={2} />
              {label === 'Notifications' && unread && (
                <span className="absolute right-[calc(50%-14px)] top-3 h-2 w-2 rounded-full bg-coral-500 ring-2 ring-(--bg)" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
