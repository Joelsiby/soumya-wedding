import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';

const EVENT_TITLE = "Agin & Aarati's Wedding";
const EVENT_LOCATION = 'Alfa Horizon Business Centre, Goshree Rd, opposite ICTT, Vallarpadam, Kochi, Ernakulam, Kerala 682504';
const EVENT_DESCRIPTION = "Join us as we celebrate Agin & Aarati's wedding!";
const EVENT_START = '20261031T043000Z';
const EVENT_END = '20261031T190000Z';

function addWeddingToCalendar() {
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isAndroid) {
    // Android's Calendar app doesn't reliably pick up .ics downloads, but every
    // Android device with Google Calendar installed handles this URL directly.
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: EVENT_TITLE,
      dates: `${EVENT_START}/${EVENT_END}`,
      details: EVENT_DESCRIPTION,
      location: EVENT_LOCATION,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
    return;
  }

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Agin & Aarati Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:agin-aarati-wedding-2026@invite',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${EVENT_START}`,
    `DTEND:${EVENT_END}`,
    `SUMMARY:${EVENT_TITLE}`,
    `LOCATION:${EVENT_LOCATION.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${EVENT_DESCRIPTION}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });

  if (isIOS) {
    // iOS Safari blocks JS-driven navigation to data: URIs unless it's a base64
    // data URI applied directly to an <a> tag's click — this is the pattern real
    // "add to calendar" libraries use to open the native Calendar preview.
    const reader = new FileReader();
    reader.onload = () => {
      const link = document.createElement('a');
      link.href = reader.result as string;
      link.setAttribute('download', 'Agin-Aarati-Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    reader.readAsDataURL(blob);
    return;
  }

  // Desktop: browsers hand .ics blobs to the default calendar app via the download/open-with sheet.
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
        src="/reception_date.png"
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
        style={{ top: '22%', bottom: '32%', paddingLeft: '8%', paddingRight: '8%', gap: '2vw' }}
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

        {/* Date cards */}
        <div className="flex w-full justify-center" style={{ gap: '2.5vw', marginTop: '4vw' }}>
          <DateCard value="31" label="Day" delay={0.2} />
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
