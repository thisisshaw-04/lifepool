'use client';
import { InkIcon, type InkName } from '@/app/components/ui/MangaIcons';

type Screen = 'home' | 'search' | 'pools' | 'schedule' | 'profile' | 'roommate' | 'memory' | 'impact' | 'calendar' | 'circle' | 'invitePreview';

const NAV: { id: Screen; icon: InkName; label: string }[] = [
  { id: 'home',     icon: 'home',     label: 'Home'     },
  { id: 'search',   icon: 'search',   label: 'Search'   },
  { id: 'pools',    icon: 'pools',    label: 'Pools'    },
  { id: 'schedule', icon: 'schedule', label: 'Schedule' },
  { id: 'profile',  icon: 'profile',  label: 'Profile'  },
];

export function BottomNav({
  screen,
  onNavigate,
}: {
  screen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  return (
    <div style={{
      flexShrink: 0,
      width: '100%',
      background: '#ffffff',
      borderTop: '1px solid #EEE',
      display: 'flex',
      paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
      zIndex: 100,
    }}>
      {NAV.map(({ id, icon, label }) => {
        const active = screen === id
          || (id === 'home' && screen === 'roommate')
          || (id === 'profile' && (screen === 'memory' || screen === 'impact' || screen === 'calendar' || screen === 'circle' || screen === 'invitePreview'));
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '10px 0 4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <InkIcon
              name={icon}
              size={26}
              color={active ? '#FF6A00' : '#74767E'}
            />
            <span style={{
              fontSize: 10,
              fontWeight: active ? 600 : 400,
              color: active ? '#FF6A00' : '#74767E',
              letterSpacing: '0.01em',
              lineHeight: 1,
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
