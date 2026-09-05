import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LetterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // True sticky scroll-jacking: 
  // The section is 300vh, the sticky container holds the envelope in the viewport center.
  // Card moves from inside (hidden, positive Y) to outside (revealed, negative Y).
  // Card starts partially visible (like the design) and moves up smoothly.
  const cardY = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [120, 0, -110]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0.95, 1, 1.02]);
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [2, 0, -1]);
  
  // Hearts appear early
  const heartsOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#faf7f2] min-h-[180vh]">
      {/* Floating hearts decoration - fixed to screen, opacity controls visibility */}
      <motion.div 
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        style={{ opacity: heartsOpacity }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.img
            key={i}
            src="/blue_heart.png"
            alt=""
            className="absolute brightness-110 drop-shadow-sm"
            style={{
              left: `${(i * 7.5) % 100}%`,
              top: `${(i * 13) % 100}%`,
              width: `${25 + (i % 5) * 15}px`,
              height: 'auto',
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              rotate: [0, 45, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + (i % 10),
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Sticky Envelope Container - Pins the entire screen when scrolled into view */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-[5vh] pb-[0vh] z-10">
        {/* You're invited text */}
        <motion.p
          className="font-script text-6xl sm:text-7xl text-[#6b5b4e] z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          You're invited!
        </motion.p>

        <div className="relative z-10 flex flex-col items-center w-full flex-shrink-0 mt-40 sm:mt-56">
          {/* Envelope Container - Bottom Clipped */}
          <div
          ref={containerRef}
          className="relative w-[150vw] sm:w-[100vw] max-w-none aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center flex-shrink-0"
          style={{
            // Clip only the bottom part to hide card sticking out, but allow it to slide UP
            clipPath: 'inset(-500% 0 0 0)'
          }}
        >

          {/* Layer 1: Envelope Back Image */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-end justify-center">
            <img
              src="/blue_envelope.png"
              alt="Envelope Back"
              className="w-full h-auto drop-shadow-2xl translate-y-[0.5%]"
            />
          </div>

          {/* Layer 2: The Card (Moves on Scroll) */}
          <motion.div
            style={{
              y: cardY,
              scale: cardScale,
              rotate: cardRotate,
              zIndex: 10
            }}
            className="absolute w-[55%] sm:w-[50%] max-w-xl bg-white rounded-sm shadow-2xl px-4 py-8 sm:px-12 sm:py-20 flex flex-col items-center"
          >
            {/* Decorative border */}
            <div className="absolute inset-4 border border-[#d4af37]/15 rounded-sm pointer-events-none" />


            <h2 className="font-script text-2xl sm:text-4xl text-[#6b5b4e] mb-12 text-center leading-tight">
              To Our Dearest Family & Friends,
            </h2>

            <p className="font-serif text-[#7a6a5d] text-center leading-relaxed text-sm sm:text-lg mb-8 italic opacity-90">
              Life has given us so many beautiful moments, but the greatest has been finding each other—and having incredible people like you to share the journey with.
            </p>

            <p className="font-serif text-[#7a6a5d] text-center leading-relaxed text-sm sm:text-lg mb-8 opacity-90">
              As we promise forever to one another, our hearts will be fullest knowing you're there to witness the beginning of this new chapter.
            </p>

            <p className="font-serif text-[#7a6a5d] text-center leading-relaxed text-sm sm:text-lg opacity-90">
              Thank you for your endless love, encouragement, and for being part of our story. We truly can't imagine this day without you.
            </p>

            {/* Bottom decoration */}
            <div className="mt-20 flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-[#d4af37]/20" />
              ))}
            </div>
          </motion.div>

          {/* Layer 3: Envelope Front Image (Pocket) */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center">
            <img
              src="/blue_envelope2.png"
              alt="Envelope Front"
              className="w-full h-auto translate-y-[0.5%]"
            />
          </div>
        </div>

        {/* Divider flowers, beneath the envelope */}
        <img
          src="/divider_flowers.jpg"
          alt=""
          className="relative z-30 w-full max-w-md h-auto pointer-events-none select-none -mt-40"
        />

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        >
          <p className="font-serif text-[10px] tracking-[0.4em] text-[#9b8b7a] uppercase font-medium">Scroll to reveal</p>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-[#9b8b7a] to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
