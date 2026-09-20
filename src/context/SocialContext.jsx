import { createContext, useContext, useMemo, useReducer } from 'react'
import {
  conversations as initialConversations,
  currentUser,
  notifications as initialNotifications,
  posts as initialPosts,
  suggestedToFollow,
  users,
} from '../data/mockData'

const SocialContext = createContext(null)

const initialFollows = new Set(
  users.map((u) => u.id).filter((id) => id !== currentUser.id && !suggestedToFollow.includes(id)),
)

const initialState = {
  posts: initialPosts,
  follows: initialFollows,
  notifications: initialNotifications,
  conversations: initialConversations,
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_LIKE': {
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.postId
            ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) }
            : p,
        ),
      }
    }
    case 'TOGGLE_REPOST': {
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.postId
            ? { ...p, repostedByMe: !p.repostedByMe, reposts: p.reposts + (p.repostedByMe ? -1 : 1) }
            : p,
        ),
      }
    }
    case 'ADD_COMMENT': {
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    id: `c-${Date.now()}`,
                    authorId: currentUser.id,
                    text: action.text,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : p,
        ),
      }
    }
    case 'ADD_POST': {
      return { ...state, posts: [action.post, ...state.posts] }
    }
    case 'TOGGLE_FOLLOW': {
      const next = new Set(state.follows)
      if (next.has(action.userId)) next.delete(action.userId)
      else next.add(action.userId)
      return { ...state, follows: next }
    }
    case 'MARK_ALL_READ': {
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) }
    }
    case 'SEND_MESSAGE': {
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.conversationId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: `x-${Date.now()}`, from: currentUser.id, text: action.text, at: new Date().toISOString() },
                ],
              }
            : c,
        ),
      }
    }
    default:
      return state
  }
}

export function SocialProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(
    () => ({
      ...state,
      toggleLike: (postId) => dispatch({ type: 'TOGGLE_LIKE', postId }),
      toggleRepost: (postId) => dispatch({ type: 'TOGGLE_REPOST', postId }),
      addComment: (postId, text) => dispatch({ type: 'ADD_COMMENT', postId, text }),
      addPost: (post) => dispatch({ type: 'ADD_POST', post }),
      toggleFollow: (userId) => dispatch({ type: 'TOGGLE_FOLLOW', userId }),
      markAllRead: () => dispatch({ type: 'MARK_ALL_READ' }),
      sendMessage: (conversationId, text) => dispatch({ type: 'SEND_MESSAGE', conversationId, text }),
      isFollowing: (userId) => state.follows.has(userId),
    }),
    [state],
  )

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
}

export function useSocial() {
  const ctx = useContext(SocialContext)
  if (!ctx) throw new Error('useSocial must be used within SocialProvider')
  return ctx
}
