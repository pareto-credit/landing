import type { NewsArticle } from '../types/news'

export const PARAGRAPH_BLOG_URL = 'https://paragraph.com/@pareto'
export const PARAGRAPH_RSS_URL = 'https://api.paragraph.com/blogs/rss/@pareto'

export const FALLBACK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'fallback-1',
    date: 'FEB 18, 2026',
    tag: 'Protocol Update',
    title: 'Tokenized Funds vs Tokenized Credit',
    excerpt:
      'A concise look at how tokenized credit differs from tokenized fund wrappers, and why the distinction matters for liquidity, underwriting, and yield.',
    readTime: '5 min read',
    link: PARAGRAPH_BLOG_URL,
  },
  {
    id: 'fallback-2',
    date: 'FEB 04, 2026',
    tag: 'Market Commentary',
    title: 'The "Stripe Moment" for Private Credit',
    excerpt:
      'Why programmable infrastructure could do for private credit what modern APIs did for payments, compressing time-to-market and expanding distribution.',
    readTime: '8 min read',
    link: PARAGRAPH_BLOG_URL,
  },
  {
    id: 'fallback-3',
    date: 'JAN 22, 2026',
    tag: 'Security',
    title: 'Tokenized Private Credit - the Premier Opportunity in Asset Tokenization',
    excerpt:
      'An overview of the structural opportunity in onchain private credit, from stable yield profiles to real-world utility across capital markets.',
    readTime: '6 min read',
    link: PARAGRAPH_BLOG_URL,
  },
]
