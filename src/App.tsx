import { useState } from 'react';
import { CanvasPage } from './pages/CanvasPage';
import { IdentityPage } from './pages/IdentityPage';
import { MoodPage } from './pages/MoodPage';
import { BottomNav } from './common/BottomNav';
import './index.css';
import './common/css/nav.css';

export default function App() {
  const [route, setRoute] = useState('canvas');

  return (
    <>
      {route === 'canvas' && <CanvasPage />}
      {route === 'mood' && <MoodPage />}
      {route === 'identity' && <IdentityPage />}
      
      <BottomNav current={route} onNavigate={setRoute} />
    </>
  );
}