import { useState } from 'react';

export function HeroBox({ currentRoute = 'stream' }: { currentRoute?: string }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <section className="hero-section" style={{ marginBottom: '40px' }}>
      <div className="action-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        
        <div>
          <p className="hero-subtitle" style={{ marginTop: 0, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            LAYER 1 // SECURE
          </p>
          {/* Uuden rakenteen vaatima reititystieto sulautettuna vanhaan tyyliin */}
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-main)', fontSize: '10px', marginTop: '8px' }}>
            [ MODULE: {currentRoute.toUpperCase()} ]
          </p>
        </div>
         
        {/* Popoverin laukaisin alkuperäisellä logiikalla */}
        <div style={{ position: 'relative' }}>
          <button 
            className="brutal-btn"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            style={{ background: 'none', border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: '12px', cursor: 'pointer' }}
          >
            {isPopoverOpen ? '[ CLOSE ]' : '[ SYS_ACT ]'}
          </button>
           
          {/* Brutalistinen Popover */}
          {isPopoverOpen && (
            <div className="popover-container" style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 0, 
              background: 'var(--bg-color)', 
              border: '2px solid var(--text-main)', 
              marginTop: '8px', 
              zIndex: 100, 
              display: 'flex', 
              flexDirection: 'column', 
              minWidth: '160px',
              boxShadow: '4px 4px 0 var(--text-main)'
            }}>
              <button className="popover-item" style={{ background: 'none', border: 'none', borderBottom: '1px dashed var(--text-muted)', color: 'var(--text-main)', padding: '12px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '11px', cursor: 'pointer' }}>
                Ping Network
              </button>
              <button className="popover-item" style={{ background: 'none', border: 'none', borderBottom: '1px dashed var(--text-muted)', color: 'var(--text-main)', padding: '12px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '11px', cursor: 'pointer' }}>
                Force Sync
              </button>
              <button className="popover-item accent" style={{ background: 'none', border: 'none', color: 'var(--pop-amppari-red)', padding: '12px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '11px', cursor: 'pointer' }}>
                Purge Trace
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Alkuperäinen raskas typografia */}
      <h1 className="hero-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '3.5rem', lineHeight: '1', color: 'var(--text-main)', margin: '0 0 24px 0', letterSpacing: '-2px' }}>
        COLLECTIVE<br/>ONE
      </h1>
      
      {/* Alkuperäinen jakaja */}
      <div className="ascii-divider" style={{ borderBottom: '2px dashed var(--text-main)', width: '100%' }}></div>
    </section>
  );
}