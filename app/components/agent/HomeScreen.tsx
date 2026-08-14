'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ActivityInput } from '@/app/components/activities/ActivityInput';
import { CategoryCards, POOL_CATEGORIES } from '@/app/components/activities/CategoryCards';
import { CATEGORY_ILLUSTRATIONS, GroceryIllustration, StudyIllustration, LunchIllustration } from '@/app/components/ui/CategoryIllustrations';
import { PassiveAgentPanel } from '@/app/components/agent/PassiveAgentPanel';
import { useApp } from '@/lib/store';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { PERSONA } from '@/lib/personas';

// Colour palette matching the reference image exactly
const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

const OFFERS = [
  {
    id: 'o1',
    Illu: GroceryIllustration,
    title: 'Groceries @ Tampines Mall',
    meta: '94% match · Tonight 6 PM',
    price: PERSONA.jamie.shortName,
    expires: 'Match found · tap to confirm',
    status: 'active',
  },
];

const ORDERS = [
  {
    id: 'r1',
    Illu: StudyIllustration,
    title: 'NLB study session',
    price: PERSONA.aisha.shortName,
    status: 'Sat 2 PM',
  },
  {
    id: 'r2',
    Illu: LunchIllustration,
    title: 'Lunch around Bugis',
    price: PERSONA.mei.shortName,
    status: 'Tomorrow 12 PM',
  },
];

const CATEGORY_QUERIES: Record<string, string> = {
  commute:  'Commute to office tomorrow morning',
  errand:   'Grocery shopping at Tampines tonight 6pm',
  shopping: 'Shopping at Orchard this weekend',
  study:    'Studying at NLB Saturday',
  lunch:    'Lunch around Bugis',
  activity: 'Gym session tomorrow evening',
  movies:   'Movies at Bugis tonight',
  tourist:  'Sightseeing around Marina Bay this weekend',
  ride:     'Grab ride to Orchard tonight',
};

export function HomeScreen({
  onSearch,
  onNav,
}: {
  onSearch: (text: string) => void;
  onNav?: (screen: string) => void;
}) {
  const { focusSearch, setFocusSearch } = useApp();
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [browseAll, setBrowseAll] = useState(false);
  const offers = OFFERS.filter((o) => !dismissed[o.id]);

  useEffect(() => {
    if (!focusSearch) return;
    const t = setTimeout(() => setFocusSearch(false), 400);
    return () => clearTimeout(t);
  }, [focusSearch, setFocusSearch]);

  const pickCategory = (id: string) => {
    if (id === 'roommate') onNav?.('roommate');
    else if (id === 'ride' || id === 'commute') onNav?.('ride');
    else if (CATEGORY_QUERIES[id]) onSearch(CATEGORY_QUERIES[id]);
  };

  if (browseAll) {
    return (
      <div style={{ background: C.bg, minHeight: '100%', padding: '60px 20px 24px' }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
              All pools<span style={{ color: C.green }}>.</span>
            </span>
            <button
              type="button"
              onClick={() => setBrowseAll(false)}
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
          <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>Pick a type to start matching</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {POOL_CATEGORIES.map(({ id, label, sub }, i) => {
            const Illu = CATEGORY_ILLUSTRATIONS[id];
            return (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => pickCategory(id)}
                style={{
                  background: C.surface,
                  border: 'none',
                  borderRadius: 16,
                  overflow: 'hidden',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{
                  height: 110,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {Illu && <Illu size={88} />}
                </div>
                <div style={{ padding: '8px 12px 14px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.txt, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, color: C.txt2 }}>{sub}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      isolation: 'isolate',
      minHeight: '100%',
      paddingBottom: 24,
      overflow: 'visible',
      backgroundColor: C.bg,
      backgroundImage: 'linear-gradient(180deg, rgba(255,106,0,0.55) 0%, rgba(255,106,0,0.18) 45%, rgba(248,248,248,0) 100%)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 80px',
      backgroundPosition: 'top center',
    }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'linear-gradient(180deg, rgba(255,106,0,0.55) 0%, rgba(255,106,0,0.18) 45%, rgba(248,248,248,0) 100%)',
        }}
      />

      {/* -- Top bar: "fiverr." wordmark style -- */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '60px 20px 14px',
      }}>
        <span style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          fontSize: 28,
          fontWeight: 800,
          color: C.txt,
          letterSpacing: '-1px',
          lineHeight: 1,
        }}>
          lifepool<span style={{ color: C.green }}>.</span>
        </span>

        <button
          type="button"
          onClick={() => onNav?.('memory')}
          aria-label="Memory"
          title="Memory"
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            display: 'flex', alignItems: 'center',
          }}
        >
          <InkIcon name="brain" size={28} color="#111111" />
        </button>
      </div>

      {/* -- Search bar -- */}
      <div style={{ padding: '4px 16px 16px' }}>
        <ActivityInput onSubmit={onSearch} autoFocus={focusSearch} />
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <CategoryCards
          onSeeAll={() => setBrowseAll(true)}
          onSelect={pickCategory}
        />
      </div>

      {/* -- Agent suggestions (= "My custom offers") -- */}
      {offers.length > 0 && (
      <Section title="Agent suggestion" onSeeAll={() => onNav?.('pools')}>
        {offers.map(offer => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              gap: 12,
              padding: 14,
              background: C.surface,
              borderRadius: 14,
              marginBottom: 10,
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            {/* Thumbnail */}
            <div style={{
              width: 56, height: 56, borderRadius: 12, flexShrink: 0,
              background: '#F5F5F5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <offer.Illu size={44} />
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: C.txt, marginBottom: 2 }}>{offer.title}</div>
              <div style={{ fontSize: 12, color: C.txt2, marginBottom: 2 }}>{offer.meta}</div>
              <div style={{ fontSize: 11.5, color: C.txt3 }}>{offer.expires}</div>
              {/* Action buttons — Fiverr: "Open in Chat" + "Review" */}
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => setDismissed((prev) => ({ ...prev, [offer.id]: true }))}
                  style={{
                  flex: 1, height: 34, borderRadius: 4, boxSizing: 'border-box',
                  border: '1.5px solid #FF6A00',
                  background: '#fff', cursor: 'pointer',
                  fontSize: 12.5, fontWeight: 600, color: '#FF6A00',
                  fontFamily: 'inherit',
                }}>
                  Dismiss
                </button>
                <button
                  onClick={() => onSearch('Grocery shopping at Tampines tonight 6pm')}
                  style={{
                    flex: 1, height: 34, borderRadius: 4, boxSizing: 'border-box',
                    border: '1.5px solid #FF6A00',
                    background: '#FF6A00', cursor: 'pointer',
                    fontSize: 12.5, fontWeight: 600, color: '#fff',
                    fontFamily: 'inherit',
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </Section>
      )}

      {/* -- Active pools (= "My active orders") -- */}
      <Section title="Active pools" onSeeAll={() => onNav?.('pools')}>
        {ORDERS.map(order => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onNav?.('pools')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 12,
              background: C.surface,
              borderRadius: 14,
              marginBottom: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: '#F5F5F5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <order.Illu size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>{order.title}</div>
              <div style={{ fontSize: 12, color: C.txt2, marginTop: 1 }}>{order.price}</div>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 500, color: C.green,
            }}>
              {order.status}
            </div>
          </motion.div>
        ))}
      </Section>

      {/* -- Agent panel -- */}
      <div style={{ padding: '20px 20px 0' }}>
        <PassiveAgentPanel
          onActivate={() => onSearch('Grocery shopping at Tampines tomorrow evening around 6pm')}
          onSeeAll={() => onNav?.('pools')}
        />
      </div>
    </div>
  );
}

// Reusable section wrapper — mirrors Fiverr's "Section title + See All" pattern
function Section({
  title, onSeeAll, children,
}: {
  title: string;
  onSeeAll: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#222325' }}>{title}</span>
        <button
          onClick={onSeeAll}
          style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 500, color: '#FF6A00',
          fontFamily: 'inherit',
        }}>
          See All
        </button>
      </div>
      {children}
    </div>
  );
}
