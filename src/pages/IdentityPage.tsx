import { HeroBox } from '../sections/HeroBox';
import '../common/css/forms.css';

export function IdentityPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div style={{ padding: '24px', minHeight: '100dvh', background: 'var(--bg-color)' }}>
      <HeroBox onNavigate={onNavigate} currentRoute="identity" />
      
      <main style={{ maxWidth: '680px', margin: '0 auto', paddingTop: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '32px', fontSize: '16px', letterSpacing: '2px' }}>
          Identity Configuration
        </h2>
        
        <form className="brutal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="brutal-form-group">
            <label className="brutal-label">Codename / Callsign</label>
            <input type="text" className="brutal-input" defaultValue="supervesa" />
          </div>
          
          <div className="brutal-form-group">
            <label className="brutal-label">Faction Alignment</label>
            <select className="brutal-select" defaultValue="kirppu">
              <option value="kirppu">KIRPPU (Scavenger / Art)</option>
              <option value="amppari">AMPPARI (System / Logic)</option>
            </select>
          </div>
          
          <div className="brutal-form-group">
            <label className="brutal-label">Active Orbits (Comma separated)</label>
            <input type="text" className="brutal-input" defaultValue="design, art, tech" />
          </div>

          <button className="brutal-button" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
            UPDATE_RECORDS
          </button>
        </form>
      </main>
    </div>
  );
}