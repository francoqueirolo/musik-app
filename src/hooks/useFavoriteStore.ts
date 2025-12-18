import type { Song } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteState {
  favorites: Song[]
  addFavorite: (song: Song) => void
  removeFavorite: (songId: string | number) => void
  isFavorite: (songId: string | number) => boolean
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (song) =>
        set((state) => ({ favorites: [...state.favorites, song] })),

      removeFavorite: (songId) =>
        set((state) => ({
          favorites: state.favorites.filter((s) => s.id !== songId),
        })),

      isFavorite: (songId) => get().favorites.some((s) => s.id === songId),
    }),
    {
      name: 'favorites-storage',
    }
  )
)
