import { useState } from 'react'
import { useMusicSearch } from '../hooks/useMusicSearch'
import SongCard from '../components/layout/SongCard'

import { Button } from '@/components/ui/button'
import type { Song } from '@/types/types'
import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

const HomeView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')

  const { songs, loading, error } = useMusicSearch(query)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(searchTerm)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <Input
          type="text"
          placeholder="Busca artistas o canciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button size="sm" aria-label="Submit" variant="outline">
          Buscar
          <SearchIcon />
        </Button>
      </form>

      {loading && (
        <div className="text-center py-10 text-zinc-400">
          Buscando en la biblioteca...
        </div>
      )}
      {error && <div className="text-red-500 text-center py-10">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {songs.map((song: Song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {!loading && songs.length === 0 && query && (
        <p className="text-center text-zinc-500">
          No se encontraron resultados para "{query}"
        </p>
      )}
    </div>
  )
}

export default HomeView
