import React from 'react';

function PinMark({ size }: { size: number }) {
  const r = Math.round(size * 0.265);
  const pinW = size * 0.48;
  const pinH = size * 0.68;
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
      <svg width={pinW} height={pinH} viewBox="0 0 22 30" fill="none">
        <path
          d="M11 1C5.48 1 1 5.48 1 11C1 18.75 11 29 11 29C11 29 21 18.75 21 11C21 5.48 16.52 1 11 1Z"
          fill="white"
        />
        <circle cx="11" cy="11" r="3.8" fill="#07924F" />
        <circle cx="11" cy="11" r="1.6" fill="rgba(255,255,255,0.55)" />
      </svg>
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
