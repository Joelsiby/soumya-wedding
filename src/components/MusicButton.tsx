import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { registerMusicAudio } from '@/lib/musicController';

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Let the logo-stamp click (in EnvelopeOpening) trigger this exact audio element.
    registerMusicAudio(audio);

    // Keep the icon accurate no matter what triggers playback (logo tap, toggle, etc.)
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
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
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#5a4a3d] overflow-hidden flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 100%)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow:
            '0 8px 24px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -6px 10px rgba(255,255,255,0.15)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Glossy top highlight, like liquid glass catching light */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 32% 22%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 55%)',
          }}
        />

        <span className="relative z-10">
          {isPlaying ? (
            <Pause className="w-4 h-4" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 translate-x-0.5" fill="currentColor" />
          )}
        </span>
      </motion.button>
    </>
  );
}
