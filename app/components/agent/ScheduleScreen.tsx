'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { useApp } from '@/lib/store';
import { Avatar } from '@/app/components/ui/Avatar';
import { CALENDAR_LABELS } from '@/app/components/ui/CalendarBrandIcons';
import { PoolDetailScreen, type PoolEntry } from '@/app/components/pools/PoolDetailScreen';
import type { Pool } from '@/types';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const WEEKDAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function shortTime(time: string) {
  return time.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+/i, '');
}

function toEntry(pool: Pool): PoolEntry {
  const confirmed = pool.status === 'confirmed';
  return {
    id: pool.id,
    person: pool.partnerName,
    age: pool.age ?? 25,
    activity: pool.activity,
    time: shortTime(pool.time),
    location: pool.location,
    score: pool.score,
    status: confirmed ? 'confirmed' : 'pending',
    color: pool.color ?? (confirmed ? C.green : C.txt2),
    detour: pool.detour ?? '+4 min',
    faceIndex: pool.faceIndex,
  };
}

function resolvePoolDate(pool: Pool, ref: Date): Date | null {
  const raw = (pool.date || '').trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const parsed = new Date(raw.slice(0, 10) + 'T12:00:00');
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  const haystack = `${raw} ${pool.time}`.toLowerCase();
  const long = WEEKDAY_FULL.findIndex((d) => haystack.includes(d.toLowerCase()));
  const short = WEEKDAY_SHORT.findIndex((d) => haystack.includes(d.toLowerCase()));
  const idx = long !== -1 ? long : short;
  if (idx === -1) return null;

  const today = startOfDay(ref);
  const result = new Date(today);
  result.setDate(today.getDate() + (idx - today.getDay()));
  return result;
}

type Cell = { date: Date; inMonth: boolean };

function monthCells(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const cells: Cell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    cells.push({ date, inMonth: date.getMonth() === month });
  }
  if (cells.slice(35).every((c) => !c.inMonth)) return cells.slice(0, 35);
  return cells;
}

export function ScheduleScreen() {
  const { pools, calendarProvider, openCalendar, scheduleItems, addScheduleItem, removeScheduleItem, updatePool } = useApp();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(() => today);
  const [adding, setAdding] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('6:00 PM');
  const [location, setLocation] = useState('');

  const active = pools.filter((p) => p.status !== 'cancelled');

  const byDay = useMemo(() => {
    const map: Record<string, Pool[]> = {};
    for (const pool of active) {
      const d = resolvePoolDate(pool, today);
      if (!d) continue;
      const key = ymd(d);
      (map[key] ??= []).push(pool);
    }
    return map;
  }, [active, today]);

  const byCal = useMemo(() => {
    if (!calendarProvider) return {} as Record<string, { title: string; time: string }[]>;
    const events = [
      { dow: 1, title: 'Studio hours', time: '9:00 AM - 6:00 PM' },
      { dow: 2, title: 'Design review', time: '11:00 AM' },
      { dow: 3, title: 'Gym', time: '7:30 AM' },
    ];
    const map: Record<string, { title: string; time: string }[]> = {};
    for (const ev of events) {
      const d = new Date(today);
      d.setDate(today.getDate() + (ev.dow - today.getDay()));
      const key = ymd(d);
      (map[key] ??= []).push({ title: ev.title, time: ev.time });
    }
    return map;
  }, [calendarProvider, today]);

  const byMine = useMemo(() => {
    const map: Record<string, typeof scheduleItems> = {};
    for (const item of scheduleItems) {
      (map[item.date] ??= []).push(item);
    }
    return map;
  }, [scheduleItems]);

  const cells = monthCells(cursor.getFullYear(), cursor.getMonth());
  const selectedKey = ymd(selected);
  const dayPools = byDay[selectedKey] ?? [];
  const dayCal = byCal[selectedKey] ?? [];
  const dayMine = byMine[selectedKey] ?? [];
  const dayCount = dayPools.length + dayCal.length + dayMine.length;
  const selectedLabel = `${WEEKDAY_FULL[selected.getDay()]}, ${selected.getDate()} ${MONTHS[selected.getMonth()].slice(0, 3)}`;
  const calName = calendarProvider ? CALENDAR_LABELS[calendarProvider] : null;

  const shiftMonth = (delta: number) => {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1);
    setCursor(next);
    if (selected.getMonth() !== next.getMonth() || selected.getFullYear() !== next.getFullYear()) {
      const keep = selected.getDate();
      const last = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
      setSelected(new Date(next.getFullYear(), next.getMonth(), Math.min(keep, last)));
    }
  };

  const openAdd = () => {
    setTitle('');
    setTime('6:00 PM');
    setLocation('');
    setAdding(true);
  };

  const saveItem = () => {
    const name = title.trim();
    if (!name) return;
    addScheduleItem({
      id: `s-${Date.now()}`,
      title: name,
      date: selectedKey,
      time: time.trim() || 'All day',
      location: location.trim() || undefined,
    });
    setAdding(false);
  };

  const selectedPool = pools.find((p) => p.id === selectedId && p.status !== 'cancelled') ?? null;
  if (selectedPool) {
    return (
      <PoolDetailScreen
        pool={toEntry(selectedPool)}
        onBack={() => setSelectedId(null)}
        onStatusChange={(status) => {
          updatePool(selectedPool.id, {
            status,
            color: status === 'confirmed' ? C.green : C.txt2,
          });
          if (status === 'cancelled') setSelectedId(null);
        }}
      />
    );
  }

  return (
    <div style={{ height: '100%', minHeight: 0, background: C.bg, padding: '60px 16px 12px', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto', position: 'relative', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
          Schedule<span style={{ color: C.green }}>.</span>
        </span>
        <div style={{ fontSize: 13, color: C.txt2, marginTop: 4 }}>
          {calName ? `Synced with ${calName}` : `${active.length} upcoming ${active.length === 1 ? 'pool' : 'pools'}`}
        </div>
      </div>

      {calendarProvider ? (
        <button
          type="button"
          onClick={() => openCalendar('schedule')}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: 12,
            background: C.surface,
            border: 'none',
            borderRadius: 14,
            padding: '8px 12px',
            marginBottom: 8,
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: '#F5F5F5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <InkIcon name="calendar" size={18} color={C.txt} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{calName}</div>
            <div style={{ fontSize: 11, color: C.txt2, marginTop: 2 }}>
              Agent can see free and busy time
            </div>
          </div>
          <InkIcon name="chevron" size={16} color={C.txt3} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => openCalendar('schedule')}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', gap: 12,
            background: C.surface,
            border: 'none',
            borderRadius: 14,
            padding: '10px 12px',
            marginBottom: 8,
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10, flex: '0 0 36px',
            background: '#F0F0F0',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <InkIcon name="calendar" size={22} color="#111111" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>Connect your calendar</div>
            <div style={{ fontSize: 11, color: C.txt2, marginTop: 2, lineHeight: 1.45 }}>
              Connect a calendar so the agent can see your week
            </div>
            <div style={{ fontSize: 11, fontWeight: 500, color: C.green, marginTop: 2 }}>
              Google, Outlook, Apple, or this phone
            </div>
          </div>
          <InkIcon name="chevron" size={16} color={C.txt3} />
        </button>
      )}

      <div style={{
        background: C.surface,
        border: 'none',
        borderRadius: 16,
        padding: '6px 6px 4px',
        marginBottom: 8,
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 4px 6px',
        }}>
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: '#F5F5F5', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Previous month"
          >
            <InkIcon name="back" size={14} color={C.txt} />
          </button>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.txt, letterSpacing: '-0.3px' }}>
            {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
          </div>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: '#F5F5F5', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Next month"
          >
            <InkIcon name="chevron" size={16} color={C.txt} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: 2,
        }}>
          {WEEKDAYS.map((d, i) => (
            <div key={`${d}-${i}`} style={{
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: i === 0 || i === 6 ? C.txt3 : C.txt2,
              letterSpacing: '0.04em',
              paddingBottom: 2,
            }}>
              {d}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 0 }}>
          {cells.map((cell) => {
            const key = ymd(cell.date);
            const isSelected = sameDay(cell.date, selected);
            const isToday = sameDay(cell.date, today);
            const count = byDay[key]?.length ?? 0;
            const mineCount = byMine[key]?.length ?? 0;
            const calCount = byCal[key]?.length ?? 0;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelected(cell.date);
                  if (!cell.inMonth) {
                    setCursor(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1));
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '1px 0 2px',
                  fontFamily: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: isSelected || isToday ? 700 : 500,
                  color: isSelected
                    ? '#fff'
                    : !cell.inMonth
                      ? C.txt3
                      : C.txt,
                  background: isSelected ? C.green : 'transparent',
                  boxShadow: !isSelected && isToday ? `inset 0 0 0 1.5px ${C.green}` : 'none',
                }}>
                  {cell.date.getDate()}
                </span>
                <span style={{ display: 'flex', gap: 2, height: 4, alignItems: 'center' }}>
                  {count > 0 && [0, 1, 2].slice(0, Math.min(count, 3)).map((n) => (
                    <span
                      key={`p-${n}`}
                      style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: C.green,
                        opacity: isSelected ? 0.85 : 1,
                      }}
                    />
                  ))}
                  {mineCount > 0 && (
                    <span
                      style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: C.txt,
                      }}
                    />
                  )}
                  {calCount > 0 && (
                    <span
                      style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: isSelected ? C.txt3 : '#C8C8C8',
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 8, flexShrink: 0, gap: 8,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.txt }}>{selectedLabel}</div>
          <div style={{ fontSize: 12, color: C.txt2, marginTop: 2 }}>
            {dayCount === 0
              ? 'Free'
              : [
                  dayPools.length ? `${dayPools.length} ${dayPools.length === 1 ? 'pool' : 'pools'}` : '',
                  dayMine.length ? `${dayMine.length} added` : '',
                  dayCal.length ? `${dayCal.length} from calendar` : '',
                ].filter(Boolean).join(' · ')}
          </div>
        </div>
        <button
          type="button"
          onClick={openAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: C.green, border: 'none', color: '#fff',
            borderRadius: 20, padding: '8px 12px',
            fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', flexShrink: 0,
          }}
        >
          <InkIcon name="plus" size={16} color="#fff" />
          Add
        </button>
      </div>

      <div style={{ paddingBottom: 8 }}>
      {dayCount === 0 ? (
        <div style={{
          background: C.surface, border: 'none',
          borderRadius: 14, padding: '20px 16px', textAlign: 'center',
          fontSize: 13, color: C.txt2, lineHeight: 1.6,
        }}>
          Nothing on this day yet.
          <button
            type="button"
            onClick={openAdd}
            style={{
              display: 'block', margin: '12px auto 0',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, color: C.green, fontFamily: 'inherit',
            }}
          >
            Add something
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {dayMine.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: C.surface,
                border: 'none',
                borderRadius: 14, padding: '10px 12px',
                overflow: 'hidden', flexShrink: 0,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: '#F5F5F5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <InkIcon name="clock" size={18} color={C.txt} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>{item.title}</div>
                <div style={{ fontSize: 11, color: C.txt2, marginTop: 3 }}>{item.time}{item.location ? ` · ${item.location}` : ''}</div>
                <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>Added by you</div>
              </div>
              <button
                type="button"
                onClick={() => removeScheduleItem(item.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                aria-label="Remove"
              >
                <InkIcon name="x" size={16} color={C.txt3} />
              </button>
            </div>
          ))}
          {dayCal.map((ev) => (
            <div
              key={ev.title}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: C.surface,
                border: 'none',
                borderRadius: 14, padding: '10px 12px',
                overflow: 'hidden', flexShrink: 0,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: '#F5F5F5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <InkIcon name="calendar" size={18} color={C.txt3} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: C.txt2, marginTop: 3 }}>{ev.time}</div>
                <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>From {calName}</div>
              </div>
            </div>
          ))}
          {dayPools.map((pool) => (
              <div
                key={pool.id}
                style={{
                  background: C.surface,
                  border: pool.status === 'confirmed' ? '1px solid #FF6A00' : 'none',
                  borderRadius: 14,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setSelectedId(pool.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'none',
                    border: 'none',
                    borderRadius: 0,
                    padding: '10px 12px',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                    width: '100%',
                  }}
                >
                  <Avatar name={pool.partnerName} size={36} faceIndex={pool.faceIndex} online={pool.status === 'confirmed'} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.txt, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pool.activity}
                    </div>
                    <div style={{ fontSize: 11, color: C.txt2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {shortTime(pool.time)} · {pool.location}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, flexShrink: 0,
                    color: pool.status === 'confirmed' ? '#ffffff' : C.txt2,
                    background: pool.status === 'confirmed' ? C.green : '#F5F5F5',
                    border: pool.status === 'confirmed' ? `1px solid ${C.green}` : 'none',
                    borderRadius: 20, padding: '3px 8px',
                  }}>
                    {pool.status === 'confirmed' ? 'Confirmed' : 'Waiting'}
                  </span>
                  <InkIcon name="chevron" size={14} color={C.txt3} />
                </motion.button>
              </div>
          ))}
        </div>
      )}
      </div>

      {adding && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 20,
            background: 'rgba(34,35,37,0.35)',
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setAdding(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', background: '#fff',
              borderRadius: '18px 18px 0 0',
              padding: '18px 20px 24px',
            }}
          >
            <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 14px' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: C.txt, marginBottom: 4 }}>
              Add to {MONTHS[selected.getMonth()].slice(0, 3)} {selected.getDate()}
            </div>
            <div style={{ fontSize: 12, color: C.txt2, marginBottom: 14 }}>
              Something you were already planning to do.
            </div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.txt2, marginBottom: 6, letterSpacing: '0.04em' }}>WHAT</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Groceries, gym, study..."
              style={{
                width: '100%', boxSizing: 'border-box', height: 42, borderRadius: 12,
                border: 'none', background: '#F5F5F5',
                padding: '0 12px', fontSize: 14, fontFamily: 'inherit', color: C.txt, outline: 'none', marginBottom: 10,
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.txt2, marginBottom: 6, letterSpacing: '0.04em' }}>TIME</label>
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="6:00 PM"
                  style={{
                    width: '100%', boxSizing: 'border-box', height: 42, borderRadius: 12,
                    border: 'none', background: '#F5F5F5',
                    padding: '0 12px', fontSize: 14, fontFamily: 'inherit', color: C.txt, outline: 'none',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.txt2, marginBottom: 6, letterSpacing: '0.04em' }}>WHERE</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Optional"
                  style={{
                    width: '100%', boxSizing: 'border-box', height: 42, borderRadius: 12,
                    border: 'none', background: '#F5F5F5',
                    padding: '0 12px', fontSize: 14, fontFamily: 'inherit', color: C.txt, outline: 'none',
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={saveItem}
              disabled={!title.trim()}
              style={{
                width: '100%', marginTop: 14, height: 46, borderRadius: 14, border: 'none',
                background: title.trim() ? C.green : C.border,
                color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                cursor: title.trim() ? 'pointer' : 'default',
              }}
            >
              Add to schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
