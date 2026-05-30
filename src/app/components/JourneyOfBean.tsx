'use client';

import { useState } from 'react';
import styles from './JourneyOfBean.module.css';

const LOCATIONS = {
  lintong: {
    key: 'lintong',
    label: 'Lintong Nihuta',
    emoji: '🌿',
    color: '#d4956a',
    origin: 'Tapanuli Utara — 300 km dari Medan',
    mapSrc:
      'https://maps.google.com/maps?q=Lintong+Nihuta,+Tapanuli+Utara,+Sumatera+Utara&t=&z=12&ie=UTF8&iwloc=&output=embed',
  },
  sidikalang: {
    key: 'sidikalang',
    label: 'Sidikalang',
    emoji: '🏔️',
    color: '#c17535',
    origin: 'Kabupaten Dairi — 250 km dari Medan',
    mapSrc:
      'https://maps.google.com/maps?q=Sidikalang,+Kabupaten+Dairi,+Sumatera+Utara&t=&z=12&ie=UTF8&iwloc=&output=embed',
  },
} as const;

type LocationKey = keyof typeof LOCATIONS;

const timelineLintong = [
  {
    year: 'Abad ke-17',
    title: 'Awal Masuknya Kopi ke Sumatera',
    desc: 'VOC (Belanda) memperkenalkan tanaman kopi arabika ke Sumatera. Iklim dan tanah vulkanik dataran tinggi Tapanuli terbukti ideal untuk pertumbuhan kopi berkualitas tinggi.',
  },
  {
    year: '1888',
    title: 'Era Perkebunan Colonial',
    desc: 'Kopi dari wilayah Lintongnihuta mulai dikenal di kalangan pedagang Eropa. Kebun-kebun kopi berkembang di sekitar Danau Toba dengan metode pengolahan tradisional.',
  },
  {
    year: '1950-an',
    title: 'Kemerdekaan & Petani Mandiri',
    desc: 'Pasca kemerdekaan Indonesia, petani lokal Batak mengambil alih pengelolaan kebun kopi. Tradisi wet-hulled (giling basah) mulai menjadi ciri khas pengolahan Kopi Lintong.',
  },
  {
    year: '1980-an',
    title: 'Kopi Lintong Mendunia',
    desc: 'Kopi Lintong mulai diekspor ke Amerika Serikat, Eropa, dan Jepang. Specialty coffee roasters dunia menghargai karakter earthy dan body penuh yang unik.',
  },
  {
    year: 'Kini',
    title: 'Specialty Coffee Dunia',
    desc: 'Kopi Lintong diakui sebagai salah satu specialty coffee terbaik dunia, sering memenangkan penghargaan di kompetisi internasional dan disajikan di kafe-kafe premium global.',
  },
];

const timelineSidikalang = [
  {
    year: 'Abad ke-18',
    title: 'Tanah Dairi yang Subur',
    desc: 'Wilayah Sidikalang di Kabupaten Dairi dikenal memiliki tanah vulkanik yang sangat subur dan iklim sejuk — kombinasi sempurna untuk kopi arabika berkualitas premium.',
  },
  {
    year: '1900-an',
    title: 'Popularitas di Masa Kolonial',
    desc: 'Pemerintah Hindia Belanda mencatat Kopi Sidikalang sebagai salah satu produk ekspor unggulan. Rasa bold dan aromanya yang kuat menjadi favorit para pedagang Eropa.',
  },
  {
    year: '1960-an',
    title: 'Warisan Kopi Masyarakat Dairi',
    desc: 'Masyarakat Batak Pakpak di Sidikalang menjadikan kopi sebagai bagian integral dari kehidupan sehari-hari dan upacara adat. Tradisi minum kopi hitam pekat mengakar kuat.',
  },
  {
    year: '1990-an',
    title: 'Diakui Pasar Internasional',
    desc: 'Ekspor Kopi Sidikalang meningkat pesat ke pasar Asia Timur dan Amerika. Profil rasa bold, smoky, dan intensnya menarik perhatian para coffee connoisseur dunia.',
  },
  {
    year: 'Kini',
    title: 'Ikon Kopi Indonesia',
    desc: 'Kopi Sidikalang menjadi salah satu kopi paling dicari di dunia specialty coffee. KopiCode hadir untuk memastikan Anda menikmati keaslian dan kualitas terbaiknya langsung dari petani.',
  },
];

export default function JourneyOfBean() {
  const [activeLocation, setActiveLocation] = useState<LocationKey>('lintong');
  const loc = LOCATIONS[activeLocation];

  return (
    <section className={`section ${styles.section}`} id="journey">
      <div className={styles.bgDecor} />

      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <p className="section-label">🗺️ The Journey of Bean</p>
          <h2 className="section-title">
            Sejarah Kopi <span className="gold-text">Sumatera Utara</span>
          </h2>
          <p className="section-subtitle">
            Dari lereng pegunungan Sumatera hingga ke cangkir Anda — sebuah perjalanan panjang yang
            sarat dengan budaya, tradisi, dan dedikasi para petani lokal.
          </p>
          <div className="divider" />
        </div>

        {/* Two timelines */}
        <div className={styles.timelinesGrid}>
          {/* Lintong */}
          <div className={styles.timelineColumn}>
            <div className={styles.coffeeHeader} id="history-lintong">
              <div className={styles.coffeeTag} style={{ background: 'rgba(107,58,42,0.2)', borderColor: '#d4956a44' }}>
                <span>🌿</span>
                <span style={{ color: '#d4956a' }}>Kopi Lintong</span>
              </div>
              <h3 className={styles.coffeeName}>Lintong Nihuta</h3>
              <p className={styles.coffeeOrigin}>📍 Tapanuli Utara, Sumatera Utara • 1.200–1.500 mdpl</p>
            </div>

            <div className={styles.timeline}>
              {timelineLintong.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ borderColor: '#d4956a', boxShadow: '0 0 10px #d4956a40' }}>
                    <div className={styles.timelineDotInner} style={{ background: '#d4956a' }} />
                  </div>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear} style={{ color: '#d4956a' }}>{item.year}</span>
                    <h4 className={styles.timelineTitle}>{item.title}</h4>
                    <p className={styles.timelineDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidikalang */}
          <div className={styles.timelineColumn}>
            <div className={styles.coffeeHeader} id="history-sidikalang">
              <div className={styles.coffeeTag} style={{ background: 'rgba(61,31,14,0.4)', borderColor: '#c1753544' }}>
                <span>🏔️</span>
                <span style={{ color: '#c17535' }}>Kopi Sidikalang</span>
              </div>
              <h3 className={styles.coffeeName}>Sidikalang</h3>
              <p className={styles.coffeeOrigin}>📍 Kabupaten Dairi, Sumatera Utara • 1.000–1.600 mdpl</p>
            </div>

            <div className={styles.timeline}>
              {timelineSidikalang.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ borderColor: '#c17535', boxShadow: '0 0 10px #c1753540' }}>
                    <div className={styles.timelineDotInner} style={{ background: '#c17535' }} />
                  </div>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear} style={{ color: '#c17535' }}>{item.year}</span>
                    <h4 className={styles.timelineTitle}>{item.title}</h4>
                    <p className={styles.timelineDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className={`${styles.mapCard} glass-card`} id="sumatra-map">
          <div className={styles.mapContent}>

            {/* Left: info + location tabs */}
            <div className={styles.mapInfo}>
              <p className="section-label">🗺️ Peta Asal</p>
              <h3 className={styles.mapTitle}>Sumatera Utara — Tanah Kopi Terbaik</h3>
              <p className={styles.mapDesc}>
                Pilih asal kopi untuk melihat lokasinya langsung di peta. Kedua daerah ini
                dikelilingi pegunungan vulkanik dan Danau Toba yang menciptakan iklim mikro
                sempurna untuk arabika terbaik.
              </p>

              {/* Location Tabs */}
              <div className={styles.locationTabs}>
                {(Object.values(LOCATIONS) as typeof LOCATIONS[LocationKey][]).map((l) => (
                  <button
                    key={l.key}
                    className={`${styles.locationTab} ${activeLocation === l.key ? styles.locationTabActive : ''}`}
                    style={
                      activeLocation === l.key
                        ? { borderColor: l.color, background: `${l.color}18`, color: l.color }
                        : {}
                    }
                    onClick={() => setActiveLocation(l.key as LocationKey)}
                    id={`map-tab-${l.key}`}
                  >
                    <span>{l.emoji}</span>
                    <div>
                      <p className={styles.locationTabName}>{l.label}</p>
                      <p className={styles.locationTabOrigin}>{l.origin}</p>
                    </div>
                    {activeLocation === l.key && (
                      <span className={styles.locationTabDot} style={{ background: l.color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Google Maps iframe */}
            <div className={styles.mapEmbed}>
              <iframe
                key={loc.mapSrc}
                title={`Peta ${loc.label}`}
                src={loc.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px', minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
