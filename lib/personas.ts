export interface Persona {
  id: string;
  faceIndex: number;
  name: string;
  shortName: string;
  age: number;
  avatar: string;
  role: string;
  neighbourhood: string;
  verified: boolean;
  poolsCompleted: number;
  rating: number;
  bio: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'jamie',
    faceIndex: 0,
    name: 'Jamie Lim',
    shortName: 'Jamie',
    age: 23,
    avatar: 'JL',
    role: 'NTU student',
    neighbourhood: 'Tampines',
    verified: true,
    poolsCompleted: 12,
    rating: 4.9,
    bio: 'Lives near Tampines Mall. Does a grocery run after lectures and is happy to split the trip if it only adds a few minutes.',
  },
  {
    id: 'mei',
    faceIndex: 1,
    name: 'Mei Ong',
    shortName: 'Mei',
    age: 22,
    avatar: 'MO',
    role: 'Barista',
    neighbourhood: 'Bugis',
    verified: true,
    poolsCompleted: 9,
    rating: 4.8,
    bio: 'Works cafe shifts around Bugis. Always grabbing lunch nearby and prefers 1-to-1 pools so it stays easy.',
  },
  {
    id: 'priya',
    faceIndex: 2,
    name: 'Priya Suresh',
    shortName: 'Priya',
    age: 26,
    avatar: 'PS',
    role: 'UX designer',
    neighbourhood: 'Tampines',
    verified: true,
    poolsCompleted: 15,
    rating: 4.9,
    bio: 'WFH designer looking for a tidy flatmate. Early bird, cooks on weekends, quiet after 10 PM.',
  },
  {
    id: 'rina',
    faceIndex: 3,
    name: 'Rina Koh',
    shortName: 'Rina',
    age: 27,
    avatar: 'RK',
    role: 'Illustrator',
    neighbourhood: 'Tiong Bahru',
    verified: true,
    poolsCompleted: 6,
    rating: 4.6,
    bio: 'Studio days in Tiong Bahru, gym three nights a week. Dry humour. Does not do large groups.',
  },
  {
    id: 'yuki',
    faceIndex: 4,
    name: 'Yuki Nakamura',
    shortName: 'Yuki',
    age: 24,
    avatar: 'YN',
    role: 'Motion designer',
    neighbourhood: 'Katong',
    verified: true,
    poolsCompleted: 8,
    rating: 4.7,
    bio: 'Night-owl commute from Katong. Quiet on the ride, headphones in, happy to share a Grab if the timing lines up.',
  },
  {
    id: 'daniel',
    faceIndex: 5,
    name: 'Daniel Khoo',
    shortName: 'Daniel',
    age: 31,
    avatar: 'DK',
    role: 'Graphic designer',
    neighbourhood: 'River Valley',
    verified: true,
    poolsCompleted: 5,
    rating: 4.8,
    bio: 'Museum and gallery weekends. Speaks softly, shows up on time, likes a small group over a crowd.',
  },
  {
    id: 'zoe',
    faceIndex: 6,
    name: 'Zoe Lim',
    shortName: 'Zoe',
    age: 24,
    avatar: 'ZL',
    role: 'NUS grad student',
    neighbourhood: 'Ang Mo Kio',
    verified: false,
    poolsCompleted: 4,
    rating: 4.5,
    bio: 'Mostly in the library. Plant parent looking for a low-drama room. Flexible on move-in.',
  },
  {
    id: 'aisha',
    faceIndex: 7,
    name: 'Aisha Rahman',
    shortName: 'Aisha',
    age: 25,
    avatar: 'AR',
    role: 'Graduate student',
    neighbourhood: 'Queenstown',
    verified: true,
    poolsCompleted: 19,
    rating: 5.0,
    bio: 'Long NLB study blocks on Saturdays. Prefers verified 1-to-1 pools and a quiet table.',
  },
  {
    id: 'tanisha',
    faceIndex: 8,
    name: 'Tanisha',
    shortName: 'Tanisha',
    age: 27,
    avatar: 'TN',
    role: 'Designer',
    neighbourhood: 'Singapore',
    verified: true,
    poolsCompleted: 12,
    rating: 4.9,
    bio: 'You. Pools errands, study, and the occasional exhibition when the detour stays under 10 minutes.',
  },
  {
    id: 'amara',
    faceIndex: 9,
    name: 'Amara Brooks',
    shortName: 'Amara',
    age: 28,
    avatar: 'AB',
    role: 'Music teacher',
    neighbourhood: 'Bedok',
    verified: true,
    poolsCompleted: 11,
    rating: 4.8,
    bio: 'Teaches in Bedok, hikes on weekends, cooks a lot. Looking for a respectful flatmate who likes dogs.',
  },
];

export const PERSONA: Record<string, Persona> = Object.fromEntries(
  PERSONAS.map((p) => [p.id, p]),
);

export const YOU = PERSONA.tanisha;

export function toUser(
  persona: Persona,
  activities: import('@/types').Activity[],
  preferences: import('@/types').UserPreferences,
): import('@/types').User {
  return {
    id: persona.id,
    name: persona.shortName,
    age: persona.age,
    avatar: persona.avatar,
    verified: persona.verified,
    role: persona.role,
    poolsCompleted: persona.poolsCompleted,
    rating: persona.rating,
    faceIndex: persona.faceIndex,
    neighbourhood: persona.neighbourhood,
    bio: persona.bio,
    activities,
    preferences,
  };
}
