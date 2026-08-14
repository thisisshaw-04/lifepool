import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { PhoneFrame } from '@/app/components/ui/PhoneFrame';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LifePool — Your life already overlaps with someone else\'s',
  description: 'AI agent that finds opportunities to share everyday activities you were already doing separately.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={workSans.variable}>
      <body style={{ margin: 0, padding: 0, background: '#d6d2cc', fontFamily: 'var(--font-work-sans), sans-serif' }}>
        <AppProvider>
          <PhoneFrame>{children}</PhoneFrame>
        </AppProvider>
      </body>
    </html>
  );
}
