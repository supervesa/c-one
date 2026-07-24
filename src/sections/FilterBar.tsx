import { Chip } from '../common/Chip';

export function FilterBar({ active, onChange }: { active: string, onChange: (f: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--text-muted)', paddingBottom: '16px', maxWidth: '680px', margin: '0 auto 32px auto', alignItems: 'center' }}>
      <span className="font-data-micro" style={{ color: 'var(--text-muted)', marginRight: '8px' }}>// SIGNAL_FILTER:</span>
      
      <Chip label="ALL" active={active === 'all'} onClick={() => onChange('all')} />
      <Chip label="AMPPARI" active={active === 'amppari'} onClick={() => onChange('amppari')} colorVar="var(--pop-amppari-red)" />
      <Chip label="KIRPPU" active={active === 'kirppu'} onClick={() => onChange('kirppu')} colorVar="var(--pop-kirppu-green)" />
    </div>
  );
}