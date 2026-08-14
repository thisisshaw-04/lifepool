'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { PoolDetailScreen } from '@/app/components/pools/PoolDetailScreen';
import { useApp } from '@/lib/store';
import type { Pool } from '@/types';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

function toEntry(pool: Pool) {
  const confirmed = pool.status === 'confirmed';
  return {
    id: pool.id,
    person: pool.partnerName,
    age: pool.age ?? 25,
    activity: pool.activity,
    time: pool.time,
    location: pool.location,
    score: pool.score,
    status: (confirmed ? 'confirmed' : 'pending') as 'confirmed' | 'pending',
    color: pool.color ?? (confirmed ? C.green : C.txt2),
    detour: pool.detour ?? '+4 min',
    faceIndex: pool.faceIndex,
  };
}

const CROWD_TAG = {
  fontSize: 10,
  fontWeight: 700,
  color: C.green,
  background: '#fff',
  border: `1.5px solid ${C.green}`,
  borderRadius: 20,
  padding: '1px 8px',
  lineHeight: 1.4,
};

function isCirclePool(pool: Pool, names: Set<string>) {
  return names.has(pool.partnerName);
}

export function PoolsScreen() {
  const { pools, updatePool, circleMembers } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const circleNames = new Set(circleMembers.map((m) => m.name));
  const visible = pools.filter((p) => p.status !== 'cancelled');
  const selected = pools.find((p) => p.id === selectedId && p.status !== 'cancelled') ?? null;

  if (selected) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          <PoolDetailScreen
            pool={toEntry(selected)}
            onBack={() => setSelectedId(null)}
            onStatusChange={(status) => {
              updatePool(selected.id, {
                status,
                color: status === 'confirmed' ? C.green : C.txt2,
              });
              if (status === 'cancelled') setSelectedId(null);
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div style={{ minHeight: '100%', background: C.bg, padding: '60px 20px 24px' }}>

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
          Pools<span style={{ color: C.green }}>.</span>
        </span>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>Confirmed, or still waiting on the other person</div>
      </div>

      {visible.length === 0 && (
        <div style={{
          background: C.surface, border: 'none',
          borderRadius: 14, padding: '28px 20px', textAlign: 'center',
          fontSize: 13, color: C.txt2, lineHeight: 1.6,
        }}>
          No pools yet. Search something you were already doing.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visible.map((pool, i) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setSelectedId(pool.id)}
            style={{
              background: C.surface,
              border: pool.status === 'confirmed' ? '1px solid #FF6A00' : 'none',
              borderRadius: 14,
              padding: '16px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {pool.status === 'confirmed' && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: C.green }} />
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={pool.partnerName} size={44} online={pool.status === 'confirmed'} faceIndex={pool.faceIndex} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.txt }}>{pool.partnerName}</span>
                    {isCirclePool(pool, circleNames) ? (
                      <span style={CROWD_TAG}>Trusted circle</span>
                    ) : (
                      <span style={CROWD_TAG}>Stranger</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: C.txt2, marginTop: 1 }}>{pool.activity}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  background: '#F5F5F5',
                  border: 'none',
                  borderRadius: 10, padding: '6px 10px', textAlign: 'center',
                }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: C.txt, lineHeight: 1 }}>
                    {pool.score}%
                  </span>
                </div>
                <InkIcon name="chevron" size={16} color={C.txt3} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <InkIcon name="clock" size={14} color={C.txt3} />
                <span style={{ fontSize: 12, color: C.txt2 }}>{pool.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <InkIcon name="pin" size={14} color={C.txt3} />
                <span style={{ fontSize: 12, color: C.txt2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pool.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: 11, fontWeight: 600,
                padding: '3px 10px', borderRadius: 20,
                background: pool.status === 'confirmed' ? C.green : '#F5F5F5',
                border: pool.status === 'confirmed' ? `1px solid ${C.green}` : 'none',
                color: pool.status === 'confirmed' ? '#ffffff' : C.txt2,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                {pool.status === 'confirmed' ? (
                  <>
                    <InkIcon name="check" size={11} color="#ffffff" />
                    Confirmed
                  </>
                ) : (
                  <>
                    <InkIcon name="alert" size={11} color={C.green} />
                    Waiting on them
                  </>
                )}
              </span>
              <span style={{ fontSize: 12, color: C.txt3 }}>{pool.detour ?? '+4 min'} detour</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
