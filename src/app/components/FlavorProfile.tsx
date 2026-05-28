'use client';

import { useState, useEffect, useRef } from 'react';
import { flavorProfiles } from '../data/flavorData';
import styles from './FlavorProfile.module.css';

export default function FlavorProfile() {
  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const profile = flavorProfiles[active];

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} id="flavor-profile" ref={sectionRef}>
      {/* Background accent */}
      <div className={styles.bgAccent} />

      <div className="container">
        <div className={styles.header}>
          <p className="section-label">☕ Flavor Profile</p>
          <h2 className="section-title">
            Profil Rasa <span className="gold-text">Kopi Kami</span>
          </h2>
          <p className="section-subtitle">
            Setiap varian kopi kami memiliki karakteristik unik yang dipengaruhi oleh tanah,
            ketinggian, dan metode pengolahan khas Sumatera Utara.
          </p>
          <div className="divider" />
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {flavorProfiles.map((fp, i) => (
            <button
              key={fp.name}
              id={`flavor-tab-${fp.name.replace(/\s+/g, '-').toLowerCase()}`}
              className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {fp.name}
            </button>
          ))}
        </div>

        {/* Profile Content */}
        <div className={styles.profileGrid}>
          {/* Left: Info */}
          <div className={styles.infoPanel}>
            <div className={styles.originCard}>
              <div className={styles.originBadge} style={{ backgroundColor: `${profile.color}33`, borderColor: `${profile.accentColor}44` }}>
                <span style={{ color: profile.accentColor }}>📍 {profile.origin}</span>
              </div>
              <h3 className={styles.profileName}>{profile.name}</h3>
              <p className={styles.profileTagline} style={{ color: profile.accentColor }}>
                "{profile.tagline}"
              </p>
              <p className={styles.profileDesc}>{profile.description}</p>
            </div>

            {/* Metadata */}
            <div className={styles.metaGrid}>
              {[
                { icon: '🏔️', label: 'Ketinggian', value: profile.altitude },
                { icon: '⚙️', label: 'Proses', value: profile.process },
                { icon: '🔥', label: 'Roast Level', value: profile.roast },
              ].map((m) => (
                <div key={m.label} className={`${styles.metaItem} glass-card`}>
                  <span className={styles.metaIcon}>{m.icon}</span>
                  <div>
                    <p className={styles.metaLabel}>{m.label}</p>
                    <p className={styles.metaValue}>{m.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tasting Notes */}
            <div className={styles.tastingNotes}>
              <p className={styles.tastingTitle}>Tasting Notes</p>
              <div className={styles.notesList}>
                {profile.tastingNotes.map((note) => (
                  <span key={note} className="badge" style={{ borderColor: `${profile.accentColor}44`, color: profile.accentColor }}>
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Flavor Bars */}
          <div className={styles.flavorBars}>
            <p className={styles.barsTitle}>Karakteristik Rasa</p>
            {profile.flavorWheel.map((item, i) => (
              <div key={item.label} className={styles.barItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.barHeader}>
                  <span className={styles.barLabel}>{item.label}</span>
                  <span className={styles.barValue} style={{ color: profile.accentColor }}>{item.value}%</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: animated ? `${item.value}%` : '0%',
                      background: `linear-gradient(90deg, ${profile.color}, ${profile.accentColor})`,
                      transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
