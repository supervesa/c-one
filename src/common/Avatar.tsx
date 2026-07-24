export function Avatar({ fallback, size = 'md' }: { fallback: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 24, md: 32, lg: 64 };
  const s = sizeMap[size];
  return (
    <div style={{
      width: s, height: s, minWidth: s,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--text-main)', color: 'var(--bg-color)',
      fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: s * 0.4,
      border: '1px solid var(--text-main)'
    }}>
      {fallback}
    </div>
  );
}