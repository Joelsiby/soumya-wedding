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

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#faf7f2]"
    >

      {/* Hero Video */}
      <motion.div
        className="absolute inset-0"
        style={{ y: 0 }}
      >
        <video
          src="/Hero_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
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
    </section>
  );
}