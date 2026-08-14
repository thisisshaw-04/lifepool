'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ORANGE = '#FF6A00';
const INK = '#222325';

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), 3400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={onDone}
      style={{
        minHeight: '100%',
        background: '#F8F8F8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px 80px',
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 280 180" width="280" height="180" fill="none">
        <motion.path
          d="M 12 148 C 70 132, 100 78, 140 90 C 178 102, 210 48, 268 32"
          stroke={ORANGE}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 12 38 C 72 52, 104 118, 140 90 C 176 62, 214 128, 268 148"
          stroke={INK}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.25 }}
        />

        <motion.circle
          cx="140"
          cy="90"
          r="22"
          fill="none"
          stroke={ORANGE}
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.55, 0], scale: [0.4, 1.35, 1.6] }}
          transition={{ delay: 1.55, duration: 1.1, ease: 'easeOut' }}
          style={{ transformOrigin: '140px 90px' }}
        />
        <motion.circle
          cx="140"
          cy="90"
          r="6"
          fill={ORANGE}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, type: 'spring', stiffness: 280, damping: 16 }}
        />
        <motion.circle
          cx="140"
          cy="90"
          r="2.4"
          fill="#fff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.75, type: 'spring', stiffness: 280, damping: 16 }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.45 }}
        style={{ textAlign: 'center', marginTop: 28 }}
      >
        <div style={{
          fontSize: 28,
          fontWeight: 800,
          color: INK,
          letterSpacing: '-0.9px',
          lineHeight: 1,
          marginBottom: 16,
        }}>
          lifepool<span style={{ color: ORANGE }}>.</span>
        </div>
        <p style={{
          fontSize: 18,
          fontWeight: 500,
          color: INK,
          letterSpacing: '-0.35px',
          lineHeight: 1.35,
          margin: '0 0 10px',
        }}>
          Your life already overlaps<br />with someone else&apos;s.
        </p>
        <p style={{
          fontSize: 13,
          color: '#74767E',
          lineHeight: 1.55,
          margin: 0,
          maxWidth: 260,
        }}>
          We find people already going where you&apos;re going - so you don&apos;t have to do it alone.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          marginTop: 36,
          display: 'flex',
          gap: 6,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: ORANGE, display: 'block',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
