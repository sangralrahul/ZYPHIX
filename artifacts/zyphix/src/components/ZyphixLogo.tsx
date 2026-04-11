import React from 'react';

function PinMark({ size }: { size: number }) {
  const r = Math.round(size * 0.265);
  const fs = Math.round(size * 0.44);
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
        fontSize: fs,
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '-0.05em',
        userSelect: 'none',
      }}>//</span>
    </div>
  );
}

export function ZyphixLogo({
  size = 32,
  wordmarkColor = '#0A0F1A',
  wordmarkHighlight = '#0DA366',
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
  const fs = fontSize ?? size * 0.565;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <PinMark size={size} />
      {showWordmark && (
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: fs,
          letterSpacing: '-0.055em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          <span style={{ color: wordmarkHighlight }}>ZYPH</span>
          <span style={{ color: wordmarkHighlight, fontWeight: 300, letterSpacing: '-0.02em', opacity: 0.75 }}>/</span>
          <span style={{ color: wordmarkColor }}>X</span>
        </span>
      )}
    </div>
  );
}

export function ZMarkOnly({ size = 32 }: { size?: number }) {
  return <PinMark size={size} />;
}
