import { useState } from 'react';
import { BrutalInput, BrutalCheckbox, BrutalToggle, BrutalSelect, BrutalFieldset } from '../common/Forms';
import { Button } from '../common/Buttons';
import { Avatar } from '../common/Avatar';
import { SystemAlert, AlertMessage, AlertVariant } from '../common/Alert'; // UUSI TUONTI

export function IdentityPage() {
  const [alias, setAlias] = useState('supervesa');
  const [location, setLocation] = useState('');
  const [networkState, setNetworkState] = useState(true);
  const [faction, setFaction] = useState('kirppu');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // UUSI TILA: Ilmoitusjärjestelmä
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  // Funktio, joka "laukaisee" uuden ilmoituksen
  const triggerAlert = (type: AlertVariant, message: string) => {
    const newAlert = { id: Date.now(), type, message };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter(alert => alert.id !== id));
  };

  const getInitials = (name: string) => name.substring(0, 2).toUpperCase() || 'ID';

  const factionOptions = [
    { value: 'kirppu', label: 'FACTION: KIRPPU (Green)' },
    { value: 'amppari', label: 'FACTION: AMPPARI (Red)' },
    { value: 'rogue', label: 'FACTION: UNALIGNED' }
  ];

  const handleUpdate = () => {
    // Korvattiin vanha selaimen alert uudella success-viestillä
    triggerAlert('success', 'IDENTITY_UPDATE_COMMITTED');
  };

  return (
    <section style={{ padding: '24px', textAlign: 'left' }}>
      
      {/* --- TOAST CONTAINER (Näyttää kaikki aktiiviset ilmoitukset) --- */}
      <div className="brutal-toast-container">
        {alerts.map(alert => (
          <SystemAlert 
            key={alert.id} 
            alert={alert} 
            onClose={removeAlert} 
          />
        ))}
      </div>
      
      {/* Yläosan IDENTITY CARD pysyy aivan samana... */}
      <h2 style={{ fontSize: '16px', marginBottom: '16px', textTransform: 'uppercase', color: 'var(--text-main)' }}>
        // NODE_IDENTITY
      </h2>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', alignItems: 'stretch' }}>
        <Avatar size="lg" fallback={getInitials(alias)} />
        <div style={{ flex: 1, border: '1px solid var(--text-main)', padding: '0 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-standard)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '11px', lineHeight: '2', margin: 0 }}>
            <span style={{ color: 'var(--text-muted)' }}>&gt; SUNDIAL_ID:</span> {alias.toUpperCase() || 'UNKNOWN_NODE'}<br/>
            <span style={{ color: 'var(--text-muted)' }}>&gt; ALIGNED_FACTION:</span> {faction.toUpperCase()}<br/>
            <span style={{ color: 'var(--text-muted)' }}>&gt; STATUS:</span> <span style={{ color: networkState ? 'var(--pop-kirppu-green)' : 'var(--text-muted)' }}>{networkState ? 'TRANSMITTING' : 'SILENT_MODE'}</span>
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <BrutalFieldset legend="Node Configuration">
          <BrutalInput label="UPDATE_ALIAS" meta="REQUIRED" placeholder="[ ENTER_NEW_ALIAS ]" value={alias} onChange={(e) => setAlias(e.target.value)} />
          <BrutalSelect label="NETWORK_ALIGNMENT" options={factionOptions} value={faction} onChange={setFaction} />
        </BrutalFieldset>

        <BrutalFieldset legend="Network Uplink">
          <BrutalToggle label="NODE_TRANSMISSION" checked={networkState} onChange={setNetworkState} onText="TRANSMITTING" offText="SILENT_MODE" />
          <div style={{ marginTop: '16px', marginBottom: '8px' }}>
            <BrutalCheckbox label="ACCEPT_TELEMETRY_TERMS" checked={termsAccepted} onChange={setTermsAccepted} />
          </div>
        </BrutalFieldset>

        <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
          <Button variant="primary" block onClick={handleUpdate}>
            COMMIT_CHANGES
          </Button>

          {/* TESTINAPIT HÄLYTYKSILLE */}
          <Button variant="secondary" onClick={() => triggerAlert('neutral', 'BACKGROUND_SYNC_COMPLETE')}>
            TEST NEUTRAL
          </Button>
          <Button variant="negative" onClick={() => triggerAlert('attention', 'SIGNAL_LOST: RECONNECTING...')}>
            TEST ATTENTION
          </Button>
        </div>

      </div>
    </section>
  );
}