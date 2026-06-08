import { useState } from 'react';
import { Search, Sun, Moon, Globe, X, Menu } from 'lucide-react';
import { COUNTRIES } from '../utils/newsService';

export default function Header({ darkMode, setDarkMode, selectedCountry, setSelectedCountry, onSearch, onClearSearch }) {
  const [searchVal, setSearchVal] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) onSearch(searchVal.trim());
  };

  const handleClear = () => {
    setSearchVal('');
    onClearSearch();
  };

  const currentCountry = COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300"
      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="live-dot" />
              <span className="text-xs font-mono font-medium" style={{ color: '#e84040' }}>LIVE</span>
            </div>
            <h1 className="font-headline text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
              News<span style={{ color: 'var(--accent)' }}>Pulse</span>
            </h1>
          </div>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-xl px-4 py-2.5 transition-all"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <Search size={16} style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search headlines..."
              className="flex-1 bg-transparent text-sm outline-none font-body"
              style={{ color: 'var(--text)' }}
            />
            {searchVal && (
              <button type="button" onClick={handleClear} className="p-0.5 rounded-full hover:opacity-70 transition-opacity">
                <X size={14} style={{ color: 'var(--muted)' }} />
              </button>
            )}
            {searchVal && (
              <button type="submit" className="text-xs font-medium px-2 py-0.5 rounded-lg transition-colors"
                style={{ background: 'var(--accent)', color: 'white' }}>
                Go
              </button>
            )}
          </form>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button onClick={() => setMobileSearch(!mobileSearch)} className="md:hidden p-2 rounded-xl transition-all hover:opacity-70"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Search size={16} />
            </button>

            {/* Country Selector */}
            <div className="relative">
              <button onClick={() => setCountryOpen(!countryOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg)' }}>
                <span className="text-base">{currentCountry?.flag}</span>
                <span className="hidden sm:inline font-body text-sm">{currentCountry?.name}</span>
                <Globe size={14} style={{ color: 'var(--muted)' }} />
              </button>

              {countryOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-2xl z-50 overflow-hidden py-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  {COUNTRIES.map(c => (
                    <button key={c.code}
                      onClick={() => { setSelectedCountry(c.code); setCountryOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-all text-left hover:opacity-80"
                      style={{
                        color: 'var(--text)',
                        background: selectedCountry === c.code ? 'var(--accent)' : 'transparent',
                        ...(selectedCountry === c.code ? { color: 'white' } : {})
                      }}>
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl transition-all hover:opacity-80"
              style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {mobileSearch && (
          <form onSubmit={handleSearch} className="md:hidden mt-3 flex items-center gap-2 rounded-xl px-4 py-2.5"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <Search size={16} style={{ color: 'var(--muted)' }} />
            <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Search headlines..." autoFocus
              className="flex-1 bg-transparent text-sm outline-none font-body" style={{ color: 'var(--text)' }} />
            {searchVal && <button type="button" onClick={handleClear}><X size={14} style={{ color: 'var(--muted)' }} /></button>}
            <button type="submit" className="text-xs font-medium px-2 py-0.5 rounded-lg"
              style={{ background: 'var(--accent)', color: 'white' }}>Search</button>
          </form>
        )}
      </div>

      {countryOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setCountryOpen(false)} />
      )}
    </header>
  );
}
