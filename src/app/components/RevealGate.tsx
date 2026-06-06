'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './RevealGate.module.css';

type Phase = 'loading' | 'checking' | 'already_used' | 'idle' | 'spinning' | 'result' | 'error';
type PrizeType = 'humidifier' | 'gantungan_kunci';

interface ClaimResult {
  winner: boolean;
  claimCode: string | null;
  prizeType: PrizeType;
}

// ── Tentukan jenis hadiah dari parameter URL ──────────────────────
// prize=hdiff → Humidifier Diffuser (hadiah utama)
// prize=gk atau tidak ada → Gantungan Kunci
function getPrizeType(prize: string | null): PrizeType {
  if (prize === 'hdiff') return 'humidifier';
  return 'gantungan_kunci';
}

// ── Generate klaim code deterministik dari token ID ───────────────
function generateClaimCode(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'KPC-WIN-';
  let h = hash;
  for (let i = 0; i < 6; i++) {
    code += chars[h % chars.length];
    h = Math.floor(h / chars.length) || (hash + i * 7919);
  }
  return code;
}

export default function RevealGate() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrId = searchParams.get('id');
  const prizeParam = searchParams.get('prize'); // 'hdiff' | 'gk' | null

  // ── On mount: cek apakah token sudah pernah digunakan di device ini ────────
  useEffect(() => {
    if (!qrId) {
      // Tidak ada token → mode demo
      setPhase('idle');
      return;
    }

    setPhase('checking');

    // Cek localStorage (pure client-side, tidak butuh backend)
    try {
      const localUsed: string[] = JSON.parse(
        localStorage.getItem('kopicode_used_ids') || '[]'
      );
      if (localUsed.includes(qrId)) {
        setPhase('already_used');
        return;
      }
    } catch { /* ignore */ }

    setPhase('idle');
  }, [qrId]);

  // ── Simpan token yang sudah digunakan ke localStorage ────────────
  const markAsUsed = (id: string) => {
    try {
      const used: string[] = JSON.parse(localStorage.getItem('kopicode_used_ids') || '[]');
      if (!used.includes(id)) {
        used.push(id);
        localStorage.setItem('kopicode_used_ids', JSON.stringify(used));
      }
    } catch { /* ignore */ }
  };

  const spawnParticles = () => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
    );
  };

  // ── Handle Reveal button press ────────────────────────────────────
  // Semua scan ditetapkan sebagai BERUNTUNG
  const handleReveal = () => {
    if (phase !== 'idle') return;
    setPhase('spinning');

    setTimeout(() => {
      if (!qrId) {
        // Mode demo: selalu beruntung, gantungan kunci
        const claimCode = generateClaimCode(`demo-${Date.now()}`);
        setClaimResult({ winner: true, claimCode, prizeType: 'gantungan_kunci' });
        setPhase('result');
        spawnParticles();
        return;
      }

      // Mode QR nyata: simpan ke localStorage, SELALU BERUNTUNG
      // Jenis hadiah dibaca dari parameter 'prize' yang di-embed ke URL QR
      markAsUsed(qrId);
      const prizeType = getPrizeType(prizeParam);
      const claimCode = generateClaimCode(qrId);
      setClaimResult({ winner: true, claimCode, prizeType });
      setPhase('result');
      spawnParticles();
    }, 2500);
  };

  const handleContinue = () => router.push('/home');

  // ── Render ──────────────────────────────────────────────────────
  return (
    <section className={styles.gate}>
      <div className={styles.orbCenter} />
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      {phase === 'result' &&
        particles.map((p) => (
          <span
            key={p.id}
            className={styles.confetti}
            style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.id * 0.05}s` } as React.CSSProperties}
          />
        ))}

      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandIcon}>☕</span>
          <span className={styles.brandName}>
            Kopi<span className={styles.brandAccent}>Code</span>
          </span>
        </div>

        {/* ── LOADING / CHECKING ── */}
        {(phase === 'loading' || phase === 'checking') && (
          <div className={styles.spinningContent}>
            <div className={styles.spinnerRing}>
              <div className={styles.spinnerOuter}>
                <div className={styles.spinnerInner}>
                  <span className={styles.spinnerEmoji}>☕</span>
                </div>
              </div>
            </div>
            <p className={styles.spinningText}>
              {phase === 'checking' ? 'Memverifikasi token…' : 'Memuat…'}
            </p>
          </div>
        )}

        {/* ── ALREADY USED ── */}
        {phase === 'already_used' && (
          <div className={`${styles.resultContent} ${styles.resultUnlucky}`}>
            <div className={styles.resultIconWrap}>
              <div className={styles.unluckyIcon}>🔒</div>
            </div>
            <div className={`badge ${styles.unluckyBadge}`}>
              ⚠️ Token Sudah Digunakan
            </div>
            <h2 className={styles.resultTitle}>
              QR Code Ini Sudah <br />
              <span className={styles.unluckyAccent}>Pernah Di-scan Sebelumnya</span>
            </h2>
            <p className={styles.resultDesc}>
              Setiap QR Code pada kemasan KopiCode hanya dapat digunakan{' '}
              <strong>satu kali</strong> — token ini sudah diklaim. Beli produk KopiCode
              baru untuk mendapatkan kesempatan undian berikutnya!
            </p>
            {qrId && (
              <p className={styles.chanceNote} style={{ marginTop: '0.5rem' }}>
                Token: <code style={{ fontSize: '0.75rem', opacity: 0.6 }}>{qrId}</code>
              </p>
            )}
            <div className={styles.resultActions}>
              <button className={`btn-primary ${styles.continueBtn}`} onClick={handleContinue} id="continue-used">
                <span>☕</span> Lihat Info Kopi
              </button>
            </div>
          </div>
        )}

        {/* ── IDLE ── */}
        {phase === 'idle' && (
          <div className={styles.idleContent}>
            <div className={`badge ${styles.topBadge}`}>
              <span>🎁</span> Undian KopiCode
            </div>
            <h1 className={styles.mainTitle}>
              Selamat! <br />
              <span className="gold-text">Anda Beruntung! 🎉</span>
            </h1>
            <p className={styles.mainSubtitle}>
              Terima kasih sudah memilih KopiCode! Tekan tombol di bawah untuk
              mengungkap hadiah spesial yang menanti Anda. 🤞
            </p>

            {/* Mystery Box */}
            <div className={styles.boxWrapper}>
              <div className={`${styles.mysteryBox} animate-float`}>
                <div className={styles.boxLid}>
                  <div className={styles.boxRibbon} />
                </div>
                <div className={styles.boxBody}>
                  <span className={styles.boxQuestion}>?</span>
                </div>
                <div className={styles.boxGlow} />
              </div>
            </div>

            <button className={styles.revealBtn} onClick={handleReveal} id="reveal-button">
              <span className={styles.revealBtnIcon}>✨</span>
              Buka Hadiah Sekarang!
              <span className={styles.revealBtnShimmer} />
            </button>

            <p className={styles.chanceNote}>
              {qrId
                ? `Token: ${qrId.slice(0, 16)}… · Berlaku sekali per kemasan`
                : 'Setiap kemasan KopiCode dijamin mendapatkan hadiah'}
            </p>
          </div>
        )}

        {/* ── SPINNING ── */}
        {phase === 'spinning' && (
          <div className={styles.spinningContent}>
            <div className={styles.spinnerRing}>
              <div className={styles.spinnerOuter}>
                <div className={styles.spinnerInner}>
                  <span className={styles.spinnerEmoji}>🎲</span>
                </div>
              </div>
            </div>
            <p className={styles.spinningText}>Membuka hadiah Anda...</p>
            <div className={styles.spinningDots}>
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* ── RESULT (selalu beruntung) ── */}
        {phase === 'result' && claimResult && (
          <div className={`${styles.resultContent} ${styles.resultLucky}`}>
            <div className={styles.resultIconWrap}>
              <div className={styles.luckyIcon}>🎉</div>
              <div className={styles.luckyRing} />
            </div>
            <div className={`badge ${styles.luckyBadge}`}>
              🏆 Selamat! Anda Beruntung!
            </div>

            {claimResult.prizeType === 'humidifier' ? (
              <>
                <h2 className={styles.resultTitle}>
                  Anda Memenangkan <br />
                  <span className={styles.luckyGold}>Humidifier Diffuser! 💨</span>
                </h2>

                {/* Humidifier Image */}
                <div className={styles.prizeImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/humidifier-diffuser.jpg"
                    alt="Humidifier Diffuser — Hadiah Utama KopiCode"
                    width={220}
                    height={220}
                    className={styles.prizeImage}
                    style={{ borderRadius: '16px', objectFit: 'cover', display: 'block' }}
                  />
                  <div className={styles.prizeMainBadge}>⭐ Hadiah Utama dari KopiCode</div>
                </div>

                <p className={styles.resultDesc}>
                  Selamat! Anda memenangkan <strong>Humidifier Diffuser</strong> sebagai{' '}
                  <strong>hadiah utama dari KopiCode</strong>! Tunjukkan halaman ini ke panitia
                  untuk mengklaim hadiah Anda.
                </p>
              </>
            ) : (
              <>
                <h2 className={styles.resultTitle}>
                  Anda Memenangkan <br />
                  <span className={styles.luckyGold}>Ganci Cup Coffee! ☕</span>
                </h2>

                {/* Ganci Cup Coffee Image */}
                <div className={styles.prizeImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/gantungan-kunci-cup.jpg"
                    alt="Ganci Cup Coffee — Hadiah KopiCode"
                    width={220}
                    height={220}
                    className={styles.prizeImage}
                    style={{ borderRadius: '16px', objectFit: 'cover', display: 'block' }}
                  />
                  <div className={styles.prizeGkBadge}>☕ Ganci Cup Coffee KopiCode</div>
                </div>

                <p className={styles.resultDesc}>
                  Selamat! Anda mendapatkan{' '}
                  <strong>Ganci Cup Coffee eksklusif KopiCode</strong> —
                  gantungan kunci berbentuk cangkir kopi mini yang keren!
                  Tunjukkan halaman ini ke panitia untuk mengklaim hadiah Anda.
                </p>
              </>
            )}


            <div className={styles.claimCode}>
              <span className={styles.claimLabel}>Kode Klaim</span>
              <span className={styles.claimNum}>{claimResult.claimCode}</span>
            </div>
            <div className={styles.resultActions}>
              <button className={`btn-primary ${styles.continueBtn}`} onClick={handleContinue} id="continue-lucky">
                <span>☕</span> Lihat Info Kopi
              </button>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {phase === 'error' && (
          <div className={`${styles.resultContent} ${styles.resultUnlucky}`}>
            <div className={styles.resultIconWrap}>
              <div className={styles.unluckyIcon}>⚠️</div>
            </div>
            <h2 className={styles.resultTitle}>Terjadi Kesalahan</h2>
            <p className={styles.resultDesc}>
              Gagal menghubungi server. Pastikan koneksi internet Anda aktif, lalu coba lagi.
            </p>
            <div className={styles.resultActions}>
              <button className={`btn-primary ${styles.continueBtn}`} onClick={() => setPhase('idle')} id="retry-button">
                🔄 Coba Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
