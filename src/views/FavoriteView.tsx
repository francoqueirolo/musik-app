import SongCard from '@/components/layout/SongCard'
import { useFavoriteStore } from '@/hooks/useFavoriteStore'
import { HeartOff } from 'lucide-react' // Un icono para el estado vacío
import type { Song } from '@/types/types'

const FavoritesView = () => {
  const favorites = useFavoriteStore((state) => state.favorites)

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Favoritos
        </h1>
        <p className="text-muted-foreground mt-2">
          Tus canciones guardadas aparecen aquí.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
          <div className="bg-muted p-6 rounded-full">
            <HeartOff className="h-12 w-12 text-muted-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-medium text-foreground">
              Tu biblioteca está vacía
            </p>
            <p className="text-muted-foreground text-sm">
              Empieza a añadir canciones usando el icono del corazón.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {favorites.map((song: Song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesView
