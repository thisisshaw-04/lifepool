'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParsedIntent, PoolMatch, AppScreen, ImpactStats, Pool, AgentMemory, CalendarProvider, ScheduleItem, CircleMember, CircleInvite, CircleKind } from '@/types';
import { PERSONA } from './personas';

interface AppState {
  screen: AppScreen;
  parsedIntent: ParsedIntent | null;
  bestMatch: PoolMatch | null;
  matchOptions: PoolMatch[];
  pools: Pool[];
  scheduleItems: ScheduleItem[];
  circleMembers: CircleMember[];
  circleInvites: CircleInvite[];
  activeInviteId: string | null;
  impact: ImpactStats;
  memory: AgentMemory;
  focusSearch: boolean;
  calendarProvider: CalendarProvider | null;
  calendarReturn: AppScreen;
  setScreen: (s: AppScreen) => void;
  setParsedIntent: (i: ParsedIntent | null) => void;
  setBestMatch: (m: PoolMatch | null) => void;
  setMatchOptions: (m: PoolMatch[]) => void;
  addPool: (p: Pool) => void;
  updatePool: (id: string, patch: Partial<Pool>) => void;
  addScheduleItem: (item: ScheduleItem) => void;
  removeScheduleItem: (id: string) => void;
  addCircleInvite: (kind: CircleKind, label: string) => CircleInvite;
  revokeCircleInvite: (id: string) => void;
  acceptCircleInvite: (id: string) => void;
  removeCircleMember: (id: string) => void;
  openInvitePreview: (id: string) => void;
  updateImpact: () => void;
  setFocusSearch: (v: boolean) => void;
  setCalendarProvider: (p: CalendarProvider | null) => void;
  openCalendar: (from: AppScreen) => void;
}

const defaultImpact: ImpactStats = {
  poolsCompleted: 12,
  hoursWithOthers: 7.3,
  kmAvoided: 41,
  moneySaved: 38,
  peoplemet: 5,
  successRate: 86,
  soloThisMonth: 27,
  pooledThisMonth: 9,
};

const defaultMemory: AgentMemory = {
  preferredGroupSize: '1-to-1',
  maxDetour: '< 10 minutes',
  preferredActivities: ['Errands', 'Study', 'Lunch'],
  avoid: ['Large groups', 'Long detours'],
  lastUpdated: 'Today',
};

const defaultPools: Pool[] = [
  {
    id: 'p-jamie',
    partnerId: 'jamie',
    partnerName: PERSONA.jamie.shortName,
    partnerAvatar: PERSONA.jamie.avatar,
    activity: 'Grocery shopping',
    date: 'Friday',
    time: 'Fri 6:05 PM',
    location: 'Tampines Mall, Entrance B',
    status: 'confirmed',
    score: 94,
    age: PERSONA.jamie.age,
    detour: '+3 min',
    color: '#FF6A00',
    faceIndex: PERSONA.jamie.faceIndex,
  },
  {
    id: 'p-aisha',
    partnerId: 'aisha',
    partnerName: PERSONA.aisha.shortName,
    partnerAvatar: PERSONA.aisha.avatar,
    activity: 'Study session',
    date: 'Saturday',
    time: 'Sat 2:00 PM',
    location: 'National Library, Level 5',
    status: 'pending',
    score: 78,
    age: PERSONA.aisha.age,
    detour: '+6 min',
    color: '#74767E',
    faceIndex: PERSONA.aisha.faceIndex,
  },
  {
    id: 'p-daniel',
    partnerId: 'daniel',
    partnerName: PERSONA.daniel.shortName,
    partnerAvatar: PERSONA.daniel.avatar,
    activity: 'Exhibition',
    date: 'Sunday',
    time: 'Sun 4:00 PM',
    location: 'National Museum',
    status: 'pending',
    score: 81,
    age: PERSONA.daniel.age,
    detour: '+2 min',
    color: '#74767E',
    faceIndex: PERSONA.daniel.faceIndex,
  },
];

const defaultCircleMembers: CircleMember[] = [
  {
    id: 'c-jamie',
    name: PERSONA.jamie.shortName,
    kind: 'friend',
    faceIndex: PERSONA.jamie.faceIndex,
    neighbourhood: PERSONA.jamie.neighbourhood,
  },
  {
    id: 'c-amara',
    name: PERSONA.amara.shortName,
    kind: 'family',
    faceIndex: PERSONA.amara.faceIndex,
    neighbourhood: PERSONA.amara.neighbourhood,
  },
];

function faceIndexForLabel(label: string): number | undefined {
  const needle = label.trim().toLowerCase();
  if (!needle) return undefined;
  return Object.values(PERSONA).find(
    (p) => p.shortName.toLowerCase() === needle || p.name.toLowerCase() === needle,
  )?.faceIndex;
}

const defaultCircleInvites: CircleInvite[] = [
  {
    id: 'inv-mei',
    code: 'LP-4N8Q',
    kind: 'friend',
    label: PERSONA.mei.shortName,
    created: '2d ago',
    faceIndex: PERSONA.mei.faceIndex,
  },
];

function makeInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'LP-';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('onboard');
  const [parsedIntent, setParsedIntent] = useState<ParsedIntent | null>(null);
  const [bestMatch, setBestMatch] = useState<PoolMatch | null>(null);
  const [matchOptions, setMatchOptions] = useState<PoolMatch[]>([]);
  const [pools, setPools] = useState<Pool[]>(defaultPools);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [circleMembers, setCircleMembers] = useState<CircleMember[]>(defaultCircleMembers);
  const [circleInvites, setCircleInvites] = useState<CircleInvite[]>(defaultCircleInvites);
  const [activeInviteId, setActiveInviteId] = useState<string | null>(null);
  const [impact, setImpact] = useState<ImpactStats>(defaultImpact);
  const [memory] = useState<AgentMemory>(defaultMemory);
  const [focusSearch, setFocusSearch] = useState(false);
  const [calendarProvider, setCalendarProvider] = useState<CalendarProvider | null>(null);
  const [calendarReturn, setCalendarReturn] = useState<AppScreen>('profile');

  const openCalendar = (from: AppScreen) => {
    setCalendarReturn(from);
    setScreen('calendar');
  };

  const addPool = (p: Pool) => setPools((prev) => [p, ...prev]);
  const updatePool = (id: string, patch: Partial<Pool>) =>
    setPools((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const addScheduleItem = (item: ScheduleItem) => setScheduleItems((prev) => [item, ...prev]);
  const removeScheduleItem = (id: string) =>
    setScheduleItems((prev) => prev.filter((item) => item.id !== id));

  const addCircleInvite = (kind: CircleKind, label: string) => {
    const trimmed = label.trim();
    const invite: CircleInvite = {
      id: `inv-${Date.now()}`,
      code: makeInviteCode(),
      kind,
      label: trimmed || (kind === 'family' ? 'Family' : 'Friend'),
      created: 'Just now',
      faceIndex: faceIndexForLabel(trimmed),
    };
    setCircleInvites((prev) => [invite, ...prev]);
    return invite;
  };

  const revokeCircleInvite = (id: string) => {
    setCircleInvites((prev) => prev.filter((invite) => invite.id !== id));
    setActiveInviteId((current) => (current === id ? null : current));
  };

  const acceptCircleInvite = (id: string) => {
    const invite = circleInvites.find((item) => item.id === id);
    if (!invite) return;
    setCircleMembers((prevMembers) => {
      if (prevMembers.some((m) => m.name.toLowerCase() === invite.label.toLowerCase())) {
        return prevMembers;
      }
      const used = new Set(prevMembers.map((m) => m.faceIndex));
      const needle = invite.label.toLowerCase();
      const matched = Object.values(PERSONA).find(
        (p) => p.shortName.toLowerCase() === needle || p.name.toLowerCase() === needle,
      );
      const unused = Object.values(PERSONA).find(
        (p) => p.id !== 'tanisha' && !used.has(p.faceIndex),
      );
      const persona = (matched && !used.has(matched.faceIndex) ? matched : unused) ?? PERSONA.rina;
      return [
        {
          id: `c-${Date.now()}`,
          name: invite.label,
          kind: invite.kind,
          faceIndex: persona.faceIndex,
          neighbourhood: matched?.neighbourhood ?? persona.neighbourhood,
        },
        ...prevMembers,
      ];
    });
    setCircleInvites((prev) => prev.filter((item) => item.id !== id));
    setActiveInviteId(null);
    setScreen('circle');
  };

  const removeCircleMember = (id: string) =>
    setCircleMembers((prev) => prev.filter((member) => member.id !== id));

  const openInvitePreview = (id: string) => {
    setActiveInviteId(id);
    setScreen('invitePreview');
  };

  const updateImpact = () => {
    setImpact((prev) => ({
      ...prev,
      poolsCompleted: prev.poolsCompleted + 1,
      hoursWithOthers: parseFloat((prev.hoursWithOthers + 0.75).toFixed(1)),
      kmAvoided: prev.kmAvoided + 3,
      moneySaved: prev.moneySaved + 4,
      peoplemet: prev.peoplemet + 1,
      pooledThisMonth: prev.pooledThisMonth + 1,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        parsedIntent,
        bestMatch,
        matchOptions,
        pools,
        scheduleItems,
        circleMembers,
        circleInvites,
        activeInviteId,
        impact,
        memory,
        focusSearch,
        calendarProvider,
        calendarReturn,
        setScreen,
        setParsedIntent,
        setBestMatch,
        setMatchOptions,
        addPool,
        updatePool,
        addScheduleItem,
        removeScheduleItem,
        addCircleInvite,
        revokeCircleInvite,
        acceptCircleInvite,
        removeCircleMember,
        openInvitePreview,
        updateImpact,
        setFocusSearch,
        setCalendarProvider,
        openCalendar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
