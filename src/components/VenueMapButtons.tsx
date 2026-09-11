import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const RESIDENCE_MAPS_URL = 'https://maps.app.goo.gl/7SybhzCJQzfPah2Y9?g_st=aw';
const RESORT_MAPS_URL = 'https://maps.app.goo.gl/ywLvrWSwb8TDsRm96?g_st=aw';

function MapButton({ label, href, delay }: { label: string; href: string; delay: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label} in Maps`}
      className="flex items-center gap-1.5 pl-3 pr-4 h-9 rounded-full text-[#5a4a3d] text-xs font-serif tracking-wide flex-shrink-0"
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
      transition={{ duration: 0.6, delay }}
      whileTap={{ scale: 0.92 }}
    >
      <MapPin className="w-3.5 h-3.5" />
      <span>{label}</span>
    </motion.a>
  );
}

export default function VenueMapButtons() {
  return (
    <>
      <MapButton label="Residence" href={RESIDENCE_MAPS_URL} delay={1} />
      <MapButton label="Resort" href={RESORT_MAPS_URL} delay={1.15} />
    </>
  );
}
