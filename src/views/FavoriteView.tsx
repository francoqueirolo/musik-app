// src/views/FavoritesView.tsx
import SongCard from '@/components/layout/SongCard'
import { useFavoriteStore } from '@/hooks/useFavoriteStore'
import type { Song } from '@/types/types'

const FavoritesView = () => {
  const favorites = useFavoriteStore((state: any) => state.favorites)

  return (
    <div className="p-8 pb-32">
      <h1 className="text-4xl font-bold text-gray mb-8">Favoritos</h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
          <p>No tienes canciones favoritas todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((song: Song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesView
