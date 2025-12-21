import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeView from './views/HomeView'

import { MusicProvider } from './context/MusicContext'
import FavoriteView from './views/FavoriteView'
import PlayerBar from './components/layout/PlayerBar'
import Navbar from './components/common/Navbar'
import { Toaster } from 'sonner'

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/favs" element={<FavoriteView />} />
            </Routes>
          </main>
          <PlayerBar />

          <Toaster position="bottom-right" richColors theme="dark" />
        </div>
      </BrowserRouter>
    </MusicProvider>
  )
}

export default App
