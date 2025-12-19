import type { Song } from '../../types/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlayIcon, HeartIcon } from 'lucide-react'
import { useMusic } from '@/context/MusicContext'
import { useFavoriteStore } from '@/hooks/useFavoriteStore'

const SongCard = ({ song }: { song: Song }) => {
  const { playTrack } = useMusic()
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()
  const fav = isFavorite(song.id)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    fav ? removeFavorite(song.id) : addFavorite(song)
  }

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer
      border-zinc-200 bg-white
      dark:border-zinc-800 dark:bg-zinc-900/50 
      hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xl hover:-translate-y-1"
    >
      <CardContent className="p-3 md:p-4">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-md shadow-inner bg-zinc-100 dark:bg-zinc-800">
          <img
            src={song.albumCover}
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                playTrack(song)
              }}
              size="icon"
              className="h-12 w-12 rounded-full bg-white text-black hover:scale-110 transition-transform"
            >
              <PlayIcon className="fill-current h-6 w-6" />
            </Button>
          </div>

          <button
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 shadow-lg ${
              fav
                ? 'bg-white opacity-100 scale-100'
                : 'bg-black/40 opacity-0 group-hover:opacity-100 hover:bg-black/60'
            }`}
          >
            <HeartIcon
              className={`h-4 w-4 transition-colors ${
                fav ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
        </div>

        <div className="space-y-1 px-1">
          <h3 className="font-bold text-foreground leading-tight truncate text-sm md:text-base tracking-tight">
            {song.title}
          </h3>
          <p className="text-xs text-muted-foreground font-medium truncate">
            {song.artist}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SongCard
