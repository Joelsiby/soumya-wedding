import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const VENUE_NAME = 'Alpha Horizon Bolgatty';
const VENUE_ADDRESS = 'Alfa Horizon Business Centre, Goshree Rd, opposite ICTT, Vallarpadam, Kochi, Ernakulam, Kerala 682504';

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
    <section ref={sectionRef} className="relative w-full h-[80vh] sm:h-[90vh]" style={{ clipPath: 'inset(-30% 0 -20% 0)' }}>
      {/* Background image, scaled up so the top leaf overlaps the section above; left/right/bottom stay flush */}
      <img
        src="/reception_venue.png"
        alt="Wedding venue"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <img
        src="/Reception_venue_house.png"
        alt="Venue house"
        className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[224px] sm:w-[291px] h-auto z-[5]"
      />

      {/* Title (kept independent of the shifted content block so it stays truly centered) */}
      <motion.p
        className="absolute inset-x-0 top-[4.5rem] sm:top-[6rem] z-10 text-center font-script text-4xl sm:text-6xl text-black drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Wedding Venue
      </motion.p>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-[56%] sm:pt-[52%] px-6 translate-x-8 sm:translate-x-12">
        {/* Venue Info */}
        <div className="mb-8 -translate-x-8 sm:-translate-x-10 translate-y-2 sm:translate-y-1">
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="text-center">
              <p className="font-display text-lg text-[#D4AF37] drop-shadow flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                {VENUE_NAME}
              </p>
              <p className="font-serif text-sm text-[#D4AF37]/80">Kochi, Kerala</p>
              <p className="font-serif text-xs sm:text-sm text-[#D4AF37]/80 mt-2">
                Guest arrival 6:30 PM · Couple entry 7:00 PM
                <br />
                Dinner 8:00 PM
              </p>
            </div>
          </motion.a>
        </div>

        {/* Floating location badge */}
        <div className="-translate-x-8 sm:-translate-x-10">
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-full px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/40 transition-colors mt-6"
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
      </div>
    </section>
  );
}
