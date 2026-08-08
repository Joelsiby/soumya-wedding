import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';

function addWeddingToCalendar() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Agin & Aarati Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:agin-aarati-wedding-2026@invite',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    'DTSTART:20261030T043000Z',
    'DTEND:20261030T190000Z',
    "SUMMARY:Agin & Aarati's Wedding",
    'LOCATION:KRISHNA INN\\, GURUVAYOOR (Star Hotel)\\, East Nada\\, Guruvayur\\, Kerala 680101',
    "DESCRIPTION:Join us as we celebrate Agin & Aarati's wedding!",
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // iOS Safari opens the native "Add Event" Calendar preview for a text/calendar
    // data: URI, but only via a plain <a> navigation — no `download` attribute
    // (that forces a generic file-save instead) and no `location.href =` assignment
    // (Safari blocks JS-driven data: URI navigation as an anti-phishing measure).
    const reader = new FileReader();
    reader.onload = () => {
      const link = document.createElement('a');
      link.href = reader.result as string;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    reader.readAsDataURL(blob);
    return;
  }

  // Android/desktop: browsers hand .ics blobs to the Calendar app via the download/open-with sheet.
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Agin-Aarati-Wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface DateCardProps {
  value: string;
  label: string;
  delay: number;
}

function DateCard({ value, delay }: DateCardProps) {
  return (
    <motion.div
      className="relative aspect-[3/4] rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        width: '27vw',
        maxWidth: '150px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
        backgroundImage: 'url(/texture_paper.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      <span className="font-display leading-none text-[#6b5b4e]" style={{ fontSize: '7vw' }}>{value}</span>
    </motion.div>
  );
}

export default function DateSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '736 / 1309' }}
    >
      {/* Full scale image */}
      <img
        src="/save_the_date.png"
        alt="Date"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/*
        Content sits inside the golden arch frame:
        - Frame starts ~36% from top, ends ~78% from top
        - Inner frame width occupies ~12%–88% horizontally
        We use top/bottom absolute positioning + horizontal padding to stay within the frame
      */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center justify-center"
        style={{ top: '22%', bottom: '32%', paddingLeft: '4%', paddingRight: '12%', gap: '2vw' }}
      >
        {/* Title */}
        <motion.p
          className="font-script text-[#7a5c3a] leading-none"
          style={{ fontSize: '8.5vw' }}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Save The Date
        </motion.p>

        <motion.div
          className="flex items-center text-[#9b7a4a] font-serif tracking-wider"
          style={{ gap: '1.2vw', fontSize: '3.2vw' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-[#c9a84c]">&#10022;</span>
          <span>Mark the date</span>
          <span className="text-[#c9a84c]">&#10022;</span>
        </motion.div>

        {/* Date cards */}
        <div className="flex" style={{ gap: '2.5vw', marginTop: '4vw' }}>
          <DateCard value="30" label="Day" delay={0.2} />
          <DateCard value="Oct" label="Month" delay={0.4} />
          <DateCard value="2026" label="Year" delay={0.6} />
        </div>

        {/* Labels */}
        <div className="flex" style={{ gap: '2.5vw' }}>
          {['DAY', 'MONTH', 'YEAR'].map((label, i) => (
            <motion.span
              key={label}
              className="text-center font-serif uppercase text-[#9b7a4a]"
              style={{ width: '27vw', maxWidth: '150px', fontSize: '3vw', letterSpacing: '0.15em' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              {label}
            </motion.span>
          ))}
        </div>

        {/* Add to calendar */}
        <motion.button
          onClick={addWeddingToCalendar}
          className="flex items-center text-[#7a5c3a] font-serif tracking-wider border border-[#c9a84c]/50 rounded-full cursor-pointer hover:bg-[#c9a84c]/10 transition-colors"
          style={{ gap: '1.5vw', fontSize: '2.8vw', marginTop: '4vw', marginLeft: '30vw', padding: '2vw 4vw' }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: [10, 0, 0, -8, 0] } : {}}
          transition={{
            opacity: { delay: 1.1, duration: 0.4 },
            y: { delay: 1.1, duration: 2, times: [0, 0.2, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 0.6 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <CalendarPlus style={{ width: '3.5vw', height: '3.5vw' }} />
          <span>Add to Calendar</span>
        </motion.button>
      </div>
    </section>
  );
}
