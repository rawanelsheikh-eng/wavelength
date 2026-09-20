# Wavelength

A front-end-only social feed for sharing what you're listening to — built as a portfolio piece to demonstrate React and Tailwind CSS.

Everything runs in the browser against seeded mock data. There is no backend: posting, liking, commenting, following, messaging, and playback are all simulated with local React state.

## Stack

- **React 19** + **React Router 7** — routing between the feed, explore, notifications, messages, and profile views
- **Tailwind CSS v4** — theme tokens (colors, type, motion) defined via `@theme` in [src/index.css](src/index.css)
- **Framer Motion** — the like-button micro-interaction, comment-thread expand, and the landing page's single entrance animation
- **lucide-react** — icon set
- **Vite** — dev server and build

## Features

- Feed with text, photo, and "track" posts; like, comment, and repost, all persisted in memory via `useReducer`
- A composer that can attach a track or a photo to a new post
- A simulated audio player: play/pause a track from anywhere in the app, watch its waveform animate, and see a persistent mini-player dock at the bottom
- Explore page with live search across tracks and people
- Notifications and a two-pane messages view (conversation list + thread)
- Profile pages with follow/unfollow state
- Full dark/light theming (not just inverted grays — a separate warm-paper light palette), persisted to `localStorage`
- Responsive down to mobile: an icon rail on desktop becomes a bottom tab bar on small screens

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` folder — this is a client-only app, so it can be hosted on any static host (Netlify, Vercel, GitHub Pages, etc.) with no server component.

## Project structure

```
src/
  components/   reusable UI (PostCard, Composer, Waveform, Avatar, ...)
  context/      global state: theme, social data (posts/follows/notifications), player
  data/         seeded mock users, tracks, and posts
  layout/       app shell chrome: nav rail, tab bar, mini-player
  pages/        route-level screens
```

All content (people, tracks, posts) is fictional, generated for this demo.
