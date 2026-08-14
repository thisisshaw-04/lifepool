'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { useApp } from '@/lib/store';
import { PERSONA } from '@/lib/personas';

type Tag = string;

interface Profile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  location: string;
  budget: string;
  budgetNum: number;
  score: number;
  rating: number;
  reviews: number;
  verified: boolean;
  moveIn: string;
  tags: Tag[];
  bio: string;
  faceIndex: number;
}

const PROFILES: Profile[] = [
  {
    id: PERSONA.priya.id, name: PERSONA.priya.shortName, age: PERSONA.priya.age,
    avatar: PERSONA.priya.avatar, location: PERSONA.priya.neighbourhood, budget: '$800-$1,000',
    budgetNum: 900, score: 94, rating: PERSONA.priya.rating, reviews: 12,
    verified: PERSONA.priya.verified, moveIn: 'Sep 1', faceIndex: PERSONA.priya.faceIndex,
    tags: ['Early bird', 'Non-smoker', 'WFH', 'Pet-friendly'],
    bio: PERSONA.priya.bio,
  },
  {
    id: PERSONA.rina.id, name: PERSONA.rina.shortName, age: PERSONA.rina.age,
    avatar: PERSONA.rina.avatar, location: PERSONA.rina.neighbourhood, budget: '$700-$900',
    budgetNum: 800, score: 88, rating: PERSONA.rina.rating, reviews: 8,
    verified: PERSONA.rina.verified, moveIn: 'Sep 15', faceIndex: PERSONA.rina.faceIndex,
    tags: ['Night owl', 'Non-smoker', 'Studio days', 'Quiet'],
    bio: PERSONA.rina.bio,
  },
  {
    id: PERSONA.zoe.id, name: PERSONA.zoe.shortName, age: PERSONA.zoe.age,
    avatar: PERSONA.zoe.avatar, location: PERSONA.zoe.neighbourhood, budget: '$600-$800',
    budgetNum: 700, score: 81, rating: PERSONA.zoe.rating, reviews: 5,
    verified: PERSONA.zoe.verified, moveIn: 'Oct 1', faceIndex: PERSONA.zoe.faceIndex,
    tags: ['Flexible', 'Plant parent', 'Quiet', 'Clean'],
    bio: PERSONA.zoe.bio,
  },
  {
    id: PERSONA.amara.id, name: PERSONA.amara.shortName, age: PERSONA.amara.age,
    avatar: PERSONA.amara.avatar, location: PERSONA.amara.neighbourhood, budget: '$900-$1,200',
    budgetNum: 1050, score: 76, rating: PERSONA.amara.rating, reviews: 20,
    verified: PERSONA.amara.verified, moveIn: 'ASAP', faceIndex: PERSONA.amara.faceIndex,
    tags: ['Chef', 'Weekend hiker', 'Non-smoker', 'Dog owner'],
    bio: PERSONA.amara.bio,
  },
];

const BUDGETS = ['Any budget', 'Under $700', 'Under $900', 'Under $1,100', '$1,100+'];
const MOVEINS = ['Any date', 'Sep 1', 'Sep 15', 'Oct 1', 'ASAP'];

type FilterKey = 'budget' | 'moveIn';

function FilterSelect({
  icon,
  value,
  isDefault,
  open,
  options,
  onToggle,
  onPick,
}: {
  icon: 'dollar' | 'calendar';
  value: string;
  isDefault: boolean;
  open: boolean;
  options: string[];
  onToggle: () => void;
  onPick: (v: string) => void;
}) {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          height: 42,
          padding: '0 10px 0 12px',
          borderRadius: 10,
          border: `1px solid ${open ? '#222325' : '#E5E5E5'}`,
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <InkIcon name={icon} size={16} color={isDefault ? '#74767E' : '#222325'} />
        <span style={{
          flex: 1,
          textAlign: 'left',
          fontSize: 13,
          fontWeight: isDefault ? 500 : 600,
          color: '#222325',
          whiteSpace: 'nowrap',
        }}>
          {value}
        </span>
        <span style={{
          display: 'flex',
          flexShrink: 0,
          transform: open ? 'rotate(-90deg)' : 'rotate(90deg)',
          transition: 'transform 0.15s',
        }}>
          <InkIcon name="chevron" size={14} color="#ADADAD" />
        </span>
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          top: 44,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#ffffff',
          border: '1px solid #E5E5E5',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {options.map((opt, i) => {
            const selected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onPick(opt)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  padding: '10px 12px',
                  background: selected ? '#F8F8F8' : '#ffffff',
                  border: 'none',
                  borderBottom: i < options.length - 1 ? '1px solid #F0F0F0' : 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: 13,
                  fontWeight: selected ? 600 : 400,
                  color: '#222325',
                }}>
                  {opt}
                </span>
                {selected && <InkIcon name="check" size={14} color="#222325" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const AGENT_STEPS = [
  { from: 'agent', text: 'Found 4 matches near you. Shall I reach out to Priya - 94% match, move-in Sep 1?' },
  { from: 'user',  text: 'Yes, go ahead.' },
  { from: 'agent', text: 'Sending intro message to Priya... Sent. She has 4h to respond.' },
  { from: 'agent', text: 'Priya replied: "Hi! Happy to chat. Are you free for a call this weekend?"' },
  { from: 'user',  text: 'Sunday 4 PM works for me.' },
  { from: 'agent', text: 'Confirmed a video call with Priya on Sunday 4 PM. Added to your calendar.' },
];

function ProfileCard({ p, onNegotiate }: { p: Profile; onNegotiate: (p: Profile) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#ffffff',
        border: 'none',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Card header */}
      <div style={{
        background: '#ffffff',
        borderBottom: 'none',
        padding: '16px 16px 14px',
        position: 'relative',
      }}>
        {/* Match score badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: '#F5F5F5',
          border: 'none',
          borderRadius: 8, padding: '3px 8px',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#74767E' }}>{p.score}% match</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
          <Avatar name={p.name} size={50} faceIndex={p.faceIndex} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#222325' }}>{p.name}</span>
              <span style={{ fontSize: 13, color: '#ADADAD' }}>{p.age}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <InkIcon name="pin" size={13} color="#ADADAD" />
                <span style={{ fontSize: 12, color: '#74767E' }}>{p.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <InkIcon name="dollar" size={13} color="#ADADAD" />
                <span style={{ fontSize: 12, color: '#74767E' }}>{p.budget}/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 16px' }}>
        {/* Rating row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <InkIcon name="star" size={14} color="#f5a623" filled />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#222325' }}>{p.rating}</span>
            <span style={{ fontSize: 12, color: '#74767E' }}>({p.reviews} reviews)</span>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 500, color: '#FF6A00' }}>Moves in {p.moveIn}</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              background: '#ffffff', border: '1px solid #E5E5E5',
              borderRadius: 6, padding: '3px 9px',
              fontSize: 11.5, color: '#74767E',
            }}>{tag}</span>
          ))}
        </div>

        {/* Bio */}
        <p style={{ fontSize: 12.5, color: '#74767E', lineHeight: 1.55, marginBottom: 14 }}>
          {p.bio}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onNegotiate(p)}
            style={{
            flex: 1, height: 40, borderRadius: 10, boxSizing: 'border-box',
            background: '#fff', border: '1.5px solid #FF6A00',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: 12.5, fontWeight: 600, color: '#FF6A00', fontFamily: 'inherit',
          }}>
            <InkIcon name="message" size={16} color="#FF6A00" /> Message
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onNegotiate(p)}
            style={{
              flex: 2, height: 40, borderRadius: 10,
              background: '#FF6A00',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontSize: 12.5, fontWeight: 600, color: '#fff',
              fontFamily: 'inherit',
              boxShadow: '0 2px 10px rgba(255,106,0,0.3)',
            }}
          >
            Let agent reach out <InkIcon name="chevron" size={16} color="#fff" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function NegotiationOverlay({ profile, onClose, onScheduled }: { profile: Profile; onClose: () => void; onScheduled: () => void }) {
  const [step, setStep] = useState(0);
  const visible = AGENT_STEPS.slice(0, step + 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 38 }}
        style={{
          width: '100%',
          background: '#ffffff',
          borderRadius: '20px 20px 0 0',
          padding: '20px 20px 40px',
          maxHeight: '75vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle + header */}
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: '#DADBDD', margin: '0 auto 20px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={profile.name} size={36} faceIndex={profile.faceIndex} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#222325' }}>
                Agent reaching out to {profile.name}
              </div>
              <div style={{ fontSize: 12, color: '#FF6A00' }}>{profile.score}% compatibility</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <InkIcon name="x" size={20} color="#74767E" />
          </button>
        </div>

        {/* Messages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <AnimatePresence>
            {visible.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.from === 'user'
                    ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background: msg.from === 'user' ? '#FF6A00' : '#F5F5F5',
                  border: 'none',
                }}>
                  <span style={{
                    fontSize: 13, lineHeight: 1.5,
                    color: msg.from === 'user' ? '#fff' : '#222325',
                  }}>{msg.text}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        {step < AGENT_STEPS.length - 1 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setStep(s => s + 1)}
            style={{
              width: '100%', height: 48, borderRadius: 12,
              background: '#222325', border: 'none',              cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff',
              fontFamily: 'inherit',
            }}
          >
            Continue ›
          </motion.button>
        ) : (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScheduled}
            style={{
              width: '100%', height: 48, borderRadius: 12,
              background: '#FF6A00', border: 'none',
              cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff',
              fontFamily: 'inherit',
              boxShadow: '0 2px 14px rgba(255,106,0,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <InkIcon name="calendar" size={16} color="#fff" /> View in schedule
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export function RoommateScreen({ onBack }: { onBack: () => void }) {
  const [areaQuery, setAreaQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('Any budget');
  const [moveInFilter, setMoveInFilter] = useState('Any date');
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [negotiating, setNegotiating] = useState<Profile | null>(null);
  const { addPool, setScreen, pools } = useApp();

  const toggleFilter = (key: FilterKey) => {
    setOpenFilter((cur) => (cur === key ? null : key));
  };

  const q = areaQuery.trim().toLowerCase();
  const filtered = PROFILES.filter(p => {
    const areaOk = !q
      || p.location.toLowerCase().includes(q)
      || p.name.toLowerCase().includes(q);
    const budgetOk = budgetFilter === 'Any budget'
      || (budgetFilter === 'Under $700' && p.budgetNum < 700)
      || (budgetFilter === 'Under $900' && p.budgetNum < 900)
      || (budgetFilter === 'Under $1,100' && p.budgetNum < 1100)
      || (budgetFilter === '$1,100+' && p.budgetNum >= 1100);
    const moveOk = moveInFilter === 'Any date' || p.moveIn === moveInFilter;
    return areaOk && budgetOk && moveOk;
  });

  return (
    <div style={{ background: '#F8F8F8', minHeight: '100%', padding: '60px 20px 24px', boxSizing: 'border-box' }}>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#222325', letterSpacing: '-0.8px', lineHeight: 1 }}>
            Roommate<span style={{ color: '#FF6A00' }}>.</span>
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
        <div style={{ fontSize: 13, color: '#74767E', marginTop: 6, lineHeight: 1.5 }}>
          AI-matched on lifestyle, budget and location
        </div>
      </div>

      {/* Property filters */}
      <div style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '12px',
        marginBottom: 14,
        position: 'relative',
        zIndex: 5,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 44,
          padding: '0 12px',
          borderRadius: 10,
          border: '1px solid #E5E5E5',
          background: '#ffffff',
          marginBottom: 10,
        }}>
          <InkIcon name="search" size={18} color="#222325" />
          <input
            type="search"
            value={areaQuery}
            onChange={(e) => setAreaQuery(e.target.value)}
            placeholder="Search area or neighbourhood"
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              fontFamily: 'inherit',
              color: '#222325',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterSelect
            icon="dollar"
            value={budgetFilter}
            isDefault={budgetFilter === 'Any budget'}
            open={openFilter === 'budget'}
            options={BUDGETS}
            onToggle={() => toggleFilter('budget')}
            onPick={(v) => { setBudgetFilter(v); setOpenFilter(null); }}
          />
          <FilterSelect
            icon="calendar"
            value={moveInFilter}
            isDefault={moveInFilter === 'Any date'}
            open={openFilter === 'moveIn'}
            options={MOVEINS}
            onToggle={() => toggleFilter('moveIn')}
            onPick={(v) => { setMoveInFilter(v); setOpenFilter(null); }}
          />
        </div>
      </div>

      {/* Results count */}
      <div style={{ padding: '4px 0 10px' }}>
        <span style={{ fontSize: 12, color: '#74767E' }}>
          {filtered.length} flatmate{filtered.length !== 1 ? 's' : ''} available
        </span>
      </div>

      {/* Profile cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <ProfileCard p={p} onNegotiate={setNegotiating} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: '#74767E', fontSize: 14,
          }}>
            No matches for those filters. Try widening your budget or area.
          </div>
        )}
      </div>

      {/* Negotiation overlay */}
      <AnimatePresence>
        {negotiating && (
          <NegotiationOverlay
            profile={negotiating}
            onClose={() => setNegotiating(null)}
            onScheduled={() => {
              const id = `room-${negotiating.id}`;
              if (!pools.some((p) => p.id === id)) {
                addPool({
                  id,
                  partnerId: negotiating.id,
                  partnerName: negotiating.name,
                  partnerAvatar: negotiating.avatar,
                  activity: 'Roommate intro call',
                  date: 'Sunday',
                  time: 'Sun 4:00 PM',
                  location: 'Video call',
                  status: 'confirmed',
                  score: negotiating.score,
                  age: negotiating.age,
                  detour: '0 min',
                  color: '#FF6A00',
                  faceIndex: negotiating.faceIndex,
                });
              }
              setNegotiating(null);
              setScreen('schedule');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
