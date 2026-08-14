'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`bg-white rounded-3xl shadow-sm ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'orange' | 'blue' | 'green' | 'stone';
}

const BADGE_VARIANTS = {
  orange: 'bg-[#FF6A00] text-white',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  stone: 'bg-stone-50 text-stone-500',
};

export function Badge({ children, variant = 'stone' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${BADGE_VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
