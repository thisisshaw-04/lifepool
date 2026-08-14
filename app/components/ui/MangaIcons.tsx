'use client';

/**
 * Manga / chibi ink icons — same language as MangaAvatars:
 * #222 outlines, white fills, round caps, chunky strokes, tiny faces.
 */

export type InkName =
  | 'home' | 'search' | 'pools' | 'schedule' | 'profile'
  | 'heart' | 'check' | 'x' | 'back' | 'chevron'
  | 'pin' | 'clock' | 'star' | 'shield' | 'brain'
  | 'message' | 'nav' | 'users' | 'alert' | 'zap'
  | 'thumbs' | 'dollar' | 'sparkles' | 'calendar'
  | 'loader' | 'checkCircle' | 'xCircle' | 'grid' | 'plus'
  | 'invite' | 'link' | 'family';

export function InkIcon({
  name,
  size = 24,
  color = '#222',
  filled = false,
}: {
  name: InkName;
  size?: number;
  color?: string;
  filled?: boolean;
}) {
  const s = color;
  const fill = filled ? color : 'white';
  const isWhite = s === '#ffffff' || s === '#fff';
  const wellFill = isWhite ? 'none' : fill;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0, pointerEvents: 'none' }}
    >
      {name === 'home' && (
        <>
          <path d="M5 15 L16 6 L27 15 V26 A2 2 0 0 1 25 28 H7 A2 2 0 0 1 5 26 Z" fill={fill} stroke={s} strokeWidth="1.9" strokeLinejoin="round" />
          <rect x="13" y="18" width="6" height="10" rx="1.4" fill={filled ? '#fff' : 'white'} stroke={s} strokeWidth="1.4" />
          <circle cx="16" cy="21.2" r="0.7" fill={s} />
          <circle cx="16" cy="21.2" r="0.25" fill="#fff" />
          <path d="M14.8 23.2 Q16 24.2 17.2 23.2" stroke={s} strokeWidth="1" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === 'search' && (
        <>
          <circle cx="14" cy="14" r="8" fill={wellFill} stroke={s} strokeWidth="1.9" />
          <path d="M20 20 L26.5 26.5" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}

      {name === 'pools' && (
        <>
          {/* left chibi */}
          <ellipse cx="12" cy="16" rx="7.2" ry="8" fill={fill} stroke={s} strokeWidth="1.7" />
          <path d="M5.2 14 Q5 8 12 7 Q17.5 8 18.4 13" fill={s} />
          <ellipse cx="9.6" cy="16.2" rx="1.5" ry="1.7" fill="#fff" stroke={s} strokeWidth="0.9" />
          <circle cx="10" cy="16.3" r="0.75" fill={s} />
          <circle cx="10.3" cy="15.9" r="0.25" fill="#fff" />
          <ellipse cx="14.2" cy="16.2" rx="1.5" ry="1.7" fill="#fff" stroke={s} strokeWidth="0.9" />
          <circle cx="14.6" cy="16.3" r="0.75" fill={s} />
          <circle cx="14.9" cy="15.9" r="0.25" fill="#fff" />
          <path d="M10.4 19.4 Q12 20.6 13.6 19.4" stroke={s} strokeWidth="1" strokeLinecap="round" fill="none" />
          {/* right chibi overlapping */}
          <ellipse cx="20.5" cy="16.4" rx="7.2" ry="8" fill={fill} stroke={s} strokeWidth="1.7" />
          <path d="M14 14.2 Q14.4 8.2 20.5 7.2 Q26.6 8.4 27.4 13.6" fill={s} />
          <ellipse cx="18.2" cy="16.6" rx="1.5" ry="1.7" fill="#fff" stroke={s} strokeWidth="0.9" />
          <circle cx="18.6" cy="16.7" r="0.75" fill={s} />
          <circle cx="18.9" cy="16.3" r="0.25" fill="#fff" />
          <ellipse cx="22.8" cy="16.6" rx="1.5" ry="1.7" fill="#fff" stroke={s} strokeWidth="0.9" />
          <circle cx="23.2" cy="16.7" r="0.75" fill={s} />
          <circle cx="23.5" cy="16.3" r="0.25" fill="#fff" />
          <path d="M19 19.8 Q20.5 21 22.2 19.8" stroke={s} strokeWidth="1" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === 'schedule' && (
        <>
          <rect x="5" y="8" width="22" height="20" rx="3" fill={fill} stroke={s} strokeWidth="1.8" />
          <path d="M5 13.5 H27" stroke={s} strokeWidth="1.6" />
          <path d="M11 5.5 V10" stroke={s} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21 5.5 V10" stroke={s} strokeWidth="1.8" strokeLinecap="round" />
          <rect x="10" y="17.5" width="4" height="4" rx="0.8" fill={s} />
          <rect x="16" y="17.5" width="4" height="4" rx="0.8" fill={s} />
        </>
      )}

      {name === 'profile' && (
        <g transform="translate(0 1.5)">
          <ellipse cx="16" cy="15.5" rx="8.2" ry="9" fill={fill} stroke={s} strokeWidth="1.8" />
          <path d="M8 13.5 Q8 6 16 5 Q24 6 24 13.5" fill={s} />
          <path d="M9.5 9.5 Q12 13 15 11.5 Q16 11 16 9 Q16 11 17.2 11.5 Q20.5 13 22.5 9.5" fill={s} />
          <ellipse cx="12.6" cy="16.4" rx="1.8" ry="2" fill="#fff" stroke={s} strokeWidth="1.05" />
          <circle cx="13.1" cy="16.5" r="0.95" fill={s} />
          <circle cx="13.5" cy="15.9" r="0.32" fill="#fff" />
          <ellipse cx="19.4" cy="16.4" rx="1.8" ry="2" fill="#fff" stroke={s} strokeWidth="1.05" />
          <circle cx="19.9" cy="16.5" r="0.95" fill={s} />
          <circle cx="20.3" cy="15.9" r="0.32" fill="#fff" />
          <path d="M11.6 14 Q13 13.2 14.6 14" stroke={s} strokeWidth="1.05" strokeLinecap="round" />
          <path d="M17.6 14 Q19.2 13.2 20.6 14" stroke={s} strokeWidth="1.05" strokeLinecap="round" />
          <path d="M13.6 20.6 Q16 22.4 18.4 20.6" stroke={s} strokeWidth="1.15" strokeLinecap="round" fill="none" />
        </g>
      )}

      {name === 'heart' && (
        <path
          d="M16 27 C16 27 6 20 6 13.2 A5.4 5.4 0 0 1 16 11.2 A5.4 5.4 0 0 1 26 13.2 C26 20 16 27 16 27 Z"
          fill={filled ? s : 'white'}
          stroke={s}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}

      {name === 'check' && (
        <path d="M7 17 L13 23 L25 9" stroke={s} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}

      {name === 'x' && (
        <>
          <path d="M9 9 L23 23" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M23 9 L9 23" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}

      {name === 'back' && (
        <path d="M19 7 L10 16 L19 25" stroke={s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}

      {name === 'chevron' && (
        <path d="M12 8 L20 16 L12 24" stroke={s} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}

      {name === 'pin' && (
        <>
          <path d="M16 28 C16 28 7 18.5 7 13 A9 9 0 0 1 25 13 C25 18.5 16 28 16 28 Z" fill={fill} stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="16" cy="13" r="3.2" fill={filled ? '#fff' : 'white'} stroke={s} strokeWidth="1.3" />
          <circle cx="14.8" cy="12.5" r="0.7" fill={s} />
          <circle cx="17.2" cy="12.5" r="0.7" fill={s} />
          <path d="M14.8 14.4 Q16 15.3 17.2 14.4" stroke={s} strokeWidth="0.9" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === 'clock' && (
        <>
          <circle cx="16" cy="16" r="11" fill={fill} stroke={s} strokeWidth="1.8" />
          <ellipse cx="16" cy="16" rx="6.5" ry="6.5" fill={filled ? '#fff' : 'white'} stroke={s} strokeWidth="1.2" />
          <path d="M16 12 V16.5 L19 19" stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="13.4" cy="14.2" r="0.7" fill={s} />
          <circle cx="18.6" cy="14.2" r="0.7" fill={s} />
        </>
      )}

      {name === 'star' && (
        <path
          d="M16 4 L18.6 12.2 L27.5 12.4 L20.6 17.4 L23.2 25.8 L16 21 L8.8 25.8 L11.4 17.4 L4.5 12.4 L13.4 12.2 Z"
          fill={filled ? s : 'white'}
          stroke={s}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      )}

      {name === 'shield' && (
        <>
          <path d="M16 4 L26 8 V16 C26 22 21.5 26.5 16 28 C10.5 26.5 6 22 6 16 V8 Z" fill={fill} stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="13.4" cy="14.5" r="1" fill={s} />
          <circle cx="18.6" cy="14.5" r="1" fill={s} />
          <path d="M13.6 17.6 Q16 19.4 18.4 17.6" stroke={s} strokeWidth="1.1" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === 'brain' && (
        <>
          {/* chibi head */}
          <ellipse cx="14" cy="18.4" rx="9.4" ry="10" fill={fill} stroke={s} strokeWidth="1.9" />
          <path d="M5.2 16.2 Q5.2 7.6 14 6.4 Q22.8 7.8 23 15.4" fill={s} />
          <ellipse cx="10.6" cy="18.6" rx="1.9" ry="2.15" fill="#fff" stroke={s} strokeWidth="1.1" />
          <circle cx="11.1" cy="18.7" r="0.95" fill={s} />
          <circle cx="11.45" cy="18.25" r="0.32" fill="#fff" />
          <ellipse cx="17.6" cy="18.6" rx="1.9" ry="2.15" fill="#fff" stroke={s} strokeWidth="1.1" />
          <circle cx="18.1" cy="18.7" r="0.95" fill={s} />
          <circle cx="18.45" cy="18.25" r="0.32" fill="#fff" />
          <path d="M11.6 22.6 Q14 24.2 16.6 22.6" stroke={s} strokeWidth="1.15" strokeLinecap="round" fill="none" />
          {/* thought trail + bubble */}
          <circle cx="21.6" cy="10.6" r="1.45" fill={fill} stroke={s} strokeWidth="1.35" />
          <circle cx="24.8" cy="6.6" r="5.6" fill={wellFill} stroke={s} strokeWidth="1.7" />
          <path d="M24.8 3.4 L25.5 5.85 L28.1 6.6 L25.5 7.35 L24.8 9.8 L24.1 7.35 L21.5 6.6 L24.1 5.85 Z" fill={s} />
        </>
      )}

      {name === 'message' && (
        <>
          <path d="M6 8 H26 A2 2 0 0 1 28 10 V20 A2 2 0 0 1 26 22 H14 L8 27 V22 H6 A2 2 0 0 1 4 20 V10 A2 2 0 0 1 6 8 Z" fill={fill} stroke={s} strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="12.5" cy="15" r="1.05" fill={s} />
          <circle cx="16" cy="15" r="1.05" fill={s} />
          <circle cx="19.5" cy="15" r="1.05" fill={s} />
        </>
      )}

      {name === 'nav' && (
        <path d="M8 6 L26 14 L16 16 L14 26 Z" fill={fill} stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      )}

      {name === 'users' && (
        <>
          {/* back chibi */}
          <ellipse cx="12" cy="14.2" rx="6.6" ry="7.2" fill={fill} stroke={s} strokeWidth="1.65" />
          <path d="M5.8 12.4 Q5.6 7.2 12 6.2 Q17.6 7.2 18.2 12" fill={s} />
          <ellipse cx="9.8" cy="14.4" rx="1.35" ry="1.5" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="10.15" cy="14.5" r="0.68" fill={s} />
          <circle cx="10.4" cy="14.15" r="0.22" fill="#fff" />
          <ellipse cx="14.2" cy="14.4" rx="1.35" ry="1.5" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="14.55" cy="14.5" r="0.68" fill={s} />
          <circle cx="14.8" cy="14.15" r="0.22" fill="#fff" />
          <path d="M10.6 17.4 Q12 18.5 13.5 17.4" stroke={s} strokeWidth="0.95" strokeLinecap="round" fill="none" />
          <path d="M6.6 22.2 Q7.2 19.2 12 19.2 Q16.6 19.2 17.4 22.4" fill={fill} stroke={s} strokeWidth="1.55" strokeLinecap="round" />
          {/* front chibi */}
          <ellipse cx="21.2" cy="15" rx="6.4" ry="7" fill={fill} stroke={s} strokeWidth="1.65" />
          <path d="M15.2 13.2 Q15.6 8 21.2 7.2 Q26.8 8.2 27.2 13" fill={s} />
          <ellipse cx="19" cy="15.2" rx="1.3" ry="1.45" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="19.35" cy="15.3" r="0.65" fill={s} />
          <circle cx="19.58" cy="14.98" r="0.22" fill="#fff" />
          <ellipse cx="23.4" cy="15.2" rx="1.3" ry="1.45" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="23.75" cy="15.3" r="0.65" fill={s} />
          <circle cx="23.98" cy="14.98" r="0.22" fill="#fff" />
          <path d="M19.8 18.2 Q21.2 19.3 22.7 18.2" stroke={s} strokeWidth="0.95" strokeLinecap="round" fill="none" />
          <path d="M16 24.2 Q16.6 21 21.2 20.8 Q26.2 20.6 27.2 24.4" fill={fill} stroke={s} strokeWidth="1.55" strokeLinecap="round" />
        </>
      )}

      {name === 'alert' && (
        <>
          <circle cx="16" cy="16" r="11" fill={fill} stroke={s} strokeWidth="1.8" />
          <path d="M16 9 V18" stroke={s} strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="16" cy="22" r="1.15" fill={s} />
        </>
      )}

      {name === 'zap' && (
        <path d="M18 4 L8 17 H15 L13 28 L25 13 H18 Z" fill={filled ? s : 'white'} stroke={s} strokeWidth="1.7" strokeLinejoin="round" />
      )}

      {name === 'thumbs' && (
        <>
          <path d="M12 14 V26 H8 A2 2 0 0 1 6 24 V16 A2 2 0 0 1 8 14 Z" fill={fill} stroke={s} strokeWidth="1.6" />
          <path d="M12 14 L15 7 A3 3 0 0 1 21 8 V14 H25 A2 2 0 0 1 27 16 L25 24 A3 3 0 0 1 22 26 H12" fill={fill} stroke={s} strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}

      {name === 'dollar' && (
        <>
          <circle cx="16" cy="16" r="11" fill={fill} stroke={s} strokeWidth="1.8" />
          <path d="M16 9 V23" stroke={s} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M20 12 Q16 10 12 13 Q16 16 20 18 Q16 22 12 20" stroke={s} strokeWidth="1.7" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === 'sparkles' && (
        <>
          <path d="M16 4 L17.6 12.4 L26 14 L17.6 15.6 L16 24 L14.4 15.6 L6 14 L14.4 12.4 Z" fill={filled ? s : 'white'} stroke={s} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M25 6 L25.6 8.2 L28 8.8 L25.6 9.4 L25 11.6 L24.4 9.4 L22 8.8 L24.4 8.2 Z" fill={s} />
          <path d="M7 20 L7.5 21.8 L9.4 22.3 L7.5 22.8 L7 24.6 L6.5 22.8 L4.6 22.3 L6.5 21.8 Z" fill={s} />
        </>
      )}

      {name === 'calendar' && (
        <>
          <rect x="5" y="8" width="22" height="19" rx="3" fill={wellFill} stroke={s} strokeWidth="2.15" />
          <path d="M5 13.5 H27" stroke={s} strokeWidth="1.8" />
          <path d="M11 5.5 V10.5" stroke={s} strokeWidth="2.15" strokeLinecap="round" />
          <path d="M21 5.5 V10.5" stroke={s} strokeWidth="2.15" strokeLinecap="round" />
          <rect x="10" y="17" width="4" height="4" rx="0.8" fill={s} />
          <rect x="16" y="17" width="4" height="4" rx="0.8" fill={s} />
        </>
      )}

      {name === 'loader' && (
        <g style={{ transformOrigin: '16px 16px', animation: 'spin 0.9s linear infinite' }}>
          <circle cx="16" cy="16" r="10" stroke={s} strokeWidth="2" strokeDasharray="18 40" strokeLinecap="round" fill="none" />
          <circle cx="16" cy="6" r="2.2" fill={s} />
        </g>
      )}

      {name === 'checkCircle' && (
        <>
          <circle cx="16" cy="16" r="11" fill={fill} stroke={s} strokeWidth="1.8" />
          <path d="M10 16.5 L14 20.5 L22.5 11.5" stroke={s} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}

      {name === 'xCircle' && (
        <>
          <circle cx="16" cy="16" r="11" fill={fill} stroke={s} strokeWidth="1.8" />
          <path d="M11 11 L21 21" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <path d="M21 11 L11 21" stroke={s} strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {name === 'grid' && (
        <>
          {[5, 17].flatMap((x) => [5, 17].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx="2.4" fill={fill} stroke={s} strokeWidth="1.7" />
          )))}
        </>
      )}

      {name === 'plus' && (
        <>
          <path d="M16 8 V24" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M8 16 H24" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}

      {name === 'invite' && (
        <>
          {/* back chibi */}
          <ellipse cx="11.6" cy="14.6" rx="6.8" ry="7.4" fill={fill} stroke={s} strokeWidth="1.65" />
          <path d="M5.2 12.8 Q5 7.2 11.6 6.2 Q17.6 7.2 18.2 12.4" fill={s} />
          <ellipse cx="9.3" cy="14.8" rx="1.4" ry="1.55" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="9.65" cy="14.9" r="0.7" fill={s} />
          <circle cx="9.9" cy="14.55" r="0.22" fill="#fff" />
          <ellipse cx="13.9" cy="14.8" rx="1.4" ry="1.55" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="14.25" cy="14.9" r="0.7" fill={s} />
          <circle cx="14.5" cy="14.55" r="0.22" fill="#fff" />
          <path d="M10.1 18 Q11.6 19.2 13.2 18" stroke={s} strokeWidth="0.95" strokeLinecap="round" fill="none" />
          {/* front chibi */}
          <ellipse cx="20.6" cy="15.2" rx="6.6" ry="7.2" fill={fill} stroke={s} strokeWidth="1.65" />
          <path d="M14.4 13.4 Q14.8 8 20.6 7.2 Q26.4 8.2 26.8 13.2" fill={s} />
          <ellipse cx="18.3" cy="15.4" rx="1.35" ry="1.5" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="18.65" cy="15.5" r="0.68" fill={s} />
          <circle cx="18.88" cy="15.18" r="0.22" fill="#fff" />
          <ellipse cx="22.9" cy="15.4" rx="1.35" ry="1.5" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="23.25" cy="15.5" r="0.68" fill={s} />
          <circle cx="23.48" cy="15.18" r="0.22" fill="#fff" />
          <path d="M19.1 18.5 Q20.6 19.7 22.2 18.5" stroke={s} strokeWidth="0.95" strokeLinecap="round" fill="none" />
          {/* plus badge */}
          <circle cx="25.2" cy="24.6" r="5.1" fill={wellFill} stroke={s} strokeWidth="1.55" />
          <path d="M25.2 22.1 V27.1" stroke={s} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M22.7 24.6 H27.7" stroke={s} strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}

      {name === 'link' && (
        <>
          <rect x="3.2" y="11.2" width="14.5" height="8.2" rx="4.1" fill={fill} stroke={s} strokeWidth="1.7" transform="rotate(-28 10.45 15.3)" />
          <rect x="14.2" y="11.2" width="14.5" height="8.2" rx="4.1" fill={fill} stroke={s} strokeWidth="1.7" transform="rotate(28 21.45 15.3)" />
          <circle cx="10.2" cy="14.6" r="0.85" fill={s} />
          <circle cx="21.8" cy="14.6" r="0.85" fill={s} />
          <path d="M9.4 16.4 Q10.4 17.2 11.4 16.4" stroke={s} strokeWidth="0.85" strokeLinecap="round" fill="none" />
          <path d="M21 16.4 Q22 17.2 23 16.4" stroke={s} strokeWidth="0.85" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === 'family' && (
        <>
          {/* taller figure */}
          <ellipse cx="12.2" cy="13.4" rx="6.4" ry="7" fill={fill} stroke={s} strokeWidth="1.65" />
          <path d="M6.2 11.6 Q6 6.6 12.2 5.6 Q18.2 6.6 18.2 11.4" fill={s} />
          <ellipse cx="10" cy="13.6" rx="1.3" ry="1.45" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="10.35" cy="13.7" r="0.65" fill={s} />
          <circle cx="10.55" cy="13.38" r="0.2" fill="#fff" />
          <ellipse cx="14.4" cy="13.6" rx="1.3" ry="1.45" fill="#fff" stroke={s} strokeWidth="0.85" />
          <circle cx="14.75" cy="13.7" r="0.65" fill={s} />
          <circle cx="14.95" cy="13.38" r="0.2" fill="#fff" />
          <path d="M10.8 16.6 Q12.2 17.7 13.7 16.6" stroke={s} strokeWidth="0.95" strokeLinecap="round" fill="none" />
          <path d="M7.2 22.6 Q7.8 19.4 12.2 19.2 Q16.6 19.2 17.4 22.8" fill={fill} stroke={s} strokeWidth="1.5" strokeLinecap="round" />
          {/* smaller figure */}
          <ellipse cx="22.2" cy="17.4" rx="5.4" ry="5.8" fill={fill} stroke={s} strokeWidth="1.55" />
          <path d="M17.2 16 Q17.4 11.6 22.2 10.8 Q27 11.8 27.2 15.8" fill={s} />
          <ellipse cx="20.3" cy="17.5" rx="1.15" ry="1.3" fill="#fff" stroke={s} strokeWidth="0.8" />
          <circle cx="20.6" cy="17.6" r="0.58" fill={s} />
          <circle cx="20.78" cy="17.32" r="0.18" fill="#fff" />
          <ellipse cx="24" cy="17.5" rx="1.15" ry="1.3" fill="#fff" stroke={s} strokeWidth="0.8" />
          <circle cx="24.3" cy="17.6" r="0.58" fill={s} />
          <circle cx="24.48" cy="17.32" r="0.18" fill="#fff" />
          <path d="M21 20 Q22.2 20.9 23.5 20" stroke={s} strokeWidth="0.85" strokeLinecap="round" fill="none" />
          <path d="M18 25.6 Q18.6 23 22.2 22.8 Q25.8 22.8 26.6 25.8" fill={fill} stroke={s} strokeWidth="1.45" strokeLinecap="round" />
          {/* heart */}
          <path d="M24.8 6.2 C24.8 6.2 22.2 4.6 22.2 6.6 C22.2 8.2 24.8 9.8 24.8 9.8 C24.8 9.8 27.4 8.2 27.4 6.6 C27.4 4.6 24.8 6.2 24.8 6.2 Z" fill={s} />
        </>
      )}
    </svg>
  );
}
