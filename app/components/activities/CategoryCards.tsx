'use client';
import { motion } from 'framer-motion';
import { CATEGORY_ILLUSTRATIONS } from '@/app/components/ui/CategoryIllustrations';

export const POOL_CATEGORIES = [
  { id: 'commute',  label: 'Commute',   sub: 'Same direction'    },
  { id: 'errand',   label: 'Grocery',   sub: 'Groceries & shops' },
  { id: 'shopping', label: 'Shopping',  sub: 'Malls & retail'    },
  { id: 'study',    label: 'Study',     sub: 'Libraries & cafés' },
  { id: 'lunch',    label: 'Lunch',     sub: 'Same area'         },
  { id: 'activity', label: 'Activity',  sub: 'Gym and sports'    },
  { id: 'movies',   label: 'Movies',    sub: 'Cinema nights'     },
  { id: 'tourist',  label: 'Touristy',  sub: 'Sights & walks'    },
  { id: 'ride',     label: 'Ride',      sub: 'Car share'         },
  { id: 'roommate', label: 'Roommate',  sub: 'Find a flatmate'   },
];

export function CategoryCards({ onSelect, onSeeAll }: { onSelect?: (id: string) => void; onSeeAll?: () => void }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#222325' }}>Explore pools</span>
        <button
          onClick={() => onSeeAll?.()}
          style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 500, color: '#FF6A00', fontFamily: 'inherit',
        }}>
          See All
        </button>
      </div>

      <div style={{
        display: 'flex', gap: 12,
        overflowX: 'auto', paddingBottom: 4,
        marginLeft: -20, marginRight: -20,
        paddingLeft: 20, paddingRight: 20,
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      } as React.CSSProperties}>
        {POOL_CATEGORIES.map(({ id, label, sub }, i) => {
          const Illu = CATEGORY_ILLUSTRATIONS[id];
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect?.(id)}
              style={{
                flexShrink: 0, width: 136, cursor: 'pointer',
                background: '#ffffff', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{
                width: 136, height: 100,
                background: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 0,
              }}>
                {Illu && <Illu size={88} />}
              </div>

              <div style={{ padding: '8px 10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#222325', lineHeight: 1.3, marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontSize: 11.5, color: '#74767E' }}>{sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
