import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

const SCENE_DURATIONS = {
  intro: 4000,
  now: 4500,
  eats: 4500,
  jammu: 4000,
  outro: 4000,
};

function useVideoPlayer() {
  const [currentScene, setCurrentScene] = useState(0);
  const durations = Object.values(SCENE_DURATIONS);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const advance = (idx: number) => {
      timeoutId = setTimeout(() => {
        const next = (idx + 1) % durations.length;
        setCurrentScene(next);
        advance(next);
      }, durations[idx]);
    };
    advance(0);
    return () => clearTimeout(timeoutId);
  }, []);

  return { currentScene };
}

function Scene1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -40 as number, scale: 0.9 },
    visible: { opacity: 1, y: 0, rotateX: 0 as number, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 1.1, filter: 'blur(10px)' },
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#111827]"
        initial={{ scaleY: 1, originY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      <div className="text-center relative z-10 pt-[15vh]">
        <motion.h1
          className="text-[12vw] font-black tracking-tighter leading-[0.9] uppercase"
          style={{ WebkitTextStroke: '2px #111827', color: 'transparent' }}
          animate={phase >= 1 ? { color: '#111827', WebkitTextStroke: '0px' } : {}}
          transition={{ duration: 0.5 }}
        >
          {'ZYPHIX'.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial="hidden"
              variants={textVariants}
              animate={phase >= 4 ? 'exit' : phase >= 1 ? 'visible' : 'hidden'}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: phase >= 4 ? i * 0.05 : i * 0.08,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-[2vh] overflow-hidden">
          <motion.p
            className="text-[2.5vw] font-bold text-[#0DA366] tracking-widest uppercase bg-white px-6 py-2 rounded-full inline-block shadow-lg border-2 border-[#0DA366]"
            initial={{ y: '100%', opacity: 0 }}
            animate={
              phase >= 4
                ? { y: '-100%', opacity: 0 }
                : phase >= 2
                ? { y: 0, opacity: 1 }
                : { y: '100%', opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            India's SuperLocal App
          </motion.p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 border-l-4 border-b-4 border-[#111827]"
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={phase >= 3 ? { opacity: 0.2, x: 0, y: 0 } : { opacity: 0, x: -20, y: 20 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 border-r-4 border-t-4 border-[#0DA366]"
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={phase >= 3 ? { opacity: 0.5, x: 0, y: 0 } : { opacity: 0, x: 20, y: -20 }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}

function Scene2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-row items-center justify-between px-[10vw]"
      initial={{ x: '100%', skewX: -10 }}
      animate={{ x: 0, skewX: 0 }}
      exit={{ x: '-100%', skewX: 10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-1/2 relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={phase >= 1 ? { width: '8vw' } : { width: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-[0.5vw] bg-[#0DA366] mb-[2vh]"
        />
        <motion.h2
          className="text-[6vw] font-black text-[#111827] leading-[1.1] mb-[2vh]"
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 5 ? { opacity: 0, x: -50 } : phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          Zyphix<span className="text-[#0DA366]">Now</span>
        </motion.h2>
        <motion.div
          className="text-[3vw] font-bold text-[#111827]/80 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 5 ? { opacity: 0, y: 30 } : phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Groceries in
          <motion.span
            className="block text-[5vw] text-[#0DA366]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={phase >= 5 ? { scale: 0.5, opacity: 0 } : phase >= 4 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            30 Mins
          </motion.span>
        </motion.div>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center relative">
        <motion.div
          className="absolute w-[40vw] h-[40vw] bg-white rounded-full shadow-2xl border-4 border-[#0DA366]/20"
          initial={{ scale: 0, rotate: -90 }}
          animate={phase >= 5 ? { scale: 0, rotate: 90 } : phase >= 2 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}images/groceries.png`}
          className="absolute w-[35vw] h-[35vw] object-contain drop-shadow-2xl z-20"
          initial={{ y: 100, opacity: 0, rotate: 15 }}
          animate={phase >= 5 ? { y: -100, opacity: 0 } : phase >= 3 ? { y: 0, opacity: 1, rotate: 0 } : { y: 100, opacity: 0, rotate: 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] bg-[#111827] text-white px-6 py-3 rounded-2xl font-bold text-[1.5vw] shadow-xl z-30"
          initial={{ scale: 0, x: 50 }}
          animate={phase >= 5 ? { scale: 0 } : phase >= 4 ? { scale: 1, x: 0 } : { scale: 0, x: 50 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          From your local Kirana 🏪
        </motion.div>
      </div>
    </motion.div>
  );
}

function Scene3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2000),
      setTimeout(() => setPhase(5), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-row-reverse items-center justify-between px-[10vw]"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-1/2 relative z-10 pl-[5vw]">
        <motion.div
          initial={{ width: 0 }}
          animate={phase >= 1 ? { width: '8vw' } : { width: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-[0.5vw] bg-[#111827] mb-[2vh]"
        />
        <motion.h2
          className="text-[6vw] font-black text-[#111827] leading-[1.1] mb-[2vh]"
          initial={{ opacity: 0, x: 50 }}
          animate={phase >= 5 ? { opacity: 0, x: 50 } : phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          Zyphix<span className="text-[#0DA366]">Eats</span>
        </motion.h2>
        <motion.div
          className="text-[3vw] font-bold text-[#111827]/80 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 5 ? { opacity: 0, y: 30 } : phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Cravings delivered
          <motion.span
            className="block text-[4vw] text-[#111827]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={phase >= 5 ? { scale: 0.8, opacity: 0 } : phase >= 4 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            Super Fast 🛵
          </motion.span>
        </motion.div>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center relative">
        <motion.div
          className="absolute w-[40vw] h-[40vw] bg-[#0DA366] rounded-[4vw] rotate-12 shadow-2xl"
          initial={{ scale: 0, rotate: 0 }}
          animate={phase >= 5 ? { scale: 0, rotate: -45 } : phase >= 2 ? { scale: 1, rotate: 12 } : { scale: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}images/food.png`}
          className="absolute w-[45vw] h-[45vw] object-contain z-20"
          style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))' }}
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={phase >= 5 ? { scale: 1.5, opacity: 0 } : phase >= 3 ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.5, opacity: 0, rotate: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}images/scooter.png`}
          className="absolute bottom-[10%] left-[10%] w-[15vw] h-[15vw] object-contain drop-shadow-xl z-30"
          initial={{ x: -100, opacity: 0 }}
          animate={phase >= 5 ? { x: 200, opacity: 0 } : phase >= 4 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </div>
    </motion.div>
  );
}

function Scene4() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#111827]"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/jammu-bg.png`}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      />
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          className="bg-[#0DA366] text-white px-8 py-3 rounded-full font-bold text-[2vw] mb-[4vh] shadow-xl"
          initial={{ y: -50, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          📍 Proudly Born In
        </motion.div>
        <motion.h2
          className="text-[10vw] font-black text-white leading-none uppercase tracking-widest"
          style={{ filter: phase >= 2 ? 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))' : 'none' }}
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
          animate={
            phase >= 2
              ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
              : { scale: 0.8, opacity: 0, filter: 'blur(10px)' }
          }
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Jammu
        </motion.h2>
        <motion.div
          className="mt-[4vh] text-[3vw] text-white/90 font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Building for the Himalayas & Beyond
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80" />
    </motion.div>
  );
}

function Scene5() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8F9FA]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="flex items-center gap-[2vw] mb-[4vh] relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={phase >= 4 ? { y: -50, opacity: 0 } : phase >= 1 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="w-[8vw] h-[8vw] rounded-2xl bg-[#0DA366] flex items-center justify-center shadow-xl">
          <span
            className="text-white font-black italic text-[4vw] leading-none tracking-tighter"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            //
          </span>
        </div>
        <h1 className="text-[8vw] font-black text-[#111827] tracking-tight uppercase">ZYPHIX</h1>
      </motion.div>

      <motion.div className="flex gap-[4vw] text-[2.5vw] font-bold text-[#111827]/70 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={phase >= 4 ? { opacity: 0 } : phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          Groceries
        </motion.span>
        <motion.span
          className="text-[#0DA366]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 4 ? { opacity: 0 } : phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          •
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={phase >= 4 ? { opacity: 0 } : phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Food
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute bottom-[15vh] w-[60vw] h-[1vw] bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 0 } : phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          className="h-full bg-[#0DA366]"
          initial={{ width: '0%' }}
          animate={phase >= 3 ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 2, ease: 'linear' }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-[1.5vw] text-[#9CA3AF] font-medium relative z-10"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        Clavix Technologies Pvt. Ltd.
      </motion.div>
    </motion.div>
  );
}

export function SplashVideo() {
  const { currentScene } = useVideoPlayer();
  const sceneIndex = currentScene;

  return (
    <div className="w-full h-screen overflow-hidden relative bg-[#F8F9FA]">
      {/* Back link */}
      <Link href="/">
        <motion.button
          className="absolute top-5 left-5 z-50 bg-white border border-[#E5E7EB] text-[#111827] text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          ← Back to Site
        </motion.button>
      </Link>

      {/* Floating background blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0DA366, transparent)' }}
          animate={{ x: ['-20%', '50%', '10%'], y: ['-10%', '60%', '20%'], scale: [1, 1.5, 0.8] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full opacity-10 blur-3xl right-0 bottom-0"
          style={{ background: 'radial-gradient(circle, #111827, transparent)' }}
          animate={{ x: ['20%', '-40%', '0%'], y: ['10%', '-50%', '-10%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating ZYPHIX logo icon that moves between scenes */}
      <motion.div
        className="absolute z-10 w-[15vw] h-[15vw] rounded-3xl bg-[#0DA366] flex items-center justify-center shadow-2xl"
        animate={{
          top: ['50%', '15%', '15%', '80%', '50%'][sceneIndex],
          left: ['50%', '85%', '15%', '15%', '50%'][sceneIndex],
          x: '-50%',
          y: '-50%',
          scale: [1.5, 0.5, 0.5, 0.5, 1.5][sceneIndex],
          rotate: [0, 90, 180, 270, 360][sceneIndex],
          borderRadius: ['25%', '50%', '25%', '50%', '25%'][sceneIndex],
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-white font-black italic text-[4vw] tracking-tighter leading-none"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          //
        </span>
      </motion.div>

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(#0DA366 1px, transparent 1px), linear-gradient(90deg, #0DA366 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
        }}
        animate={{
          opacity: [0.05, 0.1, 0.05, 0.15, 0.05][sceneIndex],
          backgroundPosition: ['0vw 0vw', '2vw 2vw', '-2vw 0vw', '0vw -2vw', '0vw 0vw'][sceneIndex],
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Scene content */}
      <div className="relative z-20 w-full h-full">
        <AnimatePresence mode="popLayout">
          {sceneIndex === 0 && <Scene1 key="intro" />}
          {sceneIndex === 1 && <Scene2 key="now" />}
          {sceneIndex === 2 && <Scene3 key="eats" />}
          {sceneIndex === 3 && <Scene4 key="jammu" />}
          {sceneIndex === 4 && <Scene5 key="outro" />}
        </AnimatePresence>
      </div>

      {/* Scene progress dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Object.keys(SCENE_DURATIONS).map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full bg-[#0DA366]"
            animate={{ width: sceneIndex === i ? 24 : 8, opacity: sceneIndex === i ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
