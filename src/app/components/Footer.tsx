import styles from './Footer.module.css';

const socialLinks = [
  { id: 'footer-instagram', icon: '📸', label: 'Instagram', href: '#' },
  { id: 'footer-tiktok', icon: '🎵', label: 'TikTok', href: '#' },
  { id: 'footer-whatsapp', icon: '💬', label: 'WhatsApp', href: '#' },
  { id: 'footer-email', icon: '📧', label: 'Email', href: 'mailto:hello@kopicode.id' },
];

const navLinks = [
  { label: 'Riwayat Pembelian', href: '#digital-history' },
  { label: 'Flavor Profile', href: '#flavor-profile' },
  { label: 'Sejarah Kopi', href: '#journey' },
  { label: 'Profil Petani', href: '#petani' },
  { label: 'Loyalty Program', href: '#loyalty' },
  { label: 'Mengapa Digital', href: '#why-digital' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={`container ${styles.inner}`}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>☕</span>
            <span className={styles.logoText}>
              Kopi<span className={styles.logoAccent}>Code</span>
            </span>
          </div>
          <p className={styles.brandDesc}>
            Specialty coffee dari dataran tinggi Sumatera Utara. Setiap tegukan membawa cerita
            petani lokal, tradisi, dan semangat kopi Indonesia terbaik.
          </p>

          {/* Social Links */}
          <div className={styles.socials}>
            {socialLinks.map((s) => (
              <a key={s.id} href={s.href} id={s.id} className={styles.socialLink} aria-label={s.label}>
                <span>{s.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <div className={styles.linksCol}>
          <p className={styles.colTitle}>Navigasi</p>
          <ul className={styles.navList}>
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={styles.navLink}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.contactCol}>
          <p className={styles.colTitle}>Kontak</p>
          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <span>📍</span>
              <span>Medan, Sumatera Utara, Indonesia</span>
            </div>
            <div className={styles.contactItem}>
              <span>📧</span>
              <span>hello@kopicode.id</span>
            </div>
            <div className={styles.contactItem}>
              <span>📱</span>
              <span>+62 812 XXXX XXXX</span>
            </div>
          </div>

          {/* Certificates */}
          <div className={styles.certs}>
            <span className="badge">🌿 Organic Certified</span>
            <span className="badge">⭐ Specialty Grade</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} KopiCode. All rights reserved.
            </p>
            <p className={styles.madeWith}>
              Dibuat dengan ☕ & ❤️ untuk kopi Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
