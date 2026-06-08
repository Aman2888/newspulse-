import { timeAgo, CATEGORIES } from '../utils/newsService';
import { Clock, ExternalLink } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop';

export default function NewsCard({ article, onClick, index }) {
  const cat = CATEGORIES.find(c => c.id === article.category) || CATEGORIES[0];
  const imgSrc = article.urlToImage || FALLBACK_IMAGE;

  return (
    <article
      className="news-card rounded-2xl overflow-hidden cursor-pointer animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
      onClick={() => onClick(article)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={e => { e.target.src = FALLBACK_IMAGE; }}
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium font-mono backdrop-blur-sm"
            style={{ background: 'rgba(192,57,43,0.9)', color: 'white' }}>
            {cat.icon} {cat.label}
          </span>
        </div>
        {/* Source badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium font-body backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
            {article.source?.name || 'Unknown'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-headline text-base font-bold leading-snug mb-2 line-clamp-2" style={{ color: 'var(--text)' }}>
          {article.title}
        </h2>
        <p className="text-sm font-body leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--muted)' }}>
          {article.description || 'Click to read the full story...'}
        </p>
        <div className="flex items-center gap-2 text-xs font-body" style={{ color: 'var(--muted)' }}>
          <Clock size={12} />
          <span>{timeAgo(article.publishedAt)}</span>
          <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
            Read more <ExternalLink size={10} />
          </span>
        </div>
      </div>
    </article>
  );
}
