import fs from 'fs';

// 1. Luodaan kansiot
const dirs = ['src/common/css', 'src/data', 'src/sections', 'src/pages'];
dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

// 2. Määritellään tiedostot
const files = {
  'src/common/css/stream.css': `
.brutal-stream-container { display: flex; flex-direction: column; max-width: 680px; margin: 0 auto; }
.brutal-fragment { display: flex; gap: 16px; padding: 24px 0; border-bottom: 1px dashed color-mix(in srgb, var(--text-main) 15%, transparent); transition: background 0.3s ease; }
.brutal-fragment:hover { background: linear-gradient(90deg, color-mix(in srgb, var(--text-main) 2%, transparent) 0%, transparent 100%); }
.brutal-fragment-main { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.brutal-fragment-meta { display: flex; justify-content: space-between; align-items: baseline; font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
.brutal-fragment-author { color: var(--text-main); font-weight: bold; }
.brutal-fragment-payload { font-size: 14px; line-height: 1.6; color: var(--text-main); white-space: pre-wrap; }
.brutal-fragment-actions { display: flex; gap: 16px; font-family: var(--font-mono); font-size: 10px; opacity: 0; transition: opacity 0.2s ease; }
.brutal-fragment:hover .brutal-fragment-actions { opacity: 1; }
.brutal-action-btn { cursor: pointer; color: var(--text-muted); text-transform: uppercase; background: none; border: none; padding: 0; }
.brutal-action-btn:hover { color: var(--text-main); }
`,

  'src/common/css/thread.css': `
.thread-underground-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; background: rgba(0, 0, 0, 0.85); z-index: 2000; opacity: 0; pointer-events: none; transition: opacity 0.2s ease; }
.thread-underground-overlay.is-active { opacity: 1; pointer-events: auto; }
.thread-underground-panel { position: fixed; bottom: 0; left: 0; width: 100%; height: 90dvh; background: var(--bg-color); border-top: 1px solid var(--text-main); box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.9); z-index: 2001; transform: translateY(100%); transition: transform 0.25s cubic-bezier(0.1, 0.9, 0.2, 1); }
.thread-underground-panel.is-active { transform: translateY(0); }
.thread-underground-content { height: calc(100% - 60px); overflow-y: auto; padding: 24px; }
.thread-input-wrapper { position: absolute; bottom: 0; left: 0; width: 100%; background: var(--bg-color); border-top: 2px solid var(--text-main); padding: 10px; display: flex; gap: 8px; }
.thread-input { flex: 1; background: transparent; border: 1px solid var(--text-muted); color: var(--text-main); padding: 10px; font-family: var(--font-mono); font-size: 14px; }
.thread-send-btn { background: var(--text-main); color: var(--bg-color); border: none; padding: 0 16px; font-family: var(--font-mono); font-weight: bold; cursor: pointer; text-transform: uppercase; }
`,

  'src/data/mockStream.ts': `
export interface StreamItem { id: number; author: string; title: string; text: string; tag: string; faction: 'amppari' | 'kirppu'; orbits: string[]; replyCount?: number; img?: string; }
export const MOCK_STREAM: StreamItem[] = [
  { id: 1, author: "sys_admin", title: "INIT_SEQUENCE", text: "Järjestelmä alustettu. Tarkkaillaan paikallista signaaliliikennettä.", tag: "SYS_LOG", faction: "amppari", orbits: ["sys"], replyCount: 3 },
  { id: 2, author: "kirppu_user", title: "DESIGN_THOUGHT", text: "Asymmetrinen tila digitaaliselle ilmaisulle tuntuu nyt oikealta. Raskaat animaatiot hidastavat vain flow'ta.", tag: "UI_UX", faction: "kirppu", orbits: ["design", "flow"] },
  { id: 3, author: "supervesa", title: "VISUAL_REF", text: "Löysin mielenkiintoisen tekstuurin, joka sopii kellarikerroksen taustalle.", tag: "ASSET", faction: "kirppu", orbits: ["art"], replyCount: 1, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" }
];
`,

  'src/common/ThreadModal.tsx': `
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
`,

  'src/sections/StreamSection.tsx': `
import { useState } from 'react';
import type { StreamItem } from '../data/mockStream';
import { ThreadModal } from '../common/ThreadModal';
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
              <div className="brutal-fragment-main">
                <header className="brutal-fragment-meta">
                  <span style={{ display: 'flex', gap: '8px' }}><span className="brutal-fragment-author">{item.author}</span><span>//</span><span>{item.title}</span></span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>[ •• ]</button>
                </header>
                <p className="brutal-fragment-payload">{item.text}</p>
                {item.img && <div style={{ marginTop: '8px' }}><img src={item.img} alt="Visual" style={{ maxWidth: '100%', border: '1px solid var(--text-muted)' }} /></div>}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <span>[{item.faction}]</span>
                  {item.orbits.map(orbit => <span key={orbit}>[+{orbit}]</span>)}
                  {item.replyCount && <span style={{ marginLeft: '4px' }}>↳ {item.replyCount} FEEDBACKS</span>}
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
`,

  'src/pages/CanvasPage.tsx': `
import { MOCK_STREAM } from '../data/mockStream';
import { StreamSection } from '../sections/StreamSection';

export function CanvasPage() {
  return (
    <div style={{ padding: '24px', minHeight: '100dvh', background: 'var(--bg-color)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '2px solid var(--text-main)', paddingBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', margin: 0, fontSize: '20px', color: 'var(--text-main)', textTransform: 'uppercase' }}>
          C-ONE // ZEN & FLOW
        </h1>
      </header>
      <main>
        <StreamSection items={MOCK_STREAM} />
      </main>
    </div>
  );
}
`,

  'src/App.tsx': `
import { CanvasPage } from './pages/CanvasPage';
import './index.css';

export default function App() {
  return <CanvasPage />;
}
`,

  'src/index.css': `
:root {
  --bg-color: #0d0d0d;
  --text-main: #e0e0e0;
  --text-muted: #666666;
  --font-mono: 'Courier New', Courier, monospace;
}
body {
  background-color: var(--bg-color);
  color: var(--text-main);
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
* { box-sizing: border-box; }
`
};

// 3. Kirjoitetaan tiedostot järjestelmään
Object.keys(files).forEach(file => {
  fs.writeFileSync(file, files[file].trim(), 'utf8');
  console.log('✓ Luotiin ' + file);
});

console.log('\n[ ! ] Rakennus valmis! Koodit injektoitu onnistuneesti.');