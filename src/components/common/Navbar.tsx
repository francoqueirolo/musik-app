import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Heart } from 'lucide-react'
import { useFavoriteStore } from '@/hooks/useFavoriteStore'

const Navbar = () => {
  const location = useLocation()
  const favoritesCount = useFavoriteStore((state) => state.favorites.length)

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-green-700 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-xl tracking-tight">
          MusicApp
        </span>
      </div>

      <div className="flex gap-4">
        <Button
          variant={location.pathname === '/' ? 'default' : 'ghost'}
          asChild
          className="gap-2"
        >
          <Link to="/">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </Button>

        <Button
          variant={location.pathname === '/favorites' ? 'default' : 'ghost'}
          asChild
          className="gap-2 relative"
        >
          <Link to="/favs">
            <Heart
              className={`w-4 h-4 ${
                favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''
              }`}
            />
            Favoritos
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
