import type { SyntheticEvent } from "react";
import { MoveRight } from "lucide-react";
import newsPlaceholder from "../../assets/svgs/news-placeholder.svg";
import { PARAGRAPH_BLOG_URL } from "../../data/news";
import { useParagraphFeed } from "../../hooks/useParagraphFeed";

const NEWS_SKELETON_COUNT = 3;

const NewsSection = () => {
  const { articles, isLoading } = useParagraphFeed(NEWS_SKELETON_COUNT);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = newsPlaceholder;
  };

  return (
    <section id="news" className="border-b border-white/5 bg-[#081912] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#70B19E]">
              News
            </div>
            <h2 className="text-4xl font-bold">
              Market Intelligence &amp; Updates.
            </h2>
          </div>
          <a
            href={PARAGRAPH_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-white/20 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            View All Articles
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: NEWS_SKELETON_COUNT }).map((_, index) => (
                <div
                  key={`news-skeleton-${index}`}
                  role="status"
                  className="animate-pulse"
                >
                  <div className="mb-6 h-48 w-full rounded border border-white/10 bg-white/5" />
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="h-3 w-24 rounded-full bg-white/10" />
                    <div className="h-5 w-20 rounded bg-white/10" />
                  </div>
                  <div className="mb-3 h-6 w-11/12 rounded bg-white/10" />
                  <div className="mb-3 h-6 w-8/12 rounded bg-white/10" />
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-24 rounded bg-white/10" />
                    <div className="h-4 w-14 rounded bg-white/10" />
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ))
            : articles.map((article) => (
                <a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  <div className="relative mb-6 h-48 w-full overflow-hidden rounded border border-white/10 bg-[#0A120E] transition-colors group-hover:border-[#70B19E]/50">
                    <img
                      src={article.image || newsPlaceholder}
                      alt={article.title}
                      loading="lazy"
                      onError={handleImageError}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081912]/85 via-[#081912]/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#70B19E] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />
                  </div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-gray-500">
                      {article.date}
                    </span>
                    <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-[#70B19E]">
                      {article.tag}
                    </span>
                  </div>
                  <h4 className="mb-3 text-lg font-bold transition-colors group-hover:text-[#70B19E]">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-sm text-gray-400">
                    Read Article <MoveRight size={14} />
                    <span className="text-xs text-gray-500">
                      {article.readTime}
                    </span>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
