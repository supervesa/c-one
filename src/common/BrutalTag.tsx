export function BrutalTag({ label, type = 'orbit' }: { label: string, type?: 'faction' | 'orbit' }) {
  const isAmppari = label.toLowerCase() === 'amppari';
  const isKirppu = label.toLowerCase() === 'kirppu';
  
  let color = 'var(--text-muted)';
  if (type === 'faction') {
    if (isAmppari) color = 'var(--pop-amppari-red)';
    if (isKirppu) color = 'var(--pop-kirppu-green)';
  }

  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      textTransform: 'uppercase',
      color: color,
      border: '1px solid ' + color,
      padding: '2px 6px',
      display: 'inline-block'
    }}>
      {type === 'orbit' ? '+' : ''}{label}
    </span>
  );
}