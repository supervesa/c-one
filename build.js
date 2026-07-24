import fs from 'fs';

const files = {
  // --- 1. UUSI: Forms.tsx (Lomakekomponentit) ---
  'src/common/Forms.tsx': `
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
`,

  // --- 2. UUSI: Buttons.tsx (Napit IdentityPagelle) ---
  'src/common/Buttons.tsx': `
import React from 'react';
import './css/buttons.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'negative' | 'action';
  block?: boolean;
}

export function Button({ variant = 'primary', block, className = '', children, ...props }: ButtonProps) {
  let inlineStyle: React.CSSProperties = { 
    width: block ? '100%' : 'auto',
    border: '1px solid var(--text-main)',
    background: variant === 'primary' ? 'var(--text-main)' : 'transparent',
    color: variant === 'primary' ? 'var(--bg-color)' : (variant === 'negative' ? 'var(--pop-amppari-red)' : 'var(--text-main)'),
    borderColor: variant === 'negative' ? 'var(--pop-amppari-red)' : 'var(--text-main)',
    padding: '12px 24px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    flex: block ? 'none' : 1
  };

  return (
    <button style={inlineStyle} {...props}>
      {children}
    </button>
  );
}
`,

  // --- 3. PÄIVITYS: Alert.tsx (Tyypitetty SystemAlert) ---
  'src/common/Alert.tsx': `
export type AlertVariant = 'success' | 'error' | 'sys' | 'neutral' | 'attention';

export interface AlertMessage {
  id: number;
  type: AlertVariant;
  message: string;
}

export function SystemAlert({ alert, onClose }: { alert: AlertMessage, onClose: (id: number) => void }) {
  let borderColor = 'var(--text-main)';
  let color = 'var(--text-main)';
  
  if (alert.type === 'success') { borderColor = 'var(--pop-kirppu-green)'; color = 'var(--pop-kirppu-green)'; }
  if (alert.type === 'error' || alert.type === 'attention') { borderColor = 'var(--pop-amppari-red)'; color = 'var(--pop-amppari-red)'; }
  if (alert.type === 'neutral' || alert.type === 'sys') { borderColor = 'var(--text-muted)'; color = 'var(--text-muted)'; }

  return (
    <div style={{
      border: \`1px solid \${borderColor}\`,
      color: color,
      padding: '16px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      textTransform: 'uppercase',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--bg-color)',
      boxShadow: \`4px 4px 0 \${borderColor}\`
    }}>
      <span>[ {alert.type.toUpperCase()} ] // {alert.message}</span>
      <button onClick={() => onClose(alert.id)} style={{ background: 'none', border: 'none', color, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>[ X ]</button>
    </div>
  );
}
`,

  // --- 4. PÄIVITYS: Avatar.tsx (Tukee nyt 'fallback' ja 'size') ---
  'src/common/Avatar.tsx': `
export function Avatar({ fallback, size = 'md' }: { fallback: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 24, md: 32, lg: 64 };
  const s = sizeMap[size];
  return (
    <div style={{
      width: s, height: s, minWidth: s,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--text-main)', color: 'var(--bg-color)',
      fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: s * 0.4,
      border: '1px solid var(--text-main)'
    }}>
      {fallback}
    </div>
  );
}
`,

  // --- 5. PÄIVITYS: BrutalTag.tsx (Tukee nyt 'variant' ja 'children') ---
  'src/common/BrutalTag.tsx': `
export function BrutalTag({ variant, children }: { variant?: 'amppari' | 'kirppu' | 'orbit' | string, children: React.ReactNode }) {
  let color = 'var(--text-muted)';
  if (variant === 'amppari') color = 'var(--pop-amppari-red)';
  if (variant === 'kirppu') color = 'var(--pop-kirppu-green)';
  
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase',
      color: color, border: '1px solid ' + color, padding: '2px 6px', display: 'inline-block'
    }}>
      {children}
    </span>
  );
}
`,

  // --- 6. PÄIVITYS: CSS (Toast-ilmoitusten kontti oikeaan yläkulmaan) ---
  'src/common/css/alerts.css': `
.brutal-toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}
`
};

Object.keys(files).forEach(file => {
  fs.writeFileSync(file, files[file].trim(), 'utf8');
  console.log('✓ Luotu/Päivitetty yhteensopivaksi: ' + file);
});

console.log('\\n[ ! ] Puuttuvat riippuvuudet korjattu! Viten pitäisi nyt kääntyä.');