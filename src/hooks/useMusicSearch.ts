import { useState, useEffect } from 'react'
import { musicService } from '../services/musicService'

export function useMusicSearch(searchTerm: string) {
  const [allSongs, setAllSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)
  const itemsPerPage = 10

  useEffect(() => {
    if (!searchTerm) return

    setLoading(true)
    musicService
      .searchSongs(searchTerm)
      .then((data) => {
        setAllSongs(data)
        setCurrentPage(1)
      })
      .catch((err) => {
        setError(err)
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [searchTerm])

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage

  const currentSongs = allSongs.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(allSongs.length / itemsPerPage)

  return {
    songs: currentSongs,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    hasMore: currentPage < totalPages,
    error,
  }
}
