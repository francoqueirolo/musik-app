import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Heart, Music } from 'lucide-react'
import { useFavoriteStore } from '@/hooks/useFavoriteStore'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  const location = useLocation()
  const favoritesCount = useFavoriteStore((state) => state.favorites.length)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Music className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            <Link to="/" className="flex items-center gap-2">
              <span className="hidden sm:inline">MusicApp</span>
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-1">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              asChild
              className="h-9 px-4"
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
            </Button>

            <Button
              variant={location.pathname === '/favs' ? 'secondary' : 'ghost'}
              asChild
              className="h-9 px-4 relative"
            >
              <Link to="/favs" className="flex items-center gap-2">
                <Heart
                  className={`h-4 w-4 transition-all ${
                    favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
                <span className="hidden sm:inline">Favoritos</span>
                {favoritesCount > 0 && (
                  <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
          <div className="h-6 w-[1px] bg-border mx-1" /> <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
