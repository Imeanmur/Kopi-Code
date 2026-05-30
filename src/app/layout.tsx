import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0604',
};

export const metadata: Metadata = {
  title: 'KopiCode — Kopi Lintong & Sidikalang Premium',
  description:
    'Temukan pengalaman minum kopi premium dari dataran tinggi Sumatera Utara. Pelajari sejarah Kopi Lintong dan Kopi Sidikalang, lacak riwayat pembelian Anda, dan nikmati rekomendasi personal dari KopiCode.',
  keywords: [
    'Kopi Lintong',
    'Kopi Sidikalang',
    'Kopi Sumatera',
    'KopiCode',
    'kopi premium',
    'kopi specialty',
    'Sumatera Utara',
  ],
  authors: [{ name: 'KopiCode Team' }],
  openGraph: {
    title: 'KopiCode — Kopi Lintong & Sidikalang Premium',
    description:
      'Dari petani lokal Sumatera Utara langsung ke cangkir Anda. Kopi specialty dengan cerita di setiap tegukan.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KopiCode — Kopi Premium Sumatera Utara',
    description:
      'Kopi Lintong & Sidikalang — specialty coffee dengan sejarah, rasa, dan makna.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
