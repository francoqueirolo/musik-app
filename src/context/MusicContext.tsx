import type { Song } from '@/types/types'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface MusicProviderProps {
  children: ReactNode
}

interface MusicContextType {
  currentTrack: Song | null
  playTrack: (song: Song) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null)

  const playTrack = (song: Song) => {
    setCurrentTrack(song)
  }

  return (
    <MusicContext.Provider value={{ currentTrack, playTrack }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)

  if (!context) {
    throw new Error('useMusic should only be used within a MusicProvider')
  }

  return context
}
