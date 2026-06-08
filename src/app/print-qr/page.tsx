'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './PrintQR.module.css';

// ── Generate bottle IDs ───────────────────────────────────────────
function generateBottleIds(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${num}-${rand}`;
  });
}

// ── Acak 1 index dari 14 botol sebagai pemenang Humidifier ───────
function pickHumidifierIndex(allIds: string[]): number {
  const seed = allIds.join('');
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % allIds.length;
}

// ── QR Card ──────────────────────────────────────────────────────
function QRCard({
  url, label, emoji, color, id, tag,
}: {
  url: string; label: string;
  emoji: string; color: string; id: string; tag?: string;
}) {
  return (
    <div
      className={styles.qrCard}
      id={id}
    >
      <div
        className={styles.cardHeader}
        style={{
          borderColor: `${color}55`,
          background: '#1a0d05',
        }}
      >
        <span className={styles.cardEmoji}>{emoji}</span>
        <div>
          <p className={styles.cardBrand}>KopiCode</p>
          <p className={styles.cardName}>{label}</p>
        </div>
        <span
          className={styles.cardTag}
          style={{ background: `${color}25`, color }}
        >
          {tag ?? 'Botol'}
        </span>
      </div>

      <div className={styles.qrWrapper}>
        <QRCodeSVG value={url} size={150} bgColor="#ffffff" fgColor="#1a0d05" level="H" includeMargin />
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.cardScanLabel}>
          ☕ Scan &amp; Menangkan Hadiahnya!
        </p>
        <p className={styles.cardUrl}>{url.length > 55 ? url.slice(0, 55) + '…' : url}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function PrintQRPage() {
  // 9 Lintong + 5 Sidikalang = 14 total
  // 1 Humidifier (acak) + 13 Gantungan Kunci
  const [lintongIds, setLintongIds] = useState<string[]>([]);
  const [sidikalangIds, setSidikalangIds] = useState<string[]>([]);
  const [humidifierIndex, setHumidifierIndex] = useState<number>(-1);
  const [baseUrl, setBaseUrl] = useState('https://kopicode.vercel.app');

  useEffect(() => {
    const lin = generateBottleIds('BOT-LIN', 9);
    const sid = generateBottleIds('BOT-SID', 5);
    const allIds = [...lin, ...sid]; // 14 total
    const idx = pickHumidifierIndex(allIds);

    setLintongIds(lin);
    setSidikalangIds(sid);
    setHumidifierIndex(idx);
    setBaseUrl(window.location.origin);
  }, []);

  const handlePrint = () => window.print();

  // Encode jenis hadiah ke parameter URL QR
  const makeUrl = (qrId: string, isHumidifier: boolean) =>
    `${baseUrl}/?id=${qrId}&prize=${isHumidifier ? 'hdiff' : 'gk'}`;

  const allIds = [...lintongIds, ...sidikalangIds];

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
          Total <strong>14 QR Code</strong> — <strong>1</strong> pemenang{' '}
          <strong style={{ color: '#f0c040' }}>Humidifier Diffuser</strong>{' '}
          (acak, berbordir emas) dan <strong>13</strong> pemenang{' '}
          <strong>Ganci Cup Coffee</strong>. Refresh halaman untuk acak ulang.
        </p>
      </div>

      {/* ── Info Pemenang Humidifier ── */}
      {humidifierIndex >= 0 && allIds.length === 14 && (
        <div className={styles.sectionHeader}>
          <div
            className={styles.sectionBadge}
            style={{ background: 'rgba(240,192,64,0.15)', color: '#f0c040', borderColor: 'rgba(240,192,64,0.4)' }}
          >
            🥇 Pemenang Hadiah Utama Sesi Ini
          </div>
          <h2 className={styles.sectionTitle}>Distribusi Hadiah</h2>
          <p className={styles.sectionDesc}>
            <strong style={{ color: '#f0c040' }}>Humidifier Diffuser</strong> jatuh pada botol ke-
            <strong style={{ color: '#f0c040' }}>{humidifierIndex + 1}</strong> dari 14 —{' '}
            {humidifierIndex < 9
              ? `🌿 Kopi Lintong #${String(humidifierIndex + 1).padStart(2, '0')}`
              : `🏔️ Kopi Sidikalang #${String(humidifierIndex - 8).padStart(2, '0')}`}.
            Tandai dengan <strong style={{ color: '#f0c040' }}>border emas ✨</strong>.
            13 botol lainnya mendapat <strong>Ganci Cup Coffee</strong>.
          </p>
        </div>
      )}

      {/* ══ QR BOTOL ══ */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge} style={{ background: 'rgba(201,144,74,0.12)', color: '#e8a84d', borderColor: 'rgba(201,144,74,0.3)' }}>
          🎁 QR Botol — Undian Hadiah (14 Pemenang)
        </div>
        <h2 className={styles.sectionTitle}>QR Code untuk Kemasan Botol</h2>
        <p className={styles.sectionDesc}>
          Tempel satu QR per botol. QR dengan{' '}
          <strong style={{ color: '#f0c040' }}>border emas 🥇</strong> = pemenang Humidifier Diffuser.
          14 botol lainnya mendapat Ganci Cup Coffee.
        </p>
      </div>

      <div className={styles.subsectionLabel}>🌿 Kopi Lintong ({lintongIds.length || '…'} botol)</div>
      <div className={styles.grid}>
        {lintongIds.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', padding: '1rem', fontSize: '0.875rem' }}>⏳ Memuat…</p>
        ) : lintongIds.map((qrId, i) => {
          const globalIdx = i; // 0–8
          const isHumidifier = globalIdx === humidifierIndex;
          return (
            <QRCard
              key={qrId}
              id={`qr-bottle-lintong-${i + 1}`}
              url={makeUrl(qrId, isHumidifier)}
              label="Kopi Lintong Premium"
              emoji="🌿"
              color="#d4956a"
              tag="Botol"
            />
          );
        })}
      </div>

      <div className={styles.subsectionLabel}>🏔️ Kopi Sidikalang ({sidikalangIds.length || '…'} botol)</div>
      <div className={styles.grid}>
        {sidikalangIds.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', padding: '1rem', fontSize: '0.875rem' }}>⏳ Memuat…</p>
        ) : sidikalangIds.map((qrId, i) => {
          const globalIdx = 9 + i; // 9–13
          const isHumidifier = globalIdx === humidifierIndex;
          return (
            <QRCard
              key={qrId}
              id={`qr-bottle-sidikalang-${i + 1}`}
              url={makeUrl(qrId, isHumidifier)}
              label="Kopi Sidikalang Bold"
              emoji="🏔️"
              color="#c17535"
              tag="Botol"
            />
          );
        })}
      </div>

      {/* Tips */}
      <div className={styles.printTips}>
        <h3>💡 Tips Cetak & Distribusi</h3>
        <ul>
          <li>Total 14 QR: 1 Humidifier Diffuser + 13 Ganci Cup Coffee</li>
          <li>QR dengan border emas = pemenang Humidifier — catat sebelum dicetak</li>
          <li>Cetak 1 QR per botol — jangan duplikasi karena tiap ID unik</li>
          <li>Setelah cetak, uji scan QR sebelum ditempel pada produk</li>
          <li><strong>Refresh halaman</strong> untuk generate ulang ID botol dan acak pemenang baru</li>
        </ul>
      </div>

    </div>
  );
}
