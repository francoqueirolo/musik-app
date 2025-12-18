import { useState, useEffect } from 'react'
import { musicService } from '../services/musicService'

export function useMusicSearch(searchTerm: string) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!searchTerm) return

    setLoading(true)

    musicService
      .searchSongs(searchTerm)
      .then((data) => setSongs(data))
      .catch((err) => {
        setError(err)
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [searchTerm])

  return { songs, loading, error }
}
