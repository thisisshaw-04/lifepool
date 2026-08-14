'use client';
import { InkIcon } from '@/app/components/ui/MangaIcons';

export const CALENDAR_LOGOS: Record<string, string> = {
  google:  '/brands/google-calendar.png',
  outlook: '/brands/outlook.png',
  apple:   '/brands/apple-calendar.png',
};

export const CALENDAR_LABELS: Record<string, string> = {
  google: 'Google Calendar',
  outlook: 'Outlook',
  apple: 'Apple Calendar',
  phone: 'Phone calendar',
};

export function CalendarLogo({ id, size = 40 }: { id: string; size?: number }) {
  if (id === 'phone') {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          background: '#F0F0F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InkIcon name="calendar" size={Math.round(size * 0.55)} color="#222325" />
      </div>
    );
  }

  const src = CALENDAR_LOGOS[id];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={CALENDAR_LABELS[id] ?? ''}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}
