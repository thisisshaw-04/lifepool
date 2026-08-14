'use client';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Original manga/chibi face SVGs — black & white line art, self-contained.
// Each face is drawn at 80×80 viewBox and scaled via the size prop.
// ─────────────────────────────────────────────────────────────────────────────

type FaceProps = { size?: number };

// ── 1. Short bob with side-swept fringe ──────────────────────────────────────
export function Face1({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* neck */}
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      {/* head */}
      <ellipse cx="40" cy="38" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* hair back */}
      <path d="M18 35 Q16 18 28 12 Q40 7 52 12 Q64 18 62 35" fill="#222" stroke="#222" strokeWidth="1.5"/>
      {/* hair side left */}
      <path d="M18 35 Q14 42 17 52 Q20 46 22 44" fill="#222" stroke="#222" strokeWidth="1.5"/>
      {/* fringe */}
      <path d="M24 18 Q28 28 35 26 Q40 25 42 20 Q48 28 56 24 Q52 16 40 14 Q30 14 24 18Z" fill="#222"/>
      {/* left eye */}
      <ellipse cx="32" cy="40" rx="4" ry="4.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="33" cy="40" r="2.2" fill="#222"/>
      <circle cx="34" cy="38.5" r="0.8" fill="white"/>
      {/* right eye */}
      <ellipse cx="48" cy="40" rx="4" ry="4.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="49" cy="40" r="2.2" fill="#222"/>
      <circle cx="50" cy="38.5" r="0.8" fill="white"/>
      {/* eyebrows */}
      <path d="M28 34 Q32 32 36 34" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M44 34 Q48 32 52 34" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/>
      {/* nose */}
      <path d="M39 46 Q40 48 41 46" stroke="#222" strokeWidth="1.2" strokeLinecap="round"/>
      {/* mouth */}
      <path d="M35 52 Q40 56 45 52" stroke="#222" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* cheek blush */}
      <ellipse cx="27" cy="47" rx="4" ry="2" fill="#ddd" opacity="0.6"/>
      <ellipse cx="53" cy="47" rx="4" ry="2" fill="#ddd" opacity="0.6"/>
    </svg>
  );
}

// ── 2. Twintails with big eyes ───────────────────────────────────────────────
export function Face2({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="38" rx="21" ry="23" fill="white" stroke="#222" strokeWidth="2"/>
      {/* hair top */}
      <path d="M20 32 Q19 14 40 11 Q61 14 60 32" fill="#111" stroke="#111" strokeWidth="1.5"/>
      {/* left twintail */}
      <path d="M20 32 Q10 36 8 50 Q12 55 16 48 Q18 42 22 40" fill="#111" stroke="#111" strokeWidth="1.5"/>
      {/* right twintail */}
      <path d="M60 32 Q70 36 72 50 Q68 55 64 48 Q62 42 58 40" fill="#111" stroke="#111" strokeWidth="1.5"/>
      {/* fringe */}
      <path d="M22 20 Q26 30 34 27 Q40 25 40 20 Q40 25 46 27 Q54 30 58 20 Q50 13 40 12 Q30 13 22 20Z" fill="#111"/>
      {/* left eye large */}
      <ellipse cx="31" cy="40" rx="5" ry="5.5" fill="white" stroke="#222" strokeWidth="1.6"/>
      <circle cx="32" cy="40.5" r="3" fill="#111"/>
      <circle cx="33.5" cy="38.5" r="1.1" fill="white"/>
      <path d="M26 37 Q31 35 36 37" stroke="#111" strokeWidth="1.8" strokeLinecap="round"/>
      {/* right eye large */}
      <ellipse cx="49" cy="40" rx="5" ry="5.5" fill="white" stroke="#222" strokeWidth="1.6"/>
      <circle cx="50" cy="40.5" r="3" fill="#111"/>
      <circle cx="51.5" cy="38.5" r="1.1" fill="white"/>
      <path d="M44 37 Q49 35 54 37" stroke="#111" strokeWidth="1.8" strokeLinecap="round"/>
      {/* nose */}
      <path d="M39 47 Q40 49 41 47" stroke="#222" strokeWidth="1.2" strokeLinecap="round"/>
      {/* surprised o-mouth */}
      <ellipse cx="40" cy="53" rx="3" ry="2.5" fill="#222"/>
      {/* blush */}
      <ellipse cx="25" cy="46" rx="4" ry="2" fill="#ccc" opacity="0.7"/>
      <ellipse cx="55" cy="46" rx="4" ry="2" fill="#ccc" opacity="0.7"/>
    </svg>
  );
}

// ── 3. Wink + Daniel's side-flap hair ────────────────────────────────────────
export function Face3({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="38" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* solid hair mass to the head stroke; hairline stays above the eyes */}
      <path d="M17.2 36 Q16 15 28 10 Q40 7.5 52 10 Q64 15 62.8 36 Q51 30 40 28.5 Q29 30 17.2 36 Z" fill="#111"/>
      {/* left flap */}
      <path d="M18 34 Q10 36 8 50 Q12 55 16 48 Q18 42 22 40" fill="#111"/>
      {/* right flap */}
      <path d="M62 34 Q70 36 72 50 Q68 55 64 48 Q62 42 58 40" fill="#111"/>
      {/* wink left eye (closed) */}
      <path d="M27 40 Q31 36 35 40" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 38 Q31 36.5 34 38" stroke="#222" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      {/* right eye open */}
      <ellipse cx="49" cy="40" rx="4.5" ry="5" fill="white" stroke="#222" strokeWidth="1.6"/>
      <circle cx="50" cy="40.5" r="2.6" fill="#222"/>
      <circle cx="51.5" cy="38.5" r="1" fill="white"/>
      {/* eyebrows */}
      <path d="M26 35 Q30 33 34 35" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M45 34 Q49 32 53 34" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/>
      {/* nose */}
      <path d="M39 47 Q40 49 41 47" stroke="#222" strokeWidth="1.2" strokeLinecap="round"/>
      {/* smirk */}
      <path d="M36 52 Q42 56 46 52" stroke="#222" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="27" cy="47" rx="3.5" ry="1.8" fill="#ccc" opacity="0.6"/>
      <ellipse cx="53" cy="47" rx="3.5" ry="1.8" fill="#ccc" opacity="0.6"/>
    </svg>
  );
}

// ── 4. Messy bun with star hair clip ────────────────────────────────────────
export function Face4({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="39" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* hair back */}
      <path d="M18 35 Q18 14 40 11 Q62 14 62 35" fill="#222" stroke="#222" strokeWidth="1.5"/>
      {/* bun on top */}
      <circle cx="40" cy="10" r="8" fill="#222" stroke="#222" strokeWidth="1.5"/>
      <path d="M34 12 Q40 8 46 12" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      {/* star clip */}
      <path d="M52 16 L53.5 20 L57.5 20 L54.5 22.5 L55.5 26.5 L52 24 L48.5 26.5 L49.5 22.5 L46.5 20 L50.5 20Z"
            fill="white" stroke="#222" strokeWidth="1.2"/>
      {/* fringe */}
      <path d="M20 22 Q26 30 34 28 Q40 26 40 22 Q40 26 46 28 Q54 30 60 22 Q52 14 40 12 Q28 14 20 22Z" fill="#222"/>
      {/* eyes */}
      <ellipse cx="32" cy="41" rx="4" ry="4.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="33" cy="41" r="2.3" fill="#222"/>
      <circle cx="34" cy="39.5" r="0.9" fill="white"/>
      <ellipse cx="48" cy="41" rx="4" ry="4.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="49" cy="41" r="2.3" fill="#222"/>
      <circle cx="50" cy="39.5" r="0.9" fill="white"/>
      {/* brows — annoyed flat */}
      <path d="M28 34 L36 35" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M44 35 L52 34" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      {/* flat mouth — unamused */}
      <path d="M35 52 L45 52" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <ellipse cx="27" cy="47" rx="4" ry="2" fill="#ccc" opacity="0.55"/>
      <ellipse cx="53" cy="47" rx="4" ry="2" fill="#ccc" opacity="0.55"/>
    </svg>
  );
}

// ── 5. Long straight hair + cat ears ────────────────────────────────────────
export function Face5({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="39" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* hair body */}
      <path d="M18 35 Q16 55 18 68 Q22 60 24 55 Q20 45 22 35" fill="#222"/>
      <path d="M62 35 Q64 55 62 68 Q58 60 56 55 Q60 45 58 35" fill="#222"/>
      {/* hair top */}
      <path d="M18 35 Q18 14 40 11 Q62 14 62 35" fill="#222" stroke="#222" strokeWidth="1.5"/>
      {/* cat ears */}
      <path d="M22 16 L18 6 L28 14" fill="#222" stroke="#222" strokeWidth="1.2"/>
      <path d="M58 16 L62 6 L52 14" fill="#222" stroke="#222" strokeWidth="1.2"/>
      {/* fringe wispy */}
      <path d="M22 20 Q28 32 36 29 Q40 28 40 22 Q40 28 44 29 Q52 32 58 20 Q50 12 40 11 Q30 12 22 20Z" fill="#222"/>
      {/* eyes — sleepy half-closed */}
      <path d="M28 40 Q32 37 36 40" stroke="#222" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M27.5 40 Q32 43 36.5 40" stroke="#222" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="32" cy="39" r="1.4" fill="#222"/>
      <path d="M44 40 Q48 37 52 40" stroke="#222" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M43.5 40 Q48 43 52.5 40" stroke="#222" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="48" cy="39" r="1.4" fill="#222"/>
      {/* brows */}
      <path d="M28 35 Q32 33 36 35" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 35 Q48 33 52 35" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      {/* tiny smile */}
      <path d="M37 52 Q40 55 43 52" stroke="#222" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// ── 6. Spiky short hair + glasses ────────────────────────────────────────────
export function Face6({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      {/* manga ears stick out; head covers the inner lobe */}
      <path d="M17.6 38 Q11 39 10.4 45.5 Q12 51.5 19.2 49.2 Q18.6 43 17.6 38 Z" fill="white" stroke="#222" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 42 Q13 44.5 15.2 47" stroke="#222" strokeWidth="1.15" strokeLinecap="round" fill="none"/>
      <path d="M62.4 38 Q69 39 69.6 45.5 Q68 51.5 60.8 49.2 Q61.4 43 62.4 38 Z" fill="white" stroke="#222" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M66 42 Q67 44.5 64.8 47" stroke="#222" strokeWidth="1.15" strokeLinecap="round" fill="none"/>
      <ellipse cx="40" cy="39" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* solid cap to the skull; spikes are the outer silhouette, not holes */}
      <path d="M16.8 34 Q15.5 18 24 12 L27.5 3.5 L32 13 L40 2.5 L48 13 L52.5 3.5 L56 12 Q64.5 18 63.2 34 Q51 29.5 40 29 Q29 29.5 16.8 34 Z" fill="#222"/>
      {/* short temple hair — ears stay visible */}
      <path d="M16.8 33.5 Q16 40 18.2 44 Q20.4 39 19.2 34 Z" fill="#222"/>
      <path d="M63.2 33.5 Q64 40 61.8 44 Q59.6 39 60.8 34 Z" fill="#222"/>
      {/* glasses frame */}
      <rect x="25" y="36" width="12" height="10" rx="5" fill="none" stroke="#222" strokeWidth="1.8"/>
      <rect x="43" y="36" width="12" height="10" rx="5" fill="none" stroke="#222" strokeWidth="1.8"/>
      <path d="M37 41 L43 41" stroke="#222" strokeWidth="1.6"/>
      <path d="M25 41 L21 40" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M55 41 L59 40" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      {/* eyes behind glasses */}
      <circle cx="31" cy="41" r="2" fill="#222"/>
      <circle cx="32.3" cy="39.8" r="0.7" fill="white"/>
      <circle cx="49" cy="41" r="2" fill="#222"/>
      <circle cx="50.3" cy="39.8" r="0.7" fill="white"/>
      {/* brows */}
      <path d="M26 33 Q31 31 36 33" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M44 33 Q49 31 54 33" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/>
      {/* mouth serious */}
      <path d="M36 52 L44 52" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="27" cy="47" rx="3.5" ry="1.8" fill="#ccc" opacity="0.5"/>
      <ellipse cx="53" cy="47" rx="3.5" ry="1.8" fill="#ccc" opacity="0.5"/>
    </svg>
  );
}

// ── 7. Double space buns + polka dot headband ────────────────────────────────
export function Face7({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="40" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* hair back */}
      <path d="M18 36 Q18 16 40 12 Q62 16 62 36" fill="#222" stroke="#222" strokeWidth="1.5"/>
      {/* left bun */}
      <circle cx="23" cy="16" r="7" fill="#222" stroke="#222" strokeWidth="1.5"/>
      <path d="M19 16 Q23 12 27 16" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
      {/* right bun */}
      <circle cx="57" cy="16" r="7" fill="#222" stroke="#222" strokeWidth="1.5"/>
      <path d="M53 16 Q57 12 61 16" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
      {/* polka-dot headband */}
      <path d="M18 28 Q40 22 62 28" stroke="#555" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="28" cy="25.5" r="1.5" fill="white"/>
      <circle cx="40" cy="23.5" r="1.5" fill="white"/>
      <circle cx="52" cy="25.5" r="1.5" fill="white"/>
      {/* fringe visible below headband */}
      <path d="M22 28 Q28 36 36 33 Q40 32 44 33 Q52 36 58 28" fill="#222"/>
      {/* eyes */}
      <ellipse cx="32" cy="42" rx="4.2" ry="4.8" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="33" cy="42" r="2.4" fill="#222"/>
      <circle cx="34.2" cy="40.4" r="0.9" fill="white"/>
      <ellipse cx="48" cy="42" rx="4.2" ry="4.8" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="49" cy="42" r="2.4" fill="#222"/>
      <circle cx="50.2" cy="40.4" r="0.9" fill="white"/>
      {/* raised brows — excited */}
      <path d="M28 35 Q32 32 36 35" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M44 35 Q48 32 52 35" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/>
      {/* wide smile */}
      <path d="M34 52 Q40 58 46 52" stroke="#222" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <ellipse cx="27" cy="48" rx="4" ry="2.2" fill="#ccc" opacity="0.65"/>
      <ellipse cx="53" cy="48" rx="4" ry="2.2" fill="#ccc" opacity="0.65"/>
    </svg>
  );
}

// ── 8. Curtain fringe + shy look ─────────────────────────────────────────────
export function Face8({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="39" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* long hair sides */}
      <path d="M18 35 Q14 50 16 66 Q20 58 22 50 Q19 44 20 35" fill="#222"/>
      <path d="M62 35 Q66 50 64 66 Q60 58 58 50 Q61 44 60 35" fill="#222"/>
      {/* solid hair mass to the head stroke; hairline stays above the eyes */}
      <path d="M17.2 36 Q16.5 14 40 9.5 Q63.5 14 62.8 36 Q51 29.5 40 28 Q29 29.5 17.2 36 Z" fill="#222"/>
      {/* downcast eyes */}
      <ellipse cx="32" cy="42" rx="4" ry="3.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="32" cy="43" r="2" fill="#222"/>
      <circle cx="33.2" cy="41.8" r="0.8" fill="white"/>
      <ellipse cx="48" cy="42" rx="4" ry="3.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="48" cy="43" r="2" fill="#222"/>
      <circle cx="49.2" cy="41.8" r="0.8" fill="white"/>
      {/* soft worried brows */}
      <path d="M28 37 Q32 35.5 36 37.5" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 37.5 Q48 35.5 52 37" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      {/* small timid mouth */}
      <path d="M37 52 Q40 54 43 52" stroke="#222" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <ellipse cx="27" cy="47" rx="3.5" ry="2" fill="#ccc" opacity="0.6"/>
      <ellipse cx="53" cy="47" rx="3.5" ry="2" fill="#ccc" opacity="0.6"/>
    </svg>
  );
}

// ── 9. Short bob + confident smirk ───────────────────────────────────────────
export function Face9({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="39" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* short bob: one solid mass, crown volume, jaw-length, soft arched bangs */}
      <path d="M15.8 33 Q14.2 16.5 27 9.5 Q40 4.8 53 9.5 Q65.8 16.5 64.2 33 Q66 45 62.8 54 Q59.5 59.5 53.5 56.5 Q50.5 49 51.5 37 Q46 28 40 26 Q34 28 28.5 37 Q29.5 49 26.5 56.5 Q20.5 59.5 17.2 54 Q14 45 15.8 33 Z" fill="#222"/>
      {/* eyes */}
      <ellipse cx="32" cy="41" rx="4" ry="4.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="33" cy="41" r="2.4" fill="#222"/>
      <circle cx="34.3" cy="39.5" r="0.9" fill="white"/>
      <ellipse cx="48" cy="41" rx="4" ry="4.5" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="49" cy="41" r="2.4" fill="#222"/>
      <circle cx="50.3" cy="39.5" r="0.9" fill="white"/>
      {/* one raised confident brow */}
      <path d="M28 34 Q32 32 36 34" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M44 33 Q49 30 53 33" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/>
      {/* smirk */}
      <path d="M36 52 Q42 55 46 51" stroke="#222" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="27" cy="47" rx="3.5" ry="1.8" fill="#ccc" opacity="0.55"/>
      <ellipse cx="53" cy="47" rx="3.5" ry="1.8" fill="#ccc" opacity="0.55"/>
    </svg>
  );
}

// ── 10. Soft shoulder-length layers + side bangs ─────────────────────────────
export function Face10({ size = 40 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="33" y="57" width="14" height="9" rx="3" fill="white" stroke="#222" strokeWidth="1.8"/>
      <ellipse cx="40" cy="39" rx="22" ry="24" fill="white" stroke="#222" strokeWidth="2"/>
      {/* hair falling to the shoulders */}
      <path d="M18 34 Q15 48 16 62 Q20 56 23 50 Q20 42 22 34" fill="#222"/>
      <path d="M62 34 Q65 48 64 62 Q60 56 57 50 Q60 42 58 34" fill="#222"/>
      {/* crown */}
      <path d="M18 34 Q17 14 40 10 Q63 14 62 34" fill="#222" stroke="#222" strokeWidth="1.5"/>
      {/* soft side-swept bangs */}
      <path d="M20 22 Q26 32 38 28 Q42 26 44 22 Q50 30 60 22 Q52 13 40 11 Q28 13 20 22Z" fill="#222"/>
      {/* eyes */}
      <ellipse cx="32" cy="42" rx="4.2" ry="4.8" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="33" cy="42" r="2.5" fill="#222"/>
      <circle cx="34.3" cy="40.3" r="1" fill="white"/>
      <ellipse cx="48" cy="42" rx="4.2" ry="4.8" fill="white" stroke="#222" strokeWidth="1.5"/>
      <circle cx="49" cy="42" r="2.5" fill="#222"/>
      <circle cx="50.3" cy="40.3" r="1" fill="white"/>
      {/* brows */}
      <path d="M28 35 Q32 33 36 35" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M44 35 Q48 33 52 35" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/>
      {/* smile */}
      <path d="M34 53 Q40 58 46 53" stroke="#222" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <ellipse cx="27" cy="48" rx="4" ry="2" fill="#ccc" opacity="0.6"/>
      <ellipse cx="53" cy="48" rx="4" ry="2" fill="#ccc" opacity="0.6"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Map of all faces — index by name hash
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_FACES = [Face1, Face2, Face3, Face4, Face5, Face6, Face7, Face8, Face9, Face10];

export function getFaceIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  return Math.abs(hash) % ALL_FACES.length;
}
