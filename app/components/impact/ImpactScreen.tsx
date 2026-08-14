'use client';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/store';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

export function ImpactScreen() {
  const { impact } = useApp();
  const STATS = [
    { value: String(impact.poolsCompleted),           label: 'Activities pooled',       color: C.green      },
    { value: `${impact.hoursWithOthers}h`,            label: 'Spent with others',       color: '#4D9FFF'    },
    { value: `${impact.kmAvoided}km`,                 label: 'Duplicate trips avoided', color: C.green      },
    { value: `$${impact.moneySaved}`,                 label: 'Transport saved',         color: '#FFB800'    },
    { value: String(impact.peoplemet),                label: 'People met',              color: C.txt        },
    { value: `${impact.successRate}%`,                label: 'Successful match rate',  color: '#4D9FFF'    },
  ];
  const monthTotal = impact.soloThisMonth + impact.pooledThisMonth;
  const pooledPct = monthTotal ? (impact.pooledThisMonth / monthTotal) * 100 : 0;
  return (
    <div style={{ minHeight: '100%', background: C.bg, padding: '60px 20px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
          Impact<span style={{ color: C.green }}>.</span>
        </span>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>Your contribution so far</div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {STATS.map(({ value, label, color }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
            style={{
              background: C.surface,
              border: 'none',
              borderRadius: 14,
              padding: '18px 16px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
              {value}
            </div>
            <div style={{ fontSize: 11, color: C.txt2, lineHeight: 1.4 }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Conversion bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ background: C.surface, border: 'none', borderRadius: 16, padding: '20px', marginBottom: 12 }}
      >
        <div style={{ fontSize: 11, color: C.txt3, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
          This month
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: C.txt2 }}>{impact.soloThisMonth} solo</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.green }}>{impact.pooledThisMonth} pooled</span>
        </div>
        <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pooledPct}%` }}
            transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: C.green, borderRadius: 4 }}
          />
        </div>
        <div style={{ fontSize: 12, color: C.txt2, marginTop: 8 }}>
          <span style={{ color: C.green, fontWeight: 600 }}>{Math.round(pooledPct)}%</span> of solo activities converted to pools
        </div>
      </motion.div>

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ background: C.surface, border: 'none', borderRadius: 16, padding: '20px' }}
      >
        <div style={{ fontSize: 11, color: C.txt3, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
          Product KPIs
        </div>
        {[
          { label: 'Solo to pooled rate',      value: `${Math.round(pooledPct)}%` },
          { label: 'Avg extra travel time',    value: '4.1 min' },
          { label: 'Repeat pooling rate',      value: '58%'    },
          { label: 'Avg social interaction',   value: '37 min' },
          { label: 'Journeys deduplicated',    value: `${impact.kmAvoided} km` },
        ].map(({ label, value }, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '9px 0',
          }}>
            <span style={{ fontSize: 12, color: C.txt2 }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
