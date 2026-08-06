import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const events = [
  { time: '6:30 PM', title: 'Guest Arrival', align: 'right' },
  { time: '7:00 PM', title: 'Couple Entry', align: 'left' },
  { time: '8:00 PM', title: 'Dinner', align: 'right' },
];

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const leftCloudX = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '-100%']);
  const rightCloudX = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-24 bg-[#faf7f2] overflow-hidden">
      {/* Cloud curtains covering the middle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[140%] sm:w-[120%] z-30 pointer-events-none flex items-center"
        style={{ x: leftCloudX }}
      >
        <img src="/Cloud_1.png" alt="" className="w-full h-auto drop-shadow-xl" />
      </motion.div>
      <motion.div
        className="absolute top-[25%] -translate-y-1/2 right-0 w-[160%] sm:w-[140%] z-30 pointer-events-none flex items-center"
        style={{ x: rightCloudX }}
      >
        <img src="/Cloud_1.png" alt="" className="w-full h-auto drop-shadow-xl scale-x-[-1]" />
      </motion.div>


      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-5xl text-[#6b5b4e] mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Schedule of Events
        </motion.p>

        {/* Timeline */}
        <div className="relative w-full max-w-md">
          {/* Central line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Events */}
          <div className="space-y-8 sm:space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-4 sm:gap-8 ${event.align === 'left' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                initial={{ opacity: 0, x: event.align === 'left' ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {/* Content */}
                <div className={`flex-1 ${event.align === 'left' ? 'text-right' : 'text-left'}`}>
                  <motion.p
                    className="font-display text-2xl sm:text-3xl text-[#6b5b4e]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {event.time}
                  </motion.p>
                  <p className="font-serif text-xl sm:text-xl text-[#8b7d6b] mt-1">
                    {event.title}
                  </p>
                </div>

                {/* Dot */}
                <motion.div
                  className="relative z-10 w-4 h-4 rounded-full bg-[#d4af37] shadow-glow flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.4, type: 'spring' }}
                />

                {/* Spacer for alignment */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
