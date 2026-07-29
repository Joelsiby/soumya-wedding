import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#faf7f2]">
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Couple Image (Full Bleed) */}
        <motion.div
          className="relative w-full overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/footer.png"
            className="w-full h-auto object-contain object-top"
          />
          
          {/* Bottom text overlay */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
