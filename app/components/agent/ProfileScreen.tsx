'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { useApp } from '@/lib/store';
import { YOU } from '@/lib/personas';
import { CALENDAR_LABELS } from '@/app/components/ui/CalendarBrandIcons';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

const SETTINGS = [
  { label: 'Women-only pools',    sub: 'Optional',       on: false },
  { label: 'Verified users only', sub: 'Recommended',    on: true  },
  { label: 'Max detour',          sub: '10 minutes',     on: true  },
  { label: 'Max distance',        sub: '2 km from plan', on: true  },
];

const AGE_MIN_FLOOR = 18;
const AGE_MAX_CEIL = 99;

function clampAge(n: number, lo: number, hi: number) {
  if (Number.isNaN(n)) return lo;
  return Math.min(hi, Math.max(lo, n));
}

function AgeField({
  label,
  value,
  min,
  max,
  onCommit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onCommit: (n: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => { setDraft(String(value)); }, [value]);

  const commit = () => {
    const next = clampAge(parseInt(draft, 10), min, max);
    setDraft(String(next));
    onCommit(next);
  };

  return (
    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: C.txt2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draft}
        onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
        style={{
          width: '100%',
          height: 40,
          borderRadius: 10,
          border: 'none',
          background: '#F5F5F5',
          color: C.txt,
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'inherit',
          textAlign: 'center',
          outline: 'none',
          padding: '0 8px',
        }}
      />
    </label>
  );
}

export function ProfileScreen({ onNav }: { onNav?: (screen: string) => void }) {
  const [settings, setSettings] = useState(SETTINGS);
  const [ageOn, setAgeOn] = useState(true);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(35);
  const { impact, calendarProvider, openCalendar, circleMembers, circleInvites } = useApp();

  const setMin = (n: number) => {
    const next = clampAge(n, AGE_MIN_FLOOR, AGE_MAX_CEIL);
    setAgeMin(next);
    if (next > ageMax) setAgeMax(next);
  };
  const setMax = (n: number) => {
    const next = clampAge(n, AGE_MIN_FLOOR, AGE_MAX_CEIL);
    setAgeMax(next);
    if (next < ageMin) setAgeMin(next);
  };

  return (
    <div style={{ minHeight: '100%', background: C.bg, padding: '60px 20px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
          Profile<span style={{ color: C.green }}>.</span>
        </span>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>Trust & pool preferences</div>
      </div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: C.surface, border: 'none', borderRadius: 16, padding: '20px', marginBottom: 12 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <Avatar name={YOU.shortName} size={60} verified online faceIndex={YOU.faceIndex} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.txt, letterSpacing: '-0.5px' }}>{YOU.name}</div>
            <div style={{ fontSize: 12, color: C.txt2, marginTop: 2 }}>{YOU.age} · {YOU.role} · {YOU.neighbourhood}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <div style={{
                background: C.green, border: `1px solid ${C.green}`,
                borderRadius: 6, padding: '3px 9px',
                fontSize: 10, fontWeight: 600, color: '#ffffff',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <InkIcon name="shield" size={12} color="#ffffff" />
                Verified
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <InkIcon key={i} name="star" size={12} color="#FFB800" filled />
                ))}
              </div>
              <span style={{ fontSize: 11, color: C.txt2 }}>{YOU.rating}</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: C.txt2, lineHeight: 1.5, margin: '0 0 16px' }}>{YOU.bio}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { value: String(impact.poolsCompleted), label: 'Pools done' },
            { value: `${impact.successRate}%`, label: 'Match rate' },
            { value: String(impact.peoplemet), label: 'People met' },
          ].map(({ value, label }, i) => (
            <div key={i} style={{ background: '#F8F8F8', border: 'none', borderRadius: 10, padding: '12px 10px', textAlign: 'center', color: '#000000' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#000000', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color: '#000000', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <div style={{ background: C.surface, border: 'none', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px 10px', fontSize: 11, color: C.txt3, fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none' }}>
          Pool preferences
        </div>
        {settings.map(({ label, sub, on }, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '13px 18px',
              borderTop: 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>{label}</div>
              <div style={{ fontSize: 11, color: C.txt3, marginTop: 1 }}>{sub}</div>
            </div>
            <button
              onClick={() => setSettings(prev => prev.map((s, j) => j === i ? { ...s, on: !s.on } : s))}
              style={{
                width: 40, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: on ? C.green : C.border,
                position: 'relative', flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: on ? 19 : 3,
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }} />
            </button>
          </div>
        ))}

        <div style={{ padding: '13px 18px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: ageOn ? 12 : 0 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>Age range</div>
              <div style={{ fontSize: 11, color: C.txt3, marginTop: 1 }}>
                {ageOn ? `Match people ${ageMin}-${ageMax}` : 'Any age'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAgeOn((v) => !v)}
              style={{
                width: 40, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: ageOn ? C.green : C.border,
                position: 'relative', flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: ageOn ? 19 : 3,
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }} />
            </button>
          </div>
          {ageOn && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <AgeField label="Min" value={ageMin} min={AGE_MIN_FLOOR} max={ageMax} onCommit={setMin} />
              <span style={{ fontSize: 14, color: C.txt3, paddingBottom: 10, flexShrink: 0 }}>to</span>
              <AgeField label="Max" value={ageMax} min={ageMin} max={AGE_MAX_CEIL} onCommit={setMax} />
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.surface, border: 'none', borderRadius: 16, overflow: 'hidden' }}>
        {[
          { id: 'calendar', label: 'Calendar', sub: calendarProvider ? `Connected to ${CALENDAR_LABELS[calendarProvider]}` : 'Google, Outlook, Apple, or this phone', icon: 'calendar' as const },
          { id: 'circle', label: 'Trusted circle', sub: circleMembers.length ? `${circleMembers.length} trusted${circleInvites.length ? ` · ${circleInvites.length} pending` : ''}` : 'Invite family and friends', icon: 'invite' as const },
          { id: 'memory', label: 'Agent memory', sub: 'What it has learned about you', icon: 'brain' as const },
          { id: 'impact', label: 'Your impact', sub: 'Trips avoided, time shared', icon: 'sparkles' as const },
        ].map(({ id, label, sub, icon }, i) => (
          <button
            key={id}
            onClick={() => id === 'calendar' ? openCalendar('profile') : onNav?.(id)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 18px', background: 'none', border: 'none',
              borderTop: 'none',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 10, flex: '0 0 44px',
              background: '#F0F0F0', border: 'none', overflow: 'visible',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <InkIcon name={icon} size={32} color="#111111" />
            </div>
            <div style={{ flex: 1, minWidth: 0, overflow: 'visible' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>{label}</div>
              <div style={{ fontSize: 11, color: C.txt2, marginTop: 1 }}>{sub}</div>
            </div>
            <span style={{ flexShrink: 0, display: 'flex' }}>
              <InkIcon name="chevron" size={16} color={C.txt3} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
