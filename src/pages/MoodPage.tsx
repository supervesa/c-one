import { HeroBox } from '../sections/HeroBox';

export function MoodPage() {
  return (
    <div className="page-with-nav">
      <HeroBox currentRoute="mood" />
      
      <main style={{ maxWidth: '680px', margin: '0 auto', paddingTop: '40px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          [ // MOOD_MATRIX_LOADING... ]
        </div>
        <div style={{ marginTop: '24px', width: '100%', height: '2px', background: 'var(--text-muted)', opacity: 0.3 }} />
      </main>
    </div>
  );
}