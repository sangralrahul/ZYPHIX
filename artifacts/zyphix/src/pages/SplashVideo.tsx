import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

const T1 = '#0A0F1A';
const G  = '#0DA366';
const G2 = '#065F46';
const OR = '#EA580C';
const W  = '#FFFFFF';
const OUTFIT = "'Outfit', sans-serif";
const INTER  = "'Inter', sans-serif";

const DURATIONS = [4000, 4500, 4500, 4500, 5000];

function useAutoAdvance(total: number) {
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setScene(s => (s + 1) % total), DURATIONS[scene]);
    return () => clearTimeout(id);
  }, [scene, total]);
  return { scene, setScene };
}

/* ── Scene 1 — Intro ─────────────────────────────────────── */
function Scene1() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [300, 900, 1700, 3000].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: T1 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.7 }}>

      <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: '65vw', height: '65vw', background: `radial-gradient(circle, ${G}1E, transparent 70%)` }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }} />

      <motion.div className="relative z-10 mb-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={ph >= 1 ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
        <div style={{ width: '10vw', height: '10vw', minWidth: 80, minHeight: 80, borderRadius: '24%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 50px ${G}55` }}>
          <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontStyle: 'italic', fontSize: '4.5vw', color: W, lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
      </motion.div>

      <motion.div className="relative z-10 flex items-baseline"
        initial={{ opacity: 0, y: 30 }}
        animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
        <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '13vw', color: W, lineHeight: 0.88, letterSpacing: '-0.05em' }}>ZYPH</span>
        <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '13vw', color: G, lineHeight: 0.88, letterSpacing: '-0.05em' }}>IX</span>
      </motion.div>

      <motion.p className="relative z-10"
        style={{ fontFamily: INTER, fontSize: '2vw', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '2.5vh' }}
        initial={{ opacity: 0 }}
        animate={ph >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.9 }}>
        India's SuperLocal App
      </motion.p>

      <motion.div className="relative z-10"
        style={{ marginTop: '3vh', padding: '9px 26px', borderRadius: 50, border: `1.5px solid ${G}45`, background: `${G}0D` }}
        initial={{ opacity: 0, y: 12 }}
        animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}>
        <span style={{ fontFamily: INTER, fontSize: '1.4vw', color: G, fontWeight: 700 }}>Launching in Jammu, J&amp;K</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Scene 2 — ZyphixNow ─────────────────────────────────── */
function Scene2() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [200, 700, 1300, 2100, 3900].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-between overflow-hidden"
      style={{ background: T1, padding: '0 10vw' }}
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>

      <motion.div className="absolute inset-y-0 left-0"
        style={{ width: 3, background: `linear-gradient(to bottom, transparent, ${G}, transparent)` }}
        initial={{ scaleY: 0 }} animate={ph >= 1 ? { scaleY: 1 } : {}} transition={{ duration: 0.9 }} />

      <div className="z-10 w-1/2">
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2.5vh' }}
          initial={{ opacity: 0, x: -25 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontStyle: 'italic', fontSize: 16, color: W }}>//</span>
          </div>
          <span style={{ fontFamily: OUTFIT, fontWeight: 700, fontSize: '1.4vw', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Zyphix Now</span>
        </motion.div>

        <motion.h2
          style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '7.5vw', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 40 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
          <span style={{ color: W }}>Grocery</span><br />
          <span style={{ color: G }}>in 30 mins.</span>
        </motion.h2>

        <motion.p style={{ fontFamily: INTER, fontSize: '1.7vw', color: 'rgba(255,255,255,0.5)', fontWeight: 500, lineHeight: 1.65, marginBottom: '3.5vh' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}>
          From your local kirana store<br />to your doorstep.
        </motion.p>

        <motion.div
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 50, background: G, color: W, fontFamily: INTER, fontWeight: 700, fontSize: '1.2vw', boxShadow: `0 6px 28px ${G}50` }}
          initial={{ scale: 0 }}
          animate={ph >= 5 ? { scale: 0 } : ph >= 4 ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}>
          🏪 Kirana Partners in Jammu
        </motion.div>
      </div>

      <div className="w-1/2 h-full flex items-center justify-center relative">
        <motion.div style={{ position: 'absolute', width: '36vw', height: '36vw', borderRadius: '30%', background: `${G}14`, border: `1.5px solid ${G}28` }}
          initial={{ scale: 0, rotate: -45 }}
          animate={ph >= 5 ? { scale: 0 } : ph >= 2 ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 170, damping: 20 }} />
        <motion.img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
          alt="groceries"
          style={{ position: 'absolute', width: '30vw', height: '30vw', objectFit: 'cover', borderRadius: '50%', zIndex: 20, boxShadow: `0 24px 64px ${G}45` }}
          initial={{ y: 80, opacity: 0 }}
          animate={ph >= 5 ? { y: -60, opacity: 0 } : ph >= 3 ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 25 }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 3 — ZyphixEats ────────────────────────────────── */
function Scene3() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [200, 700, 1300, 2100, 3900].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-row-reverse items-center justify-between overflow-hidden"
      style={{ background: T1, padding: '0 10vw' }}
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>

      <motion.div className="absolute inset-y-0 right-0"
        style={{ width: 3, background: `linear-gradient(to bottom, transparent, ${OR}, transparent)` }}
        initial={{ scaleY: 0 }} animate={ph >= 1 ? { scaleY: 1 } : {}} transition={{ duration: 0.9 }} />

      <div className="z-10 w-1/2 pl-[4vw]">
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2.5vh' }}
          initial={{ opacity: 0, x: 25 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: OR, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontStyle: 'italic', fontSize: 16, color: W }}>//</span>
          </div>
          <span style={{ fontFamily: OUTFIT, fontWeight: 700, fontSize: '1.4vw', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Zyphix Eats</span>
        </motion.div>

        <motion.h2
          style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '7.5vw', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: '2.5vh' }}
          initial={{ opacity: 0, y: 40 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
          <span style={{ color: W }}>Food</span><br />
          <span style={{ color: OR }}>Superfast.</span>
        </motion.h2>

        <motion.p style={{ fontFamily: INTER, fontSize: '1.7vw', color: 'rgba(255,255,255,0.5)', fontWeight: 500, lineHeight: 1.65, marginBottom: '3.5vh' }}
          initial={{ opacity: 0 }}
          animate={ph >= 5 ? { opacity: 0 } : ph >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}>
          Restaurants near you,<br />delivered to your door.
        </motion.p>

        <motion.div
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 50, background: OR, color: W, fontFamily: INTER, fontWeight: 700, fontSize: '1.2vw', boxShadow: `0 6px 28px ${OR}55` }}
          initial={{ scale: 0 }}
          animate={ph >= 5 ? { scale: 0 } : ph >= 4 ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}>
          🍱 Restaurants joining in Jammu
        </motion.div>
      </div>

      <div className="w-1/2 h-full flex items-center justify-center relative">
        <motion.div
          style={{ position: 'absolute', width: '36vw', height: '36vw', borderRadius: '30%', background: `${OR}14`, border: `1.5px solid ${OR}28` }}
          initial={{ scale: 0, rotate: 0 }}
          animate={ph >= 5 ? { scale: 0 } : ph >= 2 ? { scale: 1, rotate: 12 } : {}}
          transition={{ type: 'spring', stiffness: 170, damping: 20 }} />
        <motion.img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"
          alt="food"
          style={{ position: 'absolute', width: '30vw', height: '30vw', objectFit: 'cover', borderRadius: '40%', zIndex: 20, boxShadow: `0 24px 64px ${OR}55` }}
          initial={{ y: 80, opacity: 0, rotate: -15 }}
          animate={ph >= 5 ? { y: -60, opacity: 0, rotate: 0 } : ph >= 3 ? { y: 0, opacity: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 25 }} />
      </div>
    </motion.div>
  );
}

/* ── Scene 4 — Jammu ─────────────────────────────────────── */
function Scene4() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [300, 900, 1600, 2800].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: T1 }}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>

      <motion.img
        src="https://images.unsplash.com/photo-1609180947982-0e2a63bf2c0f?w=1800&q=80"
        alt="Jammu landscape"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.28 }}
        initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: 'easeOut' }} />

      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${T1} 0%, ${T1}CC 25%, transparent 65%)` }} />

      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 22px', borderRadius: 50, background: G, color: W, fontFamily: INTER, fontWeight: 700, fontSize: '1.4vw', marginBottom: '3vh', boxShadow: `0 6px 24px ${G}50` }}
          initial={{ y: -30, opacity: 0 }}
          animate={ph >= 1 ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}>
          📍 Proudly born in
        </motion.div>

        <motion.h2
          style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '15vw', color: W, lineHeight: 0.85, letterSpacing: '-0.04em', textTransform: 'uppercase' }}
          initial={{ scale: 0.75, opacity: 0, filter: 'blur(18px)' }}
          animate={ph >= 2 ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}>
          Jammu
        </motion.h2>

        <motion.p
          style={{ fontFamily: INTER, fontSize: '2vw', color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginTop: '3vh' }}
          initial={{ opacity: 0, y: 18 }}
          animate={ph >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          J&amp;K — Building for the Himalayas &amp; beyond.
        </motion.p>

        <motion.div
          style={{ marginTop: '5vh', display: 'flex', gap: '4vw' }}
          initial={{ opacity: 0 }}
          animate={ph >= 4 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}>
          {[['5L+', 'Customers'], ['100+', 'Cities'], ['4.8★', 'Rating']].map(([v, l], i) => (
            <motion.div key={i} style={{ textAlign: 'center' }}
              initial={{ y: 20, opacity: 0 }}
              animate={ph >= 4 ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}>
              <p style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '4.5vw', color: W, lineHeight: 1 }}>{v}</p>
              <p style={{ fontFamily: INTER, fontSize: '1.1vw', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{l}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Scene 5 — Outro / CTA ───────────────────────────────── */
function Scene5() {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [300, 900, 1600, 2800, 4400].map((d, i) => setTimeout(() => setPh(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: T1 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 1.08, opacity: 0 }}
      transition={{ duration: 0.8 }}>

      <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: '75vw', height: '75vw', background: `radial-gradient(circle, ${G}17, transparent 68%)` }}
        animate={{ scale: [1, 1.22, 1] }} transition={{ duration: 6, repeat: Infinity }} />

      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${G}0C 1px, transparent 1px), linear-gradient(90deg, ${G}0C 1px, transparent 1px)`, backgroundSize: '5vw 5vw' }} />

      <motion.div className="relative z-10 flex items-center gap-5 mb-6"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={ph >= 1 ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
        <div style={{ width: '8.5vw', height: '8.5vw', minWidth: 68, minHeight: 68, borderRadius: '24%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 44px ${G}55` }}>
          <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontStyle: 'italic', fontSize: '4vw', color: W, lineHeight: 1, letterSpacing: '-0.04em' }}>//</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '11vw', color: W, lineHeight: 0.86, letterSpacing: '-0.05em' }}>ZYPH</span>
          <span style={{ fontFamily: OUTFIT, fontWeight: 900, fontSize: '11vw', color: G, lineHeight: 0.86, letterSpacing: '-0.05em' }}>IX</span>
        </div>
      </motion.div>

      <motion.div className="relative z-10 flex gap-[3vw] mb-5"
        initial={{ opacity: 0, y: 16 }}
        animate={ph >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}>
        {[{ label: 'ZyphixNow', color: G }, { label: 'ZyphixEats', color: OR }].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 50, border: `1.5px solid ${color}50`, color: W, fontFamily: INTER, fontWeight: 600, fontSize: '1.4vw' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: color, display: 'inline-block', boxShadow: `0 0 8px ${color}` }} />
            {label}
          </div>
        ))}
      </motion.div>

      <motion.p className="relative z-10"
        style={{ fontFamily: INTER, fontSize: '1.7vw', color: 'rgba(255,255,255,0.38)', fontWeight: 500, marginBottom: '4.5vh', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        initial={{ opacity: 0 }}
        animate={ph >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}>
        India's SuperLocal App
      </motion.p>

      <motion.div className="relative z-10" style={{ width: '45vw', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', marginBottom: '5vh' }}
        initial={{ opacity: 0 }}
        animate={ph >= 3 ? { opacity: 1 } : {}}>
        <motion.div style={{ height: '100%', background: `linear-gradient(to right, ${G}, ${G2})`, borderRadius: 4 }}
          initial={{ width: '0%' }}
          animate={ph >= 3 ? { width: '100%' } : {}}
          transition={{ duration: 2.6, ease: 'linear' }} />
      </motion.div>

      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={ph >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}>
        <Link href="/">
          <motion.button
            style={{ padding: '14px 44px', borderRadius: 50, background: G, color: W, fontFamily: OUTFIT, fontWeight: 800, fontSize: '1.6vw', cursor: 'pointer', border: 'none', boxShadow: `0 10px 36px ${G}55`, letterSpacing: '-0.01em' }}
            whileHover={{ scale: 1.05, boxShadow: `0 14px 44px ${G}70` }}
            whileTap={{ scale: 0.97 }}>
            Join the Waitlist →
          </motion.button>
        </Link>
      </motion.div>

      <motion.p className="absolute bottom-7"
        style={{ fontFamily: INTER, fontSize: '1.1vw', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}
        initial={{ opacity: 0 }}
        animate={ph >= 5 ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}>
        Clavix Technologies Pvt. Ltd.
      </motion.p>
    </motion.div>
  );
}

/* ── SplashVideo ─────────────────────────────────────────── */
export function SplashVideo() {
  const { scene, setScene } = useAutoAdvance(5);

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: T1 }}>

      <Link href="/">
        <motion.button
          className="absolute top-5 left-5 z-50 text-sm font-semibold px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', fontFamily: INTER, backdropFilter: 'blur(10px)' }}
          whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.11)' }}
          whileTap={{ scale: 0.96 }}>
          ← Back to Site
        </motion.button>
      </Link>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 items-center">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.button key={i} onClick={() => setScene(i)}
            style={{ height: 4, borderRadius: 4, background: i === scene ? G : 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', padding: 0 }}
            animate={{ width: i === scene ? 28 : 8, opacity: i === scene ? 1 : 0.45 }}
            transition={{ duration: 0.3 }} />
        ))}
      </div>

      <div className="relative z-20 w-full h-full">
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
