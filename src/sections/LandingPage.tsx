import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import DateSection from './DateSection';
import LetterSection from './LetterSection';
import ScheduleOfEventsSection from './ScheduleOfEventsSection';
import VenueSection from './VenueSection';
import RSVPSection from './RSVPSection';
import FooterSection from './FooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup smooth scroll-triggered animations for all sections
    const sections = containerRef.current?.querySelectorAll('.animate-section');
    
    sections?.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0.9, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );
    });

    // Parallax effect for decorative elements
    const parallaxElements = containerRef.current?.querySelectorAll('.parallax');
    parallaxElements?.forEach((el) => {
      gsap.to(el, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#faf7f2] overflow-x-clip">
      <div className="relative">
        <HeroSection />
        <img
          src="/welcome-flowers.jpg"
          alt=""
          className="relative w-full h-auto -mt-16 sm:-mt-24"
        />

        {/* Scroll indicator: rendered after the flowers so it paints on top of both the
            hero and the flowers, anchored to the hero's own bottom edge (100dvh) rather
            than this wrapper's (taller) bottom edge. */}
        <div
          className="absolute left-[42%] -translate-x-1/2 z-40"
          style={{ top: 'calc(100dvh - 2rem)' }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[#8b7d6b] text-xs tracking-widest uppercase font-serif">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#d4af37] to-transparent" />
          </motion.div>
        </div>
      </div>
      <div className="animate-section">
        <DateSection />
      </div>
      <div className="relative z-20 animate-section">
        <LetterSection />
      </div>
      <div className="relative z-10 animate-section">
        <ScheduleOfEventsSection />
      </div>
      <div className="animate-section">
        <VenueSection />
      </div>
      <div className="animate-section">
        <RSVPSection />
      </div>
      <div className="animate-section">
        <FooterSection />
      </div>
    </div>
  );
}
