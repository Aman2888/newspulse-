import { useRef } from 'react';
import { CATEGORIES } from '../utils/newsService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryBar({ activeCategory, onSelect }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 150, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-[64px] z-40 transition-all" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-0 relative flex items-center">
        <button onClick={() => scroll(-1)} className="hidden sm:flex flex-shrink-0 p-1 mr-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--muted)' }}>
          <ChevronLeft size={18} />
        </button>
        
        <div ref={ref} className="flex gap-1 overflow-x-auto scrollbar-hide py-2" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`category-pill flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 font-body ${activeCategory === cat.id ? 'active' : ''}`}
              style={activeCategory === cat.id
                ? { background: 'var(--accent)', color: 'white' }
                : { background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }
              }>
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <button onClick={() => scroll(1)} className="hidden sm:flex flex-shrink-0 p-1 ml-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--muted)' }}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
