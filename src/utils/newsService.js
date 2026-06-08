// const API_KEY = '1e21014122334da9a72bcca02802ac0e'; newsapi key
// const BASE_URL = 'https://newsapi.org/v2';
// Gnews api key 
const API_KEY = '961b50204d4497554a6b0b2b3f659af7'; 
const BASE_URL = 'https://gnews.io/api/v4';

export const CATEGORIES = [
  { id: 'general', label: 'Top Stories', icon: '🌐' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'business', label: 'Business', icon: '📈' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'science', label: 'Science', icon: '🔬' },
];

export const COUNTRIES = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  // { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  // { code: 'in', name: 'India', flag: '🇮🇳' },
  // { code: 'au', name: 'Australia', flag: '🇦🇺' },
  // { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  // { code: 'de', name: 'Germany', flag: '🇩🇪' },
  // { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪' },
  { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
];

// Country -> search keywords mapping (for /everything endpoint)
const COUNTRY_QUERIES = {
  us: 'United States',
  // gb: 'United Kingdom',
  pk: 'Pakistan',
  // in: 'India',
  // au: 'Australia',
  // ca: 'Canada',
  // de: 'Germany',
  // fr: 'France',
  ae: 'UAE Dubai',
  sa: 'Saudi Arabia',
};

// Countries supported by top-headlines endpoint
const TOP_HEADLINES_COUNTRIES = ['us', 'gb', 'in', 'au', 'ca', 'de', 'fr'];

// Mock news data for demo (when no API key)
export const MOCK_NEWS = {
  general: [
    {
      id: '1',
      title: 'Global Leaders Gather for Climate Summit 2026',
      description: 'World leaders from over 190 countries convene in Geneva to address the growing climate crisis with new binding agreements on carbon emissions.',
      content: 'World leaders from over 190 countries have gathered in Geneva for the most significant climate summit since the Paris Agreement. The three-day conference aims to establish new binding targets for carbon emission reductions by 2035.',
      urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: 'Reuters' }, url: '#', category: 'general',
    },
    {
      id: '2',
      title: 'AI Breakthrough: New Model Passes Medical Licensing Exam',
      description: 'A new artificial intelligence system has successfully passed the USMLE with scores surpassing average human performance.',
      content: 'Researchers announced a breakthrough in medical AI, with their new model achieving a score of 87% on the USMLE, significantly above the average passing score of 60%.',
      urlToImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: 'The Verge' }, url: '#', category: 'technology',
    },
    {
      id: '3',
      title: 'Pakistan IT Exports Cross $5 Billion Milestone',
      description: "Pakistan's IT exports crossed $5 billion this fiscal year, with freelancing emerging as a major driver of foreign exchange earnings.",
      content: "Pakistan's technology sector demonstrated remarkable growth, with IT exports crossing the $5 billion milestone for the first time. Freelancing income contributed $2.1 billion, with Fiverr and Upwork reporting Pakistan as one of the fastest-growing markets.",
      urlToImage: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { name: 'Dawn News' }, url: '#', category: 'business',
    },
    {
      id: '4',
      title: 'SpaceX Successfully Launches Mars Mission Precursor',
      description: 'SpaceX launched a critical unmanned mission to Mars carrying advanced habitat modules.',
      content: 'SpaceX successfully launched its Mars Infrastructure Mission 1 (MIM-1), marking a significant step toward human colonization of Mars.',
      urlToImage: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: 'Space.com' }, url: '#', category: 'science',
    },
    {
      id: '5',
      title: 'Champions League Final: Record-Breaking Viewership Expected',
      description: 'The UEFA Champions League Final is set to draw over 500 million viewers worldwide.',
      content: 'The Champions League Final has generated unprecedented global interest. Broadcasters expect over 500 million viewers worldwide.',
      urlToImage: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: { name: 'BBC Sport' }, url: '#', category: 'sports',
    },
    {
      id: '6',
      title: 'Breakthrough Cancer Treatment Shows 90% Success Rate',
      description: 'A revolutionary new cancer immunotherapy has shown remarkable results in Phase 3 clinical trials.',
      content: 'Scientists announced extraordinary results from their CAR-T Cell Therapy Plus trial. The treatment achieved complete remission in 90% of participants with late-stage pancreatic cancer.',
      urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: { name: 'Medical News Today' }, url: '#', category: 'health',
    },
    {
      id: '7',
      title: 'Hollywood Blockbuster Breaks Opening Weekend Record',
      description: 'The latest superhero film earned $400 million globally in its opening weekend.',
      content: 'The latest MCU installment broke every opening weekend record in cinema history, grossing $400 million globally in three days.',
      urlToImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      source: { name: 'Variety' }, url: '#', category: 'entertainment',
    },
    {
      id: '8',
      title: 'Stock Markets Reach Record Highs Amid Economic Recovery',
      description: 'Global stock markets surged to unprecedented levels as economic indicators showed stronger-than-expected growth.',
      content: 'The S&P 500 reached a new all-time high today. The rally was driven by strong corporate earnings and GDP growth of 3.2% in Q2 2026.',
      urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      publishedAt: new Date(Date.now() - 28800000).toISOString(),
      source: { name: 'Bloomberg' }, url: '#', category: 'business',
    },
  ],
};

export async function fetchNews(category = 'general', country = 'us', page = 1) {
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    await new Promise(r => setTimeout(r, 800));
    const all = MOCK_NEWS.general;
    const filtered = category === 'general' ? all : all.filter(n => n.category === category || Math.random() > 0.4);
    return { articles: filtered, totalResults: filtered.length };
  }

  try {
    let url;

    if (TOP_HEADLINES_COUNTRIES.includes(country)) {
      // Use top-headlines for supported countries
      url = `${BASE_URL}/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=20&apiKey=${API_KEY}`;
    } else {
      // For PK, AE, SA etc — use /everything with country keyword + category keyword
      const countryKeyword = COUNTRY_QUERIES[country] || country;
      const categoryKeyword = category !== 'general' ? ` ${category}` : '';
      const q = `${countryKeyword}${categoryKeyword}`;
      url = `${BASE_URL}/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&page=${page}&pageSize=20&apiKey=${API_KEY}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'error') {
      console.error('NewsAPI error:', data.message);
      return { articles: MOCK_NEWS.general, totalResults: MOCK_NEWS.general.length };
    }

    const articles = (data.articles || [])
      .filter(a => a.title && a.title !== '[Removed]' && a.urlToImage)
      .map((a, i) => ({ ...a, id: `${country}-${page}-${i}`, category }));

    return { articles, totalResults: data.totalResults || articles.length };

  } catch (err) {
    console.error('News fetch error:', err);
    return { articles: MOCK_NEWS.general, totalResults: MOCK_NEWS.general.length };
  }
}

export async function searchNews(query, page = 1) {
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    await new Promise(r => setTimeout(r, 600));
    const results = MOCK_NEWS.general.filter(n =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.description.toLowerCase().includes(query.toLowerCase())
    );
    return { articles: results, totalResults: results.length };
  }

  try {
    const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&page=${page}&pageSize=20&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'error') return { articles: [], totalResults: 0 };

    const articles = (data.articles || [])
      .filter(a => a.title && a.title !== '[Removed]')
      .map((a, i) => ({ ...a, id: `search-${page}-${i}` }));

    return { articles, totalResults: data.totalResults || articles.length };
  } catch {
    return { articles: [], totalResults: 0 };
  }
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
