import React from 'react';
import './css/forms.css';

export function BrutalFieldset({ legend, children }: { legend: string, children: React.ReactNode }) {
  return (
    <fieldset style={{ border: '1px solid var(--text-main)', padding: '16px', marginBottom: '24px' }}>
      <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0 8px' }}>
        [ {legend} ]
      </legend>
      {children}
    </fieldset>
  );
}

export function BrutalInput({ label, meta, placeholder, value, onChange }: any) {
  return (
    <div className="brutal-form-group" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label className="brutal-label">{label}</label>
        {meta && <span className="brutal-label" style={{ color: 'var(--pop-amppari-red)' }}>{meta}</span>}
      </div>
      <input className="brutal-input" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export function BrutalSelect({ label, options, value, onChange }: any) {
  return (
    <div className="brutal-form-group" style={{ marginBottom: '16px' }}>
      <label className="brutal-label">{label}</label>
      <select className="brutal-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}

export function BrutalCheckbox({ label, checked, onChange }: any) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-main)' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ accentColor: 'var(--text-main)' }} />
      {label}
    </label>
  );
}

export function BrutalToggle({ label, checked, onChange, onText, offText }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <span className="brutal-label">{label}</span>
      <button 
        onClick={() => onChange(!checked)}
        style={{
          background: checked ? 'var(--text-main)' : 'transparent',
          color: checked ? 'var(--bg-color)' : 'var(--text-muted)',
          border: '1px solid var(--text-main)',
          padding: '4px 8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          cursor: 'pointer'
        }}
      >
        {checked ? onText : offText}
      </button>
    </div>
  );
}