'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon, type InkName } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';

/* ─── Types ─── */
export interface PoolEntry {
  id?: string;
  person: string;
  age: number;
  activity: string;
  time: string;
  location: string;
  score: number;
  status: 'confirmed' | 'pending';
  color: string;
  detour: string;
  faceIndex?: number;
}

interface Props {
  pool: PoolEntry;
  onBack: () => void;
  onStatusChange?: (status: 'confirmed' | 'cancelled') => void;
}

/* ─── Static factor data keyed by activity ─── */
function getFactors(activity: string, person: string) {
  const key = factorKey(activity);
  const map: Record<string, { label: string; desc: string; positive: boolean; icon: 'route' | 'time' | 'vibe' | 'verified' | 'group' }[]> = {
    'Grocery shopping': [
      { label: 'Same destination', desc: 'Both heading to Tampines Mall', positive: true, icon: 'route' },
      { label: 'Verified user', desc: `${person} has 12 pools completed`, positive: true, icon: 'verified' },
      { label: 'Minimal detour', desc: 'Only +3 min added to your trip', positive: true, icon: 'time' },
      { label: 'Vibe match', desc: 'Quiet mode preferred by both', positive: true, icon: 'vibe' },
    ],
    'Study session': [
      { label: 'Shared library visit', desc: 'Both studying at Nat. Library', positive: true, icon: 'route' },
      { label: '+6 min detour', desc: 'Slightly longer route', positive: false, icon: 'time' },
      { label: 'Verified user', desc: `${person} has 19 pools completed`, positive: true, icon: 'verified' },
      { label: 'Focus mode', desc: `${person} prefers a quiet table`, positive: true, icon: 'vibe' },
    ],
    'Exhibition': [
      { label: 'Museum visit', desc: 'Both going to National Museum', positive: true, icon: 'route' },
      { label: 'Minimal detour', desc: 'Only +2 min added', positive: true, icon: 'time' },
      { label: 'Group size', desc: `${person} prefers a small group`, positive: true, icon: 'group' },
      { label: 'Cultural interest', desc: 'Both tagged Arts & Exhibitions', positive: true, icon: 'vibe' },
    ],
    'Lunch': [
      { label: 'Same neighbourhood', desc: 'Both grabbing lunch around Bugis', positive: true, icon: 'route' },
      { label: 'Verified user', desc: `${person} has 9 pools completed`, positive: true, icon: 'verified' },
      { label: '1-to-1', desc: `${person} prefers a small table`, positive: true, icon: 'group' },
      { label: 'Timing', desc: 'Lunch windows overlap', positive: true, icon: 'time' },
    ],
    'Commute': [
      { label: 'Shared route', desc: 'Katong toward CBD around the same time', positive: true, icon: 'route' },
      { label: 'Quiet ride', desc: `${person} is headphones-in, low chat`, positive: true, icon: 'vibe' },
      { label: 'Verified user', desc: `${person} has 8 pools completed`, positive: true, icon: 'verified' },
      { label: 'Detour', desc: 'Pickup adds a few minutes', positive: false, icon: 'time' },
    ],
    'Gym session': [
      { label: 'Same gym window', desc: 'Weeknight session in Tiong Bahru', positive: true, icon: 'time' },
      { label: 'Group size', desc: `${person} does not do large groups`, positive: true, icon: 'group' },
      { label: 'Verified user', desc: `${person} has 6 pools completed`, positive: true, icon: 'verified' },
      { label: 'Pace', desc: 'Similar workout length', positive: true, icon: 'vibe' },
    ],
  };
  return map[key] ?? DEFAULT_FACTORS;
}

const MESSAGES: Record<string, { from: 'me' | 'them'; text: string }[]> = {
  'Grocery shopping': [
    { from: 'them', text: 'Hey! Looks like we\'re both heading to Tampines Mall 😊' },
    { from: 'me', text: 'Oh nice! What time are you leaving?' },
    { from: 'them', text: 'Around 5:50 PM from Bedok? We can meet at entrance B' },
  ],
  'Study session': [
    { from: 'them', text: 'Hi! Library study pool request 📚' },
    { from: 'me', text: 'Sure! Which floor are you at?' },
    { from: 'them', text: 'Level 5 reading room, the quiet one' },
  ],
  'Exhibition': [
    { from: 'them', text: 'Museum together? The AI exhibit looks cool' },
    { from: 'me', text: 'Definitely, been wanting to check it out!' },
  ],
  'Lunch': [
    { from: 'them', text: 'Lunch around Bugis? I get off my shift at 12' },
    { from: 'me', text: 'Perfect, I was heading that way anyway' },
  ],
  'Commute': [
    { from: 'them', text: 'Heading CBD-ward from Katong around 8. Quiet ride is fine with me' },
    { from: 'me', text: 'Same window. Headphones in works' },
  ],
  'Gym session': [
    { from: 'them', text: 'Tiong Bahru gym tonight? I like to keep it small' },
    { from: 'me', text: 'Same. See you around 7' },
  ],
};

function factorKey(activity: string) {
  const a = activity.toLowerCase();
  if (a.includes('grocery')) return 'Grocery shopping';
  if (a.includes('study') || a.includes('library')) return 'Study session';
  if (a.includes('exhibit') || a.includes('museum')) return 'Exhibition';
  if (a.includes('lunch') || a.includes('dinner')) return 'Lunch';
  if (a.includes('commute') || a.includes('grab')) return 'Commute';
  if (a.includes('gym')) return 'Gym session';
  return activity;
}

const DEFAULT_FACTORS: { label: string; desc: string; positive: boolean; icon: 'route' | 'time' | 'vibe' | 'verified' | 'group' }[] = [
  { label: 'Overlapping plan', desc: 'Your schedules line up this week', positive: true, icon: 'time' },
  { label: 'Nearby', desc: 'Short extra travel added to your trip', positive: true, icon: 'route' },
  { label: 'Verified user', desc: 'Completed pools on LifePool', positive: true, icon: 'verified' },
  { label: 'Vibe match', desc: 'Similar pace and group size', positive: true, icon: 'vibe' },
];
function FactorIcon({ type, color }: { type: string; color: string }) {
  const name: InkName =
    type === 'route' ? 'nav' :
    type === 'time' ? 'clock' :
    type === 'verified' ? 'shield' :
    type === 'group' ? 'users' : 'zap';
  return <InkIcon name={name} size={16} color={color} />;
}

function PoolRouteMap({
  location,
  color,
  height,
  gid,
  radius = 0,
}: {
  location: string;
  color: string;
  height: number;
  gid: string;
  radius?: number;
}) {
  return (
    <div style={{
      height, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: radius,
    }}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 430 148"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff3e8" />
            <stop offset="55%" stopColor="#eef4fb" />
            <stop offset="100%" stopColor="#e8eef6" />
          </linearGradient>
        </defs>
        <rect width="430" height="148" fill={`url(#${gid})`} />

        <ellipse cx="52" cy="118" rx="58" ry="28" fill="#cfe8d4" opacity="0.9" />
        <ellipse cx="70" cy="122" rx="22" ry="10" fill="#b7dcc0" opacity="0.7" />
        <path d="M300 0 C340 18 380 8 430 22 L430 0 Z" fill="#c5dcea" />
        <path d="M360 148 C390 128 410 138 430 120 L430 148 Z" fill="#d4e8f2" />

        <rect x="12" y="10" width="48" height="28" rx="2" fill="#e4dfd6" />
        <rect x="68" y="8" width="36" height="36" rx="2" fill="#ebe6dc" />
        <rect x="112" y="14" width="52" height="22" rx="2" fill="#ddd8cf" />
        <rect x="18" y="52" width="40" height="34" rx="2" fill="#e8e3d9" />
        <rect x="72" y="56" width="58" height="26" rx="2" fill="#e0dbd2" />
        <rect x="148" y="8" width="30" height="48" rx="2" fill="#ece7de" />
        <rect x="188" y="12" width="64" height="28" rx="2" fill="#e2ddd4" />
        <rect x="262" y="6" width="44" height="32" rx="2" fill="#e7e2d8" />
        <rect x="318" y="28" width="50" height="24" rx="2" fill="#ded9d0" />
        <rect x="378" y="36" width="40" height="38" rx="2" fill="#e5e0d7" />
        <rect x="140" y="68" width="46" height="30" rx="2" fill="#e9e4db" />
        <rect x="198" y="62" width="38" height="42" rx="2" fill="#dcd7ce" />
        <rect x="248" y="58" width="70" height="22" rx="2" fill="#e6e1d8" />
        <rect x="328" y="68" width="36" height="36" rx="2" fill="#e3ded5" />
        <rect x="374" y="90" width="48" height="28" rx="2" fill="#ebe6dd" />
        <rect x="108" y="108" width="56" height="26" rx="2" fill="#e1dcd3" />
        <rect x="176" y="114" width="42" height="22" rx="2" fill="#e8e3da" />
        <rect x="232" y="100" width="54" height="32" rx="2" fill="#dfdad1" />
        <rect x="298" y="112" width="60" height="24" rx="2" fill="#e4dfd6" />
        <rect x="12" y="100" width="32" height="20" rx="2" fill="#ece7de" />

        <path d="M0 48 H430" stroke="#fff" strokeWidth="7" />
        <path d="M0 96 H430" stroke="#fff" strokeWidth="5.5" />
        <path d="M86 0 V148" stroke="#fff" strokeWidth="6" />
        <path d="M184 0 V148" stroke="#fff" strokeWidth="8" />
        <path d="M312 0 V148" stroke="#fff" strokeWidth="5" />
        <path d="M0 22 H160" stroke="#f7f4ee" strokeWidth="3.5" />
        <path d="M184 74 H430" stroke="#f7f4ee" strokeWidth="4" />
        <path d="M86 124 H312" stroke="#fff" strokeWidth="4.5" />
        <path d="M40 148 L210 0" stroke="#f4f0ea" strokeWidth="3.2" />
        <path d="M250 148 L400 40" stroke="#f4f0ea" strokeWidth="3" />

        <polyline
          points="40,118 92,92 184,78 248,62 312,44 380,24"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points="40,118 92,92 184,78 248,62 312,44 380,24"
          fill="none"
          stroke={color}
          strokeWidth="2.6"
          strokeDasharray="6 4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="40" cy="118" r="6" fill="#fff" />
        <circle cx="40" cy="118" r="4.2" fill={color} />
        <circle cx="380" cy="24" r="6" fill="#fff" />
        <circle cx="380" cy="24" r="4.2" fill={color} />
      </svg>
      <div style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.92)', borderRadius: 10, padding: '6px 10px',
        fontSize: 11, color: '#74767E', fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <InkIcon name="pin" size={12} color={color} />
        {location}
      </div>
    </div>
  );
}

export function PoolInlineDetails({
  pool,
  onOpenChat,
}: {
  pool: PoolEntry;
  onOpenChat?: () => void;
}) {
  const factors = getFactors(pool.activity, pool.person).slice(0, 3);
  const lastMsg =
    MESSAGES[factorKey(pool.activity)]?.slice(-1)[0]?.text
    ?? MESSAGES[pool.activity]?.slice(-1)[0]?.text;

  return (
    <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ height: 1, background: '#F0F0F0', margin: '2px -12px 2px' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={pool.person} size={36} online={pool.status === 'confirmed'} faceIndex={pool.faceIndex} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: '#ADADAD', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pooling with</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#222325' }}>{pool.person}</div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#222325' }}>{pool.score}%</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <InlineRow icon="clock" label="Time" value={pool.time} />
        <InlineRow icon="pin" label="Meet at" value={pool.location} />
        <InlineRow icon="nav" label="Detour" value={`${pool.detour} added to your trip`} />
      </div>

      <PoolRouteMap
        location={pool.location}
        color={pool.color || '#FF6A00'}
        height={80}
        gid={`inline-map-${pool.id ?? pool.person}`}
        radius={10}
      />

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#222325', marginBottom: 6 }}>Why this match</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {factors.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                background: f.positive ? '#FF6A00' : '#F5F5F5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <InkIcon name={f.positive ? 'check' : 'alert'} size={10} color={f.positive ? '#ffffff' : '#ffaa33'} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#222325' }}>{f.label}</div>
                <div style={{ fontSize: 11, color: '#74767E', marginTop: 1 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {onOpenChat && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpenChat(); }}
          style={{
            width: '100%', background: '#F8F8F8',
            border: 'none', borderRadius: 12,
            padding: '10px 12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
            fontFamily: 'inherit',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: '#FF6A00',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <InkIcon name="message" size={14} color="#ffffff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#222325' }}>Chat with {pool.person}</div>
            <div style={{ fontSize: 11, color: '#74767E', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {lastMsg ?? 'Say hi'}
            </div>
          </div>
          <InkIcon name="chevron" size={14} color="#b0b0b0" />
        </button>
      )}
    </div>
  );
}

function InlineRow({ icon, label, value }: { icon: InkName; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <InkIcon name={icon} size={16} color="#74767E" />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10, color: '#ADADAD', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ fontSize: 13, color: '#222325', fontWeight: 500, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── Confirm Sheet ─── */
function ConfirmSheet({
  pool,
  action,
  onConfirm,
  onCancel,
}: {
  pool: PoolEntry;
  action: 'confirm' | 'cancel';
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isConfirm = action === 'confirm';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        style={{
          width: '100%', background: '#ffffff',
          borderRadius: '20px 20px 0 0',
          padding: '28px 24px 40px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#e0e0e0', margin: '0 auto 24px' }} />

        {/* Icon */}
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: isConfirm ? '#FF6A00' : 'rgba(255,80,80,0.08)',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          {isConfirm
            ? <InkIcon name="check" size={28} color="#ffffff" />
            : <InkIcon name="xCircle" size={28} color="#ff5050" />}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#1a1a18', textAlign: 'center', marginBottom: 8 }}>
          {isConfirm ? `Confirm pool with ${pool.person}?` : `Cancel pool with ${pool.person}?`}
        </h2>
        <p style={{ fontSize: 14, color: '#74767E', textAlign: 'center', lineHeight: 1.55, marginBottom: 28 }}>
          {isConfirm
            ? `${pool.activity} · ${pool.time}\n${pool.location}`
            : 'This will notify them and remove the pool from your schedule.'}
        </p>

        {/* CTA */}
        <button
          onClick={onConfirm}
          style={{
            width: '100%', padding: '14px', boxSizing: 'border-box',
            borderRadius: 14, border: 'none',
            background: isConfirm ? '#FF6A00' : '#ff5050',
            color: '#ffffff', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', marginBottom: 12,
          }}
        >
          {isConfirm ? 'Yes, confirm pool' : 'Cancel pool'}
        </button>
        <button
          onClick={onCancel}
          style={{
            width: '100%', padding: '14px', boxSizing: 'border-box',
            borderRadius: 14, border: '1.5px solid #FF6A00',
            background: '#fff', color: '#FF6A00',
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Go back
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Chat Preview Drawer ─── */
export function ChatDrawer({ pool, onClose }: { pool: PoolEntry; onClose: () => void }) {
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<{ from: 'me' | 'them'; text: string }[]>([]);
  const msgs = [...(MESSAGES[factorKey(pool.activity)] ?? MESSAGES[pool.activity] ?? []), ...sent];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setSent((prev) => [...prev, { from: 'me', text }]);
    setDraft('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        style={{
          width: '100%', background: '#ffffff',
          borderRadius: '20px 20px 0 0',
          maxHeight: '70vh',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 14px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#e0e0e0', margin: '0 auto 16px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={pool.person} size={40} verified faceIndex={pool.faceIndex} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#1a1a18' }}>{pool.person}</div>
              <div style={{ fontSize: 12, color: '#74767E' }}>{pool.activity}</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: m.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.from === 'me' ? '#FF6A00' : '#f5f5f3',
                color: m.from === 'me' ? '#fff' : '#1a1a18',
                fontSize: 14, lineHeight: 1.45,
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px 32px', display: 'flex', gap: 10 }}>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); }}
            placeholder="Message…"
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 20,
              border: 'none', background: '#f5f5f3',
              fontSize: 14, color: '#1a1a18', outline: 'none',
            }}
          />
          <button
            onClick={send}
            style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: draft.trim() ? '#FF6A00' : '#e8e8e6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M10 4l4 4-4 4" stroke={draft.trim() ? '#fff' : '#b0b0b0'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Detail Screen ─── */
export function PoolDetailScreen({ pool, onBack, onStatusChange }: Props) {
  const [sheet, setSheet] = useState<null | 'confirm' | 'cancel'>(null);
  const [chat, setChat] = useState(false);
  const [confirmed, setConfirmed] = useState(pool.status === 'confirmed');
  const [cancelled, setCancelled] = useState(false);

  const factors = getFactors(pool.activity, pool.person);
  const positiveCount = factors.filter(f => f.positive).length;

  function handleSheetConfirm() {
    if (sheet === 'confirm') {
      setConfirmed(true);
      onStatusChange?.('confirmed');
    }
    if (sheet === 'cancel') {
      setCancelled(true);
      onStatusChange?.('cancelled');
    }
    setSheet(null);
  }

  return (
    <div style={{ minHeight: '100%', background: '#F8F8F8', paddingBottom: 40 }}>

      {/* ── Hero header ── */}
      <div style={{
        background: '#ffffff',
        borderBottom: 'none',
        padding: '60px 20px 24px',
      }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <InkIcon name="back" size={18} color="#74767E" />
          <span style={{ fontSize: 14, color: '#74767E' }}>Pools</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={pool.person} size={56} verified online={confirmed} faceIndex={pool.faceIndex} />
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 500, color: '#1a1a18', marginBottom: 2 }}>{pool.person}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <InkIcon name="star" size={13} color="#FFB800" filled />
                <span style={{ fontSize: 13, color: '#74767E' }}>4.9 · 34 pools</span>
              </div>
            </div>
          </div>

          {/* Score ring */}
          <div style={{
            textAlign: 'center',
            background: '#F5F5F5',
            border: 'none',
            borderRadius: 14, padding: '10px 14px',
          }}>
            <div style={{ fontSize: 26, fontWeight: 300, color: '#222325', lineHeight: 1 }}>{pool.score}%</div>
            <div style={{ fontSize: 10, color: '#74767E', marginTop: 2 }}>match</div>
          </div>
        </div>

        {/* Activity pill */}
        <div style={{
          marginTop: 16,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: pool.color === '#FF6A00' ? '#FF6A00' : `${pool.color}10`,
          borderRadius: 20,
          padding: '6px 14px',
          border: pool.color === '#FF6A00' ? '1px solid #FF6A00' : 'none',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: pool.color === '#FF6A00' ? '#ffffff' : pool.color }} />
          <span style={{ fontSize: 13, color: pool.color === '#FF6A00' ? '#ffffff' : pool.color, fontWeight: 500 }}>{pool.activity}</span>
        </div>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Status + logistics (one card) ── */}
        <div style={{ background: '#ffffff', borderRadius: 16, overflow: 'hidden' }}>
          {cancelled ? (
            <div style={{
              background: '#ff5050', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <InkIcon name="xCircle" size={18} color="#ffffff" />
              <span style={{ fontSize: 14, color: '#ffffff', fontWeight: 500 }}>Pool cancelled</span>
            </div>
          ) : confirmed ? (
            <div style={{
              background: '#FF6A00', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <InkIcon name="checkCircle" size={18} color="#ffffff" />
              <span style={{ fontSize: 14, color: '#ffffff', fontWeight: 500 }}>Confirmed — you&apos;re all set!</span>
            </div>
          ) : (
            <div style={{
              background: '#FF6A00', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <InkIcon name="alert" size={18} color="#ffffff" />
              <span style={{ fontSize: 14, color: '#ffffff', fontWeight: 500 }}>Awaiting your confirmation</span>
            </div>
          )}

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Row icon={<InkIcon name="clock" size={24} color="#74767E" />} label="Time" value={pool.time} />
            <Row icon={<InkIcon name="pin" size={24} color="#74767E" />} label="Meet at" value={pool.location} />
            <Row icon={<InkIcon name="nav" size={24} color="#74767E" />} label="Detour" value={pool.detour + ' added to your trip'} />
          </div>

          <PoolRouteMap
            location={pool.location}
            color={pool.color || '#FF6A00'}
            height={148}
            gid="detailMap"
          />
        </div>

        {/* ── Match Factors ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a18' }}>
              Why this match
            </span>
            <span style={{ fontSize: 12, color: '#74767E' }}>
              {positiveCount}/{factors.length} factors positive
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {factors.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: '#ffffff', border: 'none',
                  borderRadius: 12, padding: '12px 14px',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#FF6A00',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <FactorIcon type={f.icon} color="#ffffff" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a18' }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: '#74767E', marginTop: 2 }}>{f.desc}</div>
                </div>
                {f.positive
                  ? (
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#FF6A00', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <InkIcon name="thumbs" size={12} color="#ffffff" />
                    </div>
                  )
                  : <InkIcon name="alert" size={14} color="#ffaa33" />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Message Preview ── */}
        <button
          onClick={() => setChat(true)}
          style={{
            width: '100%', background: '#ffffff',
            border: 'none', borderRadius: 14,
            padding: '14px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#FF6A00',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <InkIcon name="message" size={18} color="#ffffff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a18' }}>Chat with {pool.person}</div>
            <div style={{ fontSize: 12, color: '#74767E', marginTop: 1 }}>
              {MESSAGES[factorKey(pool.activity)]?.slice(-1)[0]?.text.slice(0, 40)
                ?? MESSAGES[pool.activity]?.slice(-1)[0]?.text.slice(0, 40)
                ?? 'Say hi'}…
            </div>
          </div>
          <InkIcon name="chevron" size={16} color="#b0b0b0" />
        </button>

        {/* ── Action Buttons ── */}
        {!cancelled && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setSheet('cancel')}
              style={{
                flex: 1, padding: '14px', boxSizing: 'border-box',
                borderRadius: 14,
                border: '1.5px solid #FF6A00',
                background: '#fff', color: '#FF6A00',
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <InkIcon name="xCircle" size={16} color="#FF6A00" />
              {confirmed ? 'Cancel Pool' : 'Cancel'}
            </button>
            {!confirmed && (
              <button
                onClick={() => setSheet('confirm')}
                style={{
                  flex: 1, padding: '14px', boxSizing: 'border-box',
                  borderRadius: 14, border: '1.5px solid #FF6A00',
                  background: '#FF6A00', color: '#ffffff',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <InkIcon name="checkCircle" size={16} color="#fff" filled />
                Confirm Pool
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {sheet && (
          <ConfirmSheet
            pool={pool}
            action={sheet}
            onConfirm={handleSheetConfirm}
            onCancel={() => setSheet(null)}
          />
        )}
        {chat && (
          <ChatDrawer pool={pool} onClose={() => setChat(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Inline helper ─── */
function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ marginTop: 1, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 11, color: '#a8a8a3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 14, color: '#1a1a18', fontWeight: 400 }}>{value}</div>
      </div>
    </div>
  );
}
