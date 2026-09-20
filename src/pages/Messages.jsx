import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, Send } from 'lucide-react'
import Avatar from '../components/Avatar'
import { useSocial } from '../context/SocialContext'
import { currentUser, userById } from '../data/mockData'
import { formatRelativeTime } from '../lib/format'

export default function Messages() {
  const { conversations, sendMessage } = useSocial()
  const [activeId, setActiveId] = useState(null)
  const [openedIds, setOpenedIds] = useState(() => new Set())
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  const active = conversations.find((c) => c.id === activeId) || null

  const sorted = useMemo(
    () =>
      [...conversations].sort(
        (a, b) => new Date(b.messages.at(-1).at) - new Date(a.messages.at(-1).at),
      ),
    [conversations],
  )

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [active?.messages.length, activeId])

  const openConversation = (id) => {
    setActiveId(id)
    setOpenedIds((prev) => new Set(prev).add(id))
  }

  const handleSend = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || !active) return
    sendMessage(active.id, text)
    setDraft('')
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-6xl border-x border-soft md:h-screen">
      <div className={clsx('w-full shrink-0 overflow-y-auto border-r border-soft md:block md:w-90', active ? 'hidden' : 'block')}>
        <div className="sticky top-0 border-b border-soft bg-app/90 px-4 py-4 backdrop-blur-sm sm:px-6">
          <h1 className="font-display text-2xl text-primary">Messages</h1>
        </div>
        {sorted.map((c) => {
          const other = userById(c.withUserId)
          const last = c.messages.at(-1)
          const isUnread = last.from !== currentUser.id && !openedIds.has(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => openConversation(c.id)}
              className={clsx(
                'flex w-full items-center gap-3 border-b border-soft px-4 py-4 text-left transition-colors hover:bg-surface sm:px-6',
                activeId === c.id && 'bg-surface',
              )}
            >
              <Avatar user={other} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={clsx('truncate text-sm', isUnread ? 'font-semibold text-primary' : 'font-medium text-primary')}>
                    {other.name}
                  </p>
                  <span className="shrink-0 text-xs text-tertiary">{formatRelativeTime(last.at)}</span>
                </div>
                <p className={clsx('truncate text-sm', isUnread ? 'text-primary' : 'text-tertiary')}>
                  {last.from === currentUser.id ? 'You: ' : ''}
                  {last.text}
                </p>
              </div>
              {isUnread && <span className="h-2 w-2 shrink-0 rounded-full bg-brass-500" />}
            </button>
          )
        })}
      </div>

      <div className={clsx('flex min-w-0 flex-1 flex-col', active ? 'flex' : 'hidden md:flex')}>
        {active ? (
          <>
            <div className="flex items-center gap-3 border-b border-soft px-4 py-3 sm:px-6">
              <button type="button" onClick={() => setActiveId(null)} className="rounded-full p-1.5 hover:bg-surface md:hidden" aria-label="Back to messages">
                <ArrowLeft className="h-5 w-5 text-primary" />
              </button>
              <Avatar user={userById(active.withUserId)} size="sm" />
              <p className="font-semibold text-primary">{userById(active.withUserId).name}</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-6">
              {active.messages.map((m) => {
                const mine = m.from === currentUser.id
                return (
                  <div key={m.id} className={clsx('flex', mine ? 'justify-end' : 'justify-start')}>
                    <div
                      className={clsx(
                        'max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-snug',
                        mine ? 'rounded-br-sm bg-brass-500 text-ink-950' : 'rounded-bl-sm bg-surface text-primary',
                      )}
                    >
                      {m.text}
                    </div>
                  </div>
                )
              })}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-soft px-4 py-3 sm:px-6">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a message"
                className="flex-1 rounded-full border border-default bg-surface px-4 py-2 text-sm text-primary outline-none placeholder:text-tertiary focus:border-brass-500"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brass-500 text-ink-950 disabled:opacity-30"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="hidden flex-1 items-center justify-center text-sm text-tertiary md:flex">
            Choose a conversation to start reading.
          </div>
        )}
      </div>
    </div>
  )
}
