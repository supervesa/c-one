export function BrutalTag({ variant, children }: { variant?: 'amppari' | 'kirppu' | 'orbit' | string, children: React.ReactNode }) {
  let color = 'var(--text-muted)';
  if (variant === 'amppari') color = 'var(--pop-amppari-red)';
  if (variant === 'kirppu') color = 'var(--pop-kirppu-green)';
  
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase',
      color: color, border: '1px solid ' + color, padding: '2px 6px', display: 'inline-block'
    }}>
      {children}
    </span>
  );
}