import { useState } from 'react'
import { useMusicSearch } from '../hooks/useMusicSearch'
import SongCard from '../components/layout/SongCard'
import SongCardSkeleton from '../components/layout/SongCardSkeleton'
import { Button } from '@/components/ui/button'
import type { Song } from '@/types/types'
import { SearchIcon, Music2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { MusicPagination } from '@/components/common/MusicPagination'

const HomeView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')

  const { songs, loading, error, currentPage, setCurrentPage, totalPages } =
    useMusicSearch(query)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(searchTerm)
  }

  const skeletonCards = Array.from({ length: 15 }).map((_, i) => (
    <SongCardSkeleton key={i} />
  ))

  return (
    <div className="p-6 pb-32 max-w-7xl mx-auto min-h-screen transition-all duration-500">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          Descubrir
        </h1>
        <p className="text-muted-foreground text-lg">
          Encuentra tu próxima canción favorita en la biblioteca de iTunes.
        </p>
      </header>

      <form
        onSubmit={handleSearch}
        className="mb-12 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto md:mx-0 group"
      >
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Artistas, álbumes o canciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-border focus-visible:ring-1 focus-visible:ring-primary/50"
          />
        </div>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Buscar ahora
        </Button>
      </form>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {skeletonCards}
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg text-center my-10">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {songs.map((song: Song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>

          {songs.length > 0 && (
            <MusicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          )}

          {!loading && songs.length === 0 && query && (
            <div className="text-center py-20 flex flex-col items-center gap-2">
              <Music2 className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground text-lg">
                No encontramos nada para{' '}
                <span className="text-foreground font-semibold italic">
                  "{query}"
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HomeView
