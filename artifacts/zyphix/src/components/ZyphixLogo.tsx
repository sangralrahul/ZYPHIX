import React from 'react';
import { motion } from 'framer-motion';

/* ─── Icon mark ─── */
function PinMark({ size }: { size: number }) {
  const r  = Math.round(size * 0.265);
  const fs = Math.round(size * 0.46);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      animate={{ scale: 1, rotate: 0,   opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.05 }}
      whileHover={{ scale: 1.13, rotate: 6, boxShadow: '0 8px 28px rgba(9,160,88,.65)' }}
      whileTap={{ scale: 0.93 }}
      style={{
        width: size,
        height: size,
        borderRadius: r,
        background: 'linear-gradient(148deg, #1AE082 0%, #0DC268 38%, #09A058 72%, #077A46 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 5px 22px rgba(9,160,88,.52), inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(0,0,0,.12)',
        cursor: 'pointer',
      }}>
      {/* "//" slides up inside the icon */}
      <motion.span
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.32, ease: 'easeOut' }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: fs,
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.08em',
          userSelect: 'none',
          textShadow: '0 1px 6px rgba(0,0,0,.18)',
          display: 'block',
        }}>
        //
      </motion.span>
    </motion.div>
  );
}

/* ─── Individual animated letter ─── */
function AnimLetter({ char, delay, style }: { char: string; delay: number; style?: React.CSSProperties }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'inline-block', ...style }}>
      {char}
    </motion.span>
  );
}

/* ─── Main logo ─── */
export function ZyphixLogo({
  size = 32,
  showWordmark = true,
  gap = 9,
  fontSize,
}: {
  size?: number;
  wordmarkColor?: string;
  wordmarkHighlight?: string;
  showWordmark?: boolean;
  gap?: number;
  fontSize?: number;
  playAnimation?: boolean;
}) {
  const fs = fontSize ?? size * 0.6;

  const zyphLetters = ['Z', 'Y', 'P', 'H'];
  const ixLetters   = ['I', 'X'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <PinMark size={size} />

      {showWordmark && (
        <motion.span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: fs,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            userSelect: 'none',
            display: 'inline-flex',
            alignItems: 'baseline',
          }}>

          {/* ZYPH — italic gradient, stagger 0.18–0.36 s */}
          <span style={{
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #18F590 0%, #0DC268 55%, #08924C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-flex',
          }}>
            {zyphLetters.map((ch, i) => (
              <AnimLetter key={ch} char={ch} delay={0.18 + i * 0.055} />
            ))}
          </span>

          {/* IX — upright dark, stagger 0.40–0.46 s */}
          <span style={{ color: '#0A0F1A', fontStyle: 'normal', display: 'inline-flex' }}>
            {ixLetters.map((ch, i) => (
              <AnimLetter key={ch} char={ch} delay={0.40 + i * 0.06} />
            ))}
          </span>
        </motion.span>
      )}
    </div>
  );
}

export function ZMarkOnly({ size = 32 }: { size?: number }) {
  return <PinMark size={size} />;
}
