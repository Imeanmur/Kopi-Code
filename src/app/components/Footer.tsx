'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Flavor Profile', href: '#flavor-profile' },
  { label: 'Sejarah Kopi', href: '#journey' },
];

export default function Footer() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    if (!message.trim()) return;
    const subject = encodeURIComponent(`Pesan dari ${name || 'Pengunjung Website'} — KopiCode`);
    const body = encodeURIComponent(
      `Halo KopiCode,\n\n${message}\n\n---\nDikirim oleh: ${name || 'Pengunjung'}\nDari: Website KopiCode`
    );
    window.location.href = `mailto:kopicode05@gmail.com?subject=${subject}&body=${body}`;
  };

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
            <a href="mailto:kopicode05@gmail.com" className={styles.socialLink} aria-label="Gmail" title="Gmail">
              <span>📧</span>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram" title="Instagram">
              <span>📸</span>
            </a>
            <a href="https://wa.me/6285761655103" className={styles.socialLink} aria-label="WhatsApp" title="WhatsApp" target="_blank" rel="noopener noreferrer">
              <span>💬</span>
            </a>
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

          {/* Contact Info */}
          <p className={styles.colTitle} style={{ marginTop: '1.5rem' }}>Kontak</p>
          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <span>📍</span>
              <span>Medan, Sumatera Utara</span>
            </div>
            <a href="mailto:kopicode05@gmail.com" className={styles.contactItem}>
              <span>📧</span>
              <span>kopicode05@gmail.com</span>
            </a>
            <a href="https://wa.me/6285761655103" className={styles.contactItem}>
              <span>📱</span>
              <span>085761655103</span>
            </a>
          </div>
        </div>

        {/* Email Form */}
        <div className={styles.emailCol}>
          <p className={styles.colTitle}>Kirim Pesan</p>
          <p className={styles.emailDesc}>
            Punya pertanyaan tentang produk kami? Tulis pesan di sini dan kami akan menjawab secepatnya.
          </p>
          <div className={styles.emailForm}>
            <input
              id="footer-name-input"
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.emailInput}
            />
            <textarea
              id="footer-message-input"
              placeholder="Tulis pesan Anda di sini..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.emailTextarea}
              rows={4}
            />
            <button
              id="footer-send-btn"
              className={styles.sendBtn}
              onClick={handleSendEmail}
              disabled={!message.trim()}
            >
              <span>📧</span> Kirim Email
            </button>
          </div>
        </div>
      </div>

      {/* Certs */}
      <div className={`container ${styles.certsRow}`}>
        <span className="badge">🌿 Organic Certified</span>
        <span className="badge">⭐ Specialty Grade</span>
        <span className="badge">🤝 Fair Trade</span>
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
