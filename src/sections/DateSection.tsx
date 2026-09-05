import { useRef } from 'react';
import { motion } from 'framer-motion';

interface DateColumnProps {
  value: string;
  label: string;
  delay: number;
  showDivider: boolean;
}

function DateColumn({ value, label, delay, showDivider }: DateColumnProps) {
  return (
    <div className="flex items-center">
      <motion.div
        className="flex flex-col items-center"
        style={{ minWidth: '18vw' }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display leading-none text-[#6b5b4e]" style={{ fontSize: '7.5vw' }}>
          {value}
        </span>
        <span
          className="font-serif uppercase text-[#9b7a4a]"
          style={{ fontSize: '2.5vw', letterSpacing: '0.15em', marginTop: '1vw' }}
        >
          {label}
        </span>
      </motion.div>
      {showDivider && (
        <div className="bg-[#c9b79a]" style={{ width: '1px', height: '5vw', margin: '0 3vw' }} />
      )}
    </div>
  );
}

export default function DateSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <motion.p
        className="font-script text-[#7a5c3a] leading-tight text-center px-4"
        style={{ fontSize: '7vw' }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        We're so happy to celebrate<br />this day with you.
      </motion.p>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1920 / 1542' }}
      >
        {/* Frame background */}
        <img
          src="/date_image.jpg"
          alt="Date frame"
          className="absolute inset-0 w-full h-full object-fill"
        />

      {/* Content sits inside the watercolor frame's inner border */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center justify-center"
        style={{ top: '20%', bottom: '20%', paddingLeft: '10%', paddingRight: '10%', gap: '1.5vw' }}
      >
        {/* Date values, no cards — inline with thin dividers */}
        <div className="flex items-center justify-center" style={{ marginTop: '1.5vw' }}>
          <DateColumn value="26" label="Day" delay={0.4} showDivider />
          <DateColumn value="Nov" label="Month" delay={0.5} showDivider />
          <DateColumn value="2026" label="Year" delay={0.6} showDivider={false} />
        </div>
      </div>
      </section>

      {/* Couple photo in decorative oval frame */}
      <motion.p
        className="font-display italic text-[#4a5d3a] text-center leading-relaxed px-6"
        style={{ fontSize: '4vw' }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Having you with us means the world. Your presence is the greatest gift we could ask for as we begin this beautiful new chapter, hand in hand.
      </motion.p>

      <div className="w-full flex justify-center py-6 px-6">
        <div
          className="relative w-full"
          style={{ maxWidth: '500px', aspectRatio: '1287 / 1920' }}
        >
          {/* Photo, cropped to an oval to sit inside the frame's opening */}
          <div
            className="absolute overflow-hidden bg-[#e8e2d8]"
            style={{
              top: '17.5%',
              bottom: '18.2%',
              left: '18.1%',
              right: '18.1%',
              clipPath: 'ellipse(50% 50% at 50% 50%)',
            }}
          >
            <img
              src="/couple_img_1.jpeg"
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Frame overlay */}
          <img
            src="/frame_image.jpg"
            alt=""
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
}
