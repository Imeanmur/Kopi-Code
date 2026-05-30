import { NextRequest, NextResponse } from 'next/server';

// ── Server-side token store ──────────────────────────────────────
// Persists for the lifetime of this server instance.
// For production with full persistence, replace with Vercel KV / Upstash Redis.
const claimedTokens = new Map<string, { winner: boolean; claimCode: string; claimedAt: string }>();

const LUCKY_CHANCE = 0.4; // 40% win rate

function generateClaimCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'KPC-WIN-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body as { id?: string };

    // ── Validate token format ────────────────────────────────────
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ status: 'invalid', message: 'Token tidak valid.' }, { status: 400 });
    }

    const tokenId = id.trim();

    // ── Check if already claimed ─────────────────────────────────
    if (claimedTokens.has(tokenId)) {
      return NextResponse.json({
        status: 'already_claimed',
        message: 'Token ini sudah pernah digunakan.',
      });
    }

    // ── Determine result (server-side, tamper-proof) ─────────────
    const winner = Math.random() < LUCKY_CHANCE;
    const claimCode = winner ? generateClaimCode() : null;
    const claimedAt = new Date().toISOString();

    // ── Persist the claim ────────────────────────────────────────
    claimedTokens.set(tokenId, { winner, claimCode: claimCode ?? '', claimedAt });

    return NextResponse.json({
      status: 'claimed',
      winner,
      claimCode,
      claimedAt,
    });
  } catch {
    return NextResponse.json({ status: 'error', message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}

// Optional: GET endpoint to check status without claiming
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ status: 'invalid' }, { status: 400 });
  }

  const existing = claimedTokens.get(id.trim());
  if (existing) {
    return NextResponse.json({ status: 'already_claimed', claimedAt: existing.claimedAt });
  }
  return NextResponse.json({ status: 'available' });
}
