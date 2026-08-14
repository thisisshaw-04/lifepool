'use client';
import { motion } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { useApp } from '@/lib/store';
import { PERSONA } from '@/lib/personas';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

const PREFS = [
  { label: '1-to-1 pools',                  ok: true  },
  { label: 'Detours under 10 min',           ok: true  },
  { label: 'Activity-based conversation',    ok: true  },
  { label: 'Large groups',                   ok: false },
  { label: 'Long wait times',               ok: false },
];

const HISTORY = [
  { with: PERSONA.jamie.shortName,  activity: 'Groceries', rating: 'Great match',      date: 'Aug 9',  faceIndex: PERSONA.jamie.faceIndex },
  { with: PERSONA.aisha.shortName,  activity: 'Study',     rating: 'Fine',             date: 'Aug 2',  faceIndex: PERSONA.aisha.faceIndex },
  { with: PERSONA.yuki.shortName,   activity: 'Commute',   rating: 'Not compatible',   date: 'Jul 28', faceIndex: PERSONA.yuki.faceIndex },
  { with: PERSONA.mei.shortName,    activity: 'Lunch',     rating: 'Would pool again', date: 'Jul 22', faceIndex: PERSONA.mei.faceIndex },
];

const ratingColor = (r: string) => {
  if (r === 'Great match' || r === 'Would pool again') return C.green;
  if (r === 'Fine') return '#FFB800';
  return '#FF5050';
};

export function MemoryScreen() {
  const { memory } = useApp();
  return (
    <div style={{ minHeight: '100%', background: C.bg, padding: '60px 20px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
          Memory<span style={{ color: C.green }}>.</span>
        </span>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>What your agent has learned</div>
      </div>

      {/* Learned prefs */}
      <div style={{ background: C.surface, border: 'none', borderRadius: 16, padding: '18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(255,106,0,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <InkIcon name="brain" size={32} color={C.green} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>Learned preferences</div>
            <div style={{ fontSize: 11, color: C.txt2 }}>Updated {memory.lastUpdated}</div>
          </div>
        </div>

        {PREFS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: 'none',
            }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: p.ok ? '#FF6A00' : 'rgba(255,80,80,0.08)',
              border: p.ok ? 'none' : '1px solid rgba(255,80,80,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {p.ok ? <InkIcon name="check" size={12} color="#ffffff" /> : <InkIcon name="x" size={12} color="#FF5050" />}
            </div>
            <span style={{ fontSize: 13, color: C.txt2 }}>{p.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Pool history */}
      <div style={{ background: C.surface, border: 'none', borderRadius: 16, padding: '18px' }}>
        <div style={{ fontSize: 11, color: C.txt3, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
          Pool history
        </div>
        {HISTORY.map((h, i) => {
          const tone = ratingColor(h.rating);
          const accent = tone === C.green;
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={h.with} size={36} faceIndex={h.faceIndex} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>
                  {h.with} · <span style={{ fontWeight: 400, color: C.txt2 }}>{h.activity}</span>
                </div>
                <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>{h.date}</div>
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: accent ? '#ffffff' : tone,
              background: accent ? C.green : `${tone}14`,
              border: `1px solid ${accent ? C.green : `${tone}30`}`,
              borderRadius: 8, padding: '3px 9px',
            }}>
              {h.rating}
            </span>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
