export default function SkeletonCard() {
  return (
    <div className="news-card rounded-2xl overflow-hidden">
      <div className="aspect-video animate-pulse" style={{ background: 'var(--border)' }} />
      <div className="p-4 space-y-3">
        <div className="h-4 rounded-full animate-pulse w-3/4" style={{ background: 'var(--border)' }} />
        <div className="h-4 rounded-full animate-pulse w-full" style={{ background: 'var(--border)' }} />
        <div className="h-4 rounded-full animate-pulse w-5/6" style={{ background: 'var(--border)' }} />
        <div className="h-3 rounded-full animate-pulse w-1/3 mt-2" style={{ background: 'var(--border)' }} />
      </div>
    </div>
  );
}
