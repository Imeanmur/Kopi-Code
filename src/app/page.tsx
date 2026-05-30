import { Suspense } from 'react';
import RevealGate from './components/RevealGate';

function LoadingFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0604',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 12px rgba(201,144,74,0.5))' }}>☕</span>
      <p style={{ fontFamily: 'sans-serif', color: '#b8975a', fontSize: '0.9rem' }}>
        Memuat KopiCode…
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <RevealGate />
      </Suspense>
    </main>
  );
}
