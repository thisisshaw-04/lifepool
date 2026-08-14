'use client';

const INK = '#222';
const BLUSH = '#ccc';
const MAIN = 1.9;
const FINE = 1.35;

function Frame({ size = 72, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0, overflow: 'visible' }}
    >
      {children}
    </svg>
  );
}

export function GroceryIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* can */}
      <ellipse cx="40" cy="28" rx="7.2" ry="3" fill="white" stroke={INK} strokeWidth={MAIN} />
      <path d="M32.8 28 V44" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <path d="M47.2 28 V44" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <ellipse cx="40" cy="44" rx="7.2" ry="3" fill="white" stroke={INK} strokeWidth={MAIN} />
      <path d="M33.2 35 Q40 33 46.8 35 L46.8 40 Q40 42 33.2 40 Z" fill={INK} />
      <circle cx="43.5" cy="31" r="1.4" fill="white" />

      {/* carrot body */}
      <path
        d="M53 26 C57 28 61 44 56 52 C50.5 51 48 38 53 26 Z"
        fill="white" stroke={INK} strokeWidth={MAIN} strokeLinejoin="round"
      />
      {/* greens, filled like hair */}
      <path d="M53 26 Q46 14 42 14 Q48 20 53 26 Z" fill={INK} />
      <path d="M53 26 Q54 12 56 11 Q56 18 53 26 Z" fill={INK} />
      <path d="M53 26 Q62 14 65 15 Q58 20 53 26 Z" fill={INK} />
      <path d="M50 20 Q53 18 55 21" stroke="white" strokeWidth="1.1" strokeLinecap="round" />

      {/* handle + back post, filled */}
      <path d="M16 15 H33 V23 H25 V52 H16 Z" fill={INK} />
      <path d="M19 18 H29" stroke="white" strokeWidth="1.2" strokeLinecap="round" />

      {/* basket */}
      <path d="M25 32 H66 L58 53 H25 Z" fill="white" stroke={INK} strokeWidth={MAIN} strokeLinejoin="round" />
      <line x1="29" y1="39" x2="63" y2="39" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <line x1="28" y1="46" x2="60.5" y2="46" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <line x1="43" y1="32" x2="41" y2="53" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <line x1="54" y1="32" x2="50.5" y2="53" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />

      {/* wheels */}
      <circle cx="36" cy="61" r="5.6" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="36" cy="61" r="2.2" fill={INK} />
      <circle cx="37.2" cy="59.8" r="0.7" fill="white" />
      <circle cx="54" cy="61" r="5.6" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="54" cy="61" r="2.2" fill={INK} />
      <circle cx="55.2" cy="59.8" r="0.7" fill="white" />
    </Frame>
  );
}

export function StudyIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      <g transform="translate(0 8)">
        {/* back cover, slight offset */}
        <rect x="13" y="18" width="30" height="40" rx="2.5" fill="white" stroke={INK} strokeWidth={FINE} />
        {/* front cover */}
        <rect x="10" y="16" width="30" height="40" rx="2.5" fill="white" stroke={INK} strokeWidth={MAIN} />
        {/* spine */}
        <rect x="10" y="16" width="7" height="40" rx="2" fill={INK} />
        <path d="M12.2 22 V50" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
        {/* cover lines */}
        <path d="M22 28 H35" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
        <path d="M22 34 H35" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
        <path d="M22 40 H31" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />

        {/* steam */}
        <path d="M52 22 C50 18 54 16 52 12 C50.4 9 53.5 8 52 6" stroke={BLUSH} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M60 20 C58 16 62 14 60 10 C58.4 7 61.5 6 60 4" stroke={INK} strokeWidth={FINE} strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M68 22 C66 18 70 16 68 12 C66.4 9 69.5 8 68 6" stroke={BLUSH} strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* handle */}
        <path
          d="M70 34 C80 32 82 50 68 50 L68 46 C78 46 76.5 36 70 37.2 Z"
          fill="white"
          stroke={INK}
          strokeWidth={MAIN}
          strokeLinejoin="round"
        />

        {/* mug body */}
        <path
          d="M46 30 L48 50 Q60 56 72 50 L74 30"
          fill="white"
          stroke={INK}
          strokeWidth={MAIN}
          strokeLinejoin="round"
        />

        {/* rim */}
        <ellipse cx="60" cy="30" rx="14" ry="5" fill="white" stroke={INK} strokeWidth={MAIN} />
        {/* coffee */}
        <ellipse cx="60" cy="30.6" rx="10.5" ry="3.2" fill={INK} />
        <path d="M52 30.2 Q60 28.2 68 30.2" stroke="white" strokeWidth="1.15" strokeLinecap="round" />

        {/* shine */}
        <path d="M50 36 Q52 42 51 46" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

export function LunchIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* steam */}
      <path d="M30 24 C28 20 32 18 30 14 C28.4 11 31.5 10 30 8" stroke={BLUSH} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M40 22 C38 18 42 16 40 12 C38.4 9 41.5 8 40 6" stroke={INK} strokeWidth={FINE} strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M50 24 C48 20 52 18 50 14 C48.4 11 51.5 10 50 8" stroke={BLUSH} strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* bowl */}
      <path d="M17 44 C17 44 19 65 40 67 C61 65 63 44 63 44" fill="white" stroke={INK} strokeWidth={MAIN} strokeLinejoin="round" />
      <ellipse cx="40" cy="44" rx="23" ry="6.4" fill="white" stroke={INK} strokeWidth={MAIN} />
      {/* broth */}
      <ellipse cx="40" cy="44.5" rx="18.5" ry="4.2" fill={INK} />
      <path d="M28 44 Q40 41 52 44" stroke="white" strokeWidth="1.15" strokeLinecap="round" />

      {/* noodles */}
      <path d="M26 45 C32 41 36 48 42 44 C48 40 52 48 57 44" stroke="white" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M28 48 C34 45 38 51 44 47 C50 43 53 51 58 47" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />

      {/* egg */}
      <ellipse cx="33" cy="46" rx="5" ry="3.6" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="33" cy="46" r="1.7" fill={BLUSH} />
      <circle cx="34.2" cy="45" r="0.6" fill="white" />

      {/* nori */}
      <rect x="46" y="42" width="7" height="5" rx="1" fill={INK} />
      <path d="M47.5 43.5 H51.5" stroke="white" strokeWidth="0.9" strokeLinecap="round" />

      {/* chopsticks */}
      <path d="M21 38 L62 32" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M21 43 L62 37" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M21 38 L28 37" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </Frame>
  );
}

function GirlWalker({
  x,
  y,
  dark,
  rightFootForward,
  hair,
}: {
  x: number;
  y: number;
  dark: boolean;
  rightFootForward: boolean;
  hair: 'girl' | 'boy';
}) {
  const cloth = dark ? INK : 'white';
  const stitch = dark ? 'white' : INK;
  const fwd = rightFootForward;
  const girl = hair === 'girl';
  const hem = 56.4;

  const backHand = fwd ? { x: 5, y: 46 } : { x: 35, y: 44 };
  const frontHand = fwd ? { x: 35, y: 44 } : { x: 5, y: 46 };
  const backShoulder = fwd ? { x: 13, y: 32 } : { x: 27, y: 32 };
  const frontShoulder = fwd ? { x: 27, y: 32 } : { x: 13, y: 32 };

  const sleeve = (from: { x: number; y: number }, to: { x: number; y: number }) => (
    <>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y - 4} stroke={INK} strokeWidth="6.8" strokeLinecap="round" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y - 4} stroke={cloth} strokeWidth="4.4" strokeLinecap="round" />
      <circle cx={to.x} cy={to.y - 3.2} r="2.2" fill={cloth} stroke={INK} strokeWidth={FINE} />
    </>
  );

  const hand = (h: { x: number; y: number }) => (
    <g>
      <ellipse cx={h.x} cy={h.y} rx="3.4" ry="3.1" fill="white" stroke={INK} strokeWidth={FINE} />
      <path d={`M${h.x - 2.4} ${h.y + 0.4} Q${h.x - 2.6} ${h.y + 3.2} ${h.x - 1} ${h.y + 3.4}`} stroke={INK} strokeWidth="1.05" strokeLinecap="round" fill="none" />
      <path d={`M${h.x - 0.4} ${h.y + 1.2} Q${h.x - 0.2} ${h.y + 3.8} ${h.x + 1} ${h.y + 3.6}`} stroke={INK} strokeWidth="1.05" strokeLinecap="round" fill="none" />
      <path d={`M${h.x + 1.6} ${h.y + 0.6} Q${h.x + 2.6} ${h.y + 3} ${h.x + 2.2} ${h.y + 3.4}`} stroke={INK} strokeWidth="1.05" strokeLinecap="round" fill="none" />
    </g>
  );

  // Hip-width under the torso (cx 20), slight walk -- not parked at garment corners.
  const left = fwd
    ? { hip: 17.5, ankle: 17.0, y: 68.7, rot: 7 }
    : { hip: 17.5, ankle: 17.4, y: 67.4, rot: 10 };
  const right = fwd
    ? { hip: 22.5, ankle: 23.0, y: 67.4, rot: 10 }
    : { hip: 22.5, ankle: 22.6, y: 68.7, rot: 7 };
  const backLeg = fwd ? left : right;
  const frontLeg = fwd ? right : left;
  const legTop = girl ? 50 : 43.6;

  const hemX = (l: { hip: number; ankle: number; y: number }) => {
    const t = (hem - legTop) / (l.y - 7.2 - legTop);
    return l.hip + (l.ankle - l.hip) * Math.min(Math.max(t, 0.2), 0.95);
  };

  const thigh = (l: { hip: number; ankle: number; y: number }) => {
    const hx = hemX(l);
    const top = girl ? 2.8 : 2.45;
    const bot = 2.35;
    return (
      <path
        d={`M${l.hip - top} ${legTop} Q${(l.hip + hx) / 2 - 0.6} ${(legTop + hem) / 2} ${hx - bot} ${hem}
            L${hx + bot} ${hem} Q${(l.hip + hx) / 2 + 0.6} ${(legTop + hem) / 2} ${l.hip + top} ${legTop} Z`}
        fill={dark ? INK : 'white'}
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinejoin="round"
      />
    );
  };

  const sock = (l: { hip: number; ankle: number; y: number }) => {
    const hx = hemX(l);
    return (
      <g>
        <path
          d={`M${hx - 2.35} ${hem} L${hx + 2.35} ${hem}
              L${l.ankle + 2.25} ${l.y - 1.2} Q${l.ankle} ${l.y + 0.35} ${l.ankle - 2.25} ${l.y - 1.2} Z`}
          fill="white"
          stroke={INK}
          strokeWidth={FINE}
          strokeLinejoin="round"
        />
        <path d={`M${hx - 1.7} ${hem + 2.6} L${hx + 1.7} ${hem + 2.6}`} stroke={INK} strokeWidth="0.9" strokeLinecap="round" />
      </g>
    );
  };

  const shoe = (l: { ankle: number; y: number; rot: number }) => (
    <g transform={`rotate(${l.rot} ${l.ankle} ${l.y})`}>
      <path
        d={`M${l.ankle - 3.2} ${l.y - 1.6} Q${l.ankle - 3.5} ${l.y + 2.2} ${l.ankle - 0.2} ${l.y + 2.4} L${l.ankle + 4.3} ${l.y + 2.1} Q${l.ankle + 5.2} ${l.y + 0.15} ${l.ankle + 3.5} ${l.y - 1.5} Q${l.ankle} ${l.y - 2.55} ${l.ankle - 3.2} ${l.y - 1.6} Z`}
        fill={INK}
        stroke={INK}
        strokeWidth={FINE}
        strokeLinejoin="round"
      />
      <path d={`M${l.ankle - 1.6} ${l.y - 1.45} Q${l.ankle + 0.6} ${l.y - 2.05} ${l.ankle + 2.4} ${l.y - 1.25}`} stroke="white" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y})`}>
      {girl && (
        <>
          <path d="M7.5 18 Q4.5 32 8 52 Q11.5 58 13 48 Q10.5 32 12 20 Z" fill={INK} />
          <path d="M32.5 18 Q35.5 32 32 52 Q28.5 58 27 48 Q29.5 32 28 20 Z" fill={INK} />
        </>
      )}

      {sleeve(backShoulder, backHand)}
      {hand(backHand)}

      {thigh(backLeg)}
      {thigh(frontLeg)}
      {shoe(backLeg)}

      <path
        d="M12.4 31 Q20 27.2 27.6 31 L26.8 44 Q20 46.4 13.2 44 Z"
        fill={cloth}
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinejoin="round"
      />
      <path
        d="M14.2 31 Q20 29.2 25.8 31 L23.6 36 Q20 34.6 16.4 36 Z"
        fill="white"
        stroke={INK}
        strokeWidth={FINE}
        strokeLinejoin="round"
      />
      <path d="M20 31.4 V35.6" stroke={INK} strokeWidth="0.9" strokeLinecap="round" />
      {!dark && (
        <>
          <circle cx="20" cy="39" r="0.85" fill={INK} />
          <circle cx="20" cy="42.2" r="0.85" fill={INK} />
        </>
      )}
      {dark && <path d="M16.8 39.5 H23.2" stroke="white" strokeWidth="1.05" strokeLinecap="round" />}

      {girl ? (
        <>
          <path
            d="M13.2 43.4 Q20 42 26.8 43.4 L31.2 56.4 Q20 58.6 8.8 56.4 Z"
            fill={cloth}
            stroke={INK}
            strokeWidth={MAIN}
            strokeLinejoin="round"
          />
          <path
            d="M12.4 50 Q20 48.6 27.6 50"
            stroke={stitch}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.55"
          />
        </>
      ) : (
        <>
          <path
            d="M15.0 43.2 Q20 41.8 25.0 43.2 L24.2 44.8 L15.8 44.8 Z"
            fill={cloth}
            stroke={INK}
            strokeWidth={MAIN}
            strokeLinejoin="round"
          />
          <path d="M16.2 46.2 H23.8" stroke={stitch} strokeWidth="1.15" strokeLinecap="round" />
        </>
      )}

      {sock(backLeg)}
      {sock(frontLeg)}
      {shoe(frontLeg)}

      <rect x="17.2" y="23.4" width="5.6" height="7.2" rx="2.4" fill="white" stroke={INK} strokeWidth={MAIN} />

      {!girl && (
        <>
          <path d="M8.8 12.2 Q5.2 12.8 4.8 16 Q5.4 19.4 9.4 18.2 Q9.6 15 8.8 12.2 Z" fill="white" stroke={INK} strokeWidth={FINE} strokeLinejoin="round" />
          <path d="M6.6 14.2 Q6 16 7.2 17.6" stroke={INK} strokeWidth="0.95" strokeLinecap="round" fill="none" />
          <path d="M31.2 12.2 Q34.8 12.8 35.2 16 Q34.6 19.4 30.6 18.2 Q30.4 15 31.2 12.2 Z" fill="white" stroke={INK} strokeWidth={FINE} strokeLinejoin="round" />
          <path d="M33.4 14.2 Q34 16 32.8 17.6" stroke={INK} strokeWidth="0.95" strokeLinecap="round" fill="none" />
        </>
      )}

      <ellipse cx="20" cy="13.2" rx="11.2" ry="12" fill="white" stroke={INK} strokeWidth={MAIN} />

      {girl ? (
        <>
          {/* one solid mass to the skull stroke; hairline stays above the eyes */}
          <path d="M8.0 14.8 Q7.0 1.4 20 -0.15 Q33.0 1.4 32.0 14.8 Q26.8 11 20 10.6 Q13.2 11 8.0 14.8 Z" fill={INK} />
          <path d="M8.8 13 Q8.4 17.2 10.2 20.2 Q11.8 16.2 11.6 12.2 Z" fill={INK} />
          <path d="M31.2 13 Q31.6 17.2 29.8 20.2 Q28.2 16.2 28.4 12.2 Z" fill={INK} />
          {/* small bow, fully filled black — no white loops */}
          <path d="M26.6 0.2 Q24.6 -0.6 25.2 1.8 Q26.2 2 26.6 0.2 Z" fill={INK} />
          <path d="M26.6 0.2 Q28.6 -0.6 28 1.8 Q27 2 26.6 0.2 Z" fill={INK} />
          <circle cx="26.6" cy="0.55" r="0.85" fill={INK} />
        </>
      ) : (
        <>
          {/* solid cap to the skull; spikes are the outer silhouette, not holes */}
          <path
            d="M8.4 12.8 Q7.6 2.8 13.2 1.1 L15.6 -1 L17.6 1.8 L20 -1.4 L22.4 1.8 L24.4 -1 L26.8 1.1 Q32.4 2.8 31.6 12.8 Q26.2 10.4 20 10.2 Q13.8 10.4 8.4 12.8 Z"
            fill={INK}
          />
          <path d="M8.5 12 Q7.8 15.5 9.2 17.6 Q10.8 14.8 10.4 12.2 Z" fill={INK} />
          <path d="M31.5 12 Q32.2 15.5 30.8 17.6 Q29.2 14.8 29.6 12.2 Z" fill={INK} />
        </>
      )}

      {girl ? (
        <>
          <path d="M13.2 12.4 Q15.6 11.4 18 12.6" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
          <path d="M22 12.4 Q24.4 11.4 26.8 12.6" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
          <path d="M13.4 15.4 Q16.2 13.2 18.8 15.4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="24.4" cy="15.2" rx="2.35" ry="2.65" fill="white" stroke={INK} strokeWidth="1.35" />
          <circle cx="24.95" cy="15.4" r="1.25" fill={INK} />
          <circle cx="25.55" cy="14.45" r="0.5" fill="white" />
          <path d="M17.4 19 Q20 21.2 22.8 19.2" stroke={INK} strokeWidth="1.25" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="15.6" cy="14.4" rx="2.3" ry="2.55" fill="white" stroke={INK} strokeWidth="1.35" />
          <circle cx="16.1" cy="14.6" r="1.25" fill={INK} />
          <circle cx="16.8" cy="13.6" r="0.5" fill="white" />
          <ellipse cx="24.4" cy="14.4" rx="2.3" ry="2.55" fill="white" stroke={INK} strokeWidth="1.35" />
          <circle cx="24.9" cy="14.6" r="1.25" fill={INK} />
          <circle cx="25.6" cy="13.6" r="0.5" fill="white" />
          <ellipse cx="20" cy="19.2" rx="1.35" ry="1.15" fill={INK} />
        </>
      )}
      <ellipse cx="13.2" cy="18.6" rx="1.8" ry="0.9" fill={BLUSH} opacity="0.7" />
      <ellipse cx="26.8" cy="18.6" rx="1.8" ry="0.9" fill={BLUSH} opacity="0.7" />

      {girl && (
        <>
          <path d="M8.8 20 Q7 34 10.2 46 Q13 50 13.6 42 Q11.5 30 12.2 22 Z" fill={INK} />
          <path d="M31.2 20 Q33 34 29.8 46 Q27 50 26.4 42 Q28.5 30 27.8 22 Z" fill={INK} />
        </>
      )}

      {sleeve(frontShoulder, frontHand)}
      {hand(frontHand)}
    </g>
  );
}

export function CommuteIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      <GirlWalker x={-2} y={3} dark={false} rightFootForward hair="girl" />
      <GirlWalker x={38} y={2} dark rightFootForward={false} hair="boy" />
    </Frame>
  );
}

export function ActivityIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* back dumbbell */}
      <g transform="rotate(-18 40 38)">
        <path d="M26 38 H54" stroke={INK} strokeWidth="7.4" strokeLinecap="round" />
        <path d="M29 38 H51" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="24.8" y="32.6" width="4.4" height="10.8" rx="1.2" fill="white" stroke={INK} strokeWidth={FINE} />
        <rect x="50.8" y="32.6" width="4.4" height="10.8" rx="1.2" fill="white" stroke={INK} strokeWidth={FINE} />
        <circle cx="15.5" cy="38" r="12" fill={INK} />
        <circle cx="15.5" cy="38" r="4.3" fill="white" stroke={INK} strokeWidth={FINE} />
        <circle cx="17.1" cy="36.4" r="1.15" fill="white" />
        <circle cx="64.5" cy="38" r="12" fill={INK} />
        <circle cx="64.5" cy="38" r="4.3" fill="white" stroke={INK} strokeWidth={FINE} />
        <circle cx="66.1" cy="36.4" r="1.15" fill="white" />
      </g>

      {/* front dumbbell */}
      <g transform="rotate(16 40 44)">
        <path d="M25.5 44 H54.5" stroke={INK} strokeWidth="7.6" strokeLinecap="round" />
        <path d="M28.5 44 H51.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="24.2" y="38.2" width="4.6" height="11.6" rx="1.2" fill="white" stroke={INK} strokeWidth={MAIN} />
        <rect x="51.2" y="38.2" width="4.6" height="11.6" rx="1.2" fill="white" stroke={INK} strokeWidth={MAIN} />
        <circle cx="14.5" cy="44" r="12.6" fill="white" stroke={INK} strokeWidth={MAIN} />
        <circle cx="14.5" cy="44" r="4.6" fill={INK} />
        <circle cx="16.2" cy="42.3" r="1.2" fill="white" />
        <circle cx="65.5" cy="44" r="12.6" fill="white" stroke={INK} strokeWidth={MAIN} />
        <circle cx="65.5" cy="44" r="4.6" fill={INK} />
        <circle cx="67.2" cy="42.3" r="1.2" fill="white" />
      </g>
    </Frame>
  );
}

export function RideIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* sedan side profile, low and long */}
      <path
        d="M6 50
           L8 44
           L16 44
           L20 34
           Q22 30 30 30
           L50 30
           Q58 30 62 36
           L70 44
           L74 44
           Q78 44 78 50
           L78 54
           Q78 57 74 57
           L10 57
           Q5 57 5 52
           Z"
        fill="white"
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinejoin="round"
      />

      {/* cabin windows */}
      <path d="M22 34 L20 43 H42 L43 32 Q32 31 22 34 Z" fill={INK} />
      <path d="M44 32 L43 43 H61 L58 36 Q54 32 44 32 Z" fill={INK} />
      <path d="M25 36 H38" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M47 35 H56" stroke="white" strokeWidth="1.1" strokeLinecap="round" />

      {/* belt line */}
      <path d="M16 44 H72" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />

      {/* door cut */}
      <path d="M42 44 V54" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <rect x="34" y="47" width="5.5" height="1.8" rx="0.9" fill={INK} />

      {/* side mirror */}
      <rect x="58" y="36" width="6" height="3.2" rx="1.2" fill={INK} />

      {/* headlight: lamp, not an eye */}
      <rect x="71" y="45.5" width="5.5" height="3.2" rx="1" fill="white" stroke={INK} strokeWidth={FINE} />
      <path d="M72.2 47.1 H75.2" stroke={INK} strokeWidth="0.9" strokeLinecap="round" />

      {/* front bumper / grille */}
      <path d="M74 50 H78 V54 H74 Z" fill={INK} />

      {/* taillight */}
      <rect x="7" y="45.5" width="4" height="3.4" rx="0.7" fill={INK} />

      {/* rear wheel */}
      <circle cx="22" cy="58" r="7" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="22" cy="58" r="3.4" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="22" cy="58" r="1.3" fill={INK} />

      {/* front wheel */}
      <circle cx="60" cy="58" r="7" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="60" cy="58" r="3.4" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="60" cy="58" r="1.3" fill={INK} />
    </Frame>
  );
}

export function RoommateIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* roof filled */}
      <path d="M40 14 L66 34 H14 Z" fill={INK} stroke={INK} strokeWidth={MAIN} strokeLinejoin="round" />
      <path d="M28 24 Q40 20 50 26" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      {/* chimney */}
      <rect x="52" y="16" width="7" height="12" rx="1.2" fill="white" stroke={INK} strokeWidth={FINE} />
      <rect x="52" y="16" width="7" height="3" rx="1" fill={INK} />
      {/* body */}
      <path d="M20 34 H60 V62 H20 Z" fill="white" stroke={INK} strokeWidth={MAIN} strokeLinejoin="round" />
      {/* door */}
      <rect x="34" y="44" width="12" height="18" rx="2" fill={INK} />
      <circle cx="43" cy="54" r="1.3" fill="white" />
      {/* windows */}
      <rect x="24" y="40" width="10" height="9" rx="1.6" fill="white" stroke={INK} strokeWidth={FINE} />
      <line x1="29" y1="40" x2="29" y2="49" stroke={INK} strokeWidth={FINE} />
      <line x1="24" y1="44.5" x2="34" y2="44.5" stroke={INK} strokeWidth={FINE} />
      <rect x="46" y="40" width="10" height="9" rx="1.6" fill="white" stroke={INK} strokeWidth={FINE} />
      <line x1="51" y1="40" x2="51" y2="49" stroke={INK} strokeWidth={FINE} />
      <line x1="46" y1="44.5" x2="56" y2="44.5" stroke={INK} strokeWidth={FINE} />
    </Frame>
  );
}

export function ShoppingIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* boutique bag — tall, tapered, cord handles */}
      <path
        d="M44 30 L68 28 L64 68 L47 68 Z"
        fill="white"
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinejoin="round"
      />
      {/* luxury header — wide filled band, not a badge */}
      <path d="M45.3 31.4 L66.7 29.5 L65.5 41.2 L46.2 42.6 Z" fill={INK} />
      <path d="M47.6 35.4 L64.2 33.9" stroke="white" strokeWidth="1.15" strokeLinecap="round" />
      {/* vertical pinstripes on the body */}
      <path d="M50 44 V57.5" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M55.2 43.6 V57.5" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M60.4 43.2 V57.5" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path
        d="M50 33.4 C50 16 61.4 15 61.4 32.4"
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M51.4 33.2 C51.4 19 60 18.2 60 32.2"
        stroke={INK}
        strokeWidth={FINE}
        strokeLinecap="round"
        fill="none"
      />

      {/* kraft shopper — wider, paper handles */}
      <path
        d="M10 34 L42 34 L39 70 L13 70 Z"
        fill="white"
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinejoin="round"
      />
      {/* folded top hem + side gusset — paper banding, not a logo */}
      <path d="M11.2 35.3 L40.8 35.3 L40.25 41 L11.7 41 Z" fill={INK} />
      <path d="M13.5 38 H38.6" stroke="white" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M16.6 42.2 L18.8 67.5" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path
        d="M18 34 V24 Q20 20 22 24 V34"
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 34 V24 Q32 20 34 24 V34"
        stroke={INK}
        strokeWidth={MAIN}
        strokeLinecap="round"
        fill="none"
      />

      {/* dollar bill in front */}
      <g transform="rotate(-16 50 66)">
        <rect x="36" y="58" width="30" height="16" rx="2" fill="white" stroke={INK} strokeWidth={MAIN} />
        <rect x="38" y="60" width="26" height="12" rx="1" fill="none" stroke={INK} strokeWidth={FINE} />
        <circle cx="51" cy="66" r="4.2" fill="white" stroke={INK} strokeWidth={FINE} />
        <path d="M51 63.2 V68.8" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M49.2 64.4 Q51 63.4 52.8 64.6" stroke={INK} strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M49.2 67.6 Q51 68.6 52.8 67.4" stroke={INK} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      </g>
    </Frame>
  );
}

export function MoviesIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      {/* rear reel */}
      <circle cx="28" cy="24" r="11" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="28" cy="24" r="6.2" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="28" cy="24" r="2.2" fill={INK} />
      <path d="M28 14.5 V19.2" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M28 28.8 V33.5" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M18.5 24 H23.2" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M32.8 24 H37.5" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />

      {/* front reel */}
      <circle cx="48" cy="22" r="10" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="48" cy="22" r="5.6" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="48" cy="22" r="2" fill={INK} />
      <path d="M48 13.4 V17.6" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M48 26.4 V30.6" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M39.4 22 H43.6" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M52.4 22 H56.6" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />

      {/* body */}
      <path d="M16 38 H52 L54 58 H14 Z" fill="white" stroke={INK} strokeWidth={MAIN} strokeLinejoin="round" />
      <path d="M22 44 H38" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M22 49 H36" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <path d="M22 54 H34" stroke={INK} strokeWidth={FINE} strokeLinecap="round" />
      <circle cx="44" cy="48" r="3.2" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="44" cy="48" r="1.1" fill={INK} />

      {/* lens barrel */}
      <path d="M52 42 H64 V54 H52 Z" fill="white" stroke={INK} strokeWidth={MAIN} />
      <path d="M64 43.5 H70 V52.5 H64 Z" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="70" cy="48" r="5.4" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="70" cy="48" r="2.8" fill="white" stroke={INK} strokeWidth={FINE} />
      <circle cx="70" cy="48" r="1.1" fill={INK} />

      {/* feet */}
      <path d="M20 58 L16 66" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <path d="M48 58 L52 66" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <path d="M13 66 H19" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <path d="M49 66 H55" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
    </Frame>
  );
}

export function TouristIllustration({ size = 72 }: { size?: number }) {
  return (
    <Frame size={size}>
      <rect x="24" y="22" width="32" height="22" rx="4" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="40" cy="33" r="8" fill="white" stroke={INK} strokeWidth={MAIN} />
      <circle cx="40" cy="33" r="4" fill="white" stroke={INK} strokeWidth={FINE} />
      <rect x="34" y="16" width="12" height="8" rx="2" fill={INK} />
      <circle cx="50" cy="26" r="2" fill={INK} />
      {/* stem into a hub, then three legs from that point */}
      <path d="M40 44 V52" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <circle cx="40" cy="52" r="2.2" fill={INK} />
      <path d="M40 52 L22 70" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <path d="M40 52 L40 72" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
      <path d="M40 52 L58 70" stroke={INK} strokeWidth={MAIN} strokeLinecap="round" />
    </Frame>
  );
}

export const CATEGORY_ILLUSTRATIONS: Record<string, React.FC<{ size?: number }>> = {
  commute:  CommuteIllustration,
  errand:   GroceryIllustration,
  shopping: ShoppingIllustration,
  study:    StudyIllustration,
  lunch:    LunchIllustration,
  activity: ActivityIllustration,
  movies:   MoviesIllustration,
  tourist:  TouristIllustration,
  ride:     RideIllustration,
  roommate: RoommateIllustration,
};
