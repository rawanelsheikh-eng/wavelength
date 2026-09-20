import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import Avatar from '../components/Avatar'
import Logo from '../components/Logo'
import Waveform from '../components/Waveform'
import { useTheme } from '../context/ThemeContext'
import { postById, tracks, userById } from '../data/mockData'
import { formatDuration } from '../lib/format'

const heroTrack = tracks.t9
const heroPoster = userById('u5')

const MOMENTS = [
  { postId: 'p1', label: 'A track, with the story behind it' },
  { postId: 'p4', label: 'One field recording, built into a song' },
  { postId: 'p5', label: 'Six years of asking, eight bars to show for it' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Landing() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-app">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-brass-500">
          <Logo className="h-6 w-6" />
          <span className="font-display text-xl text-primary">Wavelength</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full text-secondary hover:bg-surface"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <Link
            to="/home"
            className="rounded-full bg-brass-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-brass-400"
          >
            Enter Wavelength
          </Link>
        </div>
      </header>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-16"
      >
        <div>
          <motion.h1 variants={item} className="max-w-lg font-display text-5xl leading-[1.05] text-primary sm:text-6xl">
            The feed for what&rsquo;s actually playing.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-secondary">
            Post the track stuck in your head, the demo you just finished, the record you found in a crate.
            Wavelength is where people talk about music by sharing it, not just typing about it.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <Link
              to="/home"
              className="rounded-full bg-brass-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-brass-400"
            >
              Enter Wavelength
            </Link>
            <span className="text-sm text-tertiary">No account needed — this is a demo.</span>
          </motion.div>
        </div>

        <motion.div variants={item} className="justify-self-center lg:justify-self-end">
          <div className="w-full max-w-sm rounded-3xl border border-default bg-surface p-5 shadow-[0_24px_60px_var(--shadow-color)]">
            <div className="flex items-center gap-2 text-xs text-tertiary">
              <Avatar user={heroPoster} size="xs" />
              {heroPoster.name} is playing
            </div>
            <img src={heroTrack.cover} alt="" className="mt-4 aspect-square w-full rounded-2xl object-cover" />
            <p className="mt-4 font-display text-xl text-primary">{heroTrack.title}</p>
            <p className="text-sm text-secondary">{heroTrack.artist}</p>
            <div className="mt-4 flex items-center gap-3">
              <Waveform seed={heroTrack.id} bars={40} size="lg" progress={0.42} playing className="flex-1" />
            </div>
            <div className="mt-1 flex justify-between font-mono text-xs text-tertiary">
              <span>1:32</span>
              <span>{formatDuration(heroTrack.duration)}</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <section className="border-t border-soft bg-surface/40 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-md font-display text-3xl text-primary">Every post is a real one.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {MOMENTS.map(({ postId, label }) => {
              const post = postById(postId)
              const author = userById(post.authorId)
              return (
                <div key={postId} className="rounded-2xl border border-default bg-surface p-5">
                  <div className="flex items-center gap-2.5">
                    <Avatar user={author} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-primary">{author.name}</p>
                      <p className="truncate text-xs text-tertiary">@{author.handle}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-primary">{post.text}</p>
                  <p className="mt-4 border-t border-soft pt-3 text-xs text-tertiary">{label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="mx-auto max-w-lg font-display text-3xl text-primary">
          Your next favorite track is one post away.
        </h2>
        <Link
          to="/home"
          className="mt-7 inline-block rounded-full bg-brass-500 px-7 py-3 text-sm font-semibold text-ink-950 hover:bg-brass-400"
        >
          Enter Wavelength
        </Link>
      </section>
    </div>
  )
}
