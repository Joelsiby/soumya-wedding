import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const dressImages = [
  '/couple_img_1.jpeg',
  '/couple_img_2.jpeg',
  '/couple_img_3.jpeg',
  '/couple_img_4.jpeg',
  '/couple_img_5.jpeg',
  '/couple_img_6.jpeg',
  '/couple_img_7.jpeg',
];

const colorSwatches = [
  { name: 'Blush', color: '#f5d5c8' },
  { name: 'Sage', color: '#c5d5c4' },
  { name: 'Dusty Blue', color: '#c5d5e4' },
  { name: 'Champagne', color: '#f0e6d3' },
  { name: 'Soft Peach', color: '#f5d5c0' },
];

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const scrollGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full pt-16 pb-10 sm:pt-24 sm:pb-14 bg-[#faf7f2]">
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-5xl text-[#6b5b4e] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Be Part of Our Moment
        </motion.p>

        <motion.p
          className="font-serif text-center text-[#8b7d6b] mb-8 max-w-xs leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          A few of our favourite moments together.
          <br />
          We can't wait to make more memories with you by our side.
        </motion.p>

        {/* Scroll hint */}
        <motion.button
          onClick={scrollGallery}
          className="flex items-center gap-1 text-[#9b8b7a] text-xs tracking-wider mb-4 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <span className="font-serif">scroll</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Horizontal gallery */}
        <motion.div
          ref={galleryRef}
          className="gallery-scroll flex gap-4 sm:gap-6 w-full max-w-4xl pb-4 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {dressImages.map((img, i) => (
            <motion.div
              key={i}
              className="gallery-item w-[260px] sm:w-[340px] rounded-none overflow-hidden shadow-soft flex-shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img
                src={img}
                alt={`Dress code inspiration ${i + 1}`}
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* The Dress heading */}
        <motion.p
          className="font-script text-3xl sm:text-4xl text-[#6b5b4e] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The Dress
        </motion.p>

        {/* Color swatches */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="font-serif text-sm text-[#8b7d6b] tracking-wider">Colours:</p>
          <div className="flex gap-3">
            {colorSwatches.map((swatch, i) => (
              <motion.div
                key={swatch.name}
                className="color-swatch w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer relative group"
                style={{ backgroundColor: swatch.color }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Tooltip */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[#8b7d6b] font-serif opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {swatch.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dress recommendations */}
        <motion.div
          className="mt-8 max-w-sm text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="font-serif text-sm text-[#8b7d6b]">
            <span className="text-[#6b5b4e] font-medium">Ladies:</span> Elegant summer dresses in pastel tones. We recommend bringing a hat and sunglasses for comfort.
          </p>
          <p className="font-serif text-sm text-[#8b7d6b]">
            <span className="text-[#6b5b4e] font-medium">Gentlemen:</span> Suits or shirts in classic shades. Grey, blue, brown, beige are great choices!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
