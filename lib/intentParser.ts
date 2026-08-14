import { ParsedIntent, ActivityCategory } from '@/types';

/** Empty search / Search tab — join anyone for whatever they are already doing. */
export const OPEN_SEARCH_QUERY = 'Anything nearby';

const CATEGORY_KEYWORDS: Record<ActivityCategory, string[]> = {
  open: ['anything', 'any activity', 'any activities', 'whatever', 'anyone', 'join strangers'],
  errands: ['grocery', 'groceries', 'ikea', 'supermarket', 'errands', 'parcel', 'collect'],
  study: ['study', 'studying', 'work', 'library', 'nlb', 'research', 'thesis', 'homework', 'read'],
  lunch: ['lunch', 'dinner', 'breakfast', 'eat', 'food', 'restaurant', 'cafe', 'coffee', 'brunch', 'meal'],
  commute: ['commute', 'office', 'work', 'mrt', 'bus', 'travel', 'heading to'],
  activity: ['gym', 'walk', 'run', 'fitness', 'yoga', 'sport', 'sports', 'workout', 'exercise'],
  shopping: ['shopping', 'mall', 'orchard', 'retail', 'clothes', 'uniqlo', 'store'],
  movies: ['movie', 'movies', 'cinema', 'film', 'gv', 'cathay'],
  tourist: ['tourist', 'touristy', 'sightseeing', 'sights', 'marina', 'sentosa', 'attraction', 'explore'],
  ride: ['taxi', 'grab', 'ride', 'uber', 'car', 'carpool', 'shared ride'],
  roommate: ['roommate', 'flatmate', 'housemate', 'room', 'flat', 'apartment', 'rent', 'place to stay', 'looking for room'],
};

const LOCATION_HINTS = [
  'tampines', 'bedok', 'bugis', 'orchard', 'jurong', 'woodlands', 'ang mo kio', 'bishan',
  'clementi', 'toa payoh', 'novena', 'dhoby ghaut', 'city hall', 'raffles', 'marina',
  'national library', 'nlb', 'ikea', 'changi',
];

const TIME_HINTS: { pattern: RegExp; resolver: (match: RegExpMatchArray) => [string, string] }[] = [
  { pattern: /(\d{1,2}):?(\d{2})\s*(am|pm)/i, resolver: (m) => {
    let h = parseInt(m[1]);
    if (m[3].toLowerCase() === 'pm' && h !== 12) h += 12;
    if (m[3].toLowerCase() === 'am' && h === 12) h = 0;
    const start = `${String(h).padStart(2,'0')}:${m[2] || '00'}`;
    const end = `${String(h+2).padStart(2,'0')}:${m[2] || '00'}`;
    return [start, end];
  }},
  { pattern: /after work/i, resolver: () => ['17:30', '19:30'] },
  { pattern: /leaving now|in 15/i, resolver: () => {
    const d = new Date();
    const start = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    const endH = d.getHours() + 1;
    const end = `${String(endH).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    return [start, end];
  }},
  { pattern: /\bmorning\b/i, resolver: () => ['08:00', '10:00'] },
  { pattern: /\bafternoon\b/i, resolver: () => ['13:00', '16:00'] },
  { pattern: /\bevening\b/i, resolver: () => ['18:00', '20:00'] },
  { pattern: /\bnight\b/i, resolver: () => ['19:00', '22:00'] },
  { pattern: /\bnoon\b|\bmidday\b/i, resolver: () => ['12:00', '13:30'] },
];

function detectCategory(text: string): ActivityCategory {
  const lower = text.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) return category as ActivityCategory;
  }
  return 'open';
}

function detectLocation(text: string): string {
  const lower = text.toLowerCase();
  for (const loc of LOCATION_HINTS) {
    if (lower.includes(loc)) {
      return loc.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }
  return 'Nearby';
}

function isoFromOffset(days: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function detectDate(text: string): string {
  const lower = text.toLowerCase();
  if (/\b(today|tonight)\b/.test(lower)) return isoFromOffset(0);
  if (/\btomorrow\b/.test(lower)) return isoFromOffset(1);

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  for (let i = 0; i < days.length; i++) {
    if (new RegExp(`\\b${days[i]}\\b`).test(lower)) {
      const current = new Date().getDay();
      let diff = i - current;
      if (diff <= 0) diff += 7;
      return isoFromOffset(diff);
    }
  }

  return isoFromOffset(1);
}

function detectTimeWindow(text: string): [string, string] {
  for (const hint of TIME_HINTS) {
    const m = text.match(hint.pattern);
    if (m) return hint.resolver(m);
  }
  return ['17:30', '19:30'];
}

function detectActivity(text: string, category: ActivityCategory): string {
  if (category === 'open') return 'Anything';
  const lower = text.toLowerCase();
  if (lower.includes('grocery') || lower.includes('groceries')) return 'Grocery Shopping';
  if (lower.includes('ikea')) return 'IKEA Run';
  if (lower.includes('study') || lower.includes('studying')) return 'Study Session';
  if (lower.includes('library') || lower.includes('nlb')) return 'Study at Library';
  if (lower.includes('lunch')) return 'Lunch';
  if (lower.includes('dinner')) return 'Dinner';
  if (lower.includes('gym') || lower.includes('sport')) return 'Gym Session';
  if (lower.includes('shopping') && !lower.includes('grocery')) return 'Shopping';
  if (lower.includes('movie') || lower.includes('cinema')) return 'Movies';
  if (lower.includes('sightseeing') || lower.includes('tourist') || lower.includes('marina')) return 'Sightseeing';
  if (lower.includes('taxi') || lower.includes('grab') || lower.includes('shared ride') || lower.includes('carpool')) return 'Shared ride';
  if (lower.includes('walk')) return 'Walk';
  if (lower.includes('commute')) return 'Commute';
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function detectFromTo(text: string): { pickup?: string; destination?: string } {
  const m = text.match(/from\s+(.+?)\s+to\s+(.+?)(?:\s+(?:tonight|tomorrow|today|this|leaving|at|in)\b.*)?$/i);
  if (!m) return {};
  const pickup = m[1].trim().replace(/[,.]+$/, '');
  const destination = m[2].trim().replace(/[,.]+$/, '');
  if (!pickup || !destination) return {};
  return { pickup, destination };
}

function hasExplicitDate(text: string): boolean {
  const lower = text.toLowerCase();
  if (/\b(today|tonight|tomorrow)\b/.test(lower)) return true;
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days.some((d) => new RegExp(`\\b${d}\\b`).test(lower));
}

function hasTimeHint(text: string): boolean {
  return TIME_HINTS.some((hint) => hint.pattern.test(text));
}

export function parseIntent(userInput: string): ParsedIntent {
  const category = detectCategory(userInput);
  const route = detectFromTo(userInput);
  const location = route.destination || detectLocation(userInput);
  const date =
    category === 'open' && !hasExplicitDate(userInput)
      ? isoFromOffset(0)
      : detectDate(userInput);
  const timeWindow =
    category === 'open' && !hasTimeHint(userInput)
      ? (['08:00', '22:00'] as [string, string])
      : detectTimeWindow(userInput);
  const activity = detectActivity(userInput, category);

  return {
    activity,
    category,
    date,
    timeWindow,
    location,
    pickup: route.pickup,
    destination: route.destination,
    flexibilityMinutes:
      category === 'open' ? 60 : category === 'ride' || category === 'commute' ? 15 : 30,
    intent: category,
    socialPreference: 'open_to_pooling',
  };
}
