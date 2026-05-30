'use client';

import styles from './Hero.module.css';

// Pre-computed positions — avoids Math.random() hydration mismatch
const PARTICLE_X = [14, 27, 83, 61, 42, 95, 7, 53, 76, 31, 68, 19, 88, 45, 72, 36, 91, 24, 57, 80];

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Animated background particles */}
      <div className={styles.particles}>
        {PARTICLE_X.map((x, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{ '--delay': `${i * 0.4}s`, '--x': `${x}%` } as React.CSSProperties}
          />
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
            <a href="#journey" className="btn-primary" id="hero-cta-journey">
              <span>🗺️</span> Sejarah Kopi
            </a>
            <a href="#flavor-profile" className="btn-secondary" id="hero-cta-flavor">
              <span>☕</span> Profil Rasa
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

          <div className={styles.infoCard}>
            <div className={styles.infoCardRow}>
              <span className={styles.infoCardIcon}>🌿</span>
              <div>
                <p className={styles.infoCardLabel}>Kopi Lintong</p>
                <p className={styles.infoCardValue}>Tapanuli Utara · 1.200 mdpl</p>
              </div>
            </div>
            <div className={styles.infoCardDivider} />
            <div className={styles.infoCardRow}>
              <span className={styles.infoCardIcon}>🏔️</span>
              <div>
                <p className={styles.infoCardLabel}>Kopi Sidikalang</p>
                <p className={styles.infoCardValue}>Kabupaten Dairi · 1.600 mdpl</p>
              </div>
            </div>
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
