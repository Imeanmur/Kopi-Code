'use client';

import { farmers } from '../data/farmerData';
import styles from './FarmerProfile.module.css';

export default function FarmerProfile() {
  return (
    <section className="section" id="petani">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">👨‍🌾 Profil Petani Lokal</p>
          <h2 className="section-title">
            Wajah di Balik{' '}
            <span className="gold-text">Setiap Cangkir</span>
          </h2>
          <p className="section-subtitle">
            Dengan membeli KopiCode, Anda secara langsung mendukung penghidupan petani lokal
            Sumatera Utara dan melestarikan tradisi pertanian kopi yang sudah berlangsung
            selama ratusan tahun.
          </p>
          <div className="divider" />
        </div>

        {/* Impact Banner */}
        <div className={`${styles.impactBanner} glass-card`} id="impact-banner">
          {[
            { icon: '👨‍👩‍👧‍👦', value: '200+', label: 'Keluarga Petani Didukung' },
            { icon: '🌱', value: '500+', label: 'Hektar Kebun Bermitra' },
            { icon: '💚', value: '100%', label: 'Fair Trade Pricing' },
            { icon: '🌏', value: '15+', label: 'Negara Tujuan Ekspor' },
          ].map((item) => (
            <div key={item.label} className={styles.impactItem}>
              <span className={styles.impactIcon}>{item.icon}</span>
              <span className={styles.impactValue}>{item.value}</span>
              <span className={styles.impactLabel}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Farmer Cards */}
        <div className={styles.farmersGrid}>
          {farmers.map((farmer, idx) => (
            <div
              key={farmer.id}
              className={`${styles.farmerCard} glass-card`}
              id={`farmer-${farmer.id.toLowerCase()}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Avatar */}
              <div className={styles.avatarWrapper}>
                <div
                  className={styles.avatar}
                  style={{
                    background:
                      farmer.coffeeType === 'Lintong'
                        ? 'linear-gradient(135deg, #6b3a2a, #d4956a)'
                        : 'linear-gradient(135deg, #3d1f0e, #c17535)',
                  }}
                >
                  <span className={styles.avatarEmoji}>{farmer.emoji}</span>
                </div>
                <div
                  className={styles.coffeeTypeBadge}
                  style={{
                    background:
                      farmer.coffeeType === 'Lintong'
                        ? 'rgba(212,149,106,0.15)'
                        : 'rgba(193,117,53,0.15)',
                    color:
                      farmer.coffeeType === 'Lintong' ? '#d4956a' : '#c17535',
                    borderColor:
                      farmer.coffeeType === 'Lintong' ? '#d4956a44' : '#c1753544',
                  }}
                >
                  {farmer.coffeeType === 'Lintong' ? '🌿' : '🏔️'} Petani {farmer.coffeeType}
                </div>
              </div>

              {/* Info */}
              <div className={styles.farmerInfo}>
                <h3 className={styles.farmerName}>{farmer.name}</h3>
                <p className={styles.farmerLocation}>📍 {farmer.location}</p>

                <div className={styles.farmerMeta}>
                  <div className={styles.metaChip}>
                    <span>🎂</span> {farmer.age} tahun
                  </div>
                  <div className={styles.metaChip}>
                    <span>⏳</span> {farmer.experience}
                  </div>
                  <div className={styles.metaChip}>
                    <span>🌾</span> {farmer.farmSize}
                  </div>
                </div>

                <blockquote className={styles.farmerQuote}>
                  {farmer.quote}
                </blockquote>
              </div>

              {/* Post-harvest Process */}
              <div className={styles.processSection}>
                <p className={styles.processTitle}>⚙️ Proses Pasca-Panen</p>
                <ol className={styles.processList}>
                  {farmer.process.map((step, i) => (
                    <li key={i} className={styles.processItem}>
                      <span className={styles.processNumber}>{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Support note */}
        <div className={styles.supportNote} id="support-note">
          <span className={styles.supportIcon}>💚</span>
          <div>
            <p className={styles.supportTitle}>Anda Berkontribusi Langsung</p>
            <p className={styles.supportText}>
              Setiap pembelian KopiCode secara langsung mendukung kesejahteraan petani lokal
              Sumatera Utara. Kami memastikan <strong>minimal 60% harga jual</strong> kembali
              ke tangan petani — jauh di atas rata-rata industri. Terima kasih telah menjadi
              bagian dari gerakan kopi berkeadilan ini. 🙏
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
