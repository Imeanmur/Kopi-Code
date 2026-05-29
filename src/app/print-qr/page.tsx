'use client';

import { QRCodeSVG } from 'qrcode.react';
import styles from './PrintQR.module.css';

// Ganti URL ini dengan URL Vercel setelah deploy
const QR_URL = typeof window !== 'undefined'
  ? window.location.origin
  : 'https://kopicode.vercel.app';

const products = [
  {
    id: 'qr-lintong',
    name: 'Kopi Lintong Premium',
    variant: 'Lintong',
    weight: '250g',
    roast: 'Medium Roast',
    emoji: '🌿',
    color: '#d4956a',
  },
  {
    id: 'qr-sidikalang',
    name: 'Kopi Sidikalang Bold',
    variant: 'Sidikalang',
    weight: '250g',
    roast: 'Dark Roast',
    emoji: '🏔️',
    color: '#c17535',
  },
  {
    id: 'qr-lintong-light',
    name: 'Kopi Lintong Single Origin',
    variant: 'Lintong',
    weight: '100g',
    roast: 'Light Roast',
    emoji: '🌿',
    color: '#d4956a',
  },
  {
    id: 'qr-sidikalang-espresso',
    name: 'Kopi Sidikalang Espresso',
    variant: 'Sidikalang',
    weight: '200g',
    roast: 'Dark Roast',
    emoji: '🏔️',
    color: '#c17535',
  },
];

export default function PrintQRPage() {
  const handlePrint = () => window.print();

  return (
    <div className={styles.page}>
      {/* No-print header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span>☕</span>
            <span>Kopi<strong>Code</strong> — QR Code untuk Kemasan</span>
          </div>
          <div className={styles.headerActions}>
            <a href="/home" className={styles.backBtn}>← Kembali</a>
            <button className={styles.printBtn} onClick={handlePrint} id="print-qr-btn">
              🖨️ Cetak QR Code
            </button>
          </div>
        </div>
        <p className={styles.instructions}>
          QR Code di bawah akan mengarahkan pelanggan ke halaman Reveal Hadiah KopiCode.
          Klik <strong>"Cetak QR Code"</strong> untuk mencetak dan tempel pada kemasan produk Anda.
        </p>
      </div>

      {/* Print grid */}
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.qrCard} id={product.id}>
            {/* Brand header */}
            <div className={styles.cardHeader} style={{ borderColor: `${product.color}44` }}>
              <span className={styles.cardEmoji}>{product.emoji}</span>
              <div>
                <p className={styles.cardBrand}>KopiCode</p>
                <p className={styles.cardName}>{product.name}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className={styles.qrWrapper}>
              <QRCodeSVG
                value={QR_URL}
                size={160}
                bgColor="#ffffff"
                fgColor="#1a0d05"
                level="H"
                includeMargin={true}
              />
            </div>

            {/* Product info */}
            <div className={styles.cardInfo}>
              <div className={styles.cardMeta}>
                <span className={styles.metaChip}>📦 {product.weight}</span>
                <span className={styles.metaChip}>🔥 {product.roast}</span>
              </div>
              <p className={styles.cardScanLabel}>📱 Scan untuk hadiah & info kopi</p>
              <p className={styles.cardUrl}>{QR_URL}</p>
            </div>

            {/* Footer tagline */}
            <div className={styles.cardFooter} style={{ background: `${product.color}18` }}>
              <span>Premium Specialty Coffee · Sumatera Utara</span>
            </div>
          </div>
        ))}
      </div>

      {/* Print instructions */}
      <div className={styles.printTips}>
        <h3>💡 Tips Mencetak</h3>
        <ul>
          <li>Gunakan kertas stiker atau kertas glossy untuk hasil terbaik</li>
          <li>Pastikan ukuran kertas A4 dan orientasi Portrait</li>
          <li>Pilih "Scale to fit" agar 4 QR code muat dalam 1 halaman</li>
          <li>Setelah dicetak, uji scan QR code sebelum ditempel pada kemasan</li>
        </ul>
      </div>
    </div>
  );
}
