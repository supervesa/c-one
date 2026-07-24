import './css/nav.css';

export function BottomNav({ current, onNavigate }: { current: string, onNavigate: (r: string) => void }) {
  const tabs = ['canvas', 'mood', 'identity'];

  return (
    <nav className="brutal-bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab}
          className={"brutal-nav-btn " + (current === tab ? "is-active" : "")}
          onClick={() => onNavigate(tab)}
        >
          [ {tab} ]
        </button>
      ))}
    </nav>
  );
}