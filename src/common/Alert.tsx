export type AlertVariant = 'success' | 'error' | 'sys' | 'neutral' | 'attention';

export interface AlertMessage {
  id: number;
  type: AlertVariant;
  message: string;
}

export function SystemAlert({ alert, onClose }: { alert: AlertMessage, onClose: (id: number) => void }) {
  let borderColor = 'var(--text-main)';
  let color = 'var(--text-main)';
  
  if (alert.type === 'success') { borderColor = 'var(--pop-kirppu-green)'; color = 'var(--pop-kirppu-green)'; }
  if (alert.type === 'error' || alert.type === 'attention') { borderColor = 'var(--pop-amppari-red)'; color = 'var(--pop-amppari-red)'; }
  if (alert.type === 'neutral' || alert.type === 'sys') { borderColor = 'var(--text-muted)'; color = 'var(--text-muted)'; }

  return (
    <div style={{
      border: `1px solid ${borderColor}`,
      color: color,
      padding: '16px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      textTransform: 'uppercase',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--bg-color)',
      boxShadow: `4px 4px 0 ${borderColor}`
    }}>
      <span>[ {alert.type.toUpperCase()} ] // {alert.message}</span>
      <button onClick={() => onClose(alert.id)} style={{ background: 'none', border: 'none', color, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>[ X ]</button>
    </div>
  );
}