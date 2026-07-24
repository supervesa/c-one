import { useState } from 'react'; // Tuodaan tilanhallinta
import { Palette, Eye } from 'lucide-react';
// Poistettu: import { Link } from 'react-router-dom';
import type { StreamItem } from '../data/mockStream';
import { BrutalTag } from '../common/BrutalTag';
import { Avatar } from '../common/Avatar';
import { ThreadModal } from '../common/ThreadModal'; // Tuodaan uusi kellariluukku
import '../common/css/stream.css';

interface StreamSectionProps {
  items: StreamItem[];
  activeCardMenuId: number | null;
  setActiveCardMenuId: (id: number | null) => void;
}

export function StreamSection({
  items,
  activeCardMenuId,
  setActiveCardMenuId,
}: StreamSectionProps) {
  // TILA: Hallitsee kellarin aukaisua ja valittua fragmenttia
  const [activeThread, setActiveThread] = useState<StreamItem | null>(null);

  return (
    <>
      <span className="font-data-micro" style={{ color: 'var(--text-muted)', marginBottom: '24px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>
        -- Stream Log ({items.length} Matches) --
      </span>
      
      <div className="brutal-stream-container">
        {items.map(item => {
          const initials = item.author ? item.author.substring(0, 2).toUpperCase() : 'ID';
          
          // Oletetaan, että datassa voi olla replyCount (esim. 3). Jos ei ole, näytetään vain "FEEDBACK"
          const feedbackText = item.replyCount ? `${item.replyCount} FEEDBACKS` : 'FEEDBACK';

          return (
            <article className="brutal-fragment" key={item.id}>
              
              <Avatar size="sm" fallback={initials} />
              
              <div className="brutal-fragment-main">
                
                {/* YLÄRIVI */}
                <header className="brutal-fragment-meta" style={{ position: 'relative' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="brutal-fragment-author">{item.author}</span>
                    <span style={{ color: 'var(--text-muted)' }}>//</span>
                    <Palette size={10} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-muted)' }}>{item.title}</span>
                  </span>
                  
                  {/* Valikko [ •• ] */}
                  <div className="font-action">
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                      onClick={() => setActiveCardMenuId(activeCardMenuId === item.id ? null : item.id)}
                    >
                      [ •• ]
                    </button>
                    
                    {activeCardMenuId === item.id && (
                      <div className="panel-popover" style={{ top: '100%', right: '0', zIndex: 10 }}>
                        <button className="panel-popover-btn" onClick={() => setActiveCardMenuId(null)}>&gt; Collect Aura</button>
                        <button className="panel-popover-btn" onClick={() => setActiveCardMenuId(null)}>&gt; Pin Fragment</button>
                        <button className="panel-popover-btn alert" onClick={() => setActiveCardMenuId(null)}>&gt; Hide Trace</button>
                      </div>
                    )}
                  </div>
                </header>
                
                {/* TEKSTI */}
                <p className="brutal-fragment-payload">{item.text}</p>

                {/* KUVA JA OVERLAY */}
                {item.img && (
                  <div className="image-wrapper" style={{ marginTop: '8px' }}>
                    <img src={item.img} alt="Fragment Visual" />
                    <div className="image-overlay font-data-micro">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={10} strokeWidth={1} /> {item.tag}
                      </span>
                      <span>SCAN_OK</span>
                    </div>
                  </div>
                )}

                {/* TAGIT JA HILJAINEN INDIKAATTORI */}
                <div className="tag-container font-data-micro" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <BrutalTag variant={item.faction === 'amppari' ? 'amppari' : 'kirppu'}>
                    {`[ ${item.faction} ]`}
                  </BrutalTag>
                  {item.orbits.map(orbit => (
                    <BrutalTag key={orbit}>
                      {`[ +${orbit} ]`}
                    </BrutalTag>
                  ))}
                  
                  {/* Pysyvä hiljainen indikaattori ketjun koosta (jos vastauksia on) */}
                  {item.replyCount && item.replyCount > 0 ? (
                    <span style={{ color: 'var(--text-muted)', marginLeft: '4px', letterSpacing: '1px' }}>
                      ↳ {item.replyCount} FEEDBACKS
                    </span>
                  ) : null}
                </div>

                {/* ALARIVI: Kellariluukun laukaisin */}
                <div className="brutal-fragment-actions" style={{ marginTop: '12px' }}>
                  <button 
                    className="brutal-action-btn" 
                    style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
                    onClick={() => setActiveThread(item)}
                  >
                    [ ↳ {feedbackText} ]
                  </button>
                  <span className="brutal-action-btn">[ // EXTRACT ]</span>
                </div>
                
              </div>
            </article>
          );
        })}

        {/* VIRHETILANNE JOS DATA PUUTTUU */}
        {items.length === 0 && (
          <div className="font-data-micro" style={{ color: 'var(--pop-amppari-red)', textAlign: 'center', padding: '24px', border: '1px dashed var(--pop-amppari-red)' }}>
            [ ERROR: NO FACTION X ORBIT INTERSECTIONS FOUND ]
          </div>
        )}
      </div>

      {/* --- MAANALAINEN KERROS (MODAALI) --- */}
      <ThreadModal 
        isOpen={!!activeThread} 
        onClose={() => setActiveThread(null)} 
        post={activeThread} 
      />
    </>
  );
}