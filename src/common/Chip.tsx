export function Chip({ label, active, onClick, colorVar }: { label: string, active: boolean, onClick: () => void, colorVar?: string }) {
  const activeColor = colorVar || 'var(--text-main)';
  const color = active ? activeColor : 'var(--text-muted)';
  
  return (
    <button 
      onClick={onClick}
      style={{
        background: 'none',
        border: '1px solid',
        borderColor: active ? color : 'transparent',
        color: color,
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        padding: '4px 8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        letterSpacing: '1px'
      }}>
      {label}
    </button>
  );
}