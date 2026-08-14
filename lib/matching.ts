import { PoolMatch, ParsedIntent, Pool } from '@/types';
import { MOCK_USERS } from './mockUsers';
import { scoreMatch } from './scoring';

function dayDiff(a: string, b: string): number {
  const ms = Math.abs(new Date(a).getTime() - new Date(b).getTime());
  return Math.round(ms / 86_400_000);
}

function formatDay(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' });
}

export function findPools(intent: ParsedIntent): PoolMatch[] {
  const results: PoolMatch[] = [];

  for (const user of MOCK_USERS) {
    for (const activity of user.activities) {
      // Same day preferred; still consider nearby days so demo searches always resolve
      if (dayDiff(activity.date, intent.date) > 2) continue;

      const scoring = scoreMatch(intent, activity);

      // Suppress very low scores
      if (scoring.score < 40) continue;

      results.push({
        id: `${user.id}-${activity.id}`,
        user,
        activity,
        score: scoring.score,
        factors: scoring.factors,
        proposedTime: scoring.proposedTime,
        proposedLocation: scoring.proposedLocation,
        detourMinutes: scoring.detourMinutes,
        explanation: scoring.explanation,
      });
    }
  }

  // Sort descending by score, one pool per person
  results.sort((a, b) => b.score - a.score);
  const seenUsers = new Set<string>();
  const unique: PoolMatch[] = [];

  if (intent.category === 'open') {
    const seenCategories = new Set<string>();
    for (const match of results) {
      if (seenUsers.has(match.user.id) || seenCategories.has(match.activity.category)) continue;
      seenUsers.add(match.user.id);
      seenCategories.add(match.activity.category);
      unique.push(match);
      if (unique.length >= 5) return unique;
    }
  }

  for (const match of results) {
    if (seenUsers.has(match.user.id)) continue;
    seenUsers.add(match.user.id);
    unique.push(match);
    if (unique.length >= 5) break;
  }
  return unique;
}

// The canonical demo match used throughout the app
export function getDemoMatch(): PoolMatch {
  const jamie = MOCK_USERS.find((u) => u.id === 'jamie')!;
  const activity = jamie.activities[0];
  return {
    id: 'demo-jamie',
    user: jamie,
    activity,
    score: 94,
    factors: [
      { label: 'Same activity', value: 'Grocery shopping', positive: true },
      { label: 'Time overlap', value: '12 min overlap', positive: true },
      { label: 'Distance', value: '450m apart', positive: true },
      { label: 'Detour', value: '+4 min', positive: true },
      { label: 'Pace preference', value: 'Similar pace', positive: true },
    ],
    proposedTime: '6:05 PM',
    proposedLocation: 'Tampines Mall, Entrance B',
    detourMinutes: 4,
    explanation:
      'Both heading to Tampines for groceries around the same time. Meeting adds just 4 minutes to either trip.',
  };
}

export function matchToPool(match: PoolMatch): Pool {
  const day = formatDay(match.activity.date);
  return {
    id: `p-${match.user.id}-${match.activity.id}`,
    partnerId: match.user.id,
    partnerName: match.user.name,
    partnerAvatar: match.user.avatar,
    activity: match.activity.type,
    date: day,
    time: `${day} ${match.proposedTime}`,
    location: match.proposedLocation,
    status: 'confirmed',
    score: match.score,
    age: match.user.age,
    detour: `+${match.detourMinutes} min`,
    color: '#FF6A00',
    faceIndex: match.user.faceIndex,
  };
}
