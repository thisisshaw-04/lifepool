'use client';
import { motion } from 'framer-motion';

export function OrbitalLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Outer orbit glow */}
      <circle cx="18" cy="24" r="11" stroke="#ff5533" strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="30" cy="24" r="11" stroke="#4d9fff" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Intersection fill */}
      <path
        d="M24 15.5 C26.5 18 27.5 21 27.5 24 C27.5 27 26.5 30 24 32.5 C21.5 30 20.5 27 20.5 24 C20.5 21 21.5 18 24 15.5Z"
        fill="url(#intersect)"
        fillOpacity="0.7"
      />

      {/* Left dot */}
      <circle cx="18" cy="24" r="3" fill="#ff5533" />
      {/* Right dot */}
      <circle cx="30" cy="24" r="3" fill="#4d9fff" />

      <defs>
        <linearGradient id="intersect" x1="24" y1="15" x2="24" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff7755" />
          <stop offset="1" stopColor="#6699ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TrajectoryHero() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 220, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 375 220"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        fill="none"
      >
        {/* Grid lines */}
        {[40, 80, 120, 160, 200].map(y => (
          <line key={y} x1="0" y1={y} x2="375" y2={y} stroke="#d8d8d4" strokeWidth="1" />
        ))}
        {[75, 150, 225, 300].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#d8d8d4" strokeWidth="1" />
        ))}

        {/* Tanisha path — warm orange */}
        <motion.path
          d="M -20 180 C 60 160, 100 100, 190 90 C 250 82, 290 95, 400 70"
          stroke="#ff5533"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* Jamie path — electric blue */}
        <motion.path
          d="M -20 140 C 80 130, 130 110, 190 105 C 240 98, 280 120, 400 130"
          stroke="#4d9fff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Intersection glow */}
        <motion.circle
          cx="190"
          cy="97"
          r="18"
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0.5], scale: [0.5, 1.2, 1] }}
          transition={{ delay: 2, duration: 0.8 }}
        />
        <motion.circle
          cx="190"
          cy="97"
          r="5"
          fill="#1a1a18"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.4, type: 'spring' }}
        />

        {/* Tanisha dot */}
        <motion.circle
          cx="190"
          cy="90"
          r="4"
          fill="#ff5533"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
        />

        {/* Jamie dot */}
        <motion.circle
          cx="190"
          cy="105"
          r="4"
          fill="#4d9fff"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />

        {/* Label */}
        <motion.text
          x="205"
          y="93"
          fill="#ff5533"
          fontSize="9"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          You
        </motion.text>
        <motion.text
          x="205"
          y="110"
          fill="#4d9fff"
          fontSize="9"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          Jamie
        </motion.text>

        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff5533" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
