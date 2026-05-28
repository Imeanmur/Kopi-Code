'use client';

import { purchaseHistory } from '../data/coffeeHistory';
import styles from './PersonalizationDash.module.css';

function getRecommendation() {
  const lintong = purchaseHistory.filter((r) => r.variant === 'Lintong').length;
  const sidikalang = purchaseHistory.filter((r) => r.variant === 'Sidikalang').length;
  const lastPurchase = purchaseHistory[0];

  if (lintong > sidikalang) {
    return {
      title: 'Kopi Sidikalang Bold',
      reason: `Anda menyukai Kopi Lintong yang lembut. Coba tantang selera Anda dengan Kopi Sidikalang yang bold dan intens!`,
      tag: 'Eksplorasi Baru',
      icon: '🏔️',
      color: '#c17535',
      score: 96,
    };
  } else if (sidikalang > lintong) {
    return {
      title: 'Kopi Lintong Premium',
      reason: `Sebagai penggemar Sidikalang yang bold, Lintong Premium akan memberikan nuansa earthy yang lembut sebagai variasi sempurna.`,
      tag: 'Cocok Untuk Anda',
      icon: '🌿',
      color: '#d4956a',
      score: 94,
    };
  } else {
    return {
      title: 'Kopi Lintong Single Origin',
      reason: `Berdasarkan riwayat pembelian Anda yang seimbang, Single Origin Lintong akan memberikan pengalaman rasa yang paling murni.`,
      tag: 'Top Pick',
      icon: '⭐',
      color: '#e8a84d',
      score: 98,
    };
  }
}

const insights = [
  {
    id: 'insight-frequency',
    icon: '📅',
    label: 'Frekuensi Pembelian',
    value: 'Setiap 2–3 minggu',
    desc: 'Konsisten dan teratur',
  },
  {
    id: 'insight-roast',
    icon: '🔥',
    label: 'Preferensi Roast',
    value: 'Medium – Dark',
    desc: 'Berdasarkan 5 transaksi terakhir',
  },
  {
    id: 'insight-weight',
    icon: '⚖️',
    label: 'Ukuran Favorit',
    value: '200g – 250g',
    desc: 'Paling sering dipesan',
  },
  {
    id: 'insight-loyalty',
    icon: '🏆',
    label: 'Status Pelanggan',
    value: 'Pelanggan Setia',
    desc: '5+ transaksi berhasil',
  },
];

export default function PersonalizationDash() {
  const rec = getRecommendation();

  return (
    <section className="section" id="personalization">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">🎯 Personalization Dashboard</p>
          <h2 className="section-title">
            Rekomendasi <span className="gold-text">Khusus Anda</span>
          </h2>
          <p className="section-subtitle">
            Sistem kami menganalisis pola pembelian Anda untuk memberikan rekomendasi yang
            paling tepat dan personal.
          </p>
          <div className="divider" />
        </div>

        <div className={styles.mainGrid}>
          {/* Recommendation Card */}
          <div className={styles.recCard} id="personalization-recommendation">
            <div className={styles.recTop}>
              <div className={styles.recBadge} style={{ color: rec.color, borderColor: `${rec.color}44`, background: `${rec.color}15` }}>
                {rec.icon} {rec.tag}
              </div>
              <div className={styles.scoreCircle} style={{ borderColor: rec.color, boxShadow: `0 0 20px ${rec.color}30` }}>
                <span className={styles.scoreValue} style={{ color: rec.color }}>{rec.score}%</span>
                <span className={styles.scoreLabel}>Match</span>
              </div>
            </div>

            <h3 className={styles.recTitle}>{rec.title}</h3>
            <p className={styles.recReason}>{rec.reason}</p>

            <div className={styles.recTags}>
              {['Specialty Grade', 'Single Origin', 'Arabika 100%'].map((t) => (
                <span key={t} className="badge" style={{ borderColor: `${rec.color}44`, color: rec.color }}>{t}</span>
              ))}
            </div>

            <a href="#journey" className="btn-primary" id="rec-explore-btn" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              <span>☕</span> Coba Sekarang
            </a>
          </div>

          {/* Insights */}
          <div className={styles.insightsPanel}>
            <p className={styles.insightsTitle}>Profil Selera Anda</p>
            <div className={styles.insightsList}>
              {insights.map((insight) => (
                <div key={insight.label} className={`${styles.insightItem} glass-card`} id={insight.id}>
                  <span className={styles.insightIcon}>{insight.icon}</span>
                  <div className={styles.insightContent}>
                    <p className={styles.insightLabel}>{insight.label}</p>
                    <p className={styles.insightValue}>{insight.value}</p>
                    <p className={styles.insightDesc}>{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI insight banner */}
            <div className={styles.aiBanner}>
              <span className={styles.aiIcon}>🤖</span>
              <div>
                <p className={styles.aiTitle}>Analisis AI KopiCode</p>
                <p className={styles.aiText}>
                  Berdasarkan 5 pembelian terakhir Anda, profil selera menunjukkan preferensi
                  terhadap kopi bertekstur <strong>medium-bold</strong> dengan catatan rasa{' '}
                  <strong>earthy dan dark chocolate</strong>. Anda memiliki 3 lebih banyak scan
                  untuk mendapatkan Mystery Box! 🎁
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
