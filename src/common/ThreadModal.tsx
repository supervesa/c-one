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