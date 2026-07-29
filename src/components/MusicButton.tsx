import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Keep the icon accurate no matter what triggers playback (autoplay, toggle, etc.)
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Attempt autoplay immediately; most mobile browsers block this without a user gesture.
    audio.play().catch(() => {});

    // Fall back to starting playback on the very first tap anywhere (e.g. opening the
    // envelope) — that's a real user gesture, so browsers allow play() from inside it.
    const tryPlayOnFirstInteraction = () => {
      if (audio.paused) audio.play().catch(() => {});
    };
    document.addEventListener('pointerdown', tryPlayOnFirstInteraction, { once: true });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      document.removeEventListener('pointerdown', tryPlayOnFirstInteraction);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/sitakalyana_music.mp3" loop />
      <motion.button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center bg-[#6b5b4e] text-[#faf7f2] shadow-lg"
        style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.25)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 1 },
          scale: { duration: 0.6, delay: 1 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" fill="currentColor" />
        ) : (
          <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
        )}
      </motion.button>
    </>
  );
}
