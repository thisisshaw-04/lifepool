import { Activity, MatchFactor, ParsedIntent } from '@/types';

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface ScoringResult {
  score: number;
  factors: MatchFactor[];
  detourMinutes: number;
  proposedTime: string;
  proposedLocation: string;
  explanation: string;
}

export function scoreMatch(
  userIntent: ParsedIntent,
  candidate: Activity
): ScoringResult {
  // ── 1. Activity similarity ────────────────────────────────────────
  const openSearch = userIntent.category === 'open';
  const activitySame = openSearch || userIntent.category === candidate.category;
  const related =
    (userIntent.category === 'ride' && candidate.category === 'commute') ||
    (userIntent.category === 'commute' && candidate.category === 'ride');
  const activityScore = activitySame ? 1.0 : related ? 0.85 : 0.3;

  // ── 2. Time compatibility ─────────────────────────────────────────
  const userStart = timeToMinutes(userIntent.timeWindow[0]);
  const userEnd = timeToMinutes(userIntent.timeWindow[1]);
  const candStart = timeToMinutes(candidate.timeWindow[0]);
  const candEnd = timeToMinutes(candidate.timeWindow[1]);
  const userFlex = userIntent.flexibilityMinutes;
  const candFlex = candidate.flexibilityMinutes;

  const overlap =
    Math.min(userEnd + userFlex, candEnd + candFlex) -
    Math.max(userStart - userFlex, candStart - candFlex);

  const maxOverlap = Math.max(userEnd - userStart, candEnd - candStart);
  const timeScore = Math.max(0, Math.min(1, overlap / maxOverlap));

  // ── 3. Location compatibility ─────────────────────────────────────
  // Use a fixed coordinate for the user (Tampines area for the demo)
  const userCoord = { lat: 1.3540, lng: 103.9445 };
  const distKm = haversineKm(
    userCoord.lat, userCoord.lng,
    candidate.coordinates.lat, candidate.coordinates.lng
  );
  const locationScore = Math.max(0, 1 - distKm / 5);

  // ── 4. Preference compatibility ───────────────────────────────────
  const prefScore = 0.85; // simplified

  // ── 5. Social compatibility ───────────────────────────────────────
  const socialScore = candidate.socialPreference === 'open_to_pooling' ? 1.0 : 0.5;

  // ── Weighted total ────────────────────────────────────────────────
  const raw =
    activityScore * 0.30 +
    timeScore * 0.25 +
    locationScore * 0.20 +
    prefScore * 0.15 +
    socialScore * 0.10;

  const score = Math.round(raw * 100);

  // ── Detour ────────────────────────────────────────────────────────
  const detourMinutes = Math.round(distKm * 3 + Math.abs(userStart - candStart) * 0.1);

  // ── Proposed time ─────────────────────────────────────────────────
  const midpointMin = Math.round((userStart + candStart) / 2);
  const ph = Math.floor(midpointMin / 60);
  const pm = midpointMin % 60;
  const proposedTime = `${String(ph).padStart(2, '0')}:${String(pm).padStart(2, '0')} PM`.replace(/(\d+):(\d+) PM/, (_, h, m) => {
    const hh = parseInt(h);
    return `${hh > 12 ? hh - 12 : hh}:${m} ${hh >= 12 ? 'PM' : 'AM'}`;
  });

  const proposedLocation = candidate.location;

  // ── Factors ───────────────────────────────────────────────────────
  const factors: MatchFactor[] = [
    {
      label: 'Activity match',
      value: openSearch
        ? candidate.type
        : activitySame
          ? 'Same activity'
          : related
            ? 'Related activity'
            : 'Similar activity',
      positive: activitySame || related,
    },
    {
      label: 'Time overlap',
      value: overlap > 0 ? `${Math.round(overlap)} min overlap` : 'Near window',
      positive: overlap > 15,
    },
    {
      label: 'Distance',
      value: distKm < 0.5 ? `${Math.round(distKm * 1000)}m apart` : `${distKm.toFixed(1)}km apart`,
      positive: distKm < 1.5,
    },
    {
      label: 'Detour',
      value: `+${detourMinutes} min`,
      positive: detourMinutes <= 10,
    },
    {
      label: 'Preferences',
      value: 'Compatible',
      positive: true,
    },
  ];

  // ── Explanation ───────────────────────────────────────────────────
  let explanation = '';
  if (openSearch) {
    explanation = `${candidate.type} near ${candidate.location} — you can join if you want.`;
  } else if (score >= 85) {
    explanation = `Excellent match — same activity, close timing, and minimal detour make this a natural pool.`;
  } else if (score >= 65) {
    explanation = `Good match with compatible schedules. Minor coordination needed.`;
  } else if (score >= 45) {
    explanation = `Possible match but timing or location creates meaningful inconvenience.`;
  } else {
    explanation = `Unlikely to be worth pooling due to distance or schedule mismatch.`;
  }

  return { score, factors, detourMinutes, proposedTime, proposedLocation, explanation };
}
