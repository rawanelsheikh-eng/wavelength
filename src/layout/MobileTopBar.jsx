import { Moon, Sun } from 'lucide-react'
import Logo from '../components/Logo'
import { useTheme } from '../context/ThemeContext'

export default function MobileTopBar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-soft bg-app/90 px-4 py-3 backdrop-blur-sm md:hidden">
      <div className="flex items-center gap-2 text-brass-500">
        <Logo className="h-5.5 w-5.5" />
        <span className="font-display text-lg text-primary">Wavelength</span>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="grid h-9 w-9 place-items-center rounded-full text-secondary hover:bg-surface"
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
      </button>
    </header>
  )
}
