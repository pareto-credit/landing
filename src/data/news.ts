import type { NewsArticle } from '../types/news'

export const PARAGRAPH_BLOG_URL = 'https://paragraph.com/@pareto'
export const PARAGRAPH_RSS_URL = 'https://api.paragraph.com/blogs/rss/@pareto'

export const FALLBACK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'fallback-1',
    date: 'FEB 18, 2026',
    tag: 'Protocol Update',
    title: 'Pareto V2: Introducing Modular Risk Tiers for RWA Collateral',
    readTime: '5 min read',
    link: PARAGRAPH_BLOG_URL,
  },
  {
    id: 'fallback-2',
    date: 'FEB 04, 2026',
    tag: 'Market Commentary',
    title: 'Why Prime Brokers are Moving Credit Facilities Onchain',
    readTime: '8 min read',
    link: PARAGRAPH_BLOG_URL,
  },
  {
    id: 'fallback-3',
    date: 'JAN 22, 2026',
    tag: 'Security',
    title: 'Auditing Isolated Markets: Our Approach with Zellic & Trail of Bits',
    readTime: '6 min read',
    link: PARAGRAPH_BLOG_URL,
  },
]
