import React from 'react';
import './css/forms.css';

export function BrutalFieldset({ legend, children }: { legend: string, children: React.ReactNode }) {
  return (
    <fieldset style={{ 
      /* Himmennetty reunus */
      border: '1px solid color-mix(in srgb, var(--text-main) 30%, transparent)', 
      padding: '24px', 
      marginBottom: '32px',
      /* Hienoinen lasi-gradientti (vaaleasta täysin läpinäkyvään) */
      background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 100%)',
      backdropFilter: 'blur(8px)',
      position: 'relative'
    }}>
      <legend style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '11px', 
        color: 'var(--text-main)', 
        textTransform: 'uppercase', 
        padding: '4px 12px',
        letterSpacing: '2px',
        /* Legendille oma pieni laatikko ja taustaväri, jotta se "leikkaa" viivan kauniisti */
        background: 'var(--bg-color)',
        border: '1px solid color-mix(in srgb, var(--text-main) 30%, transparent)'
      }}>
        [ {legend} ]
      </legend>
      {children}
    </fieldset>
  );
}

export function BrutalInput({ label, meta, placeholder, value, onChange }: any) {
  return (
    <div className="brutal-form-group" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <label className="brutal-label">{label}</label>
        {meta && <span className="brutal-label" style={{ color: 'var(--pop-amppari-red)' }}>{meta}</span>}
      </div>
      <input 
        className="brutal-input" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        style={{ background: 'rgba(0,0,0,0.2)' }} 
      />
    </div>
  );
}

export function BrutalSelect({ label, options, value, onChange }: any) {
  return (
    <div className="brutal-form-group" style={{ marginBottom: '20px' }}>
      <label className="brutal-label" style={{ marginBottom: '8px' }}>{label}</label>
      <select 
        className="brutal-select" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        style={{ background: 'rgba(0,0,0,0.2)' }}
      >
        {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}

export function BrutalCheckbox({ label, checked, onChange }: any) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-main)', transition: 'color 0.2s' }}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
        style={{ 
          appearance: 'none',
          width: '16px', height: '16px',
          border: '1px solid var(--text-main)',
          background: checked ? 'var(--text-main)' : 'transparent',
          cursor: 'pointer'
        }} 
      />
      {label}
    </label>
  );
}

export function BrutalToggle({ label, checked, onChange, onText, offText }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px dashed color-mix(in srgb, var(--text-muted) 30%, transparent)' }}>
      <span className="brutal-label">{label}</span>
      <button 
        onClick={() => onChange(!checked)}
        style={{
          background: checked ? 'var(--text-main)' : 'transparent',
          color: checked ? 'var(--bg-color)' : 'var(--text-muted)',
          border: '1px solid var(--text-main)',
          padding: '6px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {checked ? onText : offText}
      </button>
    </div>
  );
}