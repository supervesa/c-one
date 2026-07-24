import fs from 'fs';

const files = {
  // --- 1. CSS: Järjestelmäilmoitukset (Alerts) ---
  'src/common/css/alerts.css': `
.brutal-alert {
  border: 1px solid var(--text-main);
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 24px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    color-mix(in srgb, var(--text-main) 5%, transparent) 10px,
    color-mix(in srgb, var(--text-main) 5%, transparent) 20px
  );
}
.brutal-alert.sys { border-color: var(--text-muted); color: var(--text-muted); }
.brutal-alert.success { border-color: var(--pop-kirppu-green); color: var(--pop-kirppu-green); }
.brutal-alert.error { border-color: var(--pop-amppari-red); color: var(--pop-amppari-red); }
`,

  // --- 2. CSS: Yhtenäiset painikkeet ---
  'src/common/css/buttons.css': `
.brutal-btn-base {
  font-family: var(--font-mono);
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background: none;
  transition: all 0.2s ease;
}
.brutal-btn-primary {
  background: var(--text-main);
  color: var(--bg-color);
  padding: 12px 24px;
  font-size: 12px;
  font-weight: bold;
}
.brutal-btn-primary:hover { opacity: 0.8; }
.brutal-btn-action {
  color: var(--text-muted);
  font-size: 10px;
  padding: 0;
  letter-spacing: 1px;
}
.brutal-btn-action:hover { color: var(--text-main); }
`,

  // --- 3. Komponentti: Alert (Järjestelmäviestit) ---
  'src/common/Alert.tsx': `
import './css/alerts.css';

export function Alert({ message, type = 'sys' }: { message: string, type?: 'success' | 'error' | 'sys' }) {
  return (
    <div className={"brutal-alert " + type}>
      [ {type.toUpperCase()}_MSG ] // {message}
    </div>
  );
}
`,

  // --- 4. Komponentti: Button (Kapseloitu painike) ---
  'src/common/Button.tsx': `
import './css/buttons.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'action';
  label: string;
}

export function Button({ variant = 'primary', label, className = '', ...props }: ButtonProps) {
  const baseClass = variant === 'primary' ? 'brutal-btn-primary' : 'brutal-btn-action';
  return (
    <button className={"brutal-btn-base " + baseClass + " " + className} {...props}>
      {variant === 'action' ? "[ " + label + " ]" : label}
    </button>
  );
}
`,

  // --- 5. Komponentti: Chip (Interaktiivinen tagi) ---
  'src/common/Chip.tsx': `
export function Chip({ label, active, onClick, colorVar }: { label: string, active: boolean, onClick: () => void, colorVar?: string }) {
  const activeColor = colorVar || 'var(--text-main)';
  const color = active ? activeColor : 'var(--text-muted)';
  
  return (
    <button 
      onClick={onClick}
      style={{
        background: 'none',
        border: '1px solid',
        borderColor: active ? color : 'transparent',
        color: color,
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        padding: '4px 8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        letterSpacing: '1px'
      }}>
      {label}
    </button>
  );
}
`,

  // --- 6. Komponentti: InputMenu (Kellariluukun lisävalikko) ---
  'src/common/InputMenu.tsx': `
export function InputMenu({ isOpen, onSelect }: { isOpen: boolean, onSelect: (val: string) => void }) {
  if (!isOpen) return null;
  
  const options = ['ATTACH_COORD', 'ENCRYPT_PAYLOAD', 'ADD_VISUAL'];
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '100%',
      left: 0,
      background: 'var(--bg-color)',
      border: '1px solid var(--text-main)',
      borderBottom: 'none',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '200px',
      zIndex: 2002
    }}>
      {options.map(opt => (
        <button 
          key={opt}
          onClick={() => onSelect(opt)}
          style={{
            background: 'none', border: 'none', borderBottom: '1px dashed var(--text-muted)',
            color: 'var(--text-main)', padding: '12px', fontFamily: 'var(--font-mono)',
            fontSize: '10px', textAlign: 'left', cursor: 'pointer', textTransform: 'uppercase'
          }}
        >
          + {opt}
        </button>
      ))}
    </div>
  );
}
`,

  // --- 7. PÄIVITYS: ThreadModal (Kytketään InputMenu käyttöön) ---
  'src/common/ThreadModal.tsx': `
import { useState, useEffect } from 'react';
import type { StreamItem } from '../data/mockStream';
import { InputMenu } from './InputMenu';
import { Button } from './Button';
import './css/thread.css';

interface ThreadModalProps { isOpen: boolean; onClose: () => void; post: StreamItem | null; }

export function ThreadModal({ isOpen, onClose, post }: ThreadModalProps) {
  const [comment, setComment] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isOpen && "vibrate" in navigator) navigator.vibrate([15]); 
    if (!isOpen) setMenuOpen(false); // Nollataan kun suljetaan
  }, [isOpen]);

  if (!post) return null;

  return (
    <>
      <div className={"thread-underground-overlay " + (isOpen ? "is-active" : "")} onClick={onClose} />
      <div className={"thread-underground-panel " + (isOpen ? "is-active" : "")}>
        
        <div className="thread-underground-content">
          <Button variant="action" label="CLOSE_HATCH" onClick={onClose} style={{ marginBottom: '24px' }} />
          
          <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px dashed var(--text-muted)' }}>
            <h2 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-main)', textTransform: 'uppercase' }}>{post.title}</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>{post.text}</p>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            [ // FEEDBACKS_LOADING... ]
          </div>
        </div>

        <div className="thread-input-wrapper" style={{ position: 'relative' }}>
          <InputMenu isOpen={menuOpen} onSelect={(val) => { console.log(val); setMenuOpen(false); }} />
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: '1px solid var(--text-muted)', color: 'var(--text-main)', padding: '0 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            +
          </button>
          
          <input 
            className="thread-input" 
            placeholder="Syötä signaali..." 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
          <button className="thread-send-btn">TRANSMIT</button>
        </div>
      </div>
    </>
  );
}
`,

  // --- 8. PÄIVITYS: FilterBar (Kytketään uusi Chip-komponentti) ---
  'src/sections/FilterBar.tsx': `
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
`
};

// Kirjoitetaan tiedostot järjestelmään
Object.keys(files).forEach(file => {
  fs.writeFileSync(file, files[file].trim(), 'utf8');
  console.log('✓ Palautettiin/Päivitettiin: ' + file);
});

console.log('\\n[ ! ] Common-komponentit (Alert, Button, Chip, InputMenu) injektoitu onnistuneesti!');