import { useRef } from 'react';
import { motion } from 'framer-motion';

interface BirdProps {
  delay: number;
  duration: number;
  startY: number;
  reverse?: boolean;
  scale?: number;
}

function Bird({ delay, duration, startY, reverse = false, scale = 1 }: BirdProps) {
  return (
    <motion.svg
      className="absolute"
      style={{ 
        top: `${startY}%`,
        left: reverse ? '100%' : '-10%',
        transform: `scale(${scale})`,
      }}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      initial={{ x: 0, opacity: 0 }}
      animate={{ 
        x: reverse ? '-120vw' : '120vw',
        opacity: [0, 1, 1, 0],
      }}
      transition={{ 
        duration, 
        delay,
        repeat: Infinity,
        ease: 'linear',
        opacity: { times: [0, 0.1, 0.9, 1] }
      }}
    >
      <motion.path
        d="M0,8 Q6,0 12,8 Q18,0 24,8"
        fill="none"
        stroke="rgba(100,100,100,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          d: [
            "M0,8 Q6,0 12,8 Q18,0 24,8",
            "M0,8 Q6,4 12,8 Q18,4 24,8",
            "M0,8 Q6,0 12,8 Q18,0 24,8",
          ]
        }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />
    </motion.svg>
  );
}

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
      style={{ 
        top,
        left: '-30%',
        width: '300px',
        height: '120px',
        opacity,
      }}
      animate={{ 
        x: ['0vw', '130vw'],
        y: [0, -15, 10, -5, 0],
      }}
      transition={{ 
        x: { duration, delay, repeat: Infinity, ease: 'linear' },
        y: { duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }
      }}
    >
      <div 
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 70%)`,
          filter: 'blur(20px)',
          transform: `scale(${scale})`,
        }}
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#faf7f2]"
    >

      {/* Hero Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: 0 }}
      >
        <img 
          src="/Hero_image_2.JPG"
          alt="Hero"
          className="w-full h-full object-fill"
        />
      </motion.div>

      {/* Animated birds */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <Bird delay={0} duration={18} startY={15} />
        <Bird delay={5} duration={22} startY={25} reverse />
        <Bird delay={10} duration={20} startY={10} />
        <Bird delay={3} duration={25} startY={35} reverse scale={0.4} />
        <Bird delay={15} duration={19} startY={20} />
        <Bird delay={8} duration={24} startY={30} reverse scale={0.5} />
      </div>

      {/* Animated clouds */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        <Cloud top="5%" delay={0} duration={35} scale={1.2} opacity={0.6} />
        <Cloud top="15%" delay={8} duration={40} scale={0.8} opacity={0.4} />
        <Cloud top="8%" delay={16} duration={45} scale={1.0} opacity={0.5} />
        <Cloud top="20%" delay={24} duration={38} scale={0.6} opacity={0.3} />
      </div>

      {/* Floating decorative elements - small sparkles */}
      <div className="absolute inset-0 pointer-events-none z-[8]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[#8b7d6b] text-xs tracking-widest uppercase font-serif">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#d4af37] to-transparent" />
      </motion.div>
    </section>
  );
}