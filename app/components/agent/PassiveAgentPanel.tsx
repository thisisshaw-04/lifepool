'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { PERSONA } from '@/lib/personas';

const MATCHES = [
  {
    id: 'm1', name: PERSONA.jamie.shortName, time: 'Tonight 6:00 PM', activity: 'Tampines Mall groceries',
    score: 94, status: 'confirmed' as const, price: 'Match confirmed', faceIndex: PERSONA.jamie.faceIndex,
  },
  {
    id: 'm2', name: PERSONA.aisha.shortName, time: 'Sat 2:00 PM', activity: 'NLB study session',
    score: 78, status: 'pending' as const, price: 'Awaiting confirm', faceIndex: PERSONA.aisha.faceIndex,
  },
  {
    id: 'm3', name: PERSONA.daniel.shortName, time: 'Sun 4:00 PM', activity: 'National Museum exhibition',
    score: 81, status: 'pending' as const, price: 'Awaiting confirm', faceIndex: PERSONA.daniel.faceIndex,
  },
];

export function PassiveAgentPanel({ onActivate, onSeeAll }: { onActivate?: () => void; onSeeAll?: () => void }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div>
      {/* Header sits on the grey canvas, above the white card */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#222325' }}>Agent matches</span>
        <button
          onClick={() => setEnabled(v => !v)}
          style={{
            width: 40, height: 23, borderRadius: 12,
            background: enabled ? '#FF6A00' : '#DADBDD',
            border: 'none', cursor: 'pointer',
            position: 'relative', transition: 'background 0.2s',
            flexShrink: 0,
          }}
        >
          <div style={{
            position: 'absolute', top: 2.5,
            left: enabled ? 19 : 2.5,
            width: 18, height: 18, borderRadius: '50%',
            background: '#fff', transition: 'left 0.2s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }} />
        </button>
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: 'hidden',
              background: '#ffffff',
              borderRadius: 14,
              padding: '8px 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            {MATCHES.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={m.status === 'confirmed' ? onActivate : onSeeAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  cursor: 'pointer',
                }}
              >
                <Avatar name={m.name} size={46} faceIndex={m.faceIndex} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#222325', marginBottom: 1 }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#74767E', marginBottom: 1 }}>
                    {m.activity}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#ADADAD' }}>
                    {m.time}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {/* Score — "From $X" equivalent */}
                  <span style={{
                    fontSize: 12.5, fontWeight: 700,
                    color: m.status === 'confirmed' ? '#FF6A00' : '#74767E',
                  }}>
                    {m.score}%
                  </span>
                  <span style={{
                    fontSize: 10.5,
                    color: m.status === 'confirmed' ? '#FF6A00' : '#ADADAD',
                    fontWeight: m.status === 'confirmed' ? 500 : 400,
                  }}>
                    {m.price}
                  </span>
                  {m.status === 'confirmed' && (
                    <InkIcon name="chevron" size={14} color="#FF6A00" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
