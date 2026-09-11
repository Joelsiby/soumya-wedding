import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeOpening from './sections/EnvelopeOpening';
import LandingPage from './sections/LandingPage';
import MusicButton from './components/MusicButton';
import VenueMapButtons from './components/VenueMapButtons';

export default function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);

  const handleEnvelopeComplete = useCallback(() => {
    setShowEnvelope(false);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F4F1EA] overflow-x-clip">
      {/* Desktop Blocker Overlay */}
      <div className="hidden md:flex fixed inset-0 z-[9999] bg-[#faf7f2] flex-col items-center justify-center p-8 text-center">
        <h2 className="font-script text-5xl sm:text-6xl text-[#6b5b4e] mb-6">Please view on mobile</h2>
        <p className="font-serif text-[#8b7d6b] text-xl max-w-lg">
          For the best experience and to see all the magical details, please open this beautiful invitation on your smartphone.
        </p>
      </div>

      {/* Landing page is always rendered underneath */}
      <LandingPage />
      <div className="fixed bottom-6 right-6 z-[110] flex items-center gap-2">
        <VenueMapButtons />
        <MusicButton />
      </div>

      {/* Envelope acts as a z-index overlay and unmounts when complete */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            key="envelope-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed inset-0 z-[100]"
          >
            <EnvelopeOpening 
              onOpenComplete={handleEnvelopeComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
