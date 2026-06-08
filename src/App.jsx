import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import NewsCard from './components/NewsCard';
import NewsModal from './components/NewsModal';
import SkeletonCard from './components/SkeletonCard';
import { ToastProvider } from './components/Toast';
import { fetchNews, searchNews } from './utils/newsService';
import { RefreshCw, AlertCircle, Newspaper } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('us');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const loadNews = useCallback(async (cat, cou, pg, reset = true) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNews(cat, cou, pg);
      if (reset) setArticles(data.articles);
      else setArticles(prev => [...prev, ...data.articles]);
      setHasMore(data.articles.length >= 20);
    } catch {
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSearchMode) {
      setPage(1);
      loadNews(category, country, 1, true);
    }
  }, [category, country, isSearchMode]);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setIsSearchMode(true);
    setLoading(true);
    setError(null);
    try {
      const data = await searchNews(query);
      setArticles(data.articles);
      setHasMore(data.articles.length >= 20);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClearSearch = () => {
    setIsSearchMode(false);
    setSearchQuery('');
    loadNews(category, country, 1, true);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (isSearchMode) { setIsSearchMode(false); setSearchQuery(''); }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    loadNews(category, country, next, false);
  };

  const handleRefresh = () => {
    setPage(1);
    if (isSearchMode) handleSearch(searchQuery);
    else loadNews(category, country, 1, true);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg)' }}>
        <Header
          darkMode={darkMode} setDarkMode={setDarkMode}
          selectedCountry={country}
          setSelectedCountry={(c) => { setCountry(c); if (isSearchMode) { setIsSearchMode(false); setSearchQuery(''); } }}
          onSearch={handleSearch} onClearSearch={handleClearSearch}
        />
        <CategoryBar activeCategory={category} onSelect={handleCategoryChange} />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {isSearchMode && (
            <div className="flex items-center justify-between mb-5 px-4 py-3 rounded-xl animate-fade-up"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Search results for </span>
                <span className="font-headline font-bold text-lg ml-1" style={{ color: 'var(--text)' }}>"{searchQuery}"</span>
                <span className="ml-2 text-sm" style={{ color: 'var(--muted)' }}>({articles.length} articles)</span>
              </div>
              <button onClick={handleClearSearch} className="text-sm font-body font-medium px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: 'var(--accent)', color: 'white' }}>Clear</button>
            </div>
          )}

          {!loading && !error && (
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Newspaper size={16} style={{ color: 'var(--muted)' }} />
                <span className="text-sm font-body" style={{ color: 'var(--muted)' }}>{articles.length} stories</span>
              </div>
              <button onClick={handleRefresh}
                className="flex items-center gap-2 text-sm font-body font-medium px-3 py-1.5 rounded-xl transition-all hover:opacity-80"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                <RefreshCw size={13} /> Refresh
              </button>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertCircle size={40} style={{ color: 'var(--accent)' }} />
              <p className="font-body text-lg" style={{ color: 'var(--muted)' }}>{error}</p>
              <button onClick={handleRefresh} className="px-5 py-2.5 rounded-xl font-body font-medium transition-all hover:opacity-80"
                style={{ background: 'var(--accent)', color: 'white' }}>Try Again</button>
            </div>
          )}

          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {loading && articles.length === 0
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                : articles.map((article, i) => (
                    <NewsCard key={article.id || i} article={article} onClick={setSelectedArticle} index={i} />
                  ))
              }
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Newspaper size={48} style={{ color: 'var(--muted)' }} />
              <p className="font-headline text-xl" style={{ color: 'var(--muted)' }}>No news found</p>
              <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>Try a different category or search</p>
            </div>
          )}

          {!loading && !error && hasMore && articles.length > 0 && (
            <div className="flex justify-center mt-10">
              <button onClick={loadMore}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-body font-medium transition-all hover:opacity-80 active:scale-95"
                style={{ border: '2px solid var(--accent)', color: 'var(--accent)' }}>
                Load More Stories
              </button>
            </div>
          )}

          {loading && articles.length > 0 && (
            <div className="flex justify-center mt-10">
              <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--muted)' }} />
            </div>
          )}
        </main>

        <footer className="mt-16 py-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="font-headline text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>
            News<span style={{ color: 'var(--accent)' }}>Pulse</span>
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
            Live news powered by NewsAPI · Built with React + Vite + Tailwind
          </p>
          <p className="text-xs font-body mt-2" style={{ color: 'var(--muted)' }}>
            Demo mode · Add your free NewsAPI key in src/utils/newsService.js
          </p>
        </footer>

        {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </div>
    </ToastProvider>
  );
}
