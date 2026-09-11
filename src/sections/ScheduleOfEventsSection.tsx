import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CloudProps {
  top: string;
  delay: number;
  duration: number;
  scale: number;
  opacity: number;
}

function Cloud({ top, delay, duration, scale, opacity }: CloudProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left: '-30%', width: '300px', height: '120px', opacity }}
      animate={{ x: ['0vw', '130vw'], y: [0, -15, 10, -5, 0] }}
      transition={{
        x: { duration, delay, repeat: Infinity, ease: 'linear' },
        y: { duration: 8, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 70%)',
          filter: 'blur(20px)',
          transform: `scale(${scale})`,
        }}
      />
    </motion.div>
  );
}

interface EventItem {
  title: string;
  dateTime: string;
  venue: string;
  details: string;
}

const SISODIYA = 'Sisodiya Resort, Indore Road, Khandwa';

const events: EventItem[] = [
  {
    title: 'Mata Pujan',
    dateTime: 'Tuesday, 24 Nov 2026  |  9:00 AM',
    venue: 'Residence',
    details: 'Auspicious beginning of the wedding festivities seeking the protective blessings of the Divine Mother / Kuldevi.',
  },
  {
    title: 'Ganesh Pujan',
    dateTime: 'Wednesday, 25 Nov 2026  |  8:00 AM',
    venue: SISODIYA,
    details: 'Invoking Vighnaharta (Lord Ganesha) to remove all physical and spiritual obstacles from the marriage celebrations.',
  },
  {
    title: 'Mandap Pratishtha',
    dateTime: 'Wednesday, 25 Nov 2026  |  10:00 AM',
    venue: SISODIYA,
    details: 'Consecration of the sacred wedding canopy representing the cosmos, blessing Mother Earth and the elements.',
  },
  {
    title: 'Haldi',
    dateTime: 'Wednesday, 25 Nov 2026',
    venue: SISODIYA,
    details: 'Purification and beautification ritual using turmeric paste to ward off the evil eye and bestow marital glow.',
  },
  {
    title: 'Sangeet Mehfil',
    dateTime: 'Wednesday, 25 Nov 2026  |  7:00 PM',
    venue: SISODIYA,
    details: 'Musical gathering to celebrate joy, foster bonding between both families, and release pre-wedding excitement.',
  },
  {
    title: 'Baraat',
    dateTime: 'Thursday, 26 Nov 2026  |  Evening',
    venue: SISODIYA,
    details: 'Joyous bridal procession where the groom arrives accompanied by music and dancing family members.',
  },

  {
    title: 'Reception',
    dateTime: 'Thursday, 26 Nov 2026  |  7:30 PM',
    venue: SISODIYA,
    details: 'Formal blessing ceremony and celebratory community feast welcoming the couple into societal and family life.',
  },
];

export default function ScheduleOfEventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-24 bg-[#faf7f2]">
      {/* Drifting clouds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Cloud top="6%" delay={0} duration={32} scale={0.9} opacity={0.5} />
        <Cloud top="45%" delay={12} duration={40} scale={0.6} opacity={0.35} />
        <Cloud top="80%" delay={22} duration={36} scale={0.75} opacity={0.4} />
      </div>

      {/* Floating gold sparkles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/50 rounded-full"
            style={{
              left: `${8 + i * 9.5}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + i * 0.4,
              delay: i * 0.9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Title */}
        <motion.h2
          className="font-script text-4xl sm:text-5xl text-center text-[#6b5b4e]"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Wedding Timeline
        </motion.h2>

        {/* Events list */}
        <div className="w-full max-w-sm mt-14 sm:mt-16 space-y-9 sm:space-y-10">
          {events.map((event, index) => (
            <div key={index} className="relative">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {event.title && (
                  <p className="font-serif font-bold text-sm sm:text-base tracking-[0.15em] uppercase text-[#8a6a1f]">
                    {event.title}
                  </p>
                )}
                <p className="font-serif text-sm sm:text-base text-[#4a3f36] mt-2">
                  {event.dateTime}
                </p>
                <p className="font-serif text-sm sm:text-base text-[#4a3f36]">
                  {event.venue}
                </p>
                <p className="font-serif text-xs sm:text-sm text-[#8b7d6b] italic leading-relaxed mt-2">
                  {event.details}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider flowers: full-bleed from the left edge, out of flow so it never pushes the next section down, max z-index so it stays on top of everything */}
      <img
        src="/divider_flowers.jpg"
        alt=""
        className="absolute left-0 -bottom-52 z-50 w-full h-auto pointer-events-none select-none scale-x-[-1]"
      />
    </section>
  );
}
