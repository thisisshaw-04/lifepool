'use client';

import { useEffect, useState } from 'react';
import { InkIcon } from '@/app/components/ui/MangaIcons';
import { Avatar } from '@/app/components/ui/Avatar';
import { useApp } from '@/lib/store';
import { YOU } from '@/lib/personas';
import type { CircleInvite, CircleKind } from '@/types';

const C = {
  bg:      '#F8F8F8',
  surface: '#ffffff',
  border:  '#E5E5E5',
  txt:     '#222325',
  txt2:    '#74767E',
  txt3:    '#ADADAD',
  green:   '#FF6A00',
};

function inviteUrl(code: string) {
  return `lifepool.app/join/${code}`;
}

function inviteHref(code: string) {
  return `https://${inviteUrl(code)}`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function KindPill({
  id,
  label,
  selected,
  onSelect,
}: {
  id: CircleKind;
  label: string;
  selected: boolean;
  onSelect: (id: CircleKind) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      style={{
        flex: 1,
        height: 42,
        borderRadius: 12,
        border: selected ? '1.5px solid #FF6A00' : 'none',
        background: selected ? 'rgba(255,106,0,0.08)' : '#F5F5F5',
        color: selected ? C.green : C.txt,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <InkIcon name={id === 'family' ? 'family' : 'users'} size={16} color={selected ? C.green : C.txt} />
      {label}
    </button>
  );
}

export function CircleScreen() {
  const {
    setScreen,
    circleMembers,
    circleInvites,
    addCircleInvite,
    revokeCircleInvite,
    removeCircleMember,
    openInvitePreview,
  } = useApp();

  const [composing, setComposing] = useState(false);
  const [created, setCreated] = useState<CircleInvite | null>(null);
  const [kind, setKind] = useState<CircleKind>('friend');
  const [label, setLabel] = useState('');
  const [copied, setCopied] = useState(false);

  const openCompose = () => {
    setKind('friend');
    setLabel('');
    setCreated(null);
    setCopied(false);
    setComposing(true);
  };

  const createInvite = () => {
    const invite = addCircleInvite(kind, label);
    setComposing(false);
    setCreated(invite);
    setCopied(false);
  };

  const copyLink = async (invite: CircleInvite) => {
    const ok = await copyText(inviteHref(invite.code));
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  const shareLink = async (invite: CircleInvite) => {
    const url = inviteHref(invite.code);
    const text = `Join my LifePool circle as ${invite.kind}: ${url}`;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: 'LifePool invite', text, url });
        return;
      } catch {
        // user cancelled or share unavailable
      }
    }
    copyLink(invite);
  };

  const sheetInvite = created;

  return (
    <div style={{ position: 'relative', height: '100%', minHeight: '100%', background: C.bg, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 20px 24px' }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.8px', lineHeight: 1 }}>
              Circle<span style={{ color: C.green }}>.</span>
            </span>
            <button
              type="button"
              onClick={() => setScreen('profile')}
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
            Invite family and friends you already trust. They can pool with you even when women-only or verified-only is on.
          </div>
        </div>

        <button
          type="button"
          onClick={openCompose}
          style={{
            width: '100%',
            height: 46,
            borderRadius: 14,
            border: 'none',
            background: C.green,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 18,
          }}
        >
          <InkIcon name="plus" size={16} color="#fff" />
          Invite someone
        </button>

        <div style={{ fontSize: 11, fontWeight: 600, color: C.txt2, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          Trusted · {circleMembers.length}
        </div>
        <div style={{ background: C.surface, border: 'none', borderRadius: 16, overflow: 'hidden', marginBottom: 18 }}>
          {circleMembers.length === 0 && (
            <div style={{ padding: '18px 16px', fontSize: 13, color: C.txt3 }}>
              No one in your circle yet. Send a link to add them.
            </div>
          )}
          {circleMembers.map((member) => (
            <div
              key={member.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
              }}
            >
              <Avatar name={member.name} size={40} faceIndex={member.faceIndex} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>{member.name}</div>
                <div style={{ fontSize: 11, color: C.txt3, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <InkIcon name={member.kind === 'family' ? 'family' : 'users'} size={12} color={C.txt3} />
                  {member.kind === 'family' ? 'Family' : 'Friend'}
                  {member.neighbourhood ? ` · ${member.neighbourhood}` : ''}
                </div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${member.name}`}
                onClick={() => removeCircleMember(member.id)}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <InkIcon name="x" size={14} color={C.txt3} />
              </button>
            </div>
          ))}
        </div>

        {circleInvites.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.txt2, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Pending invites · {circleInvites.length}
            </div>
            <div style={{ background: C.surface, border: 'none', borderRadius: 16, overflow: 'hidden' }}>
              {circleInvites.map((invite) => (
                <div
                  key={invite.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 14px',
                    borderTop: 'none',
                  }}
                >
                  <Avatar name={invite.label} size={40} faceIndex={invite.faceIndex} />
                  <button
                    type="button"
                    onClick={() => openInvitePreview(invite.id)}
                    style={{
                      flex: 1, minWidth: 0, background: 'none', border: 'none',
                      padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>{invite.label}</div>
                    <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>
                      {invite.kind === 'family' ? 'Family' : 'Friend'} · {invite.code} · {invite.created}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => revokeCircleInvite(invite.id)}
                    style={{
                      fontSize: 11, fontWeight: 600, color: C.txt2,
                      background: '#F5F5F5', border: 'none',
                      borderRadius: 20, padding: '4px 10px',
                      cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
                    }}
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.txt3, marginTop: 10, lineHeight: 1.5 }}>
              Tap a pending invite to see what they see.
            </div>
          </>
        )}
      </div>

      {(composing || sheetInvite) && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 20,
            background: 'rgba(34,35,37,0.35)',
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => { setComposing(false); setCreated(null); }}
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

            {composing && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.txt, marginBottom: 4 }}>
                  Create invite link
                </div>
                <div style={{ fontSize: 12, color: C.txt2, marginBottom: 14, lineHeight: 1.5 }}>
                  They join as someone you already know. No public matching.
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.txt2, letterSpacing: '0.04em', marginBottom: 6 }}>
                  THEY ARE
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <KindPill id="family" label="Family" selected={kind === 'family'} onSelect={setKind} />
                  <KindPill id="friend" label="Friend" selected={kind === 'friend'} onSelect={setKind} />
                </div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.txt2, marginBottom: 6, letterSpacing: '0.04em' }}>
                  NAME (OPTIONAL)
                </label>
                <input
                  autoFocus
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder={kind === 'family' ? 'Mum, Amara...' : 'Jamie, Mei...'}
                  style={{
                    width: '100%', boxSizing: 'border-box', height: 42, borderRadius: 12,
                    border: 'none', background: '#F5F5F5',
                    padding: '0 12px', fontSize: 14, fontFamily: 'inherit', color: C.txt, outline: 'none', marginBottom: 14,
                  }}
                />
                <button
                  type="button"
                  onClick={createInvite}
                  style={{
                    width: '100%', height: 46, borderRadius: 14, border: 'none',
                    background: C.green, color: '#fff', fontSize: 14, fontWeight: 700,
                    fontFamily: 'inherit', cursor: 'pointer',
                  }}
                >
                  Generate link
                </button>
              </>
            )}

            {sheetInvite && !composing && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.txt, marginBottom: 4 }}>
                  Link ready
                </div>
                <div style={{ fontSize: 12, color: C.txt2, marginBottom: 14, lineHeight: 1.5 }}>
                  Send this to {sheetInvite.label}. It adds them as {sheetInvite.kind}.
                </div>
                <div style={{
                  background: '#F5F5F5',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 14px',
                  marginBottom: 12,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.txt3, letterSpacing: '0.06em', marginBottom: 4 }}>
                    CODE
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.txt, letterSpacing: '0.04em' }}>
                    {sheetInvite.code}
                  </div>
                  <div style={{ fontSize: 12, color: C.txt2, marginTop: 8, wordBreak: 'break-all' }}>
                    {inviteUrl(sheetInvite.code)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={() => copyLink(sheetInvite)}
                    style={{
                      flex: 1, height: 44, borderRadius: 12, boxSizing: 'border-box',
                      border: '1.5px solid #FF6A00', background: '#fff',
                      color: '#FF6A00', fontSize: 13, fontWeight: 600,
                      fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    {copied ? 'Copied' : 'Copy link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => shareLink(sheetInvite)}
                    style={{
                      flex: 1, height: 44, borderRadius: 12, border: 'none',
                      background: C.green, color: '#fff', fontSize: 13, fontWeight: 700,
                      fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    Share
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { setCreated(null); openInvitePreview(sheetInvite.id); }}
                  style={{
                    width: '100%', height: 40, borderRadius: 12, boxSizing: 'border-box',
                    border: '1.5px solid #FF6A00', background: '#fff',
                    color: '#FF6A00', fontSize: 13, fontWeight: 600,
                    fontFamily: 'inherit', cursor: 'pointer',
                  }}
                >
                  See what they see
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function InvitePreviewScreen() {
  const {
    circleInvites,
    activeInviteId,
    setScreen,
    acceptCircleInvite,
  } = useApp();

  const invite = circleInvites.find((item) => item.id === activeInviteId) ?? circleInvites[0];

  useEffect(() => {
    if (!invite) setScreen('circle');
  }, [invite, setScreen]);

  if (!invite) return null;

  const kindLabel = invite.kind === 'family' ? 'family' : 'a friend';

  return (
    <div style={{ height: '100%', minHeight: '100%', background: C.bg, padding: '60px 20px 24px', display: 'flex', flexDirection: 'column' }}>
      <button
        type="button"
        onClick={() => setScreen('circle')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, marginBottom: 20, fontFamily: 'inherit',
        }}
      >
        <InkIcon name="back" size={18} color="#74767E" />
        <span style={{ fontSize: 14, color: '#74767E' }}>Back</span>
      </button>

      <div style={{
        background: C.green,
        border: `1px solid ${C.green}`,
        borderRadius: 12,
        padding: '8px 12px',
        fontSize: 11,
        fontWeight: 600,
        color: '#ffffff',
        alignSelf: 'flex-start',
        marginBottom: 22,
      }}>
        Invite preview · {invite.code}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
        <Avatar name={YOU.shortName} size={72} faceIndex={YOU.faceIndex} />
        <div style={{ fontSize: 22, fontWeight: 800, color: C.txt, letterSpacing: '-0.6px', marginTop: 16, lineHeight: 1.2 }}>
          {YOU.shortName} invited you
        </div>
        <div style={{ fontSize: 14, color: C.txt2, marginTop: 8, lineHeight: 1.55, maxWidth: 280 }}>
          Join {YOU.shortName}&apos;s trusted circle as {kindLabel}. You can pool everyday plans together without going through public matching.
        </div>

        <div style={{
          width: '100%',
          marginTop: 24,
          background: C.surface,
          border: 'none',
          borderRadius: 16,
          padding: '14px 16px',
          textAlign: 'left',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.txt3, letterSpacing: '0.06em', marginBottom: 8 }}>
            THIS LINK ADDS YOU AS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,106,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <InkIcon name={invite.kind === 'family' ? 'family' : 'invite'} size={16} color={C.green} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>
                {invite.label} · {invite.kind === 'family' ? 'Family' : 'Friend'}
              </div>
              <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>
                Trusted people skip women-only and verified-only filters
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 16 }}>
        <button
          type="button"
          onClick={() => acceptCircleInvite(invite.id)}
          style={{
            width: '100%', height: 48, borderRadius: 14, border: 'none',
            background: C.green, color: '#fff', fontSize: 15, fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          Join {YOU.shortName}&apos;s circle
        </button>
        <button
          type="button"
          onClick={() => setScreen('circle')}
          style={{
            width: '100%', height: 48, borderRadius: 14, boxSizing: 'border-box',
            border: '1.5px solid #FF6A00',
            background: '#fff', color: '#FF6A00', fontSize: 15, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
