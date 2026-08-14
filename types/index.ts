export type ActivityCategory =
  | 'open'
  | 'commute'
  | 'errands'
  | 'study'
  | 'lunch'
  | 'activity'
  | 'ride'
  | 'roommate'
  | 'shopping'
  | 'movies'
  | 'tourist';

export interface Activity {
  id: string;
  type: string;
  category: ActivityCategory;
  date: string;
  timeWindow: [string, string];
  location: string;
  coordinates: { lat: number; lng: number };
  flexibilityMinutes: number;
  intent: string;
  socialPreference: 'open_to_pooling' | 'women_only' | 'verified_only' | 'friends_only';
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  verified: boolean;
  role: string;
  poolsCompleted: number;
  rating: number;
  activities: Activity[];
  preferences: UserPreferences;
  faceIndex: number;
  neighbourhood?: string;
  bio?: string;
}

export interface UserPreferences {
  womenOnly: boolean;
  verifiedOnly: boolean;
  maxDetourMinutes: number;
  maxDistanceKm: number;
  preferredGroupSize: '1-to-1' | 'small' | 'any';
  activityTypes: ActivityCategory[];
}

export interface MatchFactor {
  label: string;
  value: string;
  positive: boolean;
}

export interface PoolMatch {
  id: string;
  user: User;
  activity: Activity;
  score: number;
  factors: MatchFactor[];
  proposedTime: string;
  proposedLocation: string;
  detourMinutes: number;
  explanation: string;
}

export interface ParsedIntent {
  activity: string;
  category: ActivityCategory;
  date: string;
  timeWindow: [string, string];
  location: string;
  pickup?: string;
  destination?: string;
  flexibilityMinutes: number;
  intent: string;
  socialPreference: 'open_to_pooling' | 'women_only' | 'verified_only' | 'friends_only';
}

export interface NegotiationMessage {
  agent: string;
  content: string;
  timestamp: number;
}

export interface Pool {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  activity: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'upcoming' | 'completed';
  score: number;
  age?: number;
  detour?: string;
  color?: string;
  faceIndex?: number;
}

export interface AgentMemory {
  preferredGroupSize: string;
  maxDetour: string;
  preferredActivities: string[];
  avoid: string[];
  lastUpdated: string;
}

export interface ImpactStats {
  poolsCompleted: number;
  hoursWithOthers: number;
  kmAvoided: number;
  moneySaved: number;
  peoplemet: number;
  successRate: number;
  soloThisMonth: number;
  pooledThisMonth: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
}

export type CalendarProvider = 'google' | 'outlook' | 'apple' | 'phone';

export type CircleKind = 'family' | 'friend';

export interface CircleMember {
  id: string;
  name: string;
  kind: CircleKind;
  faceIndex: number;
  neighbourhood?: string;
}

export interface CircleInvite {
  id: string;
  code: string;
  kind: CircleKind;
  label: string;
  created: string;
  faceIndex?: number;
}

export type AppScreen =
  | 'onboard'
  | 'home'
  | 'search'
  | 'match'
  | 'pools'
  | 'schedule'
  | 'memory'
  | 'impact'
  | 'profile'
  | 'roommate'
  | 'calendar'
  | 'circle'
  | 'invitePreview'
  | 'pick'
  | 'ride';
