import { useState } from 'react';
import { MOCK_STREAM } from '../data/mockStream';
import { StreamSection } from '../sections/StreamSection';
import { HeroBox } from '../sections/HeroBox';
import { FilterBar } from '../sections/FilterBar';

export function CanvasPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [filter, setFilter] = useState('all');
  
  // Suodatetaan data valinnan mukaan
  const filteredStream = filter === 'all' 
    ? MOCK_STREAM 
    : MOCK_STREAM.filter(item => item.faction === filter);

  return (
    <div style={{ padding: '24px', minHeight: '100dvh', background: 'var(--bg-color)' }}>
      <HeroBox onNavigate={onNavigate} currentRoute="canvas" />
      <main>
        <FilterBar active={filter} onChange={setFilter} />
        <StreamSection items={filteredStream} />
      </main>
    </div>
  );
}