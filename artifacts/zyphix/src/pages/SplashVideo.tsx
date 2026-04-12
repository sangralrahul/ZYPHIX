import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

/* ── Design tokens — light theme ────────────────────────── */
const BG   = '#FFFFFF';
const BG2  = '#F8F9FA';
const T1   = '#0A0F1A';
const T2   = '#6B7280';
const G    = '#0DA366';
const G2   = '#065F46';
const GD   = 'linear-gradient(135deg,#0DA366 0%,#065F46 100%)';
const OR   = '#EA580C';
const ORD  = 'linear-gradient(135deg,#EA580C 0%,#C2410C 100%)';
const BD   = 'rgba(0,0,0,0.07)';
const OFT  = "'Outfit', sans-serif";
const INT  = "'Inter', sans-serif";
const EASE: [number,number,number,number] = [0.25, 0.46, 0.45, 0.94];
const DURATIONS = [4200, 5000, 5000, 4800, 6000];

function useAutoAdvance(total: number, onDone?: () => void) {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => {
      if (scene >= total - 1) {
        onDone?.();
        setScene(0);
      } else {
        setScene(s => s + 1);
      }
    }, DURATIONS[scene]);
    return () => clearTimeout(id);
  }, [scene, total, onDone]);
  const go = useCallback((i: number) => setScene(i), []);
  return { scene, go };
}

/* ── Shared: subtle grid pattern ────────────────────────── */
function Grid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      backgroundImage: `linear-gradient(${T1}07 1px, transparent 1px), linear-gradient(90deg, ${T1}07 1px, transparent 1px)`,
      backgroundSize: '6vw 6vw',
    }} />
  );
}

/* ── Shared: floating blob ───────────────────────────────── */
function Blob({ x, y, size, color, delay = 0 }: { x: string; y: string; size: string; color: string; delay?: number }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', background: color, filter: 'blur(48px)', pointerEvents: 'none', zIndex: 1 }}
      animate={{ scale: [1, 1.18, 0.92, 1.1, 1], x: [0, 18, -14, 8, 0], y: [0, -12, 20, -8, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Shared: floating emoji particle ────────────────────── */
function FloatEmoji({ emoji, x, y, delay = 0, size = '2.2vw' }: { emoji: string; x: string; y: string; delay?: number; size?: string }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, fontSize: size, pointerEvents: 'none', zIndex: 2, userSelect: 'none', opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0.4, 0.65, 0], y: [0, -18, -8, -22, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Shared: animated ring ───────────────────────────────── */
function Ring({ size, color, delay = 0 }: { size: string; color: string; delay?: number }) {
  return (
    <motion.div
      style={{ position: 'absolute', top: '50%', left: '50%', width: size, height: size, borderRadius: '50%', border: `1.5px solid ${color}`, transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 1 }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: [0.6, 1.4], opacity: [0.5, 0] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

/* ── Scene 1 — Brand Reveal ─────────────────────────────── */
function Scene1() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [250, 950, 1800, 3000].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: BG, overflow: 'hidden' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}>
      <Grid />

      {/* Animated background blobs */}
      <Blob x="-8%" y="-12%" size="45vw" color={`${G}0D`} delay={0} />
      <Blob x="62%" y="55%" size="38vw" color={`${G}08`} delay={1.5} />
      <Blob x="70%" y="-15%" size="30vw" color={`${T1}05`} delay={3} />

      {/* Pulsing rings behind icon */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -62%)', zIndex: 1 }}>
        <Ring size="18vw" color={`${G}30`} delay={0} />
        <Ring size="28vw" color={`${G}18`} delay={0.7} />
        <Ring size="40vw" color={`${G}0C`} delay={1.4} />
      </div>

      {/* Floating dots */}
      {[
        { x: '14%', y: '22%', s: 8, c: G, d: 0 },
        { x: '82%', y: '18%', s: 6, c: G, d: 1.2 },
        { x: '88%', y: '72%', s: 10, c: `${G}80`, d: 0.6 },
        { x: '10%', y: '75%', s: 7, c: `${T1}25`, d: 2 },
        { x: '48%', y: '12%', s: 5, c: G, d: 1.8 },
        { x: '25%', y: '85%', s: 9, c: `${G}60`, d: 0.4 },
      ].map((dot, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: dot.x, top: dot.y, width: dot.s, height: dot.s, borderRadius: '50%', background: dot.c, zIndex: 2, pointerEvents: 'none' }}
          animate={{ y: [0, -12, 6, -8, 0], opacity: [0.4, 0.8, 0.5, 0.9, 0.4] }}
          transition={{ duration: 4 + dot.d, delay: dot.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Icon */}
      <motion.div style={{ marginBottom: '3vh', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={ph >= 1 ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}>
        <div style={{ width: '8.5vw', height: '8.5vw', minWidth: 74, minHeight: 74, borderRadius: '22%', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 0 rgba(255,255,255,0.25) inset, 0 20px 60px ${G}40, 0 0 0 1px ${G}25` }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: '3.8vw', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
        {/* Shimmer sweep */}
        <motion.div
          style={{ position: 'absolute', inset: 0, borderRadius: '22%', background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)', pointerEvents: 'none' }}
          initial={{ x: '-100%' }}
          animate={ph >= 1 ? { x: '180%' } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Wordmark — letters stagger in */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'baseline', overflow: 'hidden' }}
        initial={{ opacity: 0 }}
        animate={ph >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.1 }}>
        {'ZYPH'.split('').map((ch, i) => (
          <motion.span key={i}
            style={{ fontFamily: OFT, fontWeight: 900, fontSize: '12vw', color: T1, letterSpacing: '-0.055em', lineHeight: 0.87, display: 'inline-block' }}
            initial={{ opacity: 0, y: 40 }}
            animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
          >{ch}</motion.span>
        ))}
        {'IX'.split('').map((ch, i) => (
          <motion.span key={i}
            style={{ fontFamily: OFT, fontWeight: 900, fontSize: '12vw', color: G, letterSpacing: '-0.055em', lineHeight: 0.87, display: 'inline-block' }}
            initial={{ opacity: 0, y: 40 }}
            animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: (4 + i) * 0.07, ease: EASE }}
          >{ch}</motion.span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p style={{ position: 'relative', zIndex: 10, fontFamily: INT, fontSize: '1.3vw', fontWeight: 500, color: T2, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '2.2vh' }}
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={ph >= 3 ? { opacity: 1, letterSpacing: '0.25em' } : {}}
        transition={{ duration: 1.1, ease: EASE }}>
        India's SuperLocal App
      </motion.p>

      {/* Location pill */}
      <motion.div style={{ position: 'relative', zIndex: 10, marginTop: '3vh', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 50, border: `1.5px solid ${G}40`, background: `${G}08`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.1vw' }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={ph >= 4 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}>
        <motion.span
          style={{ width: 7, height: 7, borderRadius: '50%', background: G, display: 'inline-block' }}
          animate={{ boxShadow: [`0 0 0px ${G}`, `0 0 10px ${G}`, `0 0 0px ${G}`] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        Launching in Jammu, J&amp;K
      </motion.div>
    </motion.div>
  );
}

/* ── Scene 2 — ZyphixNow ────────────────────────────────── */
function Scene2() {
  const [ph, setPh] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const ts = [150, 600, 1200, 2000, 4300].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);
  useEffect(() => {
    if (ph < 2) return;
    let n = 0;
    const id = setInterval(() => { n += 2; setCount(Math.min(n, 30)); if (n >= 30) clearInterval(id); }, 40);
    return () => clearInterval(id);
  }, [ph]);

  return (
    <motion.div className="absolute inset-0 flex items-stretch overflow-hidden"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}>
      <Grid />

      {/* Blobs */}
      <Blob x="-5%" y="30%" size="32vw" color={`${G}0C`} delay={0} />
      <Blob x="55%" y="-10%" size="28vw" color={`${G}08`} delay={2} />

      {/* Speed lines top-left */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div key={i}
          style={{ position: 'absolute', left: 0, top: `${20 + i * 12}%`, height: 1.5, background: `linear-gradient(to right, transparent, ${G}40, transparent)`, borderRadius: 2, zIndex: 2, pointerEvents: 'none' }}
          animate={{ width: ['0%', '35%', '0%'], x: ['-5%', '0%', '8%'], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.4, delay: 0.6 + i * 0.18, repeat: Infinity, repeatDelay: 2.5, ease: EASE }}
        />
      ))}

      {/* Floating grocery emojis */}
      {[
        { e: '🥦', x: '56%', y: '8%', d: 0.3 }, { e: '🧅', x: '72%', y: '22%', d: 1.1 },
        { e: '🍅', x: '85%', y: '50%', d: 0.7 }, { e: '🥛', x: '62%', y: '75%', d: 1.8 },
        { e: '🍎', x: '78%', y: '82%', d: 0.5 }, { e: '🥕', x: '90%', y: '12%', d: 2.1 },
      ].map((it, i) => (
        <FloatEmoji key={i} emoji={it.e} x={it.x} y={it.y} delay={it.d} size="2.4vw" />
      ))}

      {/* Left accent line */}
      <motion.div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: GD, zIndex: 5 }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={ph >= 1 ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }} />

      {/* Left — Text */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4vw 0 8vw', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '2.5vh' }}
          initial={{ opacity: 0, x: -24 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${G}35` }}>
            <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: 13, color: '#fff' }}>//</span>
          </div>
          <span style={{ fontFamily: INT, fontWeight: 600, fontSize: '1.1vw', color: T2, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Zyphix Now</span>
        </motion.div>

        <motion.h2 style={{ fontFamily: OFT, fontWeight: 900, fontSize: '6.2vw', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 28 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          <span style={{ color: T1, display: 'block' }}>Grocery</span>
          <motion.span style={{ color: G, display: 'block', position: 'relative' }}>
            in{' '}
            <motion.span style={{ fontVariantNumeric: 'tabular-nums' }}>
              {ph >= 2 ? count : 0}
            </motion.span>{' '}
            mins.
          </motion.span>
        </motion.h2>

        <motion.p style={{ fontFamily: INT, fontSize: '1.4vw', color: T2, fontWeight: 400, lineHeight: 1.7, marginBottom: '3.5vh', maxWidth: '27vw' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.75, ease: EASE }}>
          Straight from your neighbourhood kirana store, delivered to your door in minutes.
        </motion.p>

        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 20px', borderRadius: 8, background: `${G}0E`, border: `1.5px solid ${G}30`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.05vw', width: 'fit-content' }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          🏪 Kirana Partners · Jammu
        </motion.div>
      </div>

      {/* Right — Image */}
      <div style={{ flex: '0 0 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Rotating dashed ring */}
        <motion.div
          style={{ position: 'absolute', width: '32vw', height: '32vw', borderRadius: '50%', border: `2px dashed ${G}25`, pointerEvents: 'none', zIndex: 3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div style={{ position: 'absolute', width: '36vw', height: '36vw', borderRadius: '50%', background: `radial-gradient(circle, ${G}0C, transparent 70%)`, pointerEvents: 'none' }} />
        <motion.div style={{ position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, x: 40, scale: 0.88 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: EASE }}>
          <div style={{ width: '27vw', height: '27vw', borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 0 1px ${G}20, 0 8px 32px rgba(0,0,0,0.1), 0 40px 80px rgba(0,0,0,0.08)` }}>
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=85" alt="groceries" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `2px solid ${G}22`, pointerEvents: 'none' }} />
          {/* Floating badge */}
          <motion.div
            style={{ position: 'absolute', bottom: '8%', left: '-14%', background: '#fff', borderRadius: 10, padding: '8px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 20, border: `1px solid ${G}20` }}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={ph >= 3 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}>
            <span style={{ fontSize: '1.3vw' }}>⚡</span>
            <div>
              <p style={{ fontFamily: OFT, fontWeight: 800, fontSize: '1.1vw', color: T1, lineHeight: 1 }}>Express</p>
              <p style={{ fontFamily: INT, fontSize: '0.85vw', color: T2, lineHeight: 1.3 }}>30 min delivery</p>
            </div>
          </motion.div>
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 12%)`, pointerEvents: 'none' }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 3 — ZyphixEats ───────────────────────────────── */
function Scene3() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [150, 600, 1200, 2000, 4300].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-row-reverse items-stretch overflow-hidden"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}>
      <Grid />

      {/* Blobs */}
      <Blob x="60%" y="40%" size="35vw" color={`${OR}0A`} delay={0} />
      <Blob x="5%" y="-5%" size="25vw" color={`${OR}06`} delay={1.8} />

      {/* Animated orange arc sweep */}
      <motion.div
        style={{ position: 'absolute', right: '-5%', top: '-20%', width: '60vw', height: '60vw', borderRadius: '50%', border: `80px solid ${OR}07`, pointerEvents: 'none', zIndex: 1 }}
        animate={{ rotate: [0, 20, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating food emojis */}
      {[
        { e: '🍕', x: '8%',  y: '10%', d: 0.4 }, { e: '🍛', x: '18%', y: '78%', d: 1.3 },
        { e: '🍔', x: '5%',  y: '48%', d: 0.9 }, { e: '🥗', x: '26%', y: '15%', d: 2.0 },
        { e: '🍜', x: '12%', y: '65%', d: 0.2 }, { e: '🧆', x: '32%', y: '88%', d: 1.6 },
      ].map((it, i) => (
        <FloatEmoji key={i} emoji={it.e} x={it.x} y={it.y} delay={it.d} size="2.4vw" />
      ))}

      {/* Right accent line */}
      <motion.div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 3, background: ORD, zIndex: 5 }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={ph >= 1 ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }} />

      {/* Right — Text */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw 0 4vw', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '2.5vh' }}
          initial={{ opacity: 0, x: 24 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: ORD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${OR}35` }}>
            <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: 13, color: '#fff' }}>//</span>
          </div>
          <span style={{ fontFamily: INT, fontWeight: 600, fontSize: '1.1vw', color: T2, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Zyphix Eats</span>
        </motion.div>

        <motion.h2 style={{ fontFamily: OFT, fontWeight: 900, fontSize: '6.2vw', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 28 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          <span style={{ color: T1, display: 'block' }}>Cravings</span>
          <span style={{ color: OR, display: 'block' }}>delivered fast.</span>
        </motion.h2>

        <motion.p style={{ fontFamily: INT, fontSize: '1.4vw', color: T2, fontWeight: 400, lineHeight: 1.7, marginBottom: '3.5vh', maxWidth: '27vw' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.75, ease: EASE }}>
          Your favourite restaurants, at your door — hot and on time.
        </motion.p>

        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 20px', borderRadius: 8, background: `${OR}0E`, border: `1.5px solid ${OR}30`, color: OR, fontFamily: INT, fontWeight: 600, fontSize: '1.05vw', width: 'fit-content' }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          🍱 Restaurants joining · Jammu
        </motion.div>
      </div>

      {/* Left — Image */}
      <div style={{ flex: '0 0 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Rotating dashed ring */}
        <motion.div
          style={{ position: 'absolute', width: '32vw', height: '32vw', borderRadius: '26%', border: `2px dashed ${OR}25`, pointerEvents: 'none', zIndex: 3 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <div style={{ position: 'absolute', width: '36vw', height: '36vw', background: `radial-gradient(circle, ${OR}0C, transparent 70%)`, pointerEvents: 'none' }} />
        <motion.div style={{ position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, x: -40, scale: 0.88 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: EASE }}>
          <div style={{ width: '27vw', height: '27vw', borderRadius: '26%', overflow: 'hidden', boxShadow: `0 0 0 1px ${OR}20, 0 8px 32px rgba(0,0,0,0.1), 0 40px 80px rgba(0,0,0,0.08)` }}>
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=85" alt="food" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', inset: -6, borderRadius: '26%', border: `2px solid ${OR}22`, pointerEvents: 'none' }} />
          {/* Hot badge */}
          <motion.div
            style={{ position: 'absolute', top: '6%', right: '-16%', background: '#fff', borderRadius: 10, padding: '8px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 20, border: `1px solid ${OR}20` }}
            initial={{ opacity: 0, y: -16, scale: 0.85 }}
            animate={ph >= 3 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}>
            <span style={{ fontSize: '1.3vw' }}>🔥</span>
            <div>
              <p style={{ fontFamily: OFT, fontWeight: 800, fontSize: '1.1vw', color: T1, lineHeight: 1 }}>Hot & Fresh</p>
              <p style={{ fontFamily: INT, fontSize: '0.85vw', color: T2, lineHeight: 1.3 }}>From local restaurants</p>
            </div>
          </motion.div>
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, ${BG} 0%, transparent 12%)`, pointerEvents: 'none' }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 4 — Jammu (light theme) ──────────────────────── */
function Scene4() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [400, 1100, 2000, 3200].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-start overflow-hidden"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}>
      <Grid />

      {/* Blobs */}
      <Blob x="30%" y="-20%" size="50vw" color={`${G}07`} delay={0} />
      <Blob x="-10%" y="50%" size="30vw" color={`${G}0A`} delay={2} />

      {/* Animated diagonal stripe accent */}
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          style={{ position: 'absolute', top: 0, bottom: 0, left: `${28 + i * 3}%`, width: 1, background: `linear-gradient(to bottom, transparent, ${G}18, transparent)`, pointerEvents: 'none', zIndex: 1 }}
          animate={{ scaleY: [0, 1, 0], y: ['100%', '0%', '-100%'] }}
          transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      ))}

      {/* Right side — city photo */}
      <motion.div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '46%', overflow: 'hidden' }}
        initial={{ opacity: 0, x: 60 }} animate={ph >= 1 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: EASE }}>
        <motion.img src="https://images.unsplash.com/photo-1609180947982-0e2a63bf2c0f?w=1200&q=85"
          alt="Jammu" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: 'linear' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 35%)` }} />
      </motion.div>

      {/* Floating location pins */}
      {[{ x: '55%', y: '15%', d: 0.5 }, { x: '72%', y: '60%', d: 1.4 }, { x: '88%', y: '30%', d: 0.9 }].map((p, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: p.x, top: p.y, zIndex: 3, fontSize: '2vw', pointerEvents: 'none', opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: [0, -15, 0] }}
          transition={{ duration: 3, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}>
          📍
        </motion.div>
      ))}

      {/* Left side — text */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 0 0 8vw', maxWidth: '60vw' }}>
        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 50, background: `${G}15`, border: `1.5px solid ${G}30`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.05vw', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          📍 Proudly born in
        </motion.div>

        {/* JAMMU with character stagger */}
        <div style={{ display: 'flex', marginBottom: '3.5vh', overflow: 'hidden' }}>
          {'JAMMU'.split('').map((ch, i) => (
            <motion.span key={i}
              style={{ fontFamily: OFT, fontWeight: 900, fontSize: '13.5vw', color: T1, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', display: 'inline-block' }}
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={ph >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }}
            >{ch}</motion.span>
          ))}
        </div>

        <motion.p style={{ fontFamily: INT, fontSize: '1.65vw', color: T2, fontWeight: 400, lineHeight: 1.65, marginBottom: '4vh' }}
          initial={{ opacity: 0 }}
          animate={ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}>
          J&amp;K — Building for the Himalayas &amp; beyond.
        </motion.p>

        <motion.div style={{ display: 'flex', gap: '4.5vw' }}
          initial={{ opacity: 0, y: 14 }}
          animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          {[['5L+', 'Customers'], ['100+', 'Partners'], ['4.8★', 'Rating']].map(([v, l], i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}>
              <p style={{ fontFamily: OFT, fontWeight: 900, fontSize: '3.8vw', color: T1, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</p>
              <p style={{ fontFamily: INT, fontSize: '1.05vw', color: T2, marginTop: 5 }}>{l}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Scene 5 — Outro / CTA ──────────────────────────────── */
function Scene5({ onDone }: { onDone?: () => void }) {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [350, 1000, 1750, 3000, 5400].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: BG, overflow: 'hidden' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 1.03, opacity: 0 }}
      transition={{ duration: 0.75 }}>
      <Grid />

      {/* Blobs */}
      <Blob x="-10%" y="-10%" size="40vw" color={`${G}08`} delay={0} />
      <Blob x="65%" y="60%" size="35vw" color={`${OR}07`} delay={1.5} />
      <Blob x="70%" y="-5%" size="28vw" color={`${G}06`} delay={3} />

      {/* Expanding celebration rings */}
      {ph >= 1 && (
        <>
          <Ring size="20vw" color={`${G}35`} delay={0} />
          <Ring size="35vw" color={`${G}20`} delay={0.5} />
          <Ring size="55vw" color={`${G}10`} delay={1} />
          <Ring size="75vw" color={`${G}07`} delay={1.5} />
        </>
      )}

      {/* Floating confetti dots */}
      {Array.from({ length: 14 }).map((_, i) => {
        const colors = [G, OR, G2, `${G}80`, `${OR}80`];
        return (
          <motion.div key={i}
            style={{
              position: 'absolute',
              left: `${5 + i * 7}%`, top: `${10 + (i % 5) * 18}%`,
              width: 6 + (i % 4) * 3, height: 6 + (i % 4) * 3,
              borderRadius: i % 3 === 0 ? '50%' : 3,
              background: colors[i % colors.length],
              opacity: 0, zIndex: 2, pointerEvents: 'none',
            }}
            animate={ph >= 1 ? { opacity: [0, 0.7, 0], y: [0, -40, -80], rotate: [0, 180, 360] } : {}}
            transition={{ duration: 3 + (i % 3), delay: 0.05 * i, repeat: Infinity, repeatDelay: 1.5 + (i % 3) * 0.4 }}
          />
        );
      })}

      {/* Logo */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1.8vw', marginBottom: '3.5vh' }}
        initial={{ opacity: 0, y: 24 }}
        animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}>
        <div style={{ width: '7.5vw', height: '7.5vw', minWidth: 62, minHeight: 62, borderRadius: '22%', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 0 rgba(255,255,255,0.25) inset, 0 16px 50px ${G}40, 0 0 0 1px ${G}22` }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: '3.3vw', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          {'ZYPH'.split('').map((ch, i) => (
            <motion.span key={i}
              style={{ fontFamily: OFT, fontWeight: 900, fontSize: '9.5vw', color: T1, lineHeight: 0.87, letterSpacing: '-0.055em', display: 'inline-block' }}
              initial={{ opacity: 0, y: 30 }}
              animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: EASE }}
            >{ch}</motion.span>
          ))}
          {'IX'.split('').map((ch, i) => (
            <motion.span key={i}
              style={{ fontFamily: OFT, fontWeight: 900, fontSize: '9.5vw', color: G, lineHeight: 0.87, letterSpacing: '-0.055em', display: 'inline-block' }}
              initial={{ opacity: 0, y: 30 }}
              animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: EASE }}
            >{ch}</motion.span>
          ))}
        </div>
      </motion.div>

      {/* Service tags */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '2vw', marginBottom: '3.5vh' }}
        initial={{ opacity: 0, y: 12 }}
        animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}>
        {[{ n: 'ZyphixNow', c: G, e: '🛒' }, { n: 'ZyphixEats', c: OR, e: '🍽️' }].map(({ n, c, e }) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 20px', borderRadius: 8, border: `1.5px solid ${c}28`, background: `${c}07`, color: T1, fontFamily: INT, fontWeight: 600, fontSize: '1.2vw' }}>
            <span>{e}</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', boxShadow: `0 0 8px ${c}` }} />
            {n}
          </div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div style={{ position: 'relative', zIndex: 10, width: 1, height: '3.5vh', background: BD, marginBottom: '3.5vh' }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={ph >= 3 ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.45, ease: EASE }} />

      {/* Tagline */}
      <motion.p style={{ position: 'relative', zIndex: 10, fontFamily: INT, fontSize: '1.55vw', color: T2, fontWeight: 400, marginBottom: '3.5vh', letterSpacing: '0.18em', textTransform: 'uppercase' }}
        initial={{ opacity: 0 }}
        animate={ph >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.75, ease: EASE }}>
        India's SuperLocal App
      </motion.p>

      {/* CTA */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '1.5vw', alignItems: 'center' }}
        initial={{ opacity: 0, y: 16 }}
        animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}>
        <Link href="/">
          <motion.button onClick={onDone}
            style={{ padding: '14px 48px', borderRadius: 8, background: GD, color: '#fff', fontFamily: OFT, fontWeight: 800, fontSize: '1.45vw', cursor: 'pointer', border: 'none', letterSpacing: '-0.01em', position: 'relative', overflow: 'hidden' }}
            animate={{ boxShadow: [`0 8px 32px ${G}40, 0 0 0 1px ${G}25`, `0 12px 48px ${G}65, 0 0 0 1px ${G}45`, `0 8px 32px ${G}40, 0 0 0 1px ${G}25`] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.975 }}>
            Join the Waitlist →
          </motion.button>
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.p style={{ position: 'absolute', bottom: 24, fontFamily: INT, fontSize: '1vw', color: 'rgba(0,0,0,0.22)', fontWeight: 400 }}
        initial={{ opacity: 0 }}
        animate={ph >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}>
        Clavix Technologies Pvt. Ltd.
      </motion.p>

      {/* Bottom progress line */}
      <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2.5, background: BD, zIndex: 10 }}
        initial={{ opacity: 0 }} animate={ph >= 3 ? { opacity: 1 } : {}}>
        <motion.div style={{ height: '100%', background: GD }}
          initial={{ width: '0%' }}
          animate={ph >= 3 ? { width: '100%' } : {}}
          transition={{ duration: 3.5, ease: 'linear' }} />
      </motion.div>
    </motion.div>
  );
}

/* ── SplashVideoCore — embeddable, no nav ───────────────── */
export function SplashVideoCore({ onDone }: { onDone?: () => void }) {
  const { scene, go } = useAutoAdvance(5, onDone);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: BG }}>
      {/* Scene dots — top right */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, display: 'flex', alignItems: 'center', gap: 5 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.button key={i} onClick={() => go(i)}
            style={{ height: 3, borderRadius: 3, background: i === scene ? G : 'rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
            animate={{ width: i === scene ? 24 : 8, opacity: i === scene ? 1 : 0.45 }}
            transition={{ duration: 0.32 }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 20, width: '100%', height: '100%' }}>
        <AnimatePresence mode="popLayout">
          {scene === 0 && <Scene1 key="s1" />}
          {scene === 1 && <Scene2 key="s2" />}
          {scene === 2 && <Scene3 key="s3" />}
          {scene === 3 && <Scene4 key="s4" />}
          {scene === 4 && <Scene5 key="s5" onDone={onDone} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── SplashVideo — standalone page with back nav ────────── */
export function SplashVideo() {
  const [, setLoc] = useState('');
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <button
        onClick={() => window.history.back()}
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 200, padding: '8px 18px', borderRadius: 7, background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.09)', color: T2, fontFamily: INT, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        ← Back
      </button>
      <SplashVideoCore />
    </div>
  );
}
