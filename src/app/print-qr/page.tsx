'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './PrintQR.module.css';

// ── Generate bottle IDs (client-only, called inside useEffect) ───
function generateBottleIds(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${num}-${rand}`;
  });
}

// ── QR Card subcomponent ─────────────────────────────────────────
function QRCard({
  url, label, sublabel, emoji, color, id, tag,
}: {
  url: string; label: string; sublabel: string;
  emoji: string; color: string; id: string; tag?: string;
}) {
  return (
    <div className={styles.qrCard} id={id}>
      <div className={styles.cardHeader} style={{ borderColor: `${color}55` }}>
        <span className={styles.cardEmoji}>{emoji}</span>
        <div>
          <p className={styles.cardBrand}>KopiCode</p>
          <p className={styles.cardName}>{label}</p>
        </div>
        {tag && (
          <span className={styles.cardTag} style={{ background: `${color}25`, color }}>
            {tag}
          </span>
        )}
      </div>

      <div className={styles.qrWrapper}>
        <QRCodeSVG value={url} size={150} bgColor="#ffffff" fgColor="#1a0d05" level="H" includeMargin />
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.cardScanLabel}>{sublabel}</p>
        <p className={styles.cardUrl}>{url.length > 55 ? url.slice(0, 55) + '…' : url}</p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export default function PrintQRPage() {
  const [lintongIds, setLintongIds] = useState<string[]>([]);
  const [sidikalangIds, setSidikalangIds] = useState<string[]>([]);
  const [baseUrl, setBaseUrl] = useState('https://kopicode.vercel.app');

  useEffect(() => {
    // Run client-side only to avoid Math.random() hydration mismatch
    setLintongIds(generateBottleIds('BOT-LIN', 15));
    setSidikalangIds(generateBottleIds('BOT-SID', 15));
    setBaseUrl(window.location.origin);
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span>☕</span>
            <span>Kopi<strong>Code</strong> — Generator QR Code</span>
          </div>
          <div className={styles.headerActions}>
            <a href="/home" className={styles.backBtn}>← Kembali</a>
            <button className={styles.printBtn} onClick={handlePrint} id="print-qr-btn">
              🖨️ Cetak Semua QR
            </button>
          </div>
        </div>
        <p className={styles.instructions}>
          Halaman ini menghasilkan dua jenis QR Code. <strong>QR Botol</strong> memiliki ID unik
          per botol — setiap QR hanya bisa di-scan sekali untuk undian. <strong>QR Banner</strong>{' '}
          mengarahkan langsung ke landing page informasi kopi.
        </p>
      </div>

      {/* ══ TIPE 1: QR BOTOL ══ */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge} style={{ background: 'rgba(201,144,74,0.12)', color: '#e8a84d', borderColor: 'rgba(201,144,74,0.3)' }}>
          🎁 Tipe 1 — QR Botol (Undian)
        </div>
        <h2 className={styles.sectionTitle}>QR Code untuk Kemasan Botol</h2>
        <p className={styles.sectionDesc}>
          Setiap QR code memiliki ID unik. Tempel satu per botol produk.
          Pelanggan yang scan akan diarahkan ke halaman undian — <strong>hanya bisa scan sekali</strong>.
        </p>
      </div>

      <div className={styles.subsectionLabel}>🌿 Kopi Lintong ({lintongIds.length || '…'} botol)</div>
      <div className={styles.grid}>
        {lintongIds.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', padding: '1rem', fontSize: '0.875rem' }}>⏳ Memuat…</p>
        ) : lintongIds.map((qrId, i) => (
          <QRCard
            key={qrId}
            id={`qr-bottle-lintong-${i + 1}`}
            url={`${baseUrl}/?id=${qrId}`}
            label="Kopi Lintong Premium"
            sublabel="📱 Scan untuk cek keberuntungan!"
            emoji="🌿"
            color="#d4956a"
            tag="Botol"
          />
        ))}
      </div>

      <div className={styles.subsectionLabel}>🏔️ Kopi Sidikalang ({sidikalangIds.length || '…'} botol)</div>
      <div className={styles.grid}>
        {sidikalangIds.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', padding: '1rem', fontSize: '0.875rem' }}>⏳ Memuat…</p>
        ) : sidikalangIds.map((qrId, i) => (
          <QRCard
            key={qrId}
            id={`qr-bottle-sidikalang-${i + 1}`}
            url={`${baseUrl}/?id=${qrId}`}
            label="Kopi Sidikalang Bold"
            sublabel="📱 Scan untuk cek keberuntungan!"
            emoji="🏔️"
            color="#c17535"
            tag="Botol"
          />
        ))}
      </div>

      {/* ══ TIPE 2: QR BANNER ══ */}
      <div className={styles.sectionHeader} style={{ marginTop: '3rem' }}>
        <div className={styles.sectionBadge} style={{ background: 'rgba(100,180,255,0.1)', color: '#60b0ff', borderColor: 'rgba(100,180,255,0.3)' }}>
          ☕ Tipe 2 — QR Banner (Info Kopi)
        </div>
        <h2 className={styles.sectionTitle}>QR Code untuk Banner / Poster</h2>
        <p className={styles.sectionDesc}>
          QR di bawah mengarahkan langsung ke <strong>Landing Page KopiCode</strong> — menampilkan
          sejarah dan profil rasa kopi. Cocok untuk banner, spanduk, atau poster promosi.
        </p>
      </div>

      <div className={styles.grid} style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
        <QRCard
          id="qr-banner-home"
          url={`${baseUrl}/home`}
          label="Landing Page KopiCode"
          sublabel="☕ Scan untuk sejarah & info kopi"
          emoji="📖"
          color="#60b0ff"
          tag="Banner"
        />
        <QRCard
          id="qr-banner-flavor"
          url={`${baseUrl}/home#flavor-profile`}
          label="Flavor Profile Kopi"
          sublabel="☕ Scan untuk profil rasa kopi"
          emoji="🍵"
          color="#60b0ff"
          tag="Banner"
        />
      </div>

      {/* Tips */}
      <div className={styles.printTips}>
        <h3>💡 Tips Cetak</h3>
        <ul>
          <li>Gunakan kertas stiker glossy untuk hasil cetak yang tahan lama</li>
          <li>QR Botol: cetak 1 per botol — jangan duplikasi karena tiap ID unik</li>
          <li>QR Banner: bisa diperbesar dan dicetak berkali-kali untuk poster/spanduk</li>
          <li>Setelah cetak, uji scan QR sebelum ditempel pada produk</li>
          <li>Refresh halaman untuk regenerate ID botol yang baru</li>
        </ul>
      </div>

    </div>
  );
}
