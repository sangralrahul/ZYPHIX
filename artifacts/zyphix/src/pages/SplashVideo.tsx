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
      if (scene >= total - 1) { onDone?.(); return; }
      setScene(s => s + 1);
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

/* ── Scene 1 — Brand Reveal ─────────────────────────────── */
function Scene1() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [250, 950, 1800, 3000].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}>
      <Grid />

      {/* Radial green tint */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(55% 55% at 50% 50%, ${G}08 0%, transparent 100%)`, pointerEvents: 'none' }} />

      {/* Icon */}
      <motion.div style={{ marginBottom: '3vh', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={ph >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.65, ease: EASE }}>
        <div style={{ width: '8.5vw', height: '8.5vw', minWidth: 74, minHeight: 74, borderRadius: '22%', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 0 rgba(255,255,255,0.25) inset, 0 20px 60px ${G}35, 0 0 0 1px ${G}20` }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: '3.8vw', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
      </motion.div>

      {/* Wordmark */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'baseline' }}
        initial={{ opacity: 0, y: 16 }}
        animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}>
        <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '12vw', color: T1, letterSpacing: '-0.055em', lineHeight: 0.87 }}>ZYPH</span>
        <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '12vw', color: G,  letterSpacing: '-0.055em', lineHeight: 0.87 }}>IX</span>
      </motion.div>

      {/* Tagline */}
      <motion.p style={{ position: 'relative', zIndex: 10, fontFamily: INT, fontSize: '1.3vw', fontWeight: 500, color: T2, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '2.2vh' }}
        initial={{ opacity: 0 }}
        animate={ph >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}>
        India's SuperLocal App
      </motion.p>

      {/* Location pill */}
      <motion.div style={{ position: 'relative', zIndex: 10, marginTop: '3vh', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 50, border: `1.5px solid ${G}40`, background: `${G}08`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.1vw' }}
        initial={{ opacity: 0 }}
        animate={ph >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, display: 'inline-block', boxShadow: `0 0 5px ${G}` }} />
        Launching in Jammu, J&amp;K
      </motion.div>
    </motion.div>
  );
}

/* ── Scene 2 — ZyphixNow ────────────────────────────────── */
function Scene2() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [150, 600, 1200, 2000, 4300].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-stretch overflow-hidden"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}>
      <Grid />

      {/* Left accent line */}
      <motion.div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: GD }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={ph >= 1 ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }} />

      {/* Left — Text */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4vw 0 8vw', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 14 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${G}35` }}>
            <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: 13, color: '#fff' }}>//</span>
          </div>
          <span style={{ fontFamily: INT, fontWeight: 600, fontSize: '1.1vw', color: T2, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Zyphix Now</span>
        </motion.div>

        <motion.h2 style={{ fontFamily: OFT, fontWeight: 900, fontSize: '6.2vw', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 24 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          <span style={{ color: T1, display: 'block' }}>Grocery</span>
          <span style={{ color: G, display: 'block' }}>in 30 mins.</span>
        </motion.h2>

        <motion.p style={{ fontFamily: INT, fontSize: '1.4vw', color: T2, fontWeight: 400, lineHeight: 1.7, marginBottom: '3.5vh', maxWidth: '27vw' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.75, ease: EASE }}>
          Straight from your neighbourhood kirana store, delivered to your door in minutes.
        </motion.p>

        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 20px', borderRadius: 8, background: `${G}0E`, border: `1.5px solid ${G}30`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.05vw', width: 'fit-content' }}
          initial={{ opacity: 0, y: 8 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          🏪 Kirana Partners · Jammu
        </motion.div>
      </div>

      {/* Right — Image */}
      <div style={{ flex: '0 0 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '36vw', height: '36vw', borderRadius: '50%', background: `radial-gradient(circle, ${G}0C, transparent 70%)`, pointerEvents: 'none' }} />
        <motion.div style={{ position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, x: 36, scale: 0.93 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: EASE }}>
          <div style={{ width: '27vw', height: '27vw', borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 0 1px ${G}20, 0 8px 32px rgba(0,0,0,0.1), 0 40px 80px rgba(0,0,0,0.08)` }}>
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=85" alt="groceries" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Green ring */}
          <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `2px solid ${G}22`, pointerEvents: 'none' }} />
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

      {/* Right accent line */}
      <motion.div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 3, background: ORD }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={ph >= 1 ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }} />

      {/* Right — Text */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw 0 4vw', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 14 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: ORD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${OR}35` }}>
            <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: 13, color: '#fff' }}>//</span>
          </div>
          <span style={{ fontFamily: INT, fontWeight: 600, fontSize: '1.1vw', color: T2, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Zyphix Eats</span>
        </motion.div>

        <motion.h2 style={{ fontFamily: OFT, fontWeight: 900, fontSize: '6.2vw', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 24 }}
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
          initial={{ opacity: 0, y: 8 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}>
          🍱 Restaurants joining · Jammu
        </motion.div>
      </div>

      {/* Left — Image */}
      <div style={{ flex: '0 0 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '36vw', height: '36vw', background: `radial-gradient(circle, ${OR}0C, transparent 70%)`, pointerEvents: 'none' }} />
        <motion.div style={{ position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, x: -36, scale: 0.93 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: EASE }}>
          <div style={{ width: '27vw', height: '27vw', borderRadius: '26%', overflow: 'hidden', boxShadow: `0 0 0 1px ${OR}20, 0 8px 32px rgba(0,0,0,0.1), 0 40px 80px rgba(0,0,0,0.08)` }}>
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=85" alt="food" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', inset: -6, borderRadius: '26%', border: `2px solid ${OR}22`, pointerEvents: 'none' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, ${BG} 0%, transparent 12%)`, pointerEvents: 'none' }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 4 — Jammu (dark cinematic) ───────────────────── */
function Scene4() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [400, 1100, 2000, 3200].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-end justify-start overflow-hidden"
      style={{ background: '#07090C' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}>

      <motion.img src="https://images.unsplash.com/photo-1609180947982-0e2a63bf2c0f?w=1800&q=85"
        alt="Jammu" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.42 }}
        initial={{ scale: 1.07 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: 'linear' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #07090C 0%, rgba(7,9,12,0.75) 22%, rgba(7,9,12,0.35) 55%, transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,9,12,0.85) 0%, transparent 55%)' }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '0 0 8vh 8vw', maxWidth: '68vw' }}>
        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 50, background: G, color: '#fff', fontFamily: INT, fontWeight: 600, fontSize: '1.05vw', marginBottom: '2.5vh', boxShadow: `0 4px 18px ${G}50` }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          📍 Proudly born in
        </motion.div>

        <motion.h2 style={{ fontFamily: OFT, fontWeight: 900, fontSize: '13.5vw', color: '#fff', lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '3.5vh' }}
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
          animate={ph >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: EASE }}>
          Jammu
        </motion.h2>

        <motion.p style={{ fontFamily: INT, fontSize: '1.65vw', color: 'rgba(255,255,255,0.5)', fontWeight: 400, lineHeight: 1.65, marginBottom: '4vh' }}
          initial={{ opacity: 0 }}
          animate={ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}>
          J&amp;K — Building for the Himalayas &amp; beyond.
        </motion.p>

        <motion.div style={{ display: 'flex', gap: '4.5vw' }}
          initial={{ opacity: 0, y: 14 }}
          animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          {[['5L+', 'Customers'], ['100+', 'Cities'], ['4.8★', 'Rating']].map(([v, l], i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={ph >= 4 ? { opacity: 1 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <p style={{ fontFamily: OFT, fontWeight: 900, fontSize: '3.8vw', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</p>
              <p style={{ fontFamily: INT, fontSize: '1.05vw', color: 'rgba(255,255,255,0.38)', marginTop: 5 }}>{l}</p>
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
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 1.03, opacity: 0 }}
      transition={{ duration: 0.75 }}>
      <Grid />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(65% 65% at 50% 50%, transparent 40%, ${BG} 100%)`, pointerEvents: 'none' }} />

      {/* Logo */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1.8vw', marginBottom: '3.5vh' }}
        initial={{ opacity: 0, y: 18 }}
        animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}>
        <div style={{ width: '7.5vw', height: '7.5vw', minWidth: 62, minHeight: 62, borderRadius: '22%', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 0 rgba(255,255,255,0.25) inset, 0 16px 50px ${G}35, 0 0 0 1px ${G}18` }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: '3.3vw', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '9.5vw', color: T1, lineHeight: 0.87, letterSpacing: '-0.055em' }}>ZYPH</span>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '9.5vw', color: G,  lineHeight: 0.87, letterSpacing: '-0.055em' }}>IX</span>
        </div>
      </motion.div>

      {/* Service tags */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '2vw', marginBottom: '3.5vh' }}
        initial={{ opacity: 0 }}
        animate={ph >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}>
        {[{ n: 'ZyphixNow', c: G }, { n: 'ZyphixEats', c: OR }].map(({ n, c }) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 7, border: `1.5px solid ${c}28`, background: `${c}07`, color: T1, fontFamily: INT, fontWeight: 600, fontSize: '1.2vw' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', boxShadow: `0 0 6px ${c}90` }} />
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
        initial={{ opacity: 0, y: 12 }}
        animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}>
        <Link href="/">
          <motion.button onClick={onDone}
            style={{ padding: '14px 48px', borderRadius: 8, background: GD, color: '#fff', fontFamily: OFT, fontWeight: 800, fontSize: '1.45vw', cursor: 'pointer', border: 'none', boxShadow: `0 8px 32px ${G}40, 0 0 0 1px ${G}25`, letterSpacing: '-0.01em' }}
            whileHover={{ scale: 1.025, boxShadow: `0 12px 40px ${G}55, 0 0 0 1px ${G}45` }}
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
          {scene === 0 && <Scene1 key="intro" />}
          {scene === 1 && <Scene2 key="now" />}
          {scene === 2 && <Scene3 key="eats" />}
          {scene === 3 && <Scene4 key="jammu" />}
          {scene === 4 && <Scene5 key="outro" onDone={onDone} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── SplashVideo — standalone page ─────────────────────── */
export function SplashVideo() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Back button */}
      <Link href="/">
        <motion.button
          style={{ position: 'absolute', top: 20, left: 20, zIndex: 200, padding: '8px 18px', borderRadius: 7, background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.09)', color: T2, fontFamily: INT, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          whileHover={{ background: 'rgba(0,0,0,0.07)', color: T1 }}
          whileTap={{ scale: 0.97 }}>
          ← Back
        </motion.button>
      </Link>
      <SplashVideoCore />
    </div>
  );
}
