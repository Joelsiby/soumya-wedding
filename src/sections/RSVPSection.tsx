import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function RSVPSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    food: ''
  });

  const handleRSVPClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} className="relative w-full pt-10 pb-16 sm:pt-14 sm:pb-24 bg-[#faf7f2]">
      {/* Decorative flower, connected to the top-right border */}
      <motion.img
        src="/flower1.png"
        alt=""
        className="absolute right-0 h-40 sm:h-60 w-auto object-contain pointer-events-none select-none -top-[5rem] sm:-top-[7.5rem] z-0"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      />

      {/* Decorative flower, connected to the bottom-left border */}
      <motion.img
        src="/flower1.png"
        alt=""
        className="absolute bottom-0 h-40 sm:h-60 w-auto object-contain pointer-events-none select-none -translate-y-[10rem] sm:-translate-y-[13rem] -scale-x-100 z-0"
        style={{ left: '-1rem' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-5xl text-[#6b5b4e] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Confirm Your Attendance
        </motion.p>

        <motion.p
          className="font-serif text-center text-[#8b7d6b] mb-8 max-w-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          To help us prepare for a joyful celebration, kindly confirm your attendance.
        </motion.p>

        {/* RSVP Button */}
        <motion.button
          onClick={handleRSVPClick}
          className="relative px-12 py-4 rounded-full font-serif text-lg tracking-wider text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #c5d5e4 0%, #a8c0d8 100%)',
            boxShadow: '0 4px 20px rgba(168, 192, 216, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 6px 30px rgba(168, 192, 216, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={isInView ? { 
              opacity: [0, 1, 0],
              x: ['-100%', '100%'],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitted ? (
              <>
                <Check className="w-5 h-5" />
                Confirmed!
              </>
            ) : (
              'RSVP'
            )}
          </span>
        </motion.button>

        {/* Hope to see you */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="font-script text-2xl text-[#8b7d6b] mb-2">Hope to see you there!</p>
          <p className="font-display text-xl text-[#6b5b4e]">Agin & Aarati</p>
          
          <motion.div
            className="mt-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <img src="/blue_heart.png" alt="heart" className="w-12 sm:w-16 h-auto mx-auto opacity-80 drop-shadow-md" />
          </motion.div>
        </motion.div>
      </div>

      {/* RSVP Modal via Portal to escape all parents */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[9999] bg-white overflow-hidden flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="relative w-full h-full flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-gray-800 transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Top Image */}
                <div className="w-full h-48 sm:h-64 shrink-0 relative">
                  <img src="/couple_placeholder.png" alt="Couple" className="w-full h-full object-cover" />
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                  <div className="text-center mb-6">
                    <h2 className="font-serif text-2xl text-[#000] mb-2">Confirm Your Attendance!</h2>
                    <p className="font-serif text-[#000] text-sm">Please RSVP before September 30</p>
                  </div>

                  <form onSubmit={handleModalSubmit} className="flex flex-col gap-6 max-w-md mx-auto">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-serif text-[#000]">Your name</label>
                      <input
                        type="text"
                        required
                        className="border border-[#ccc] rounded-md px-3 py-2 outline-none focus:border-[#a8c0d8] font-serif transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    {/* Attendance */}
                    <div className="flex flex-col gap-3">
                      <label className="font-serif text-[#000]">Will you come?</label>
                      <div className="flex flex-col gap-2">
                        {['Yes, I will', 'Unfortunately, I cant :(', 'Ill tell you a bit later'].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${formData.attendance === option ? 'border-[#a8c0d8] bg-[#a8c0d8]' : 'border-[#ccc] group-hover:border-[#a8c0d8]'}`}>
                              {formData.attendance === option && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                            </div>
                            <span className="font-serif text-sm text-[#000]">{option}</span>
                            {/* Hidden radio for accessibility/form structure */}
                            <input
                              type="radio"
                              name="attendance"
                              value={option}
                              checked={formData.attendance === option}
                              onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                              className="hidden"
                              required
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Food */}
                    <div className="flex flex-col gap-2">
                      <label className="font-serif text-[#000]">Do have have any food intolerances?</label>
                      <input
                        type="text"
                        className="border border-[#ccc] rounded-md px-3 py-2 outline-none focus:border-[#a8c0d8] font-serif transition-colors"
                        value={formData.food}
                        onChange={(e) => setFormData({...formData, food: e.target.value})}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-2 w-full relative h-12 bg-[#9bc5d6] text-white font-serif rounded-full overflow-hidden hover:bg-[#8ab8cb] transition-colors flex items-center justify-center"
                    >
                      <span className="z-10">Submit</span>
                      <div className="absolute right-0 top-0 bottom-0 aspect-square bg-[#5f9eb8] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                      </div>
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
