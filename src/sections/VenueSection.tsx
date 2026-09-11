import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const VENUE_NAME = 'Sisodiya Resort';
const MAPS_URL = 'https://maps.app.goo.gl/9xE6ZcoJAzBbAwS2A';

export default function VenueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const mapsUrl = MAPS_URL;

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Background video, full clip shown at its native aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: '720 / 1280' }}>
        <video
          src="/wedding_venue_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain object-top"
        />

        {/* Title + venue info, overlaid on top of the image */}
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center px-6 pt-24">
          <motion.p
            className="font-script text-4xl sm:text-6xl text-[#6b5b4e] text-center pb-4"
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
            <div className="w-10 h-10 rounded-full bg-[#6b5b4e]/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#6b5b4e]" />
            </div>
            <div>
              <p className="font-display text-lg text-[#6b5b4e]">{VENUE_NAME}</p>
              <p className="font-serif text-sm text-[#7a6a5d]">Indore Road, Khandwa, M.P.</p>
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
            <MapPin className="w-5 h-5 text-[#6b5b4e]" />
            <span className="font-serif text-base sm:text-lg text-[#6b5b4e]">View on Maps</span>
          </motion.a>
        </div>
      </div>

      {/* Welcome flowers, sitting on top of the bottom of the venue image */}
      <img
        src="/welcome-flowers.jpg"
        alt=""
        className="relative z-20 w-full h-auto -mt-20 sm:-mt-28 pointer-events-none select-none"
      />
    </section>
  );
}
