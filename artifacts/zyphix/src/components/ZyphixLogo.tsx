import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

function PinMark({ size, animate: doAnimate }: { size: number; animate?: boolean }) {
  const r = Math.round(size * 0.265);
  const fs = Math.round(size * 0.46);
  return (
    <motion.div
      initial={doAnimate ? { scale: 0, opacity: 0, rotate: -20 } : false}
      animate={doAnimate ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0 }}
      style={{
        width: size,
        height: size,
        borderRadius: r,
        background: 'linear-gradient(148deg, #1AE082 0%, #0DC268 38%, #09A058 72%, #077A46 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: `0 5px 22px rgba(9,160,88,.52), inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(0,0,0,.12)`,
      }}
    >
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 900,
        fontStyle: 'italic',
        fontSize: fs,
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '-0.08em',
        userSelect: 'none',
        textShadow: '0 1px 6px rgba(0,0,0,.18)',
      }}>//</span>
    </motion.div>
  );
}

export function ZyphixLogo({
  size = 32,
  showWordmark = true,
  gap = 9,
  fontSize,
  playAnimation = false,
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
  const wordmarkControls = useAnimation();
  const [showSpark, setShowSpark] = useState(false);

  useEffect(() => {
    if (!playAnimation) return;
    const run = async () => {
      await new Promise(r => setTimeout(r, 480));
      setShowSpark(true);
      wordmarkControls.start({
        scale: [1, 1.08, 0.96, 1.02, 1],
        filter: [
          'drop-shadow(0 0 0px #0DC268)',
          'drop-shadow(0 0 14px #1AE082)',
          'drop-shadow(0 0 6px #0DC268)',
          'drop-shadow(0 0 3px #0DC268)',
          'drop-shadow(0 0 0px #0DC268)',
        ],
        transition: { duration: 0.45, times: [0, 0.25, 0.55, 0.75, 1], ease: 'easeOut' },
      });
      await new Promise(r => setTimeout(r, 400));
      setShowSpark(false);
    };
    run();
  }, [playAnimation]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <PinMark size={size} animate={playAnimation} />
      {showWordmark && (
        <motion.span
          animate={wordmarkControls}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: fs,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            userSelect: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <motion.span
            initial={playAnimation ? { x: -60, opacity: 0 } : false}
            animate={playAnimation ? { x: 0, opacity: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.18 }}
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #18F590 0%, #0DC268 55%, #08924C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >ZYPH</motion.span>

          {/* Spark flash at junction */}
          {showSpark && (
            <motion.span
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1.4, 1.2, 0] }}
              transition={{ duration: 0.35, times: [0, 0.2, 0.6, 1] }}
              style={{
                display: 'inline-block',
                width: 2,
                height: fs * 1.1,
                background: 'linear-gradient(180deg, #6DFFC0, #0DC268)',
                borderRadius: 2,
                boxShadow: '0 0 8px 3px #1AE082',
                transformOrigin: 'center',
                flexShrink: 0,
                marginInline: 1,
              }}
            />
          )}

          <motion.span
            initial={playAnimation ? { x: 60, opacity: 0 } : false}
            animate={playAnimation ? { x: 0, opacity: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.18 }}
            style={{
              color: '#0A0F1A',
              fontStyle: 'normal',
              fontWeight: 900,
              display: 'inline-block',
            }}
          >IX</motion.span>
        </motion.span>
      )}
    </div>
  );
}

export function ZMarkOnly({ size = 32 }: { size?: number }) {
  return <PinMark size={size} />;
}
