import { useRef, useState } from 'react';
import bgmSrc from '../../audio/Piano MR - Acoustic Inst_ By Your Side.mp3';

export default function BgmPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={bgmSrc} loop preload="auto" />
      <button
        type="button"
        onClick={togglePlayback}
        className="fixed bottom-6 right-6 z-50 flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white/70 bg-white/80 text-stone-600 shadow-[0_10px_30px_rgba(120,113,108,0.18)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#EFECE7] hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 focus:ring-offset-[#FAF9F6]"
        aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6.75v10.5M15 6.75v10.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 translate-x-0.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 6.75v10.5c0 .64.7 1.03 1.24.68l8.12-5.25a.81.81 0 0 0 0-1.36L9.74 6.07a.81.81 0 0 0-1.24.68Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </>
  );
}
