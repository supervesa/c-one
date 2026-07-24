export function HeroBox({ onNavigate, currentRoute = 'canvas' }: { onNavigate?: (page: string) => void, currentRoute?: string }) {
  return (
    <header style={{ marginBottom: '40px', borderBottom: '2px solid var(--text-main)', paddingBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-mono)', margin: 0, fontSize: '24px', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          C-ONE // ZEN & FLOW
        </h1>
        <div className="font-data-micro" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          [ STATUS: ONLINE ] // ID: SUPERVESA // NODE: LOCAL
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        <div className="font-data-micro" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
          SYS.UPTIME: OK<br/>SIGNAL: ESTABLISHED
        </div>
        {onNavigate && (
          <button 
            className="font-action" 
            onClick={() => onNavigate(currentRoute === 'canvas' ? 'identity' : 'canvas')}
            style={{ background: 'none', border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '4px 8px' }}
          >
            {currentRoute === 'canvas' ? '[ GO_TO: IDENTITY ]' : '[ GO_TO: STREAM ]'}
          </button>
        )}
      </div>
    </header>
  );
}