'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RevealGate.module.css';

const LUCKY_CHANCE = 0.4; // 40% peluang menang

function getResult(): boolean {
  return Math.random() < LUCKY_CHANCE;
}

type Phase = 'idle' | 'spinning' | 'result';

export default function RevealGate() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isLucky, setIsLucky] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const router = useRouter();

  const handleReveal = () => {
    if (phase !== 'idle') return;
    setPhase('spinning');

    // Setelah animasi spin (2.5s), tampilkan hasil
    setTimeout(() => {
      const result = getResult();
      setIsLucky(result);
      setPhase('result');

      if (result) {
        // Spawn confetti particles
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }));
        setParticles(newParticles);
      }
    }, 2500);
  };

  const handleContinue = () => {
    router.push('/home');
  };

  return (
    <section className={styles.gate}>
      {/* Background orbs */}
      <div className={styles.orbCenter} />
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      {/* Particles (lucky only) */}
      {isLucky && phase === 'result' && particles.map((p) => (
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

        {/* === IDLE PHASE === */}
        {phase === 'idle' && (
          <div className={styles.idleContent}>
            <div className={`badge ${styles.topBadge}`}>
              <span>🎁</span> Smart Loyalty Program
            </div>
            <h1 className={styles.mainTitle}>
              Apakah Anda <br />
              <span className="gold-text">Beruntung Hari Ini?</span>
            </h1>
            <p className={styles.mainSubtitle}>
              Terima kasih sudah memilih KopiCode! Tekan tombol di bawah untuk
              mengungkap kejutan spesial yang mungkin menanti Anda. 🤞
            </p>

            {/* Mystery Box visual */}
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

            <button
              className={styles.revealBtn}
              onClick={handleReveal}
              id="reveal-button"
            >
              <span className={styles.revealBtnIcon}>✨</span>
              Reveal Sekarang!
              <span className={styles.revealBtnShimmer} />
            </button>

            <p className={styles.chanceNote}>
              Setiap scan QR memiliki peluang mendapatkan Mystery Box eksklusif
            </p>
          </div>
        )}

        {/* === SPINNING PHASE === */}
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

        {/* === RESULT PHASE === */}
        {phase === 'result' && (
          <div className={`${styles.resultContent} ${isLucky ? styles.resultLucky : styles.resultUnlucky}`}>

            {isLucky ? (
              <>
                {/* LUCKY */}
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
                  <span className={styles.claimNum}>KPC-WIN-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className={styles.resultActions}>
                  <button className={`btn-primary ${styles.continueBtn}`} onClick={handleContinue} id="continue-to-landing">
                    <span>☕</span> Lihat Landing Page
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* UNLUCKY */}
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
                  Kumpulkan <strong>8 scan total</strong> untuk otomatis mendapatkan
                  Mystery Box eksklusif kami. Anda sudah di langkah yang benar! 💪
                </p>
                <div className={styles.progressHint}>
                  <span>Progress Loyalty Anda:</span>
                  <div className={styles.progressMini}>
                    <div className={styles.progressMiniFill} style={{ width: '62.5%' }} />
                  </div>
                  <span className={styles.progressNum}>5 / 8 scan</span>
                </div>
                <div className={styles.resultActions}>
                  <button className={`btn-primary ${styles.continueBtn}`} onClick={handleContinue} id="continue-to-landing-unlucky">
                    <span>☕</span> Lihat Landing Page
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
