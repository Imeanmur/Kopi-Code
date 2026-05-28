'use client';

import { useState } from 'react';
import { purchaseHistory, PurchaseRecord } from '../data/coffeeHistory';
import styles from './DigitalHistory.module.css';

type FilterType = 'all' | 'Lintong' | 'Sidikalang';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export default function DigitalHistory() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all'
    ? purchaseHistory
    : purchaseHistory.filter((r) => r.variant === filter);

  const totalSpend = filtered.reduce((sum, r) => sum + r.price, 0);

  return (
    <section className="section" id="digital-history">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <p className="section-label">📋 Digital History</p>
          <h2 className="section-title">
            Riwayat Pembelian <span className="gold-text">Anda</span>
          </h2>
          <p className="section-subtitle">
            Setiap cangkir yang pernah Anda nikmati tersimpan di sini. Transparansi penuh atas
            perjalanan kopi Anda bersama KopiCode.
          </p>
          <div className="divider" />
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryCards}>
          <div className={`${styles.summaryCard} glass-card`} id="summary-total">
            <span className={styles.summaryIcon}>☕</span>
            <div>
              <p className={styles.summaryValue}>{purchaseHistory.length}</p>
              <p className={styles.summaryLabel}>Total Pembelian</p>
            </div>
          </div>
          <div className={`${styles.summaryCard} glass-card`} id="summary-lintong">
            <span className={styles.summaryIcon}>🌿</span>
            <div>
              <p className={styles.summaryValue}>
                {purchaseHistory.filter((r) => r.variant === 'Lintong').length}x
              </p>
              <p className={styles.summaryLabel}>Kopi Lintong</p>
            </div>
          </div>
          <div className={`${styles.summaryCard} glass-card`} id="summary-sidikalang">
            <span className={styles.summaryIcon}>🏔️</span>
            <div>
              <p className={styles.summaryValue}>
                {purchaseHistory.filter((r) => r.variant === 'Sidikalang').length}x
              </p>
              <p className={styles.summaryLabel}>Kopi Sidikalang</p>
            </div>
          </div>
          <div className={`${styles.summaryCard} glass-card`} id="summary-spend">
            <span className={styles.summaryIcon}>💰</span>
            <div>
              <p className={styles.summaryValue} style={{ fontSize: '1.1rem' }}>
                {formatPrice(purchaseHistory.reduce((s, r) => s + r.price, 0))}
              </p>
              <p className={styles.summaryLabel}>Total Pengeluaran</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className={styles.filterRow}>
          {(['all', 'Lintong', 'Sidikalang'] as FilterType[]).map((f) => (
            <button
              key={f}
              id={`filter-${f}`}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '✨ Semua' : f === 'Lintong' ? '🌿 Lintong' : '🏔️ Sidikalang'}
            </button>
          ))}
        </div>

        {/* Table / Timeline */}
        <div className={`${styles.tableWrap} glass-card`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Tanggal</th>
                <th>Produk</th>
                <th>Varian</th>
                <th>Roast</th>
                <th>Berat</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record: PurchaseRecord, idx) => (
                <tr key={record.id} className={styles.row} style={{ animationDelay: `${idx * 0.08}s` }}>
                  <td>
                    <code className={styles.idBadge}>{record.id}</code>
                  </td>
                  <td className={styles.dateCell}>{formatDate(record.date)}</td>
                  <td className={styles.productCell}>{record.product}</td>
                  <td>
                    <span className={`${styles.variantBadge} ${record.variant === 'Lintong' ? styles.variantLintong : styles.variantSidikalang}`}>
                      {record.variant === 'Lintong' ? '🌿' : '🏔️'} {record.variant}
                    </span>
                  </td>
                  <td className={styles.roastCell}>{record.roast}</td>
                  <td>{record.weight}</td>
                  <td className={styles.priceCell}>{formatPrice(record.price)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className={styles.totalRow}>
                <td colSpan={6} className={styles.totalLabel}>Total ({filtered.length} transaksi)</td>
                <td className={styles.totalValue}>{formatPrice(totalSpend)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className={styles.note}>
          💡 Data ini tersimpan secara aman di sistem KopiCode dan diperbarui setiap kali Anda melakukan
          pemindaian QR Code pada kemasan.
        </p>
      </div>
    </section>
  );
}
