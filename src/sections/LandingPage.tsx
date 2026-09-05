import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import DateSection from './DateSection';
import LetterSection from './LetterSection';
import ScheduleSection from './ScheduleSection';
import VenueSection from './VenueSection';
import DressCodeSection from './DressCodeSection';
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
      <HeroSection />
      <img
        src="/welcome-flowers.jpg"
        alt=""
        className="relative w-full h-auto -mt-16 sm:-mt-24"
      />
      <div className="animate-section">
        <DateSection />
      </div>
      <div className="animate-section">
        <LetterSection />
      </div>
      <div className="animate-section">
        <VenueSection />
      </div>
      <div className="animate-section">
        <ScheduleSection />
      </div>
      <div className="animate-section">
        <DressCodeSection />
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
