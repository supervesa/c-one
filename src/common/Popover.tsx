import { useState, useRef, useEffect } from 'react';
import './css/popover.css';

export function Popover({ trigger, children }: { trigger: React.ReactNode, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sulkee popoverin jos klikataan sen ulkopuolelle
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="brutal-popover-wrapper" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} style={{ display: 'inline-block' }}>
        {trigger}
      </div>
      <div className={"brutal-popover-content " + (isOpen ? "is-open" : "")}>
        {children}
      </div>
    </div>
  );
}