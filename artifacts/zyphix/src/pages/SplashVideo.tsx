import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

/* ── Design tokens ─────────────────────────────────────── */
const BG   = '#060A0F';
const G    = '#0DA366';
const GD   = 'linear-gradient(135deg,#0DA366 0%,#065F46 100%)';
const OR   = '#EA580C';
const ORD  = 'linear-gradient(135deg,#EA580C 0%,#C2410C 100%)';
const W    = '#FFFFFF';
const MUTE = 'rgba(255,255,255,0.38)';
const OFT  = "'Outfit', sans-serif";
const INT  = "'Inter', sans-serif";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number,number,number,number];
const SLIDE: [number,number,number,number] = [0.16, 1, 0.3, 1];

const DURATIONS = [4200, 5000, 5000, 4800, 6000];

function useAutoAdvance(total: number) {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setScene(s => (s + 1) % total), DURATIONS[scene]);
    return () => clearTimeout(id);
  }, [scene, total]);
  const go = useCallback((i: number) => setScene(i), []);
  return { scene, go };
}

/* ── Shared: noise overlay ──────────────────────────────── */
function Noise() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 99, pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: 0.025,
    }} />
  );
}

/* ── Scene 1 — Brand Reveal ─────────────────────────────── */
function Scene1() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [200, 1000, 1900, 3000].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}>
      <Noise />

      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 60% at 50% 50%, ${G}0D 0%, transparent 100%)`, pointerEvents: 'none' }} />

      {/* Icon */}
      <motion.div
        style={{ marginBottom: '3.5vh', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={ph >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}>
        <div style={{
          width: '9vw', height: '9vw', minWidth: 76, minHeight: 76,
          borderRadius: '24%', background: GD, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 1px ${G}30, 0 24px 64px ${G}40`,
        }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: '4vw', color: W, lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
      </motion.div>

      {/* Wordmark */}
      <motion.div
        style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'baseline', lineHeight: 0.85 }}
        initial={{ opacity: 0, y: 18 }}
        animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}>
        <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '11.5vw', color: W, letterSpacing: '-0.055em' }}>ZYPH</span>
        <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '11.5vw', color: G,  letterSpacing: '-0.055em' }}>IX</span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        style={{ position: 'relative', zIndex: 10, fontFamily: INT, fontSize: '1.35vw', fontWeight: 500, color: MUTE, letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: '2.2vh' }}
        initial={{ opacity: 0 }}
        animate={ph >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}>
        India's SuperLocal App
      </motion.p>

      {/* Location pill */}
      <motion.div
        style={{ position: 'relative', zIndex: 10, marginTop: '3.5vh', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 50, border: `1px solid ${G}35`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.15vw' }}
        initial={{ opacity: 0 }}
        animate={ph >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, display: 'inline-block', boxShadow: `0 0 6px ${G}` }} />
        Launching in Jammu, J&amp;K
      </motion.div>
    </motion.div>
  );
}

/* ── Scene 2 — ZyphixNow ────────────────────────────────── */
function Scene2() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [100, 600, 1200, 2000, 4200].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-stretch overflow-hidden"
      style={{ background: BG }}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0% 0 100%)' }}
      transition={{ duration: 0.9, ease: SLIDE }}>
      <Noise />

      {/* Left — Text */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5vw 0 8vw', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '3vh' }}
          initial={{ opacity: 0, x: -20 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: 13, color: W }}>//</span>
          </div>
          <span style={{ fontFamily: INT, fontWeight: 600, fontSize: '1.15vw', color: MUTE, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Zyphix Now</span>
        </motion.div>

        <motion.h2
          style={{ fontFamily: OFT, fontWeight: 900, fontSize: '6.5vw', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 28 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}>
          <span style={{ color: W, display: 'block' }}>Grocery</span>
          <span style={{ color: G, display: 'block' }}>in 30 mins.</span>
        </motion.h2>

        <motion.p style={{ fontFamily: INT, fontSize: '1.5vw', color: MUTE, fontWeight: 400, lineHeight: 1.7, marginBottom: '3.5vh', maxWidth: '28vw' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}>
          Straight from your neighbourhood kirana, delivered in minutes.
        </motion.p>

        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 8, background: `${G}12`, border: `1px solid ${G}30`, color: G, fontFamily: INT, fontWeight: 600, fontSize: '1.15vw', width: 'fit-content' }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}>
          🏪 Kirana Partners · Jammu
        </motion.div>
      </div>

      {/* Right — Image */}
      <div style={{ flex: '0 0 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Glow behind image */}
        <div style={{ position: 'absolute', width: '40vw', height: '40vw', borderRadius: '50%', background: `radial-gradient(circle, ${G}18, transparent 70%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <motion.div style={{ position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={ph >= 5 ? { opacity: 0, scale: 0.95, x: -20 } : ph >= 2 ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}>
          <div style={{ width: '28vw', height: '28vw', borderRadius: '50%', overflow: 'hidden', border: `1px solid ${G}25`, boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${G}20` }}>
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=85" alt="groceries" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
        {/* Fade edge */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 15%)`, pointerEvents: 'none' }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 3 — ZyphixEats ───────────────────────────────── */
function Scene3() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [100, 600, 1200, 2000, 4200].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-row-reverse items-stretch overflow-hidden"
      style={{ background: BG }}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: SLIDE }}>
      <Noise />

      {/* Right — Text */}
      <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw 0 5vw', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '3vh' }}
          initial={{ opacity: 0, x: 20 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: ORD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: 13, color: W }}>//</span>
          </div>
          <span style={{ fontFamily: INT, fontWeight: 600, fontSize: '1.15vw', color: MUTE, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Zyphix Eats</span>
        </motion.div>

        <motion.h2
          style={{ fontFamily: OFT, fontWeight: 900, fontSize: '6.5vw', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 28 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}>
          <span style={{ color: W, display: 'block' }}>Cravings</span>
          <span style={{ color: OR, display: 'block' }}>delivered fast.</span>
        </motion.h2>

        <motion.p style={{ fontFamily: INT, fontSize: '1.5vw', color: MUTE, fontWeight: 400, lineHeight: 1.7, marginBottom: '3.5vh', maxWidth: '28vw' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}>
          Your favourite restaurants, at your door — hot and on time.
        </motion.p>

        <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 8, background: `${OR}12`, border: `1px solid ${OR}30`, color: OR, fontFamily: INT, fontWeight: 600, fontSize: '1.15vw', width: 'fit-content' }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}>
          🍱 Restaurants joining · Jammu
        </motion.div>
      </div>

      {/* Left — Image */}
      <div style={{ flex: '0 0 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '40vw', height: '40vw', borderRadius: '50%', background: `radial-gradient(circle, ${OR}18, transparent 70%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <motion.div style={{ position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.92, x: -40 }}
          animate={ph >= 5 ? { opacity: 0, scale: 0.95, x: 20 } : ph >= 2 ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}>
          <div style={{ width: '28vw', height: '28vw', borderRadius: '28%', overflow: 'hidden', border: `1px solid ${OR}25`, boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${OR}20` }}>
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=85" alt="food" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, ${BG} 0%, transparent 15%)`, pointerEvents: 'none' }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 4 — Jammu ────────────────────────────────────── */
function Scene4() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [400, 1100, 2000, 3200].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-end justify-start overflow-hidden"
      style={{ background: '#000' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <Noise />

      <motion.img
        src="https://images.unsplash.com/photo-1609180947982-0e2a63bf2c0f?w=1800&q=85"
        alt="Jammu landscape"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: 'linear' }} />

      {/* Layered overlays */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${BG} 0%, ${BG}CC 20%, ${BG}66 50%, transparent 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BG}99 0%, transparent 60%)` }} />

      {/* Content — anchored to bottom-left */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 0 7vh 8vw', maxWidth: '70vw' }}>
        <motion.span
          style={{ display: 'inline-block', fontFamily: INT, fontWeight: 600, fontSize: '1.1vw', color: G, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 10 }}
          animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          📍 Proudly born in
        </motion.span>

        <motion.h2
          style={{ fontFamily: OFT, fontWeight: 900, fontSize: '13vw', color: W, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '4vh' }}
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={ph >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: EASE }}>
          Jammu
        </motion.h2>

        <motion.p
          style={{ fontFamily: INT, fontSize: '1.8vw', color: 'rgba(255,255,255,0.55)', fontWeight: 400, lineHeight: 1.6, marginBottom: '4.5vh' }}
          initial={{ opacity: 0 }}
          animate={ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}>
          J&amp;K — Building for the Himalayas &amp; beyond.
        </motion.p>

        <motion.div style={{ display: 'flex', gap: '4vw' }}
          initial={{ opacity: 0, y: 16 }}
          animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}>
          {[['5L+', 'Customers'], ['100+', 'Cities'], ['4.8★', 'Rating']].map(([v, l], i) => (
            <div key={i}>
              <p style={{ fontFamily: OFT, fontWeight: 900, fontSize: '3.5vw', color: W, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</p>
              <p style={{ fontFamily: INT, fontSize: '1.1vw', color: MUTE, marginTop: 6 }}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Scene 5 — Outro / CTA ──────────────────────────────── */
function Scene5() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [400, 1100, 1900, 3200, 5200].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: BG }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 1.04, opacity: 0 }}
      transition={{ duration: 0.9 }}>
      <Noise />

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${G}09 1px, transparent 1px), linear-gradient(90deg, ${G}09 1px, transparent 1px)`, backgroundSize: '6vw 6vw', pointerEvents: 'none' }} />
      {/* Radial fade over grid */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 70% at 50% 50%, transparent 40%, ${BG} 100%)`, pointerEvents: 'none' }} />

      {/* Logo */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '2vw', marginBottom: '4vh' }}
        initial={{ opacity: 0, y: 20 }}
        animate={ph >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}>
        <div style={{ width: '7.5vw', height: '7.5vw', minWidth: 62, minHeight: 62, borderRadius: '22%', background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 1px ${G}30, 0 20px 56px ${G}40` }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontStyle: 'italic', fontSize: '3.4vw', color: W, lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '9vw', color: W, lineHeight: 0.88, letterSpacing: '-0.055em' }}>ZYPH</span>
          <span style={{ fontFamily: OFT, fontWeight: 900, fontSize: '9vw', color: G,  lineHeight: 0.88, letterSpacing: '-0.055em' }}>IX</span>
        </div>
      </motion.div>

      {/* Service tags */}
      <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '2vw', marginBottom: '4vh' }}
        initial={{ opacity: 0 }}
        animate={ph >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}>
        {[{ n: 'ZyphixNow', c: G }, { n: 'ZyphixEats', c: OR }].map(({ n, c }) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 6, border: `1px solid ${c}30`, color: 'rgba(255,255,255,0.7)', fontFamily: INT, fontWeight: 500, fontSize: '1.25vw' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', boxShadow: `0 0 8px ${c}` }} />
            {n}
          </div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div style={{ position: 'relative', zIndex: 10, width: '1px', height: '4vh', background: 'rgba(255,255,255,0.1)', marginBottom: '4vh' }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={ph >= 3 ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE }} />

      {/* CTA */}
      <motion.div style={{ position: 'relative', zIndex: 10, marginBottom: '2.5vh' }}
        initial={{ opacity: 0, y: 14 }}
        animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}>
        <Link href="/">
          <motion.button
            style={{ padding: '15px 52px', borderRadius: 8, background: GD, color: W, fontFamily: OFT, fontWeight: 800, fontSize: '1.5vw', cursor: 'pointer', border: 'none', boxShadow: `0 12px 40px ${G}45, 0 0 0 1px ${G}30`, letterSpacing: '-0.01em' }}
            whileHover={{ scale: 1.03, boxShadow: `0 16px 48px ${G}60, 0 0 0 1px ${G}50` }}
            whileTap={{ scale: 0.98 }}>
            Join the Waitlist →
          </motion.button>
        </Link>
      </motion.div>

      <motion.p style={{ position: 'relative', zIndex: 10, fontFamily: INT, fontSize: '1.05vw', color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}
        initial={{ opacity: 0 }}
        animate={ph >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}>
        Clavix Technologies Pvt. Ltd.
      </motion.p>

      {/* Progress bar */}
      <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.05)', zIndex: 10 }}
        initial={{ opacity: 0 }} animate={ph >= 3 ? { opacity: 1 } : {}}>
        <motion.div style={{ height: '100%', background: GD }}
          initial={{ width: '0%' }}
          animate={ph >= 3 ? { width: '100%' } : {}}
          transition={{ duration: 3.5, ease: 'linear' }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
export function SplashVideo() {
  const { scene, go } = useAutoAdvance(5);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: BG }}>

      {/* Back button */}
      <Link href="/">
        <motion.button
          style={{ position: 'absolute', top: 20, left: 20, zIndex: 100, padding: '8px 18px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontFamily: INT, fontSize: 13, fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(12px)' }}
          whileHover={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}
          whileTap={{ scale: 0.97 }}>
          ← Back
        </motion.button>
      </Link>

      {/* Scene counter */}
      <div style={{ position: 'absolute', top: 22, right: 20, zIndex: 100, display: 'flex', alignItems: 'center', gap: 6 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.button key={i} onClick={() => go(i)}
            style={{ height: 3, borderRadius: 3, background: i === scene ? G : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: 0, transition: 'background 0.3s' }}
            animate={{ width: i === scene ? 24 : 8, opacity: i === scene ? 1 : 0.5 }}
            transition={{ duration: 0.35 }} />
        ))}
      </div>

      {/* Scenes */}
      <div style={{ position: 'relative', zIndex: 20, width: '100%', height: '100%' }}>
        <AnimatePresence mode="popLayout">
          {scene === 0 && <Scene1 key="intro" />}
          {scene === 1 && <Scene2 key="now" />}
          {scene === 2 && <Scene3 key="eats" />}
          {scene === 3 && <Scene4 key="jammu" />}
          {scene === 4 && <Scene5 key="outro" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
