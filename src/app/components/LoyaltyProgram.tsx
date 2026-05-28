'use client';

import { useState, useEffect } from 'react';
import styles from './LoyaltyProgram.module.css';

const TOTAL_SCANS_NEEDED = 8;
const CURRENT_SCANS = 5; // from purchaseHistory length

const rewards = [
  {
    id: 'reward-keychain',
    scan: 3,
    icon: '🔑',
    title: 'Gantungan Kunci KopiCode',
    desc: 'Eksklusif berdesain biji kopi dari bahan premium',
    unlocked: true,
  },
  {
    id: 'reward-notebook',
    scan: 5,
    icon: '📓',
    title: 'Coffee Journal',
    desc: 'Buku catatan edisi terbatas dengan cover kulit sintetis',
    unlocked: true,
  },
  {
    id: 'reward-tote',
    scan: 8,
    icon: '🎁',
    title: 'Mystery Box Premium',
    desc: 'Tote bag + aksesori tech-lifestyle + sample kopi eksklusif',
    unlocked: false,
  },
  {
    id: 'reward-vip',
    scan: 12,
    icon: '👑',
    title: 'VIP Member Card',
    desc: 'Diskon 20% seumur hidup + akses exclusive tasting event',
    unlocked: false,
  },
];

export default function LoyaltyProgram() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const progress = (CURRENT_SCANS / TOTAL_SCANS_NEEDED) * 100;
  const remaining = TOTAL_SCANS_NEEDED - CURRENT_SCANS;

  const handleSpin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
    }, 1500);
  };

  return (
    <section className={`section ${styles.section}`} id="loyalty">
      <div className={styles.bgGlow} />

      <div className="container">
        <div className={styles.header}>
          <p className="section-label">🎁 Smart Loyalty Program</p>
          <h2 className="section-title">
            Kumpulkan Scan,{' '}
            <span className="gold-text">Raih Hadiah</span>
          </h2>
          <p className="section-subtitle">
            Tidak perlu kartu stempel fisik — sistem kami otomatis melacak setiap scan QR Code
            Anda dan memberikan notifikasi ketika hadiah siap diklaim.
          </p>
          <div className="divider" />
        </div>

        <div className={styles.mainLayout}>
          {/* Progress Card */}
          <div className={`${styles.progressCard} glass-card`} id="loyalty-progress">
            {/* Notification */}
            {showNotif && (
              <div className={styles.notification}>
                🎉 Scan berhasil! Hanya {remaining} scan lagi untuk Mystery Box!
              </div>
            )}

            {/* Scan count */}
            <div className={styles.scanHeader}>
              <div>
                <p className={styles.scanLabel}>Total Scan Anda</p>
                <p className={styles.scanCount}>
                  <span className={styles.scanNum}>{CURRENT_SCANS}</span>
                  <span className={styles.scanTotal}>/ {TOTAL_SCANS_NEEDED}</span>
                </p>
              </div>
              <div className={styles.qrScanIcon} onClick={handleSpin} id="loyalty-scan-btn">
                <span className={`${styles.qrIcon} ${isAnimating ? styles.qrSpin : ''}`}>📱</span>
                <span className={styles.qrHint}>Tap scan!</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressSection}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                />
                {rewards.filter(r => r.scan <= TOTAL_SCANS_NEEDED).map((r) => (
                  <div
                    key={r.id}
                    className={`${styles.progressMilestone} ${r.scan <= CURRENT_SCANS ? styles.milestoneUnlocked : ''}`}
                    style={{ left: `${(r.scan / TOTAL_SCANS_NEEDED) * 100}%` }}
                    title={r.title}
                  >
                    <span>{r.icon}</span>
                  </div>
                ))}
              </div>
              <div className={styles.progressLabels}>
                <span>0 scan</span>
                <span>{TOTAL_SCANS_NEEDED} scan</span>
              </div>
            </div>

            {/* Next reward alert */}
            <div className={styles.nextReward}>
              <span>🎁</span>
              <div>
                <p className={styles.nextTitle}>Mystery Box menanti!</p>
                <p className={styles.nextDesc}>
                  Hanya <strong>{remaining} scan lagi</strong> untuk mendapatkan Mystery Box berisi
                  gantungan kunci, aksesori tech-lifestyle, dan sample kopi eksklusif!
                </p>
              </div>
            </div>
          </div>

          {/* Rewards List */}
          <div className={styles.rewardsPanel}>
            <p className={styles.rewardsTitle}>Daftar Hadiah</p>
            <div className={styles.rewardsList}>
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  id={reward.id}
                  className={`${styles.rewardItem} ${reward.unlocked ? styles.unlocked : styles.locked}`}
                >
                  <div className={styles.rewardIconWrap}>
                    <span className={styles.rewardIcon}>{reward.icon}</span>
                    {reward.unlocked && <span className={styles.checkMark}>✓</span>}
                  </div>
                  <div className={styles.rewardContent}>
                    <div className={styles.rewardHeader}>
                      <p className={styles.rewardTitle}>{reward.title}</p>
                      <span className={`${styles.rewardScan} ${reward.unlocked ? styles.rewardUnlockedBadge : ''}`}>
                        {reward.scan} scan
                      </span>
                    </div>
                    <p className={styles.rewardDesc}>{reward.desc}</p>
                  </div>
                  {!reward.unlocked && <span className={styles.lockIcon}>🔒</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className={`${styles.howItWorks} glass-card`} id="how-it-works">
          <p className={styles.howTitle}>⚡ Cara Kerja Smart Loyalty</p>
          <div className={styles.steps}>
            {[
              { step: '1', icon: '📦', text: 'Beli kopi KopiCode di toko atau online' },
              { step: '2', icon: '📱', text: 'Scan QR Code pada kemasan produk' },
              { step: '3', icon: '🤖', text: 'Sistem otomatis mencatat scan Anda' },
              { step: '4', icon: '🎉', text: 'Dapatkan notifikasi saat hadiah siap diklaim!' },
            ].map((s) => (
              <div key={s.step} className={styles.step}>
                <div className={styles.stepCircle}>{s.icon}</div>
                <p className={styles.stepText}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
