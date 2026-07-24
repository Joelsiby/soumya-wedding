import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';

function addWeddingToCalendar() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Agin & Aarati Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:agin-aarati-wedding-2025@invite',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    'DTSTART:20250914T043000Z',
    'DTEND:20250914T190000Z',
    "SUMMARY:Agin & Aarati's Wedding",
    'LOCATION:KRISHNA INN\\, GURUVAYOOR (Star Hotel)\\, East Nada\\, Guruvayur\\, Kerala 680101',
    "DESCRIPTION:Join us as we celebrate Agin & Aarati's wedding!",
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

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

interface ScratchCardProps {
  value: string;
  label: string;
  delay: number;
}

let cachedPatternImg: HTMLImageElement | null = null;
function getPatternImage(onLoad: () => void): HTMLImageElement {
  if (!cachedPatternImg) {
    cachedPatternImg = new Image();
    cachedPatternImg.src = '/texture_paper.jpeg';
  }
  if (cachedPatternImg.complete) {
    onLoad();
  } else {
    cachedPatternImg.addEventListener('load', onLoad, { once: true });
  }
  return cachedPatternImg;
}

function ScratchCard({ value, delay }: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const hasInteracted = useRef(false);

  const initCanvas = useCallback(() => {
    if (hasInteracted.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    const drawPattern = () => {
      if (hasInteracted.current) return;
      const img = cachedPatternImg;
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // cover-fit crop of the pattern into the card
      const cardRatio = width / height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgRatio > cardRatio) {
        sw = img.naturalHeight * cardRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / cardRatio;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = `rgba(180, 150, 100, ${Math.random() * 0.08})`;
        ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
      }
    };

    getPatternImage(drawPattern);
    drawPattern();
  }, []);

  useEffect(() => {
    initCanvas();
    const t1 = setTimeout(initCanvas, 50);
    const t2 = setTimeout(initCanvas, 250);
    window.addEventListener('resize', initCanvas);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', initCanvas);
    };
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    hasInteracted.current = true;
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.9) {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let trans = 0;
      for (let i = 3; i < pixels.length; i += 40) {
        if (pixels[i] === 0) trans++;
      }
      if (trans > (pixels.length / 40) * 0.45) setIsScratched(true);
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const client = 'touches' in e ? e.touches[0] : e;
    scratch(client.clientX, client.clientY);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const client = 'touches' in e ? e.touches[0] : e;
    scratch(client.clientX, client.clientY);
  };

  const handleEnd = () => isDrawing.current = false;

  return (
    <motion.div
      className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer select-none"
      style={{ width: '27vw', maxWidth: '150px', boxShadow: '0 6px 20px rgba(0,0,0,0.18)' }}
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      {/* Revealed content */}
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center">
        <span className="font-display leading-none text-[#6b5b4e]" style={{ fontSize: '7vw' }}>{value}</span>
      </div>

      {/* Scratch overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-auto cursor-crosshair"
        style={{ touchAction: 'none' }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
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
          <span>Scratch to reveal the date</span>
          <span className="text-[#c9a84c]">&#10022;</span>
        </motion.div>

        {/* Scratch cards */}
        <div className="flex" style={{ gap: '2.5vw', marginTop: '4vw' }}>
          <ScratchCard value="14" label="Day" delay={0.2} />
          <ScratchCard value="Sep" label="Month" delay={0.4} />
          <ScratchCard value="2025" label="Year" delay={0.6} />
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
