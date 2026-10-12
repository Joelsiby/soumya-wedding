import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import DateSection from './DateSection';
import LetterSection from './LetterSection';
import ScheduleOfEventsSection from './ScheduleOfEventsSection';
import VenueSection from './VenueSection';
import RSVPSection from './RSVPSection';
import FooterSection from './FooterSection';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  // Whether the envelope intro overlay is still showing. The 5s "nudge"
  // countdown below only makes sense once the visitor can actually see the
  // hero, so it's held off entirely until this flips to false.
  envelopeOpen?: boolean;
}

export default function LandingPage({ envelopeOpen = false }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Still showing the envelope intro — don't start the countdown yet.
    if (envelopeOpen) return;

    // Nudge: if the visitor hasn't scrolled within 5s of the hero becoming
    // visible, give the page a gentle "jump" — a quick scroll down and back
    // — as a physical hint that it scrolls. Cancels itself the moment the
    // visitor scrolls, touches, or uses their wheel on their own.
    const nudgeTimer = setTimeout(() => {
      if (window.scrollY > 10) return;

      window.scrollTo({ top: 100, behavior: 'smooth' });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 350);
    }, 5000);

    const cancelNudge = () => clearTimeout(nudgeTimer);
    window.addEventListener('scroll', cancelNudge, { once: true, passive: true });
    window.addEventListener('touchstart', cancelNudge, { once: true, passive: true });
    window.addEventListener('wheel', cancelNudge, { once: true, passive: true });

    return () => {
      clearTimeout(nudgeTimer);
      window.removeEventListener('scroll', cancelNudge);
      window.removeEventListener('touchstart', cancelNudge);
      window.removeEventListener('wheel', cancelNudge);
    };
  }, [envelopeOpen]);

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
            hero and the flowers, anchored to the hero's own bottom edge (100svh) rather
            than this wrapper's (taller) bottom edge. */}
        <div
          className="absolute left-[12%] -translate-x-1/2 z-40"
          style={{ top: 'calc(100svh - 4rem)' }}
        >
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
          >
            <span className="text-black text-xs font-serif tracking-wide">Scroll Down</span>
            <ChevronDown className="w-5 h-5 text-[#d4af37]" strokeWidth={2} />
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
