import { NextResponse } from 'next/server';

/**
 * /api/claim — endpoint ini tidak lagi digunakan.
 * Logika claim token sekarang dilakukan sepenuhnya di sisi klien (localStorage).
 * Endpoint ini dipertahankan agar tidak ada 404, namun selalu mengembalikan 410 Gone.
 */
export async function POST() {
  return NextResponse.json(
    { status: 'deprecated', message: 'Endpoint ini tidak lagi digunakan.' },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    { status: 'deprecated', message: 'Endpoint ini tidak lagi digunakan.' },
    { status: 410 }
  );
}
