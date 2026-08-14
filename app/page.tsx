'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import { useApp } from '@/lib/store';
import { OPEN_SEARCH_QUERY, parseIntent } from '@/lib/intentParser';
import { findPools, getDemoMatch, matchToPool } from '@/lib/matching';
import type { AppScreen, PoolMatch } from '@/types';
import { BottomNav } from '@/app/components/navigation/BottomNav';
import { HomeScreen } from '@/app/components/agent/HomeScreen';
import { AgentSearchScreen } from '@/app/components/agent/AgentSearchScreen';
import { MatchScreen } from '@/app/components/matches/MatchScreen';
import { MatchPickScreen } from '@/app/components/matches/MatchPickScreen';
import { PoolsScreen } from '@/app/components/agent/PoolsScreen';
import { MemoryScreen } from '@/app/components/agent/MemoryScreen';
import { ImpactScreen } from '@/app/components/impact/ImpactScreen';
import { ProfileScreen } from '@/app/components/agent/ProfileScreen';
import { RoommateScreen } from '@/app/components/roommate/RoommateScreen';
import { ScheduleScreen } from '@/app/components/agent/ScheduleScreen';
import { OnboardingScreen } from '@/app/components/agent/OnboardingScreen';
import { CalendarConnectScreen } from '@/app/components/agent/CalendarConnectScreen';
import { CircleScreen, InvitePreviewScreen } from '@/app/components/agent/CircleScreen';
import { RideShareScreen } from '@/app/components/activities/RideShareScreen';

type NavScreen = 'home' | 'search' | 'pools' | 'schedule' | 'profile' | 'roommate' | 'memory' | 'impact' | 'calendar' | 'circle' | 'invitePreview' | 'ride';
const NAV_SCREENS: NavScreen[] = ['home', 'pools', 'schedule', 'profile', 'roommate', 'memory', 'impact', 'calendar', 'circle', 'invitePreview', 'ride'];

export default function App() {
  const {
    screen, setScreen, setParsedIntent, parsedIntent, updateImpact,
    setBestMatch, setMatchOptions, matchOptions, bestMatch, pools, addPool, updatePool,
    setFocusSearch,
  } = useApp();

  const handleSearch = useCallback((text: string) => {
    const intent = parseIntent(text);
    if (intent.category === 'roommate') {
      setScreen('roommate');
      return;
    }
    setParsedIntent(intent);
    const matches = findPools(intent);
    const options = matches.length ? matches : [getDemoMatch()];
    setMatchOptions(options);
    setBestMatch(options[0]);
    setScreen('search');
  }, [setParsedIntent, setScreen, setBestMatch, setMatchOptions]);

  const handleSearchComplete = useCallback(() => {
    setScreen(matchOptions.length > 1 ? 'pick' : 'match');
  }, [setScreen, matchOptions.length]);

  const handleChooseMatch = useCallback((match: PoolMatch) => {
    setBestMatch(match);
    setScreen('match');
  }, [setBestMatch, setScreen]);

  const handleMatchConfirm = useCallback(() => {
    const match = bestMatch ?? getDemoMatch();
    const incoming = matchToPool(match);
    const existing = pools.find(
      (p) => p.partnerId === incoming.partnerId && p.status !== 'cancelled',
    );
    if (existing) {
      updatePool(existing.id, {
        status: 'confirmed',
        score: incoming.score,
        time: incoming.time,
        location: incoming.location,
        detour: incoming.detour,
        color: '#FF6A00',
        activity: incoming.activity,
      });
    } else {
      addPool(incoming);
    }
    updateImpact();
    setScreen('pools');
  }, [bestMatch, pools, addPool, updatePool, updateImpact, setScreen]);

  const handleMatchDismiss = useCallback(() => {
    setScreen(matchOptions.length > 1 ? 'pick' : 'home');
  }, [setScreen, matchOptions.length]);

  const handleNavigate = useCallback((s: NavScreen) => {
    if (s === 'search') {
      handleSearch(OPEN_SEARCH_QUERY);
      return;
    }
    setScreen(s as AppScreen);
  }, [handleSearch, setScreen]);

  const showNav = NAV_SCREENS.includes(screen as NavScreen);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F8F8F8',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <main
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#F8F8F8',
        }}
      >
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            background: '#F8F8F8',
            ...(screen === 'match' || screen === 'search' || screen === 'onboard' || screen === 'schedule' || screen === 'circle' || screen === 'invitePreview' || screen === 'pick' || screen === 'ride'
              ? { height: '100%', minHeight: '100%' }
              : {}),
          }}
        >
          {screen === 'onboard' && (
            <OnboardingScreen onDone={() => setScreen('home')} />
          )}
          {screen === 'home' && (
            <HomeScreen onSearch={handleSearch} onNav={(s) => setScreen(s as AppScreen)} />
          )}
          {screen === 'search' && (
            <AgentSearchScreen
              intent={parsedIntent}
              onComplete={handleSearchComplete}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === 'match' && (
            <MatchScreen
              key={bestMatch?.id}
              onConfirm={handleMatchConfirm}
              onDismiss={handleMatchDismiss}
            />
          )}
          {screen === 'pick' && (
            <MatchPickScreen
              onChoose={handleChooseMatch}
              onBack={() => setScreen('home')}
              onSearchAgain={() => {
                setFocusSearch(true);
                setScreen('home');
              }}
            />
          )}
          {screen === 'pools' && <PoolsScreen />}
          {screen === 'schedule' && <ScheduleScreen />}
          {screen === 'memory' && <MemoryScreen />}
          {screen === 'impact' && <ImpactScreen />}
          {screen === 'profile' && <ProfileScreen onNav={(s) => setScreen(s as AppScreen)} />}
          {screen === 'calendar' && <CalendarConnectScreen />}
          {screen === 'circle' && <CircleScreen />}
          {screen === 'invitePreview' && <InvitePreviewScreen />}
          {screen === 'roommate' && <RoommateScreen onBack={() => setScreen('home')} />}
          {screen === 'ride' && (
            <RideShareScreen
              onBack={() => setScreen('home')}
              onSubmit={handleSearch}
            />
          )}
        </motion.div>
      </AnimatePresence>
      </main>

      {showNav && (
        <BottomNav
          screen={screen as NavScreen}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
