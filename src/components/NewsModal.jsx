import { useEffect } from 'react';
import { X, Clock, ExternalLink, Copy, Share2, Download, Globe } from 'lucide-react';
import { timeAgo, CATEGORIES } from '../utils/newsService';
import { useToast } from './Toast';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop';

export default function NewsModal({ article, onClose }) {
  const toast = useToast();
  const cat = CATEGORIES.find(c => c.id === article.category) || CATEGORIES[0];
  const imgSrc = article.urlToImage || FALLBACK_IMAGE;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const handleCopy = async () => {
    const text = `${article.title}\n\n${article.description || ''}\n\n${article.content || ''}\n\nSource: ${article.source?.name}\n${article.url}`;
    try {
      await navigator.clipboard.writeText(text);
      toast('News copied to clipboard!', 'success');
    } catch {
      toast('Could not copy text', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.description, url: article.url || window.location.href });
        toast('Shared successfully!', 'success');
      } catch {}
    } else {
      await navigator.clipboard.writeText(article.url || window.location.href);
      toast('Link copied to clipboard!', 'success');
    }
  };

  const handleDownload = () => {
    const content = `NEWSPULSE - Article Download
=====================================
Title: ${article.title}

Source: ${article.source?.name || 'Unknown'}
Published: ${new Date(article.publishedAt).toLocaleString()}
Category: ${cat.label}

DESCRIPTION:
${article.description || 'N/A'}

FULL CONTENT:
${article.content || article.description || 'Visit the source URL for full content.'}

Source URL: ${article.url}

=====================================
Downloaded from NewsPulse
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${article.title.slice(0, 40).replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast('Article downloaded!', 'success');
  };

  const handleReadOriginal = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank');
    } else {
      toast('Original link not available in demo mode', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      
      <div className="w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl flex flex-col animate-fade-up"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        
        {/* Header image */}
        <div className="relative">
          <img src={imgSrc} alt={article.title}
            className="w-full h-52 sm:h-64 object-cover"
            onError={e => { e.target.src = FALLBACK_IMAGE; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close button */}
          <button onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
            <X size={18} />
          </button>

          {/* Category & source overlaid on image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-mono"
              style={{ background: 'var(--accent)', color: 'white' }}>
              {cat.icon} {cat.label}
            </span>
            <span className="text-xs font-body px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
              {article.source?.name || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs font-mono mb-3" style={{ color: 'var(--muted)' }}>
            <Clock size={12} />
            <span>{timeAgo(article.publishedAt)}</span>
            <span>·</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
          </div>

          {/* Title */}
          <h1 className="font-headline text-xl sm:text-2xl font-bold leading-tight mb-4" style={{ color: 'var(--text)' }}>
            {article.title}
          </h1>

          {/* Description */}
          {article.description && (
            <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--bg)', borderLeft: '3px solid var(--accent)' }}>
              <p className="text-sm font-body leading-relaxed font-medium" style={{ color: 'var(--text)' }}>
                {article.description}
              </p>
            </div>
          )}

          {/* Full content */}
          {article.content && (
            <div className="mb-5">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>
                Full Story
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text)' }}>
                {article.content.replace(/\[\+\d+ chars\]$/, '').trim()}
                {article.content.includes('[+') && (
                  <span style={{ color: 'var(--muted)' }}> ... <button onClick={handleReadOriginal} className="underline hover:opacity-70">Read full article</button></span>
                )}
              </p>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }} />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-all hover:opacity-80 active:scale-95"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Copy size={15} /> Copy
            </button>
            <button onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-all hover:opacity-80 active:scale-95"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Share2 size={15} /> Share
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-all hover:opacity-80 active:scale-95"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Download size={15} /> Download
            </button>
            <button onClick={handleReadOriginal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-all hover:opacity-80 active:scale-95 ml-auto"
              style={{ background: 'var(--accent)', color: 'white' }}>
              <Globe size={15} /> Read Original
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
