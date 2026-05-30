import { NextRequest, NextResponse } from 'next/server';
import { getRedis, claimKey } from '@/lib/redis';

// ── Constants ────────────────────────────────────────────────────────────────
const LUCKY_CHANCE = 0.4; // 40% win rate

// ── Types ────────────────────────────────────────────────────────────────────
interface ClaimRecord {
  winner: boolean;
  claimCode: string;
  claimedAt: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function generateClaimCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'KPC-WIN-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ── POST /api/claim — klaim token & tentukan hasil undian ────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body as { id?: string };

    // Validate token format
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ status: 'invalid', message: 'Token tidak valid.' }, { status: 400 });
    }

    const tokenId = id.trim();
    const redis = getRedis();
    const key = claimKey(tokenId);

    // ── Atomic check-and-set using Redis SET NX ──────────────────────────────
    // SET key value NX EX — only sets if key does NOT exist (atomic, race-safe)
    const winner = Math.random() < LUCKY_CHANCE;
    const claimCode = winner ? generateClaimCode() : '';
    const claimedAt = new Date().toISOString();

    const record: ClaimRecord = { winner, claimCode, claimedAt };

    // NX = only set if not exists; returns null if key already exists
    const setResult = await redis.set(key, JSON.stringify(record), {
      nx: true,       // only set if NOT already claimed
      ex: 60 * 60 * 24 * 365, // expire after 1 year (effectively permanent)
    });

    if (setResult === null) {
      // Key already existed → already claimed
      return NextResponse.json({
        status: 'already_claimed',
        message: 'Token ini sudah pernah digunakan.',
      });
    }

    // New claim saved successfully
    return NextResponse.json({
      status: 'claimed',
      winner,
      claimCode: winner ? claimCode : null,
      claimedAt,
    });

  } catch (err) {
    console.error('[/api/claim POST]', err);
    return NextResponse.json(
      { status: 'error', message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

// ── GET /api/claim?id=... — cek status tanpa mengklaim ──────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ status: 'invalid' }, { status: 400 });
    }

    const redis = getRedis();
    const existing = await redis.get<string>(claimKey(id.trim()));

    if (existing) {
      const record: ClaimRecord = typeof existing === 'string'
        ? JSON.parse(existing)
        : existing as unknown as ClaimRecord;
      return NextResponse.json({ status: 'already_claimed', claimedAt: record.claimedAt });
    }

    return NextResponse.json({ status: 'available' });

  } catch (err) {
    console.error('[/api/claim GET]', err);
    return NextResponse.json(
      { status: 'error', message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
