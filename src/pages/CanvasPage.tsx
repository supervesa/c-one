import { useState } from 'react';
import { MOCK_STREAM } from '../data/mockStream';
import { StreamSection } from '../sections/StreamSection';
import { HeroBox } from '../sections/HeroBox';
import { FilterBar } from '../sections/FilterBar';

export function CanvasPage() {
  const [filter, setFilter] = useState('all');
  
  const filteredStream = filter === 'all' 
    ? MOCK_STREAM 
    : MOCK_STREAM.filter(item => item.faction === filter);

  return (
    <div className="page-with-nav">
      <HeroBox currentRoute="canvas" />
      <main>
        <FilterBar active={filter} onChange={setFilter} />
        <StreamSection items={filteredStream} />
      </main>
    </div>
  );
}