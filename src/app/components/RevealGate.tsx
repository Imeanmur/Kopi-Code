'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './RevealGate.module.css';

type Phase = 'loading' | 'checking' | 'already_used' | 'idle' | 'spinning' | 'result' | 'error';

interface ClaimResult {
  winner: boolean;
  claimCode: string | null;
}

export default function RevealGate() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrId = searchParams.get('id');

  // ── On mount: pre-check token status (fast UX feedback) ────────
  useEffect(() => {
    if (!qrId) {
      // No token → demo mode
      setPhase('idle');
      return;
    }

    setPhase('checking');

    // Quick local cache check first (avoids network round-trip on same device)
    try {
      const localUsed: string[] = JSON.parse(
        localStorage.getItem('kopicode_used_ids') || '[]'
      );
      if (localUsed.includes(qrId)) {
        setPhase('already_used');
        return;
      }
    } catch { /* ignore */ }

    // Server-side check (authoritative)
    fetch(`/api/claim?id=${encodeURIComponent(qrId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'already_claimed') {
          // Also cache locally for instant future checks
          cacheUsedLocally(qrId);
          setPhase('already_used');
        } else {
          setPhase('idle');
        }
      })
      .catch(() => {
        // If server check fails, fall through to idle (API call on reveal will confirm)
        setPhase('idle');
      });
  }, [qrId]);

  // ── Persist used token in localStorage (local UX speed) ────────
  const cacheUsedLocally = (id: string) => {
    try {
      const used: string[] = JSON.parse(localStorage.getItem('kopicode_used_ids') || '[]');
      if (!used.includes(id)) {
        used.push(id);
        localStorage.setItem('kopicode_used_ids', JSON.stringify(used));
      }
    } catch { /* ignore */ }
  };

  // ── Handle Reveal button press ──────────────────────────────────
  const handleReveal = async () => {
    if (phase !== 'idle') return;
    setPhase('spinning');

    // For demo mode (no qrId), simulate result client-side
    if (!qrId) {
      setTimeout(() => {
        const winner = Math.random() < 0.4;
        setClaimResult({
          winner,
          claimCode: winner ? `KPC-WIN-${Math.floor(100000 + Math.random() * 900000)}` : null,
        });
        setPhase('result');
        if (winner) spawnParticles();
      }, 2500);
      return;
    }

    // Wait minimum spin duration for UX feel
    const [claimRes] = await Promise.all([
      fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: qrId }),
      }).then((r) => r.json()),
      new Promise((res) => setTimeout(res, 2500)),
    ]);

    if (claimRes.status === 'already_claimed') {
      cacheUsedLocally(qrId);
      setPhase('already_used');
      return;
    }

    if (claimRes.status === 'claimed') {
      cacheUsedLocally(qrId);
      setClaimResult({ winner: claimRes.winner, claimCode: claimRes.claimCode ?? null });
      setPhase('result');
      if (claimRes.winner) spawnParticles();
      return;
    }

    // Unexpected error
    setPhase('error');
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

  const handleContinue = () => router.push('/home');

  // ── Render ──────────────────────────────────────────────────────
  return (
    <section className={styles.gate}>
      <div className={styles.orbCenter} />
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      {claimResult?.winner && phase === 'result' &&
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
              <span>🎁</span> Mystery Box KopiCode
            </div>
            <h1 className={styles.mainTitle}>
              Apakah Anda <br />
              <span className="gold-text">Beruntung Hari Ini?</span>
            </h1>
            <p className={styles.mainSubtitle}>
              Terima kasih sudah memilih KopiCode! Tekan tombol di bawah untuk
              mengungkap kejutan spesial yang mungkin menanti Anda. 🤞
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
              Reveal Sekarang!
              <span className={styles.revealBtnShimmer} />
            </button>

            <p className={styles.chanceNote}>
              {qrId
                ? `Token: ${qrId.slice(0, 16)}… · Berlaku sekali per kemasan`
                : 'Setiap kemasan KopiCode memiliki peluang mendapatkan Mystery Box'}
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
            <p className={styles.spinningText}>Mengundi keberuntungan Anda...</p>
            <div className={styles.spinningDots}>
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && claimResult && (
          <div className={`${styles.resultContent} ${claimResult.winner ? styles.resultLucky : styles.resultUnlucky}`}>
            {claimResult.winner ? (
              <>
                <div className={styles.resultIconWrap}>
                  <div className={styles.luckyIcon}>🎉</div>
                  <div className={styles.luckyRing} />
                </div>
                <div className={`badge ${styles.luckyBadge}`}>
                  🏆 Selamat! Anda Beruntung!
                </div>
                <h2 className={styles.resultTitle}>
                  Anda Memenangkan <br />
                  <span className={styles.luckyGold}>Mystery Box! 🎁</span>
                </h2>
                <p className={styles.resultDesc}>
                  Klaim hadiah Anda berupa <strong>gantungan kunci eksklusif KopiCode</strong> atau
                  aksesori tech-lifestyle pilihan. Tunjukkan halaman ini ke kasir untuk klaim hadiah.
                </p>
                <div className={styles.claimCode}>
                  <span className={styles.claimLabel}>Kode Klaim</span>
                  <span className={styles.claimNum}>{claimResult.claimCode}</span>
                </div>
                <div className={styles.resultActions}>
                  <button className={`btn-primary ${styles.continueBtn}`} onClick={handleContinue} id="continue-lucky">
                    <span>☕</span> Lihat Info Kopi
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.resultIconWrap}>
                  <div className={styles.unluckyIcon}>☕</div>
                </div>
                <div className={`badge ${styles.unluckyBadge}`}>
                  😊 Belum Beruntung Kali Ini
                </div>
                <h2 className={styles.resultTitle}>
                  Jangan Menyerah! <br />
                  <span className={styles.unluckyAccent}>Coba Lagi di Pembelian Berikutnya</span>
                </h2>
                <p className={styles.resultDesc}>
                  Setiap pembelian KopiCode berikutnya memberikan peluang baru!
                  Terima kasih sudah menjadi pelanggan setia KopiCode. 💪
                </p>
                <div className={styles.resultActions}>
                  <button className={`btn-primary ${styles.continueBtn}`} onClick={handleContinue} id="continue-unlucky">
                    <span>☕</span> Lihat Info Kopi
                  </button>
                </div>
              </>
            )}
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
