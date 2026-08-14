'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { ParsedIntent } from '@/types';
import { useApp } from '@/lib/store';
import { YOU, PERSONA } from '@/lib/personas';

const BASE_STAGES = [
  { label: 'Understanding your plan',        duration: 900 },
  { label: 'Searching nearby intentions',    duration: 1100 },
  { label: 'Comparing possible overlaps',    duration: 1000 },
  { label: 'Checking timing compatibility',  duration: 900 },
  { label: 'Calculating inconvenience',      duration: 800 },
];

const SIZE = 268;
const CX = SIZE / 2;
const RINGS = [46, 78, 112];

const ORBIT = [
  { angle: -28, dist: 74, size: 42 },
  { angle: 52, dist: 98, size: 36 },
  { angle: 168, dist: 100, size: 36 },
  { angle: -128, dist: 116, size: 30 },
  { angle: 108, dist: 118, size: 30 },
  { angle: -90, dist: 118, size: 30 },
];

const FILLERS = [
  { name: PERSONA.mei.shortName, faceIndex: PERSONA.mei.faceIndex },
  { name: PERSONA.yuki.shortName, faceIndex: PERSONA.yuki.faceIndex },
  { name: PERSONA.rina.shortName, faceIndex: PERSONA.rina.faceIndex },
];

function polar(angle: number, dist: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + dist * Math.sin(rad),
    y: CX - dist * Math.cos(rad),
  };
}

export function AgentSearchScreen({
  intent,
  onComplete,
  onBack,
}: {
  intent: ParsedIntent | null;
  onComplete: () => void;
  onBack: () => void;
}) {
  const { matchOptions, bestMatch } = useApp();
  const found = Math.max(matchOptions.length, 1);
  const STAGES = [
    ...BASE_STAGES,
    {
      label: found === 1 ? '1 excellent pool found' : `${found} people who line up`,
      duration: 0,
      final: true,
    },
  ];
  const [stageIndex, setStageIndex] = useState(0);
  const cancelledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      if (cancelledRef.current) return;
      idx++;
      setStageIndex(idx);
      if (idx >= STAGES.length - 1) {
        timer = setTimeout(() => {
          if (!cancelledRef.current) onCompleteRef.current();
        }, 1200);
        return;
      }
      timer = setTimeout(advance, STAGES[idx].duration);
    };
    timer = setTimeout(advance, STAGES[0].duration);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const matches = matchOptions.slice(0, 3).map((m, i) => ({
    name: m.user.name,
    faceIndex: m.user.faceIndex,
    match: true,
    ...ORBIT[i],
    delay: 0.35 + i * 0.18,
  }));
  const taken = new Set(matches.map((m) => m.name));
  const extras = FILLERS
    .filter((f) => !taken.has(f.name))
    .slice(0, 3)
    .map((f, i) => ({
      ...f,
      match: false,
      ...ORBIT[3 + i],
      delay: 1.05 + i * 0.16,
    }));
  const people = [...matches, ...extras];
  const isComplete = stageIndex >= STAGES.length - 1;
  const preferredBest = (bestMatch ?? matchOptions[0])?.user.name ?? null;
  const bestName =
    (preferredBest && people.some((p) => p.match && p.name === preferredBest))
      ? preferredBest
      : (people.find((p) => p.match)?.name ?? null);
  const bestAngle = people.find((p) => p.name === bestName && p.match)?.angle ?? 0;

  const handleBack = () => {
    cancelledRef.current = true;
    onBack();
  };

  return (
    <div style={{
      height: '100%',
      minHeight: 0,
      background: '#F8F8F8',
      display: 'flex',
      flexDirection: 'column',
      padding: '60px 20px 16px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: '#222325', letterSpacing: '-0.8px', lineHeight: 1 }}>
          Searching<span style={{ color: '#FF6A00' }}>.</span>
        </span>
        <button
          type="button"
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
        >
          <InkIcon name="back" size={18} color="#74767E" />
          <span style={{ fontSize: 14, color: '#74767E' }}>Back</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#ffffff',
          border: 'none',
          borderRadius: 14,
          padding: '12px 14px',
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        {intent && (
          <>
            <div style={{ fontSize: 10, color: '#74767E', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none', marginBottom: 8 }}>
              Looking for
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(intent.category === 'open'
                ? [intent.activity, intent.location]
                : intent.pickup && intent.destination
                  ? [intent.activity, `From ${intent.pickup}`, `To ${intent.destination}`, `±${intent.flexibilityMinutes}m`]
                  : [intent.activity, intent.location, `±${intent.flexibilityMinutes}m`]
              ).map((label) => (
                <span key={label} style={{
                  background: '#ffffff',
                  border: '1px solid #FF6A00',
                  borderRadius: 20,
                  padding: '4px 10px',
                  fontSize: 12,
                  color: '#FF6A00',
                  fontWeight: 600,
                }}>
                  {label}
                </span>
              ))}
            </div>
          </>
        )}
        <div style={{
          marginTop: intent ? 10 : 0,
          fontSize: 12,
          color: '#74767E',
          lineHeight: 1.55,
        }}>
          <span style={{ fontWeight: 700, color: '#FF6A00' }}>Privacy first.</span>{' '}
          Your exact location is never shared until both users confirm a pool.
        </div>
      </motion.div>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
      }}>
        <div style={{
          width: SIZE,
          height: SIZE,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'relative',
            width: SIZE,
            height: SIZE,
            flexShrink: 0,
            overflow: 'visible',
          }}>
          <div style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            background: '#ffffff',
          }} />

          {RINGS.map((r, i) => (
            <div
              key={r}
              style={{
                position: 'absolute',
                left: CX - r,
                top: CX - r,
                width: r * 2,
                height: r * 2,
                borderRadius: '50%',
                border: i === 1 ? '1.5px dashed rgba(255,106,0,0.22)' : 'none',
                boxSizing: 'border-box',
              }}
            />
          ))}

          <div style={{
            position: 'absolute',
            inset: 22,
            borderRadius: '50%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}>
            <motion.div
              animate={isComplete ? { rotate: bestAngle } : { rotate: 360 }}
              transition={isComplete
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 3.4, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '100%',
                height: '100%',
                background: 'conic-gradient(from 0deg, rgba(255,106,0,0.26) 0deg, rgba(255,106,0,0.06) 42deg, transparent 88deg)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: CX,
              top: CX,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#FF6A00',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: isComplete ? 0.88 : 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            style={{
              position: 'absolute',
              left: CX,
              top: CX,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 4,
            }}
          >
            <div style={{
              borderRadius: '50%',
              padding: 0,
              background: '#fff',
              border: '1.5px solid #FF6A00',
              boxSizing: 'border-box',
            }}>
              <Avatar name={YOU.shortName} size={52} faceIndex={YOU.faceIndex} fill="transparent" />
            </div>
            <span style={{
              marginTop: 4,
              fontSize: 10,
              fontWeight: 700,
              color: '#FF6A00',
              letterSpacing: '0.02em',
            }}>
              You
            </span>
          </motion.div>

          {people.map((p) => {
            const { x, y } = polar(p.angle, p.dist);
            const isBest = isComplete && p.match && p.name === bestName;
            const dimOthers = isComplete && !isBest;
            return (
              <div
                key={p.name}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isBest ? 6 : p.match ? 3 : 2,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: dimOthers ? (p.match ? 0.42 : 0.32) : 1,
                    scale: isBest ? [1, 1.12, 1] : 1,
                  }}
                  transition={isBest
                    ? { duration: 0.55, times: [0, 0.4, 1], ease: 'easeOut' }
                    : { delay: isComplete ? 0 : p.delay, type: 'spring', stiffness: 260, damping: 16 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {isBest && (
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0.5 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 0.85, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: -4,
                        left: '50%',
                        x: '-50%',
                        width: p.size + 12,
                        height: p.size + 12,
                        borderRadius: '50%',
                        border: '1.5px solid #FF6A00',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  <div style={{
                    borderRadius: '50%',
                    padding: p.match ? 0 : 2,
                    background: '#fff',
                    border: p.match ? '1.5px solid #FF6A00' : 'none',
                    boxSizing: 'border-box',
                    boxShadow: isBest
                      ? '0 0 8px rgba(255,106,0,0.2), 0 4px 10px rgba(34,35,37,0.08)'
                      : p.match
                        ? '0 4px 10px rgba(34,35,37,0.08)'
                        : '0 4px 10px rgba(34,35,37,0.06)',
                    opacity: p.match || isBest ? 1 : 0.72,
                  }}>
                    <Avatar name={p.name} size={p.size} faceIndex={p.faceIndex} fill="transparent" />
                  </div>
                  {isBest && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.86 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        x: '-50%',
                        fontSize: 9,
                        fontWeight: 700,
                        color: '#ffffff',
                        background: '#FF6A00',
                        borderRadius: 20,
                        padding: '2px 7px',
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                      }}
                    >
                      Best
                    </motion.span>
                  )}
                  <span style={{
                    marginTop: 3,
                    fontSize: 10,
                    fontWeight: isBest || p.match ? 700 : 500,
                    color: isBest ? '#FF6A00' : p.match ? '#222325' : '#ADADAD',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                  }}>
                    {p.name}
                  </span>
                </motion.div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      <div style={{
        flexShrink: 0,
        marginTop: 12,
        background: '#ffffff',
        borderRadius: 14,
        padding: '8px 14px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        {STAGES.map((stage, i) => {
          const isActive = i === stageIndex;
          const isDone   = i < stageIndex;
          const isFinal  = !!stage.final;
          if (!isDone && !isActive) return null;
          return (
            <AnimatePresence key={i}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '8px 0',
                  borderBottom: 'none',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isFinal || isDone ? '#FF6A00' : '#F5F5F5',
                  border: isFinal || isDone ? '1px solid #FF6A00' : 'none',
                }}>
                  {isActive && !isFinal ? (
                    <InkIcon name="loader" size={14} color="#FF6A00" />
                  ) : (
                    <InkIcon name="check" size={12} color="#fff" />
                  )}
                </div>
                <span style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? (isFinal ? '#FF6A00' : '#222325') : '#ADADAD',
                }}>
                  {stage.label}
                </span>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}
