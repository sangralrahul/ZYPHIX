import React from 'react';

function PinMark({ size }: { size: number }) {
  const r = Math.round(size * 0.265);
  const fs = Math.round(size * 0.46);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: r,
      background: 'linear-gradient(148deg, #1AE082 0%, #0DC268 38%, #09A058 72%, #077A46 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: `0 5px 22px rgba(9,160,88,.52), inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(0,0,0,.12)`,
    }}>
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
    </div>
  );
}

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
          letterSpacing: '-0.06em',
          lineHeight: 1,
          userSelect: 'none',
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 0,
        }}>
          <span style={{
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #18F590 0%, #0DC268 55%, #08924C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ZYPH</span>
          <span style={{
            color: '#0A0F1A',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: fs * 1.08,
            letterSpacing: '-0.04em',
          }}>IX</span>
        </span>
      )}
    </div>
  );
}

export function ZMarkOnly({ size = 32 }: { size?: number }) {
  return <PinMark size={size} />;
}
