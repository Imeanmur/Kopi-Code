'use client';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Animated background particles */}
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ '--delay': `${i * 0.4}s`, '--x': `${Math.random() * 100}%` } as React.CSSProperties} />
        ))}
      </div>

      {/* Background gradient orbs */}
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      <div className={`container ${styles.inner}`}>
        {/* Left Content */}
        <div className={styles.content}>
          <div className="badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span>☕</span> Premium Specialty Coffee · Sumatera Utara
          </div>

          <h1 className={styles.title} style={{ animationDelay: '0.2s' }}>
            Setiap Tegukan,{' '}
            <span className="gold-text">Sebuah Cerita</span>
          </h1>

          <p className={styles.subtitle} style={{ animationDelay: '0.35s' }}>
            Dari lereng dataran tinggi Sumatera Utara, KopiCode menghadirkan{' '}
            <strong>Kopi Lintong</strong> dan <strong>Kopi Sidikalang</strong> — specialty coffee
            dengan sejarah, rasa, dan makna yang tak tertandingi.
          </p>

          <div className={styles.actions} style={{ animationDelay: '0.5s' }}>
            <a href="#digital-history" className="btn-primary" id="hero-cta-history">
              <span>📋</span> Lihat Riwayat Saya
            </a>
            <a href="#journey" className="btn-secondary" id="hero-cta-journey">
              <span>🗺️</span> Sejarah Kopi
            </a>
          </div>

          {/* Stats */}
          <div className={styles.stats} style={{ animationDelay: '0.65s' }}>
            {[
              { value: '30+', label: 'Tahun Tradisi' },
              { value: '100%', label: 'Arabika Lokal' },
              { value: '1.500', label: 'Mdpl Ketinggian' },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className={styles.visual}>
          <div className={`${styles.coffeeRing} animate-float`}>
            <div className={styles.coffeeOuter}>
              <div className={styles.coffeeMiddle}>
                <div className={styles.coffeeInner}>
                  <span className={styles.coffeeEmoji}>☕</span>
                  <span className={styles.coffeeSteam}>〜</span>
                </div>
              </div>
            </div>
            {/* Orbit badges */}
            <div className={`${styles.orbitBadge} ${styles.orbitBadge1}`}>
              🌿 Organic
            </div>
            <div className={`${styles.orbitBadge} ${styles.orbitBadge2}`}>
              🏔️ 1.500 mdpl
            </div>
            <div className={`${styles.orbitBadge} ${styles.orbitBadge3}`}>
              ⭐ Specialty
            </div>
          </div>

          {/* QR Code visual */}
          <div className={styles.qrBox}>
            <div className={styles.qrGrid}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={styles.qrCell} style={{ opacity: Math.random() > 0.4 ? 1 : 0.1 }} />
              ))}
            </div>
            <p className={styles.qrLabel}>Scan untuk mulai</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
        <span>Scroll ke bawah</span>
      </div>
    </section>
  );
}
