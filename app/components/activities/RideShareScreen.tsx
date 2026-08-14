'use client';
import { useMemo, useState } from 'react';
import { InkIcon } from '@/app/components/ui/MangaIcons';

const PLACES = [
  'Bedok', 'Tampines', 'Tampines Mall', 'Tiong Bahru', 'Orchard',
  'CBD', 'Raffles Place', 'Marina Bay', 'Changi Airport', 'Jurong East',
  'Woodlands', 'Ang Mo Kio', 'Clementi', 'Bugis', 'Novena', 'Toa Payoh',
  'Punggol', 'Pasir Ris', 'Holland Village', 'HarbourFront',
];

const WHEN = [
  { id: 'now', label: 'Leaving now', phrase: 'leaving now' },
  { id: '15', label: 'In 15 min', phrase: 'in 15 minutes' },
  { id: 'tonight', label: 'Tonight', phrase: 'tonight' },
  { id: 'morning', label: 'Tomorrow morning', phrase: 'tomorrow morning' },
] as const;

type Role = 'passenger' | 'driver';

function PlaceField({
  icon,
  label,
  value,
  placeholder,
  onChange,
}: {
  icon: 'pin' | 'nav';
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const q = value.trim().toLowerCase();
  const suggestions = useMemo(() => {
    const list = q
      ? PLACES.filter((p) => p.toLowerCase().includes(q) && p.toLowerCase() !== q)
      : PLACES;
    return list.slice(0, 5);
  }, [q]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#74767E', marginBottom: 6 }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 46, padding: '0 12px',
        background: '#ffffff', border: '1px solid #E5E5E5', borderRadius: 12,
      }}>
        <InkIcon name={icon} size={16} color="#74767E" />
        <input
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 160)}
          placeholder={placeholder}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none',
            background: 'transparent', fontSize: 15, fontFamily: 'inherit', color: '#222325',
          }}
        />
      </div>
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 72, zIndex: 20,
          background: '#ffffff', border: '1px solid #E5E5E5', borderRadius: 12,
          overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {suggestions.map((place, i) => (
            <button
              key={place}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { onChange(place); setOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 12px', background: '#ffffff', border: 'none',
                borderBottom: i < suggestions.length - 1 ? '1px solid #F0F0F0' : 'none',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}
            >
              <InkIcon name="pin" size={14} color="#ADADAD" />
              <span style={{ fontSize: 14, color: '#222325' }}>{place}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RideShareScreen({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (text: string) => void;
}) {
  const [role, setRole] = useState<Role>('passenger');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [when, setWhen] = useState<(typeof WHEN)[number]['id']>('now');
  const [seats, setSeats] = useState(2);

  const ready = from.trim().length > 1 && to.trim().length > 1;

  const swap = () => {
    const a = from;
    setFrom(to);
    setTo(a);
  };

  const findRide = () => {
    if (!ready) return;
    const whenPhrase = WHEN.find((w) => w.id === when)?.phrase ?? 'leaving now';
    const seatsBit = role === 'driver' ? `, ${seats} seats free` : '';
    onSubmit(`Shared ride from ${from.trim()} to ${to.trim()} ${whenPhrase}${seatsBit}`);
  };

  return (
    <div style={{ background: '#F8F8F8', minHeight: '100%', padding: '60px 20px 24px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#222325', letterSpacing: '-0.8px', lineHeight: 1 }}>
            Ride<span style={{ color: '#FF6A00' }}>.</span>
          </span>
          <button
            type="button"
            onClick={onBack}
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
        <div style={{ fontSize: 13, color: '#74767E', marginTop: 6, lineHeight: 1.5 }}>
          Share a car if you are already going that way
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 8, marginBottom: 14,
        background: '#ffffff', borderRadius: 12, padding: 4,
      }}>
        {([
          { id: 'passenger' as const, label: 'I need a ride' },
          { id: 'driver' as const, label: 'I can drive' },
        ]).map((opt) => {
          const on = role === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setRole(opt.id)}
              style={{
                flex: 1, height: 36, borderRadius: 10, border: 'none',
                background: on ? '#222325' : 'transparent',
                color: on ? '#ffffff' : '#74767E',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div style={{
        background: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 14, position: 'relative',
      }}>
        <PlaceField
          icon="pin"
          label="From"
          value={from}
          placeholder="Where are you?"
          onChange={setFrom}
        />
        <button
          type="button"
          onClick={swap}
          aria-label="Swap from and to"
          style={{
            position: 'absolute', right: 18, top: 78, zIndex: 3,
            width: 32, height: 32, borderRadius: 16,
            background: '#F8F8F8', border: '1px solid #E5E5E5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <InkIcon name="nav" size={14} color="#222325" />
        </button>
        <div style={{ height: 12 }} />
        <PlaceField
          icon="nav"
          label="To"
          value={to}
          placeholder="Where do you want to go?"
          onChange={setTo}
        />
      </div>

      <div style={{ background: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#74767E', marginBottom: 8 }}>When</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {WHEN.map((opt) => {
            const on = when === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setWhen(opt.id)}
                style={{
                  padding: '8px 12px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 600,
                  background: on ? '#222325' : '#ffffff',
                  color: on ? '#ffffff' : '#222325',
                  border: on ? '1px solid #222325' : '1px solid #E5E5E5',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {role === 'driver' && (
        <div style={{ background: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#74767E', marginBottom: 8 }}>Seats free</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3].map((n) => {
              const on = seats === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSeats(n)}
                  style={{
                    flex: 1, height: 40, borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 600,
                    background: on ? '#222325' : '#ffffff',
                    color: on ? '#ffffff' : '#222325',
                    border: on ? '1px solid #222325' : '1px solid #E5E5E5',
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={findRide}
        disabled={!ready}
        style={{
          width: '100%', height: 48, borderRadius: 12, border: 'none',
          background: ready ? '#FF6A00' : '#E5E5E5',
          color: '#ffffff', fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
          cursor: ready ? 'pointer' : 'default',
        }}
      >
        {role === 'driver' ? 'Find riders' : 'Find a ride'}
      </button>
    </div>
  );
}
