import { MoveRight, Newspaper } from 'lucide-react'
import newsPlaceholder from '../../assets/svgs/news-placeholder.svg'

interface Article {
  date: string
  tag: string
  title: string
  readTime: string
}

const articles: Article[] = [
  {
    date: 'FEB 18, 2026',
    tag: 'Protocol Update',
    title: 'Pareto V2: Introducing Modular Risk Tiers for RWA Collateral',
    readTime: '5 min read',
  },
  {
    date: 'FEB 04, 2026',
    tag: 'Market Commentary',
    title: 'Why Prime Brokers are Moving Credit Facilities Onchain',
    readTime: '8 min read',
  },
  {
    date: 'JAN 22, 2026',
    tag: 'Security',
    title: 'Auditing Isolated Markets: Our Approach with Zellic & Trail of Bits',
    readTime: '6 min read',
  },
]

const NewsSection = () => {
  return (
    <section id="news" className="border-b border-white/5 bg-[#081912] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#70B19E]">News</div>
            <h2 className="text-4xl font-bold">Market Intelligence &amp; Updates.</h2>
          </div>
          <button className="rounded border border-white/20 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/10">
            View All Articles
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <div key={article.title} className="group cursor-pointer">
              <div className="relative mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded border border-white/10 transition-colors group-hover:border-[#70B19E]/50">
                <img
                  src={newsPlaceholder}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <Newspaper className="relative z-10 text-white/25 transition-colors group-hover:text-[#70B19E]/60" size={40} />
              </div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-gray-500">{article.date}</span>
                <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-[#70B19E]">
                  {article.tag}
                </span>
              </div>
              <h4 className="mb-3 text-lg font-bold transition-colors group-hover:text-[#70B19E]">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 font-mono text-sm text-gray-400">
                Read Article <MoveRight size={14} />
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
