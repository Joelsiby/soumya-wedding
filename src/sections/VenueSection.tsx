import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const VENUE_NAME = 'Krishna Inn Hotel';
const VENUE_ADDRESS = 'KRISHNA INN, GURUVAYOOR (Star Hotel), East Nada, Guruvayur, Kerala 680101';

function getMapsUrl(address: string) {
  const query = encodeURIComponent(address);
  const isApple = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);
  return isApple ? `https://maps.apple.com/?q=${query}` : `https://maps.google.com/?q=${query}`;
}

export default function VenueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const mapsUrl = getMapsUrl(VENUE_ADDRESS);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] sm:h-[90vh]" style={{ clipPath: 'inset(-30% 0 0 0)' }}>
      {/* Background image, scaled up so the top leaf overlaps the section above; left/right/bottom stay flush */}
      <img
        src="/venue.png"
        alt="Wedding venue"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.18) translateX(5%) translateY(-4%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-24 sm:pt-32 px-6 translate-x-8 sm:translate-x-12">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-6xl text-[#D4AF37] drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Wedding Venue
        </motion.p>

        {/* Venue Info */}
        <motion.a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <p className="font-display text-lg text-[#D4AF37] drop-shadow">{VENUE_NAME}</p>
            <p className="font-serif text-sm text-[#D4AF37]/80">Guruvayoor, Kerala</p>
          </div>
        </motion.a>

        {/* Floating location badge */}
        <motion.a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-full px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/40 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: [20, 0, 0, -8, 0] } : {}}
          transition={{
            opacity: { delay: 0.5, duration: 0.4 },
            y: { delay: 0.5, duration: 2, times: [0, 0.2, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 0.6 },
          }}
        >
          <MapPin className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-serif text-base sm:text-lg text-[#D4AF37]">View on Maps</span>
        </motion.a>
      </div>
    </section>
  );
}
