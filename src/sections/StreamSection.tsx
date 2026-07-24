import { useState } from 'react';
import type { StreamItem } from '../data/mockStream';
import { ThreadModal } from '../common/ThreadModal';
import { Avatar } from '../common/Avatar';
import { BrutalTag } from '../common/BrutalTag';
import '../common/css/stream.css';

export function StreamSection({ items }: { items: StreamItem[] }) {
  const [activeThread, setActiveThread] = useState<StreamItem | null>(null);

  return (
    <>
      <span style={{ color: 'var(--text-muted)', marginBottom: '24px', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
        -- Stream Log ({items.length} Matches) --
      </span>
      <div className="brutal-stream-container">
        {items.map(item => {
          const feedbackText = item.replyCount ? (item.replyCount + ' FEEDBACKS') : 'FEEDBACK';
          return (
            <article className="brutal-fragment" key={item.id}>
              
              {/* Uusi Avatar tuotu sisään */}
              <Avatar name={item.author} />

              <div className="brutal-fragment-main">
                <header className="brutal-fragment-meta">
                  <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="brutal-fragment-author">{item.author}</span>
                    <span>//</span>
                    <span>{item.title}</span>
                  </span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>[ •• ]</button>
                </header>
                
                <p className="brutal-fragment-payload">{item.text}</p>
                
                {item.img && (
                  <div style={{ marginTop: '8px' }}>
                    <img src={item.img} alt="Visual" style={{ maxWidth: '100%', border: '1px solid var(--text-muted)' }} />
                  </div>
                )}
                
                {/* Uudet BrutalTagit kytketty faktioihin ja kiertoratoihin */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <BrutalTag label={item.faction} type="faction" />
                  {item.orbits.map(orbit => <BrutalTag key={orbit} label={orbit} type="orbit" />)}
                  
                  {item.replyCount && (
                    <span style={{ marginLeft: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      ↳ {item.replyCount} FEEDBACKS
                    </span>
                  )}
                </div>

                <div className="brutal-fragment-actions" style={{ marginTop: '12px' }}>
                  <button className="brutal-action-btn" onClick={() => setActiveThread(item)}>[ ↳ {feedbackText} ]</button>
                  <span className="brutal-action-btn">[ // EXTRACT ]</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <ThreadModal isOpen={!!activeThread} onClose={() => setActiveThread(null)} post={activeThread} />
    </>
  );
}