'use client';

import styles from './WhyDigital.module.css';

const features = [
  {
    id: 'feature-transparency',
    icon: '🔍',
    title: 'Transparency & Trust',
    subtitle: 'Kejujuran dalam Setiap Transaksi',
    desc: 'Konsumen mendapatkan informasi jujur mengenai bahan baku, asal kopi, dan riwayat pembayaran yang tercatat secara akurat dan transparan di sistem KopiCode.',
    highlights: ['Sumber kopi terverifikasi', 'Riwayat pembelian akurat', 'Informasi petani asli'],
    color: '#4a9eff',
    gradFrom: '#0a1929',
    gradTo: '#0d2040',
  },
  {
    id: 'feature-loyalty',
    icon: '🎁',
    title: 'Smart Loyalty Program',
    subtitle: 'Tanpa Kartu Stempel Fisik',
    desc: 'Sistem secara otomatis mendeteksi scan QR dan memberikan notifikasi ketika pelanggan beruntung untuk mengklaim Mystery Box berisi aksesori premium.',
    highlights: ['Auto-deteksi scan QR', 'Mystery Box rewards', 'Notifikasi real-time'],
    color: '#e8a84d',
    gradFrom: '#1a1109',
    gradTo: '#251608',
  },
  {
    id: 'feature-engagement',
    icon: '💬',
    title: 'Engagement Tinggi',
    subtitle: 'Interaksi di Luar Transaksi',
    desc: 'Menciptakan koneksi emosional antara brand dan konsumen di luar transaksi fisik, membangun loyalitas pelanggan yang kuat di era digital.',
    highlights: ['Konten edukasi kopi', 'Personalisasi pengalaman', 'Komunitas digital'],
    color: '#a855f7',
    gradFrom: '#120a1a',
    gradTo: '#180d22',
  },
  {
    id: 'feature-data',
    icon: '📊',
    title: 'Efisiensi Data',
    subtitle: 'Perencanaan Stok Cerdas',
    desc: 'Data riwayat pemindaian menjadi bahan evaluasi bagi tim untuk mengetahui varian paling diminati dan merencanakan stok secara optimal.',
    highlights: ['Analitik varian terpopuler', 'Perencanaan stok akurat', 'Evaluasi rutin'],
    color: '#34d399',
    gradFrom: '#0a1912',
    gradTo: '#0d2018',
  },
];

export default function WhyDigital() {
  return (
    <section className="section" id="why-digital">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">⚡ Keunggulan Digital</p>
          <h2 className="section-title">
            Mengapa <span className="gold-text">Konsep Digital?</span>
          </h2>
          <p className="section-subtitle">
            Penerapan QR Code bukan sekadar teknologi — ini adalah komitmen KopiCode untuk
            memberikan pengalaman premium yang transparan, personal, dan bermakna.
          </p>
          <div className="divider" />
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              id={feat.id}
              className={styles.featureCard}
              style={{
                background: `linear-gradient(135deg, ${feat.gradFrom} 0%, ${feat.gradTo} 100%)`,
                borderColor: `${feat.color}22`,
                animationDelay: `${idx * 0.12}s`,
              }}
            >
              {/* Top Accent */}
              <div className={styles.cardAccent} style={{ background: `${feat.color}15` }} />

              {/* Icon */}
              <div
                className={styles.iconBox}
                style={{
                  background: `${feat.color}15`,
                  border: `1px solid ${feat.color}33`,
                }}
              >
                <span className={styles.icon}>{feat.icon}</span>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <p className={styles.cardSubtitle} style={{ color: feat.color }}>
                  {feat.subtitle}
                </p>
                <h3 className={styles.cardTitle}>{feat.title}</h3>
                <p className={styles.cardDesc}>{feat.desc}</p>
              </div>

              {/* Highlights */}
              <div className={styles.highlights}>
                {feat.highlights.map((h) => (
                  <div key={h} className={styles.highlightItem}>
                    <span className={styles.highlightDot} style={{ background: feat.color }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Hover gradient */}
              <div
                className={styles.hoverGlow}
                style={{ background: `radial-gradient(circle at 50% 100%, ${feat.color}10 0%, transparent 70%)` }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.ctaBanner} glass-card`} id="digital-cta">
          <div className={styles.ctaContent}>
            <span className={styles.ctaBigIcon}>🚀</span>
            <div>
              <h3 className={styles.ctaTitle}>
                Bergabung dengan Revolusi Kopi Digital
              </h3>
              <p className={styles.ctaText}>
                Jadilah bagian dari komunitas penikmat kopi yang cerdas. Scan QR Code pada kemasan
                KopiCode dan mulailah perjalanan digital kopi Anda hari ini.
              </p>
            </div>
          </div>
          <a href="#digital-history" className="btn-primary" id="digital-start-btn">
            <span>☕</span> Mulai Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
