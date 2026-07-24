import { useState, useEffect } from 'react';
import type { StreamItem } from '../data/mockStream';
import './css/thread.css';

interface ThreadModalProps { isOpen: boolean; onClose: () => void; post: StreamItem | null; }

export function ThreadModal({ isOpen, onClose, post }: ThreadModalProps) {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isOpen && "vibrate" in navigator) navigator.vibrate([15]); 
  }, [isOpen]);

  if (!post) return null;

  return (
    <>
      <div className={"thread-underground-overlay " + (isOpen ? "is-active" : "")} onClick={onClose} />
      <div className={"thread-underground-panel " + (isOpen ? "is-active" : "")}>
        <div className="thread-underground-content">
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', cursor: 'pointer', marginBottom: '24px' }}>
            [ X ] CLOSE_HATCH
          </button>
          <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px dashed var(--text-muted)' }}>
            <h2 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-main)', textTransform: 'uppercase' }}>{post.title}</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>{post.text}</p>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            [ // FEEDBACKS_LOADING... ]
          </div>
        </div>
        <div className="thread-input-wrapper">
          <input className="thread-input" placeholder="Syötä signaali..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <button className="thread-send-btn">TRANSMIT</button>
        </div>
      </div>
    </>
  );
}