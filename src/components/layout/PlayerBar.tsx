import { useMusic } from '../../context/MusicContext'

const PlayerBar = () => {
  const { currentTrack } = useMusic()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 p-4 flex items-center justify-between z-50">
      <h1>REPRODUCTOR</h1>
      <div className="flex items-center gap-4 w-1/3">
        <img
          src={currentTrack.albumCover}
          className="w-12 h-12 rounded shadow-lg"
          alt=""
        />
        <div className="overflow-hidden">
          <div className="text-white text-sm font-bold truncate">
            {currentTrack.title}
          </div>
          <div className="text-zinc-400 text-xs truncate">
            {currentTrack.artist}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3">
        <audio
          key={currentTrack.audioUrl}
          src={currentTrack.audioUrl}
          controls
          autoPlay
          className="h-10 w-full max-w-md"
        />
      </div>

      <div className="w-1/3 flex justify-end">
        <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
          iTunes Preview
        </span>
      </div>
    </div>
  )
}

export default PlayerBar
