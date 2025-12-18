import { useMusic } from '../../context/MusicContext'

const PlayerBar = () => {
  const { currentTrack } = useMusic()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-t border-border/50 p-3 md:p-4 flex items-center justify-between z-50 transition-all duration-300">
      <div className="flex items-center gap-4 w-1/3 min-w-0">
        <div className="relative group">
          <img
            src={currentTrack.albumCover}
            className="w-10 h-10 md:w-12 md:h-12 rounded-md shadow-lg object-cover transition-transform group-hover:scale-105"
            alt={currentTrack.title}
          />
        </div>
        <div className="min-w-0">
          <div className="text-foreground text-sm font-bold truncate leading-none mb-1">
            {currentTrack.title}
          </div>
          <div className="text-muted-foreground text-xs truncate">
            {currentTrack.artist}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/3 px-4">
        <audio
          key={currentTrack.audioUrl}
          src={currentTrack.audioUrl}
          controls
          autoPlay
          className="h-8 md:h-9 w-full max-w-md opacity-90 hover:opacity-100 transition-opacity dark:invert"
        />
      </div>

      <div className="hidden md:flex w-1/3 justify-end items-center">
        <span className="text-[10px] text-muted-foreground font-black tracking-[0.2em] px-3 py-1 rounded-full border border-border/40 bg-secondary/30 backdrop-blur-sm">
          ITUNES PREVIEW
        </span>
      </div>
    </div>
  )
}

export default PlayerBar
