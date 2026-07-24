import { MOCK_STREAM } from '../data/mockStream';
import { StreamSection } from '../sections/StreamSection';

export function CanvasPage() {
  return (
    <div style={{ padding: '24px', minHeight: '100dvh', background: 'var(--bg-color)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '2px solid var(--text-main)', paddingBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', margin: 0, fontSize: '20px', color: 'var(--text-main)', textTransform: 'uppercase' }}>
          C-ONE // ZEN & FLOW
        </h1>
      </header>
      <main>
        <StreamSection items={MOCK_STREAM} />
      </main>
    </div>
  );
}