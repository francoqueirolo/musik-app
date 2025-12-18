import type { SongData } from '@/types/types'

const BASE_URL = 'https://itunes.apple.com/search'

export const musicService = {
  searchSongs: async (term: string) => {
    const response = await fetch(
      `${BASE_URL}?term=${encodeURIComponent(term)}&limit=50&entity=song`
    )

    if (!response.ok) throw new Error('Error en la petición')

    const data = await response.json()

    console.log('Data cruda de la API:')
    console.log({ data })

    return data.results.map((data: SongData) => ({
      id: data.trackId,
      title: data.trackName,
      artist: data.artistName,
      albumCover: data.artworkUrl100,
      audioUrl: data.previewUrl,
      album: data.collectionName,
    }))
  },

  getArtist: async (_id: number) => {},
}
