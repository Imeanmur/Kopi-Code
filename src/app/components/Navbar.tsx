'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#digital-history', label: 'Riwayat' },
  { href: '#flavor-profile', label: 'Flavor' },
  { href: '#journey', label: 'Sejarah' },
  { href: '#petani', label: 'Petani' },
  { href: '#loyalty', label: 'Loyalty' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="/home" className={styles.logo} id="navbar-logo">
          <span className={styles.logoIcon}>☕</span>
          <span className={styles.logoText}>
            Kopi<span className={styles.logoAccent}>Code</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links} id="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="/print-qr" className={`btn-primary ${styles.cta}`} id="navbar-cta">
          🖨️ Cetak QR Code
        </a>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="/print-qr" className={`btn-primary ${styles.mobileCta}`}>
          🖨️ Cetak QR Code
        </a>
      </div>
    </nav>
  );
}
