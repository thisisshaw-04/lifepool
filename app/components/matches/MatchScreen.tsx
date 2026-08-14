'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { getDemoMatch } from '@/lib/matching';
import { useApp } from '@/lib/store';
import { YOU } from '@/lib/personas';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

type Phase = 'reveal' | 'negotiation' | 'confirmed';

export function MatchScreen({
  onConfirm,
  onDismiss,
}: {
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  const [phase, setPhase] = useState<Phase>('reveal');
  const [negStep, setNegStep] = useState(-1);
  const { bestMatch, matchOptions } = useApp();
  const match = bestMatch ?? getDemoMatch();
  const name = match.user.name;
  const hasOptions = matchOptions.length > 1;

  const NEG_STEPS = [
    { from: 'You',   text: `My user plans to ${match.activity.type.toLowerCase()} around ${match.proposedTime}.` },
    { from: name,    text: `My user is flexible by ${match.activity.flexibilityMinutes} min near ${match.activity.location}.` },
    { from: 'You',   text: `Proposing ${match.proposedTime}, ${match.proposedLocation}.` },
    { from: name,    text: `Confirmed. Detour: You +${match.detourMinutes} min / ${name} +1 min.` },
  ];

  const startNeg = () => {
    setPhase('negotiation');
    setNegStep(0);
    let step = 0;
    const advance = () => {
      step++;
      if (step < NEG_STEPS.length) {
        setNegStep(step);
        setTimeout(advance, 1100);
      } else {
        setTimeout(() => setPhase('confirmed'), 900);
      }
    };
    setTimeout(advance, 1100);
  };

  const why = (match.factors.length
    ? match.factors.map((f) => ({ label: f.label, value: f.value || '', ok: f.positive }))
    : [
        { label: 'Activity match', value: 'Same activity', ok: true },
        { label: 'Time overlap', value: 'Windows line up', ok: true },
        { label: 'Distance', value: 'Nearby', ok: true },
        { label: 'Detour', value: `+${match.detourMinutes} min`, ok: true },
      ]
  ).slice(0, 4);

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
      <AnimatePresence mode="wait">

        {/* -- REVEAL ------------------------------- */}
        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >

            <div style={{ marginBottom: 14, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
                      Match<span style={{ color: C.green }}>.</span>
                    </span>
                    {hasOptions && (
                      <button
                        type="button"
                        onClick={onDismiss}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: 0, fontFamily: 'inherit', flexShrink: 0,
                        }}
                      >
                        <InkIcon name="back" size={18} color="#74767E" />
                        <span style={{ fontSize: 14, color: '#74767E' }}>Other people</span>
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: C.txt2, marginTop: 4, lineHeight: 1.4 }}>
                    {hasOptions ? `Pooling with ${name}` : 'Your agent found a great pool'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ position: 'relative', width: 64, height: 64 }}>
                    <svg viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
                      <circle cx="55" cy="55" r="48" stroke={C.border} strokeWidth="7" fill="none" />
                      <motion.circle
                        cx="55" cy="55" r="48"
                        stroke={C.green}
                        strokeWidth="7"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - match.score / 100) }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: 'spring' }}
                        style={{ fontSize: 18, fontWeight: 700, color: C.txt, letterSpacing: '-0.04em', lineHeight: 1 }}
                      >
                        {match.score}%
                      </motion.div>
                    </div>
                  </div>
                  <div style={{ marginTop: 2, fontSize: 10, color: C.txt2, fontWeight: 500 }}>compatible</div>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: C.surface,
                border: 'none',
                borderRadius: 16,
                padding: '14px',
                marginBottom: 10,
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <Avatar name={match.user.name} size={44} verified={match.user.verified} online faceIndex={match.user.faceIndex} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: C.txt }}>{match.user.name}</span>
                    {match.user.verified && (
                      <span style={{ background: C.green, border: `1px solid ${C.green}`, borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 600, color: '#ffffff' }}>
                        Verified
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: C.txt2, marginTop: 2 }}>
                    {match.user.age} · {match.user.role} · {match.user.neighbourhood ?? 'Singapore'}
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                    {[...Array(5)].map((_, i) => (
                      <InkIcon key={i} name="star" size={11} color={i < Math.floor(match.user.rating) ? '#FFB800' : C.border} filled={i < Math.floor(match.user.rating)} />
                    ))}
                    <span style={{ fontSize: 11, color: C.txt2, marginLeft: 4 }}>{match.user.rating}</span>
                  </div>
                </div>
              </div>
              {match.user.bio && (
                <div style={{
                  fontSize: 12, color: C.txt2, marginBottom: 10, lineHeight: 1.4,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {match.user.bio}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {[
                  { icon: 'clock' as const, label: match.proposedTime, sub: 'Meet time' },
                  { icon: 'nav' as const, label: `+${match.detourMinutes} min`, sub: 'Your detour' },
                  { icon: 'pin' as const, label: match.proposedLocation.split(',')[0], sub: 'Meet here' },
                ].map(({ icon, label, sub }, i, rows) => (
                  <div
                    key={sub}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 0,
                      padding: '14px 0',
                      borderBottom: i < rows.length - 1 ? '1px solid #EEE' : 'none',
                    }}
                  >
                    <InkIcon name={icon} size={14} color={C.txt3} />
                    <span style={{ flex: 1, minWidth: 0, fontSize: 12, fontWeight: 600, color: C.txt, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 11, color: C.txt3, flexShrink: 0 }}>{sub}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ background: C.surface, border: 'none', borderRadius: 14, padding: '12px' }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: C.txt, marginBottom: 8 }}>
                Why this match
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: 'transparent',
              }}>
                {why.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      borderRight: i % 2 === 0 ? '1px solid #EEE' : 'none',
                      borderBottom: i < 2 ? '1px solid #EEE' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: f.ok ? '#FF6A00' : '#FF5050',
                        border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <InkIcon name={f.ok ? 'check' : 'x'} size={9} color="#ffffff" />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: C.txt3, letterSpacing: '0.02em' }}>{f.label}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.txt, lineHeight: 1.3 }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            </div>

            <div style={{ flexShrink: 0, paddingTop: 12, display: 'flex', gap: 8 }}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onDismiss}
              style={{
                flex: 1, padding: '13px 8px', borderRadius: 14,
                background: '#fff', border: '1.5px solid #FF6A00',
                fontSize: 14, fontWeight: 700, color: '#FF6A00', cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {hasOptions ? 'Others' : 'Not now'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={startNeg}
              style={{
                flex: 1, padding: '13px 8px', borderRadius: 14,
                background: '#FF6A00', border: '1.5px solid #FF6A00',
                fontSize: 14, fontWeight: 700, color: '#fff',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Pool Together
            </motion.button>
            </div>
          </motion.div>
        )}

        {/* -- NEGOTIATION -------------------------- */}
        {phase === 'negotiation' && (
          <motion.div
            key="neg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
          >
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
                Negotiating<span style={{ color: C.green }}>.</span>
              </span>
              <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>Coordinating with {name}&apos;s agent</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NEG_STEPS.map((step, i) => {
                if (i > negStep) return null;
                const isMe = step.from === 'You';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 10 }}
                  >
                    {isMe
                      ? <Avatar name={YOU.shortName} size={28} faceIndex={YOU.faceIndex} />
                      : <Avatar name={name} size={28} faceIndex={match.user.faceIndex} />}
                    <div>
                      <div style={{ fontSize: 10, color: C.txt3, marginBottom: 4, textAlign: isMe ? 'right' : 'left' }}>
                        {isMe ? 'Your Agent' : `${name}'s Agent`}
                      </div>
                      <div style={{
                        background: isMe ? '#FF6A00' : C.surface,
                        border: 'none',
                        borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        padding: '10px 14px', fontSize: 13, color: isMe ? '#ffffff' : C.txt, lineHeight: 1.5, maxWidth: 260,
                      }}>
                        {step.text}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* -- CONFIRMED ---------------------------- */}
        {phase === 'confirmed' && (
          <motion.div
            key="conf"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20, marginTop: 8, flexShrink: 0 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#FF6A00', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                }}
              >
                <InkIcon name="check" size={28} color="#ffffff" />
              </motion.div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', textAlign: 'center', marginBottom: 6 }}>
                You&apos;re pooled<span style={{ color: C.green }}>.</span>
              </h2>
              <p style={{ fontSize: 13, color: C.txt2, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
                One thing you were already doing.<br />Now you didn&apos;t have to do it alone.
              </p>
            </div>

            <div style={{ background: C.surface, border: 'none', borderRadius: 16, padding: '6px 16px', marginBottom: 16, flexShrink: 0 }}>
              {[
                { label: 'Time',       value: match.proposedTime },
                { label: 'Location',   value: match.proposedLocation },
                { label: 'Activity',   value: match.activity.type },
                { label: 'Detour',     value: `+${match.detourMinutes} min` },
                { label: 'Pool buddy', value: `${match.user.name}, ${match.user.age}` },
              ].map(({ label, value }, i, rows) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '14px 0',
                    borderBottom: i < rows.length - 1 ? '1px solid #EEE' : 'none',
                  }}
                >
                  <span style={{ fontSize: 12, color: C.txt3, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.txt, textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onConfirm}
              style={{ width: '100%', padding: '13px', borderRadius: 14, background: C.green, border: 'none', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer', flexShrink: 0, marginTop: 'auto' }}
            >
              View upcoming pools
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
