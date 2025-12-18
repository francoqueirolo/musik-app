import type { Song } from '../../types/types'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import { PlayIcon, HeartIcon } from 'lucide-react'
import { useMusic } from '@/context/MusicContext'
import { useFavoriteStore } from '@/hooks/useFavoriteStore'

const SongCard = ({ song }: { song: Song }) => {
  const { playTrack } = useMusic()
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()
  const fav = isFavorite(song.id)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Evita que al dar click al corazón se reproduzca la canción
    if (fav) {
      removeFavorite(song.id)
    } else {
      addFavorite(song)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-sm text-zinc-800">{song.artist}</h2>
        </CardTitle>
        <CardDescription>
          <h3 className="font-semibold text-gray-900  mr-2">{song.title}</h3>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={song.albumCover}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />

        <Button
          onClick={() => playTrack(song)}
          size="lg"
          aria-label="Submit"
          variant="outline"
          className="mt-4 cursor-pointer"
        >
          <PlayIcon />
        </Button>

        <Button
          onClick={toggleFavorite}
          size="lg"
          aria-label="Submit"
          variant={fav ? 'destructive' : 'outline'}
          className="mt-4 cursor-pointer"
        >
          <HeartIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default SongCard
