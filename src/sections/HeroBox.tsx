import { CommandMenu } from '../common/CommandMenu';
import { Popover } from '../common/Popover';

export function HeroBox({ currentRoute = 'canvas' }: { currentRoute?: string }) {
  return (
    <header style={{ marginBottom: '40px', borderBottom: '2px solid var(--text-main)', paddingBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-mono)', margin: 0, fontSize: '24px', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          C-ONE // {currentRoute}
        </h1>
        <div className="font-data-micro" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          [ STATUS: ONLINE ] // ID: SUPERVESA // NODE: LOCAL
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
        
        {/* Nappirivi oikeassa yläkulmassa */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          
          {/* Brutal Popover -esimerkki */}
          <Popover trigger={
            <button style={{ background: 'none', border: '1px dashed var(--text-muted)', color: 'var(--text-muted)', padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '10px', cursor: 'pointer' }}>
              [ SYS_INFO ]
            </button>
          }>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>UPTIME: <span style={{ color: 'var(--pop-kirppu-green)' }}>99.9%</span></div>
              <div>LATENCY: <span style={{ color: 'var(--pop-amppari-red)' }}>14ms</span></div>
              <div style={{ borderTop: '1px dashed var(--text-muted)', paddingTop: '8px', marginTop: '4px' }}>
                SIGNAL: STRONG
              </div>
            </div>
          </Popover>

          {/* Agressiivinen Menu */}
          <CommandMenu />
          
        </div>

      </div>
    </header>
  );
}