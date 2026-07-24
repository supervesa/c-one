export function InputMenu({ isOpen, onSelect }: { isOpen: boolean, onSelect: (val: string) => void }) {
  if (!isOpen) return null;
  
  const options = ['ATTACH_COORD', 'ENCRYPT_PAYLOAD', 'ADD_VISUAL'];
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '100%',
      left: 0,
      background: 'var(--bg-color)',
      border: '1px solid var(--text-main)',
      borderBottom: 'none',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '200px',
      zIndex: 2002
    }}>
      {options.map(opt => (
        <button 
          key={opt}
          onClick={() => onSelect(opt)}
          style={{
            background: 'none', border: 'none', borderBottom: '1px dashed var(--text-muted)',
            color: 'var(--text-main)', padding: '12px', fontFamily: 'var(--font-mono)',
            fontSize: '10px', textAlign: 'left', cursor: 'pointer', textTransform: 'uppercase'
          }}
        >
          + {opt}
        </button>
      ))}
    </div>
  );
}