'use client';

import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { useApp } from '@/lib/store';
import { getDemoMatch } from '@/lib/matching';
import type { PoolMatch } from '@/types';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
  hair:    '#EEE',
};

type CrowdFilter = 'circle' | 'strangers' | 'both';

const FILTERS: { id: CrowdFilter; label: string }[] = [
  { id: 'circle', label: 'Trusted circle' },
  { id: 'strangers', label: 'Strangers' },
  { id: 'both', label: 'Both' },
];

const CROWD_TAG = {
  fontSize: 10,
  fontWeight: 700,
  color: C.green,
  background: '#fff',
  border: `1.5px solid ${C.green}`,
  borderRadius: 20,
  padding: '1px 8px',
  lineHeight: 1.4,
  flexShrink: 0,
};

function shortLoc(value: string) {
  return value.split(',')[0];
}

function isCircleMatch(match: PoolMatch, names: Set<string>) {
  return names.has(match.user.name);
}

export function MatchPickScreen({
  onChoose,
  onBack,
  onSearchAgain,
}: {
  onChoose: (match: PoolMatch) => void;
  onBack: () => void;
  onSearchAgain: () => void;
}) {
  const { matchOptions, parsedIntent, circleMembers } = useApp();
  const [crowd, setCrowd] = useState<CrowdFilter>('both');
  const options = matchOptions.length ? matchOptions : [getDemoMatch()];
  const circleNames = new Set(circleMembers.map((m) => m.name));
  const visible = options.filter((match) => {
    const trusted = isCircleMatch(match, circleNames);
    if (crowd === 'circle') return trusted;
    if (crowd === 'strangers') return !trusted;
    return true;
  });
  const activity = parsedIntent?.category === 'open'
    ? 'any activity nearby'
    : parsedIntent?.activity || options[0]?.activity.type || 'this plan';
  const bestId = options[0]?.id;

  return (
    <div style={{
      height: '100%',
      minHeight: 0,
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '60px 20px 16px',
      boxSizing: 'border-box',
    }}>
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
            Options<span style={{ color: C.green }}>.</span>
          </span>
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, fontFamily: 'inherit', flexShrink: 0,
            }}
          >
            <InkIcon name="back" size={18} color="#74767E" />
            <span style={{ fontSize: 14, color: '#74767E' }}>Back</span>
          </button>
        </div>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 6, lineHeight: 1.5 }}>
          {visible.length} {visible.length === 1 ? 'person' : 'people'} lining up with {activity.toLowerCase()}. Pick who you want to go with.
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{
          background: C.surface,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {visible.length === 0 && (
            <div style={{
              padding: '28px 20px', textAlign: 'center',
              fontSize: 13, color: C.txt2, lineHeight: 1.6,
            }}>
              {crowd === 'circle'
                ? 'No trusted-circle matches yet.'
                : crowd === 'strangers'
                  ? 'No stranger matches yet.'
                  : 'No matches yet. Search again with a different plan.'}
            </div>
          )}
          {visible.map((match, i) => {
            const best = match.id === bestId;
            const trusted = isCircleMatch(match, circleNames);
            return (
              <Fragment key={match.id}>
                {i > 0 && <div style={{ height: 1, background: C.hair }} />}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onChoose(match)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 0,
                    padding: '12px 14px',
                  }}
                >
                  <Avatar
                    name={match.user.name}
                    size={44}
                    online={best}
                    faceIndex={match.user.faceIndex}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.txt, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {match.user.name}
                      </span>
                      {best && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: '#ffffff', flexShrink: 0,
                          background: C.green, border: 'none',
                          borderRadius: 20, padding: '1px 7px',
                        }}>
                          Best
                        </span>
                      )}
                      <span style={CROWD_TAG}>{trusted ? 'Trusted circle' : 'Stranger'}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.txt2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {match.proposedTime} · {shortLoc(match.proposedLocation)}
                    </div>
                    <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>
                      +{match.detourMinutes} min detour · {match.user.neighbourhood ?? 'Singapore'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 16, fontWeight: 800, color: C.txt, lineHeight: 1,
                      background: '#F5F5F5', borderRadius: 10, padding: '6px 10px',
                    }}>
                      {match.score}%
                    </span>
                    <InkIcon name="chevron" size={16} color={C.txt3} />
                  </div>
                </motion.button>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div style={{ flexShrink: 0, marginTop: 12 }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: 8,
        }}>
          <button
            type="button"
            onClick={onSearchAgain}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'transparent',
              border: 'none',
              borderRadius: 12,
              padding: '12px 14px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'left',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: '#F0F0F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <InkIcon name="search" size={32} color={C.txt} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.txt }}>Search again</div>
              <div style={{ fontSize: 12, color: C.txt2, marginTop: 2 }}>Change time, place or activity</div>
            </div>
            <InkIcon name="chevron" size={16} color={C.txt} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {FILTERS.map((f) => {
            const on = crowd === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setCrowd(f.id)}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  borderRadius: 20,
                  border: on ? 'none' : `1.5px solid ${C.green}`,
                  background: on ? C.green : '#fff',
                  color: on ? '#fff' : C.green,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  lineHeight: 1.2,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
