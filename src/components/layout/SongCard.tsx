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
    <Card className="group overflow-hidden border-none bg-background/50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all duration-300 backdrop-blur-sm cursor-pointer">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-md shadow-md">
          <img
            src={song.albumCover}
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Capa oscura que aparece al pasar el mouse */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button
              onClick={() => playTrack(song)}
              size="icon"
              className="h-12 w-12 rounded-full bg-primary hover:scale-110 transition-transform cursor-pointer"
            >
              <PlayIcon className="fill-current h-6 w-6" />
            </Button>
          </div>

          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 z-20 h-8 w-8 rounded-full transition-all duration-300 shadow-sm ${
              fav
                ? 'opacity-100 bg-white/90 hover:bg-white text-red-500'
                : 'opacity-0 group-hover:opacity-100 bg-black/40 hover:bg-red/60 text-white'
            } cursor-pointer`}
          >
            <HeartIcon
              className={`h-5 w-5 transition-transform active:scale-125 ${
                fav ? 'fill-red-500' : ''
              }`}
            />
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-foreground leading-tight truncate">
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
