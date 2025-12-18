import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeView from './views/HomeView'

import { MusicProvider } from './context/MusicContext'
import FavoriteView from './views/FavoriteView'
import PlayerBar from './components/layout/PlayerBar'
import Navbar from './components/common/NavBar'

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/favs" element={<FavoriteView />} />
        </Routes>
      </BrowserRouter>

      <PlayerBar />
    </MusicProvider>
  )
}

export default App
