'use client';
import Image from 'next/image';
import { ALL_FACES, getFaceIndex } from './MangaAvatars';

const FILL = {
  grey: '#F0F0F0',
  white: '#ffffff',
  transparent: 'transparent',
} as const;

export function Avatar({
  name,
  size = 40,
  verified,
  online,
  faceIndex,
  imageSrc,
  fill = 'grey',
}: {
  name: string;
  size?: number;
  verified?: boolean;
  online?: boolean;
  faceIndex?: number;
  imageSrc?: string;
  fill?: keyof typeof FILL;
}) {
  const FaceComponent = ALL_FACES[faceIndex !== undefined ? faceIndex % ALL_FACES.length : getFaceIndex(name)];

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: FILL[fill],
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={size}
            height={size}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <FaceComponent size={size} />
        )}
      </div>

      {/* Verified badge */}
      {verified && (
        <div style={{
          position: 'absolute', bottom: -1, right: -1,
          width: size * 0.32, height: size * 0.32, borderRadius: '50%',
          background: '#FF6A00', border: '1.5px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={size * 0.18} height={size * 0.18} viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Online dot */}
      {online && (
        <div style={{
          position: 'absolute', top: 1, right: 1,
          width: size * 0.22, height: size * 0.22, borderRadius: '50%',
          background: '#FF6A00', border: '1.5px solid #fff',
        }} />
      )}
    </div>
  );
}
