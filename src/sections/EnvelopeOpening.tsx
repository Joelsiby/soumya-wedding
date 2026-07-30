import { useState, useEffect } from 'react';
import { playBackgroundMusic } from '@/lib/musicController';

interface EnvelopeOpeningProps {
  onOpenComplete: () => void;
}

export default function EnvelopeOpening({ onOpenComplete }: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);

  // Phase 1: Click -> Logo Fades (Duration: 1000ms)
  // Phase 2: After Logo is gone -> Flaps Retrieve
  useEffect(() => {
    if (isOpen) {
      // Wait for logo to fade before moving flaps
      const retrievalTimer = setTimeout(() => {
        setIsRetrieving(true);
      }, 1000);

      // Final completion after flaps fly away
      const finalTimer = setTimeout(() => {
        onOpenComplete();
      }, 4000);

      return () => {
        clearTimeout(retrievalTimer);
        clearTimeout(finalTimer);
      };
    }
  }, [isOpen, onOpenComplete]);

  // Smooth linear-ish transition for the "pulled back" feel
  const retrievalTransition = {
    transition: 'all 2000ms cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none bg-transparent">

      {/* 3D Scene Container */}
      <div
        className="relative w-full h-full pointer-events-auto cursor-pointer bg-transparent"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d'
        }}
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            playBackgroundMusic();
          }
        }}
      >

        {/* 1. LEFT FLAP - Base Layer (z-40) */}
        <div
          className="absolute inset-0 z-40 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving
              ? 'translate3d(-200vw, 0, -2000px)'
              : 'translate3d(-180px, 0, -20px)', // User's requested shift from center
            ...retrievalTransition
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ 
              transform: 'rotate(-90deg) scale(2.5)',
              transformOrigin: 'center'
            }}
            alt="left"
          />
        </div>

        {/* 2. RIGHT FLAP - Base Layer (z-40) */}
        <div
          className="absolute inset-0 z-40 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving ? 'translate3d(200vw, 0, -2000px)' : 'translate3d(180px, 0, -10px)',
            ...retrievalTransition
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ 
              transform: 'rotate(90deg) scale(2.5)',
              transformOrigin: 'center'
            }}
            alt="right"
          />
        </div>

        {/* 3. BOTTOM FLAP - Mid Layer (z-50) */}
        <div
          className="absolute inset-0 z-50 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving ? 'translate3d(0, 200vh, -2000px)' : 'translate3d(0, 200px, 0px)',
            ...retrievalTransition
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ 
              transform: 'rotate(180deg) scale(3.2)',
              transformOrigin: 'center'
            }}
            alt="bottom"
          />
        </div>

        {/* 4. TOP FLAP - Top Layer (z-60) */}
        <div
          className="absolute inset-0 z-60 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving ? 'translate3d(0, -200vh, -2000px)' : 'translate3d(0, -200px, 20px)',
            ...retrievalTransition
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ 
              transform: 'scale(2.8)',
              transformOrigin: 'center'
            }}
            alt="top"
          />
        </div>

        {/* 5. WAX SEAL - Highest Layer (z-100) */}
        {!isRetrieving && (
          <div
            className={`absolute top-1/2 left-1/2 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            style={{
              pointerEvents: isOpen ? 'none' : 'auto',
              transform: 'translate(-50%, -50%) translate3d(0, 25px, 800px)'
            }}
          >
            <img src="/logo.png" className="w-32 h-32 object-contain drop-shadow-2xl" alt="Logo" />
            <p className={`mt-6 text-stone-700 font-script text-2xl tracking-[0.05em] transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'animate-pulse'}`}>
              Click to open
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
