import clsx from 'clsx'
import NavRail from './NavRail'
import TabBar from './TabBar'
import MobileTopBar from './MobileTopBar'
import MiniPlayer from './MiniPlayer'
import { usePlayer } from '../context/PlayerContext'

export default function AppShell({ children }) {
  const { track } = usePlayer()

  return (
    <div className="min-h-screen bg-app">
      <NavRail />
      <MobileTopBar />
      <main className={clsx('md:pl-19', track ? 'pb-35 md:pb-19' : 'pb-16 md:pb-0')}>{children}</main>
      <MiniPlayer />
      <TabBar />
    </div>
  )
}
