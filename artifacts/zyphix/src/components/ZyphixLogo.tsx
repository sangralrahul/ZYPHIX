import React from 'react';

function ZMark({ size }: { size: number }) {
  const r = Math.round(size * 0.265);
  const inner = size * 0.64;
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
      <svg width={inner} height={inner} viewBox="0 0 22 22" fill="none">
        <path
          d="M3.5 5H18.5L3.5 17H18.5"
          stroke="white"
          strokeWidth="2.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
      <ZMark size={size} />
      {showWordmark && (
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: fs,
          letterSpacing: '-0.055em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          <span style={{ color: wordmarkHighlight }}>Z</span>
          <span style={{ color: wordmarkColor }}>YPHIX</span>
        </span>
      )}
    </div>
  );
}

export function ZMarkOnly({ size = 32 }: { size?: number }) {
  return <ZMark size={size} />;
}
