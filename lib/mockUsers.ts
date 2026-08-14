import { User, Activity } from '@/types';
import { PERSONA, YOU, toUser } from './personas';

function isoOffset(days: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function isoNextDow(dow: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const diff = (dow - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

const TOMORROW = isoOffset(1);
const SATURDAY = isoNextDow(6);
const SUNDAY = isoNextDow(0);

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    type: 'Grocery Shopping',
    category: 'errands',
    date: TOMORROW,
    timeWindow: ['17:45', '18:45'],
    location: 'Tampines Mall',
    coordinates: { lat: 1.3529, lng: 103.9449 },
    flexibilityMinutes: 20,
    intent: 'shopping',
    socialPreference: 'open_to_pooling',
    notes: 'Quick grocery run after lectures',
  },
  {
    id: 'a2',
    type: 'Dinner',
    category: 'lunch',
    date: TOMORROW,
    timeWindow: ['19:00', '20:30'],
    location: 'Tampines',
    coordinates: { lat: 1.3535, lng: 103.9450 },
    flexibilityMinutes: 30,
    intent: 'dining',
    socialPreference: 'open_to_pooling',
  },
  {
    id: 'a3',
    type: 'Grocery Shopping',
    category: 'errands',
    date: TOMORROW,
    timeWindow: ['18:30', '19:30'],
    location: 'Bedok Mall',
    coordinates: { lat: 1.3241, lng: 103.9300 },
    flexibilityMinutes: 15,
    intent: 'shopping',
    socialPreference: 'open_to_pooling',
  },
  {
    id: 'a4',
    type: 'Design Work / Study',
    category: 'study',
    date: SATURDAY,
    timeWindow: ['14:00', '18:00'],
    location: 'National Library',
    coordinates: { lat: 1.2981, lng: 103.8516 },
    flexibilityMinutes: 30,
    intent: 'studying',
    socialPreference: 'open_to_pooling',
  },
  {
    id: 'a5',
    type: 'Museum Exhibition',
    category: 'activity',
    date: SUNDAY,
    timeWindow: ['16:00', '18:30'],
    location: 'National Museum of Singapore',
    coordinates: { lat: 1.2966, lng: 103.8489 },
    flexibilityMinutes: 20,
    intent: 'culture',
    socialPreference: 'open_to_pooling',
  },
  {
    id: 'a6',
    type: 'Study Session',
    category: 'study',
    date: SATURDAY,
    timeWindow: ['13:30', '17:00'],
    location: 'National Library',
    coordinates: { lat: 1.2981, lng: 103.8516 },
    flexibilityMinutes: 45,
    intent: 'studying',
    socialPreference: 'open_to_pooling',
  },
  {
    id: 'a7',
    type: 'Museum Exhibition',
    category: 'activity',
    date: SUNDAY,
    timeWindow: ['16:30', '19:00'],
    location: 'National Museum of Singapore',
    coordinates: { lat: 1.2966, lng: 103.8489 },
    flexibilityMinutes: 30,
    intent: 'culture',
    socialPreference: 'open_to_pooling',
  },
  {
    id: 'a8',
    type: 'Lunch',
    category: 'lunch',
    date: TOMORROW,
    timeWindow: ['12:00', '13:30'],
    location: 'Bugis',
    coordinates: { lat: 1.3006, lng: 103.8554 },
    flexibilityMinutes: 25,
    intent: 'dining',
    socialPreference: 'open_to_pooling',
    notes: 'Cafe lunch between shifts',
  },
  {
    id: 'a9',
    type: 'Commute',
    category: 'commute',
    date: TOMORROW,
    timeWindow: ['08:00', '09:15'],
    location: 'Katong to CBD',
    coordinates: { lat: 1.3048, lng: 103.9010 },
    flexibilityMinutes: 20,
    intent: 'commute',
    socialPreference: 'open_to_pooling',
    notes: 'Quiet ride, headphones in',
  },
  {
    id: 'a10',
    type: 'Gym session',
    category: 'activity',
    date: TOMORROW,
    timeWindow: ['19:00', '20:30'],
    location: 'Tiong Bahru',
    coordinates: { lat: 1.2860, lng: 103.8270 },
    flexibilityMinutes: 20,
    intent: 'fitness',
    socialPreference: 'open_to_pooling',
    notes: 'Weeknight gym, no large groups',
  },
  {
    id: 'a11',
    type: 'Grocery Shopping',
    category: 'errands',
    date: TOMORROW,
    timeWindow: ['18:00', '19:15'],
    location: 'Tampines Hub',
    coordinates: { lat: 1.3538, lng: 103.9408 },
    flexibilityMinutes: 25,
    intent: 'shopping',
    socialPreference: 'open_to_pooling',
    notes: 'Weekly shop after wrapping WFH',
  },
];

const PREF = {
  jamie: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 10, maxDistanceKm: 2,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['errands', 'lunch', 'study'] as const,
  },
  mei: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 12, maxDistanceKm: 2,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['lunch', 'errands'] as const,
  },
  yuki: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 20, maxDistanceKm: 5,
    preferredGroupSize: 'any' as const, activityTypes: ['commute', 'ride'] as const,
  },
  rina: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 15, maxDistanceKm: 3,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['activity', 'lunch'] as const,
  },
  aisha: {
    womenOnly: true, verifiedOnly: true, maxDetourMinutes: 15, maxDistanceKm: 3,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['study', 'lunch', 'activity'] as const,
  },
  daniel: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 25, maxDistanceKm: 4,
    preferredGroupSize: 'small' as const, activityTypes: ['activity', 'lunch', 'study'] as const,
  },
  tanisha: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 15, maxDistanceKm: 3,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['errands', 'study', 'activity', 'lunch'] as const,
  },
  priya: {
    womenOnly: false, verifiedOnly: true, maxDetourMinutes: 12, maxDistanceKm: 2,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['errands', 'lunch'] as const,
  },
  amara: {
    womenOnly: false, verifiedOnly: false, maxDetourMinutes: 15, maxDistanceKm: 4,
    preferredGroupSize: '1-to-1' as const, activityTypes: ['errands', 'activity'] as const,
  },
};

export const MOCK_USERS: User[] = [
  toUser(PERSONA.jamie,  [MOCK_ACTIVITIES[0], MOCK_ACTIVITIES[1]], { ...PREF.jamie,  activityTypes: [...PREF.jamie.activityTypes] }),
  toUser(PERSONA.mei,    [MOCK_ACTIVITIES[7]],                     { ...PREF.mei,    activityTypes: [...PREF.mei.activityTypes] }),
  toUser(PERSONA.yuki,   [MOCK_ACTIVITIES[8]],                     { ...PREF.yuki,   activityTypes: [...PREF.yuki.activityTypes] }),
  toUser(PERSONA.rina,   [MOCK_ACTIVITIES[9]],                     { ...PREF.rina,   activityTypes: [...PREF.rina.activityTypes] }),
  toUser(PERSONA.aisha,  [MOCK_ACTIVITIES[5]],                     { ...PREF.aisha,  activityTypes: [...PREF.aisha.activityTypes] }),
  toUser(PERSONA.daniel, [MOCK_ACTIVITIES[6]],                     { ...PREF.daniel, activityTypes: [...PREF.daniel.activityTypes] }),
  toUser(PERSONA.priya,  [MOCK_ACTIVITIES[10]],                    { ...PREF.priya,  activityTypes: [...PREF.priya.activityTypes] }),
  toUser(PERSONA.amara,  [MOCK_ACTIVITIES[2]],                     { ...PREF.amara,  activityTypes: [...PREF.amara.activityTypes] }),
];

export const TANISHA: User = toUser(YOU, [], { ...PREF.tanisha, activityTypes: [...PREF.tanisha.activityTypes] });
