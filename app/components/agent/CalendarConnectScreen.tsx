'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { useApp } from '@/lib/store';
import type { CalendarProvider } from '@/types';
import { CalendarLogo, CALENDAR_LABELS } from '@/app/components/ui/CalendarBrandIcons';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

const PROVIDERS: { id: CalendarProvider; name: string; sub: string }[] = [
  { id: 'google',  name: 'Google Calendar', sub: 'Gmail and Google accounts' },
  { id: 'outlook', name: 'Outlook',         sub: 'Microsoft 365 and Hotmail' },
  { id: 'apple',   name: 'Apple Calendar',  sub: 'iCloud and iPhone' },
  { id: 'phone',   name: 'Phone calendar',  sub: 'Samsung, Pixel, and this device' },
];

export function CalendarConnectScreen() {
  const { calendarProvider, setCalendarProvider, calendarReturn, setScreen } = useApp();
  const [busy, setBusy] = useState<CalendarProvider | null>(null);

  const connect = (id: CalendarProvider) => {
    if (busy) return;
    setBusy(id);
    window.setTimeout(() => {
      setCalendarProvider(id);
      setBusy(null);
    }, 1400);
  };

  const connected = calendarProvider && !busy;

  return (
    <div style={{ minHeight: '100%', background: C.bg, padding: '60px 20px 24px' }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
            Calendar<span style={{ color: C.green }}>.</span>
          </span>
          <button
            type="button"
            onClick={() => setScreen(calendarReturn)}
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
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 8, lineHeight: 1.55, maxWidth: 320 }}>
          The agent only pools around things you were already doing. Connect a calendar so it can see free and busy time.
        </div>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 8, lineHeight: 1.55, maxWidth: 320 }}>
          <span style={{ fontWeight: 600, color: C.green }}>Busy or free only.</span>
          {' '}Event titles stay private until you confirm a pool.
        </div>
      </div>

      {connected ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.surface,
            border: '1px solid rgba(255,106,0,0.25)',
            borderRadius: 16,
            padding: 18,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: '#FF6A00',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <InkIcon name="check" size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.txt }}>Connected</div>
              <div style={{ fontSize: 12, color: C.txt2, marginTop: 2 }}>{CALENDAR_LABELS[calendarProvider]}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.txt2, lineHeight: 1.55, marginBottom: 14 }}>
            Your agent can now scan this week for overlaps without you typing every plan.
          </div>
          <button
            type="button"
            onClick={() => setScreen('schedule')}
            style={{
              width: '100%', border: 'none', cursor: 'pointer',
              background: C.green, color: '#fff',
              borderRadius: 12, padding: '12px 16px',
              fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
            }}
          >
            View schedule
          </button>
          <button
            type="button"
            onClick={() => setCalendarProvider(null)}
            style={{
              width: '100%', border: 'none', cursor: 'pointer',
              background: 'none', color: C.txt3,
              padding: '12px 16px 0',
              fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
            }}
          >
            Disconnect
          </button>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROVIDERS.map((p) => {
            const loading = busy === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => connect(p.id)}
                disabled={!!busy}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', textAlign: 'left',
                  background: C.surface,
                  border: loading ? '1px solid rgba(255,106,0,0.35)' : 'none',
                  borderRadius: 14,
                  padding: '14px 16px',
                  cursor: busy ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  opacity: busy && !loading ? 0.5 : 1,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  overflow: 'hidden', flexShrink: 0,
                  background: '#fff',
                }}>
                  <CalendarLogo id={p.id} size={40} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: C.txt3, marginTop: 2 }}>
                    {loading ? 'Connecting...' : p.sub}
                  </div>
                </div>
                {loading
                  ? <InkIcon name="loader" size={18} color={C.green} />
                  : <InkIcon name="chevron" size={16} color={C.txt3} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
