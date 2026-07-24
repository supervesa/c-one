import { useState, useEffect } from 'react';
import './css/popover.css';

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Sähköinen haptinen palaute kun menu pamahtaa auki
  useEffect(() => {
    if (isOpen && "vibrate" in navigator) navigator.vibrate([20, 50, 20]);
  }, [isOpen]);

  const menuItems = ['INITIATE_PURGE', 'RECALIBRATE_MATRIX', 'TOGGLE_GHOST_MODE', 'FORCE_SYNC'];

  return (
    <>
      <button className="brutal-cmd-btn-aggressive" onClick={() => setIsOpen(true)}>
        [ /// CMD ]
      </button>

      <div className={"brutal-cmd-overlay " + (isOpen ? "is-active" : "")}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '2px solid var(--text-main)', paddingBottom: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', margin: 0, color: 'var(--text-main)', fontSize: '24px' }}>
            SYS_COMMAND_CENTER
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '20px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}
          >
            [ X ]
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          {menuItems.map(cmd => (
            <button 
              key={cmd}
              style={{
                background: 'transparent',
                border: '1px solid var(--text-main)',
                color: 'var(--text-main)',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                textAlign: 'left',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--text-main)'; e.currentTarget.style.color = 'var(--bg-color)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              {'>'} {cmd}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}