import type { SongData } from '@/types/types'

const BASE_URL = 'https://itunes.apple.com/search'

export const musicService = {
  searchSongs: async (term: string) => {
    const response = await fetch(
      `${BASE_URL}?term=${encodeURIComponent(term)}&limit=50&entity=song`
    )

    if (!response.ok) throw new Error('Error en la petición')
    const data = await response.json()

    return data.results.map((item: SongData) => ({
      id: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      albumCover: item.artworkUrl100,
      audioUrl: item.previewUrl,
      album: item.collectionName,
    }))
  },
}
