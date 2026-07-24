import { useState } from 'react';
import { CanvasPage } from './pages/CanvasPage';
import { IdentityPage } from './pages/IdentityPage';
import './index.css';

export default function App() {
  const [route, setRoute] = useState('canvas');

  if (route === 'identity') {
    return <IdentityPage onNavigate={setRoute} />;
  }

  return <CanvasPage onNavigate={setRoute} />;
}