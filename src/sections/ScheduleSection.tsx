import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineEvent {
  time: string;
  title: string;
}

interface DateGroup {
  day: string;
  date: string;
  events: TimelineEvent[];
}

const dateGroups: DateGroup[] = [
  {
    day: 'Tuesday',
    date: '24 / 11 / 26',
    events: [{ time: '9:00 AM', title: 'Mata Pujan' }],
  },
  {
    day: 'Wednesday',
    date: '25 / 11 / 26',
    events: [
      { time: '8:00 AM', title: 'Ganesh Pujan' },
      { time: '10:00 AM', title: 'Mandap Pratishtha' },
      { time: '7:00 PM', title: 'Mahila Sangeet' },
    ],
  },
  {
    day: 'Thursday',
    date: '26 / 11 / 26',
    events: [{ time: 'Godhuli Bela (Evening Twilight)', title: 'Lagan' }],
  },
];

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  let eventIndex = 0;

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-24 bg-[#faf7f2] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-5xl text-[#6b5b4e] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Wedding Timeline
        </motion.p>



        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3 mt-3 mb-10 sm:mb-14"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
          <div className="w-2 h-2 border border-[#d4af37] rotate-45" />
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
        </motion.div>

        {/* Timeline, grouped by date */}
        <div className="w-full max-w-md space-y-10 sm:space-y-12">
          {dateGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date header */}
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + groupIndex * 0.2, duration: 0.6 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />
                <p className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase text-[#6b5b4e] font-semibold">
                  {group.day}
                </p>
                <span className="font-serif text-xs sm:text-sm tracking-[0.2em] text-[#9b8b7a]">
                  {group.date}
                </span>
                <div className="flex-1 h-px bg-[#d4af37]/25" />
              </motion.div>

              {/* Events for this date */}
              <div className="relative pl-1">
                {/* Vertical line spanning this group's events */}
                {group.events.length > 1 && (
                  <motion.div
                    className="absolute left-[5.9rem] sm:left-[6.4rem] top-2 bottom-2 w-px timeline-line"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top' }}
                  />
                )}

                <div className="space-y-5 sm:space-y-6">
                  {group.events.map((event, i) => {
                    const delay = 0.3 + eventIndex * 0.12;
                    eventIndex += 1;
                    return (
                      <motion.div
                        key={i}
                        className="relative flex items-center gap-4 sm:gap-6"
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Time */}
                        <p className="font-serif font-semibold text-xs sm:text-sm text-[#6b5b4e] w-[5.5rem] sm:w-24 flex-shrink-0 leading-snug">
                          {event.time}
                        </p>

                        {/* Dot */}
                        <motion.div
                          className="relative z-10 w-3 h-3 rounded-full bg-[#d4af37] shadow-glow flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: delay + 0.15, duration: 0.4, type: 'spring' }}
                        />

                        {/* Title */}
                        <p className="font-display text-lg sm:text-xl text-[#4a3f36] font-semibold flex-1">
                          {event.title}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
