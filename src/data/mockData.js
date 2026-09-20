// Deterministic placeholder art — same seed always renders the same image.
const avatar = (seed) => `https://i.pravatar.cc/150?u=${seed}`
const cover = (seed) => `https://picsum.photos/seed/${seed}/300/300`
const photo = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const currentUser = {
  id: 'u-you',
  name: 'Alex Rivera',
  handle: 'alexrivera',
  avatar: avatar('alex-rivera-wl'),
  bio: 'Bassist, tape hoarder, three-chord evangelist. Building a playlist for every mood I refuse to name.',
  location: 'Austin, TX',
  followers: 842,
  following: 316,
  selector: true,
  topTracks: ['t1', 't4', 't9'],
}

export const users = [
  currentUser,
  {
    id: 'u2',
    name: 'Nadia Osei',
    handle: 'nadia.tapes',
    avatar: avatar('nadia-osei-wl'),
    bio: 'Field recordings + fuzz pedals. Currently obsessed with anything in 7/8.',
    location: 'Berlin',
    followers: 12800,
    following: 204,
    selector: true,
    topTracks: ['t2', 't6'],
  },
  {
    id: 'u3',
    name: 'Jonah Pruitt',
    handle: 'jonahp',
    avatar: avatar('jonah-pruitt-wl'),
    bio: 'Plays drums badly, curates playlists well. DJ at 3am on community radio.',
    location: 'Portland, OR',
    followers: 3021,
    following: 588,
    selector: false,
    topTracks: ['t3', 't7'],
  },
  {
    id: 'u4',
    name: 'Marisol Vega',
    handle: 'marisolv',
    avatar: avatar('marisol-vega-wl'),
    bio: 'A&R by day. My opinions about bridges are unreasonably strong.',
    location: 'Mexico City',
    followers: 9540,
    following: 142,
    selector: true,
    topTracks: ['t5', 't8'],
  },
  {
    id: 'u5',
    name: 'Theo Lindqvist',
    handle: 'theolind',
    avatar: avatar('theo-lindqvist-wl'),
    bio: 'Modular synths, cold weather, warm chords.',
    location: 'Reykjavík',
    followers: 640,
    following: 411,
    selector: false,
    topTracks: ['t9', 't1'],
  },
  {
    id: 'u6',
    name: 'Priya Chandran',
    handle: 'priyac',
    avatar: avatar('priya-chandran-wl'),
    bio: 'Vinyl-only Sundays. I will talk about Carnatic-jazz fusion whether you ask or not.',
    location: 'Chennai',
    followers: 5210,
    following: 233,
    selector: true,
    topTracks: ['t6', 't2'],
  },
  {
    id: 'u7',
    name: 'Casper Lindholm',
    handle: 'casperl',
    avatar: avatar('casper-lindholm-wl'),
    bio: 'Made a fog machine sound like a bassline once. Never recovered.',
    location: 'Copenhagen',
    followers: 1180,
    following: 97,
    selector: false,
    topTracks: ['t4', 't7'],
  },
]

export const tracks = {
  t1: { id: 't1', title: 'Low Tide Radio', artist: 'Salt & Static', cover: cover('salt-static'), duration: 214 },
  t2: { id: 't2', title: 'Seven Rooms', artist: 'Nadia Osei', cover: cover('seven-rooms'), duration: 251 },
  t3: { id: 't3', title: 'Marigold Freight', artist: 'The Quiet Machinists', cover: cover('marigold-freight'), duration: 188 },
  t4: { id: 't4', title: 'Palindrome Weather', artist: 'Casper Lindholm', cover: cover('palindrome-weather'), duration: 233 },
  t5: { id: 't5', title: 'Copper Wire Sundays', artist: 'Marisol Vega', cover: cover('copper-wire'), duration: 197 },
  t6: { id: 't6', title: 'Carnatic Static', artist: 'Priya Chandran', cover: cover('carnatic-static'), duration: 276 },
  t7: { id: 't7', title: 'Night Shift Lullaby', artist: 'The Quiet Machinists', cover: cover('night-shift'), duration: 205 },
  t8: { id: 't8', title: 'Borrowed Weather', artist: 'Marisol Vega', cover: cover('borrowed-weather'), duration: 221 },
  t9: { id: 't9', title: 'Aurora, Interrupted', artist: 'Theo Lindqvist', cover: cover('aurora-interrupted'), duration: 264 },
}

const now = Date.now()
const minutesAgo = (m) => new Date(now - m * 60 * 1000).toISOString()

export const posts = [
  {
    id: 'p1',
    authorId: 'u2',
    type: 'track',
    trackId: 't2',
    text: "Recorded this one in a stairwell because the reverb was free. Haven't stopped playing it back.",
    createdAt: minutesAgo(12),
    likes: 341,
    comments: [
      { id: 'c1', authorId: 'u4', text: 'The bridge stairwell?? Explains everything.', createdAt: minutesAgo(9) },
      { id: 'c2', authorId: 'u3', text: 'Send me the reverb tail, I need it for a sample.', createdAt: minutesAgo(4) },
    ],
    reposts: 28,
    likedByMe: false,
    repostedByMe: false,
  },
  {
    id: 'p2',
    authorId: 'u3',
    type: 'text',
    text: "Unpopular opinion: fade-outs are a cop-out. End the song like you mean it or don't end it at all.",
    createdAt: minutesAgo(38),
    likes: 96,
    comments: [{ id: 'c3', authorId: 'u7', text: 'Counterpoint: some songs deserve to just dissolve.', createdAt: minutesAgo(20) }],
    reposts: 6,
    likedByMe: true,
    repostedByMe: false,
  },
  {
    id: 'p3',
    authorId: 'u4',
    type: 'photo',
    text: 'Studio B smells like solder and cold coffee. Mixing the Vega EP until my ears give out.',
    photo: photo('studio-b-session'),
    createdAt: minutesAgo(55),
    likes: 512,
    comments: [],
    reposts: 41,
    likedByMe: false,
    repostedByMe: false,
  },
  {
    id: 'p4',
    authorId: 'u5',
    type: 'track',
    trackId: 't9',
    text: 'Built this whole track around one field recording of pack ice cracking. Wear headphones.',
    createdAt: minutesAgo(80),
    likes: 764,
    comments: [
      { id: 'c4', authorId: 'u2', text: 'This is the best thing you have made. Full stop.', createdAt: minutesAgo(60) },
    ],
    reposts: 112,
    likedByMe: true,
    repostedByMe: true,
  },
  {
    id: 'p5',
    authorId: 'u6',
    type: 'track',
    trackId: 't6',
    text: 'Six years of asking my grandfather about ragas finally turned into eight bars I am proud of.',
    createdAt: minutesAgo(130),
    likes: 1203,
    comments: [
      { id: 'c5', authorId: 'u4', text: 'This needs to be in the showcase playlist.', createdAt: minutesAgo(90) },
      { id: 'c6', authorId: 'u5', text: 'The tuning on the drone underneath is unreal.', createdAt: minutesAgo(70) },
    ],
    reposts: 88,
    likedByMe: false,
    repostedByMe: false,
  },
  {
    id: 'p6',
    authorId: 'u7',
    type: 'text',
    text: 'Playing a 3am slot tonight. If you are awake and sad, I made a set for exactly that.',
    createdAt: minutesAgo(170),
    likes: 58,
    comments: [],
    reposts: 3,
    likedByMe: false,
    repostedByMe: false,
  },
  {
    id: 'p7',
    authorId: currentUser.id,
    type: 'track',
    trackId: 't1',
    text: "Wrote this after driving back from the coast at 2am with the windows down. It's basically a postcard.",
    createdAt: minutesAgo(210),
    likes: 219,
    comments: [{ id: 'c7', authorId: 'u2', text: 'That outro guitar tone. Pedal chain please.', createdAt: minutesAgo(150) }],
    reposts: 19,
    likedByMe: false,
    repostedByMe: false,
  },
  {
    id: 'p8',
    authorId: 'u4',
    type: 'photo',
    text: 'Found this in a crate in Oaxaca. Nobody could tell me who pressed it. Adopting it anyway.',
    photo: photo('crate-dig-record'),
    createdAt: minutesAgo(260),
    likes: 388,
    comments: [],
    reposts: 22,
    likedByMe: false,
    repostedByMe: false,
  },
]

export const trending = ['t5', 't2', 't9', 't6', 't3']

export const suggestedToFollow = ['u4', 'u6', 'u5']

export const notifications = [
  { id: 'n1', type: 'like', actorId: 'u2', postId: 'p7', createdAt: minutesAgo(6), read: false },
  { id: 'n2', type: 'comment', actorId: 'u2', postId: 'p7', createdAt: minutesAgo(6), read: false },
  { id: 'n3', type: 'follow', actorId: 'u6', createdAt: minutesAgo(45), read: false },
  { id: 'n4', type: 'repost', actorId: 'u3', postId: 'p7', createdAt: minutesAgo(95), read: true },
  { id: 'n5', type: 'like', actorId: 'u5', postId: 'p7', createdAt: minutesAgo(140), read: true },
  { id: 'n6', type: 'follow', actorId: 'u7', createdAt: minutesAgo(300), read: true },
  { id: 'n7', type: 'like', actorId: 'u4', postId: 'p7', createdAt: minutesAgo(420), read: true },
]

export const conversations = [
  {
    id: 'm1',
    withUserId: 'u2',
    messages: [
      { id: 'x1', from: 'u2', text: 'Are you still coming through Berlin in October?', at: minutesAgo(1600) },
      { id: 'x2', from: currentUser.id, text: 'Yeah — booking the flight this week. Studio still free the 14th?', at: minutesAgo(1580) },
      { id: 'x3', from: 'u2', text: "It's yours. Bring the pedal you keep talking about.", at: minutesAgo(40) },
    ],
  },
  {
    id: 'm2',
    withUserId: 'u4',
    messages: [
      { id: 'x4', from: 'u4', text: 'Sent you the rough mix. Bridge still feels early to me.', at: minutesAgo(3000) },
      { id: 'x5', from: currentUser.id, text: 'Listening now, give me an hour.', at: minutesAgo(2950) },
      { id: 'x6', from: 'u4', text: 'Take your time. No rush before Friday.', at: minutesAgo(180) },
    ],
  },
  {
    id: 'm3',
    withUserId: 'u3',
    messages: [
      { id: 'x7', from: 'u3', text: 'Your 3am set recommendation destroyed me. In a good way.', at: minutesAgo(500) },
      { id: 'x8', from: currentUser.id, text: 'Told you the b-side was the real single.', at: minutesAgo(495) },
    ],
  },
  {
    id: 'm4',
    withUserId: 'u6',
    messages: [
      { id: 'x9', from: 'u6', text: 'Vinyl came in. It sounds even better on wax.', at: minutesAgo(6000) },
      { id: 'x10', from: currentUser.id, text: 'No way — send a picture of the pressing.', at: minutesAgo(5990) },
    ],
  },
]

export const userById = (id) => users.find((u) => u.id === id)
export const trackById = (id) => tracks[id]
export const postById = (id) => posts.find((p) => p.id === id)
