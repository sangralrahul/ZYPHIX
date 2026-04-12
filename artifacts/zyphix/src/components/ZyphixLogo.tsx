import React from 'react';
import { motion } from 'framer-motion';

const LOOP = 2.2;

/* ─── Icon mark ─── */
function PinMark({ size }: { size: number }) {
  const r  = Math.round(size * 0.265);
  const fs = Math.round(size * 0.46);

  return (
    <motion.div
      animate={{
        scale:   [0.35, 1.08, 0.97, 1,  1,  1,  0.6, 0.35],
        rotate:  [-18,  4,   -2,   0,  0,  0,  -8,  -18 ],
        opacity: [0,    1,    1,   1,  1,  1,  0.4,  0   ],
      }}
      transition={{
        duration: LOOP,
        times:    [0, 0.12, 0.17, 0.20, 0.72, 0.80, 0.92, 1],
        ease:     'easeOut',
        repeat:   Infinity,
        repeatDelay: 0.05,
      }}
      whileHover={{ scale: 1.12, rotate: 7 }}
      whileTap={{ scale: 0.9 }}
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
        willChange: 'transform',
      }}>
      {/* // fades in slightly after the icon pops */}
      <motion.span
        animate={{
          opacity: [0, 0, 1, 1, 1, 0, 0],
          y:       [6, 6, 0, 0, 0, 4, 6],
        }}
        transition={{
          duration: LOOP,
          times:    [0, 0.14, 0.22, 0.72, 0.80, 0.90, 1],
          ease:     'easeOut',
          repeat:   Infinity,
          repeatDelay: 0.05,
        }}
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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <PinMark size={size} />

      {showWordmark && (
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: fs,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          userSelect: 'none',
          display: 'inline-flex',
          alignItems: 'baseline',
          overflow: 'hidden',
        }}>
          {/* ZYPH slides in slightly after the icon */}
          <motion.span
            animate={{
              x:       [-26, -26, 0,  0,  0, -12, -26],
              opacity: [0,   0,   1,  1,  1,  0,   0  ],
            }}
            transition={{
              duration: LOOP,
              times:    [0, 0.16, 0.24, 0.72, 0.80, 0.91, 1],
              ease:     [0.22, 1, 0.36, 1],
              repeat:   Infinity,
              repeatDelay: 0.05,
            }}
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #18F590 0%, #0DC268 55%, #08924C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              willChange: 'transform',
            }}>
            ZYPH
          </motion.span>

          {/* IX slides in just after ZYPH */}
          <motion.span
            animate={{
              x:       [-20, -20, 0,  0,  0, -8, -20],
              opacity: [0,   0,   1,  1,  1,  0,  0  ],
            }}
            transition={{
              duration: LOOP,
              times:    [0, 0.19, 0.28, 0.72, 0.80, 0.91, 1],
              ease:     [0.22, 1, 0.36, 1],
              repeat:   Infinity,
              repeatDelay: 0.05,
            }}
            style={{
              color: '#0A0F1A',
              fontStyle: 'normal',
              display: 'inline-block',
              willChange: 'transform',
            }}>
            IX
          </motion.span>
        </span>
      )}
    </div>
  );
}

export function ZMarkOnly({ size = 32 }: { size?: number }) {
  const r  = Math.round(size * 0.265);
  const fs = Math.round(size * 0.46);
  return (
    <div style={{
      width: size, height: size, borderRadius: r,
      background: 'linear-gradient(148deg, #1AE082 0%, #0DC268 38%, #09A058 72%, #077A46 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      boxShadow: '0 5px 22px rgba(9,160,88,.52)',
    }}>
      <span style={{
        fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontStyle: 'italic',
        fontSize: fs, color: '#fff', lineHeight: 1, letterSpacing: '-0.08em',
      }}>//</span>
    </div>
  );
}
