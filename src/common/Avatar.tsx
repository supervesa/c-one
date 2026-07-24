export function Avatar({ name, size = 32 }: { name: string, size?: number }) {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  return (
    <div style={{
      width: size,
      height: size,
      minWidth: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--text-main)',
      color: 'var(--bg-color)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'bold',
      fontSize: size * 0.5,
      border: '1px solid var(--text-main)'
    }}>
      {initial}
    </div>
  );
}