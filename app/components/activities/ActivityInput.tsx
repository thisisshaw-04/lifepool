'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { OPEN_SEARCH_QUERY } from '@/lib/intentParser';

const PROMPTS = [
  'Going to IKEA tomorrow',
  'Studying at NLB Saturday',
  'Groceries after work',
  'Lunch around Bugis',
  'Heading to the concert',
];

export function ActivityInput({ onSubmit, autoFocus }: { onSubmit: (text: string) => void; autoFocus?: boolean }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = () => { if (value.trim()) onSubmit(value.trim()); };
  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div>
      {/* Search pill — Fiverr: grey fill, NO border, rounded-full, icon left */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#ffffff',
        borderRadius: 24,
        height: 44,
        padding: '0 14px',
        border: focused ? '1.5px solid #FF6A00' : 'none',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.15s',
      }}>
        <button
          type="button"
          onClick={() => {
            if (value.trim()) handleSubmit();
            else onSubmit(OPEN_SEARCH_QUERY);
          }}
          aria-label="Search"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6" stroke="#FF6A00" strokeWidth="2.1" />
            <circle cx="10.5" cy="10.5" r="1.45" fill="#FF6A00" />
            <path d="M15 15 L19.4 19.4" stroke="#FF6A00" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKey}
          placeholder="What are you already doing?"
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 14, color: '#222325', fontFamily: 'inherit', fontWeight: 400,
          }}
        />

        <AnimatePresence>
          {value.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              style={{ display: 'flex', gap: 6, alignItems: 'center' }}
            >
              <button
                onClick={() => setValue('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}
              >
                <InkIcon name="x" size={14} color="#74767E" />
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={handleSubmit}
                style={{
                  background: '#FF6A00', border: 'none', cursor: 'pointer',
                  borderRadius: 20, padding: '5px 14px',
                  fontSize: 12.5, fontWeight: 600, color: '#fff', fontFamily: 'inherit',
                }}
              >
                Find
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prompt chips — small horizontal scroll below search */}
      <div style={{
        display: 'flex', gap: 7, marginTop: 10,
        overflowX: 'auto', paddingBottom: 2,
        marginLeft: -20, marginRight: -20,
        paddingLeft: 20, paddingRight: 20,
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      } as React.CSSProperties}>
        {PROMPTS.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setValue(p); onSubmit(p); }}
            style={{
              flexShrink: 0,
              background: '#ffffff',
              border: 'none',
              borderRadius: 20,
              padding: '5px 12px',
              fontSize: 12,
              color: '#74767E',
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {p}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
