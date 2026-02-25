import type { SyntheticEvent } from "react";
import { MoveRight } from "lucide-react";
import newsPlaceholder from "../../assets/svgs/news-placeholder.svg";
import { PARAGRAPH_BLOG_URL } from "../../data/news";
import { useParagraphFeed } from "../../hooks/useParagraphFeed";
import { ButtonLink } from "../ui/Button";
import { SectionContainer, SectionHeading } from "../ui/Section";

const NEWS_SKELETON_COUNT = 3;

const NewsSection = () => {
  const { articles, isLoading } = useParagraphFeed(NEWS_SKELETON_COUNT);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = newsPlaceholder;
  };

  return (
    <section id="news" className="border-b border-[var(--color-border-inverse-subtle)] bg-[var(--color-bg-page)] py-24">
      <SectionContainer>
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="News"
            title="Market Intelligence & Updates."
            size="2xl"
            titleClassName="text-4xl md:text-4xl"
          />
          <ButtonLink
            href={PARAGRAPH_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
          >
            View All Articles
          </ButtonLink>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: NEWS_SKELETON_COUNT }).map((_, index) => (
                <div
                  key={`news-skeleton-${index}`}
                  role="status"
                  className="animate-pulse"
                >
                  <div className="mb-6 h-48 w-full rounded border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-05)]" />
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="h-3 w-24 rounded-full bg-[var(--color-overlay-surface-10)]" />
                    <div className="h-5 w-20 rounded bg-[var(--color-overlay-surface-10)]" />
                  </div>
                  <div className="mb-3 h-6 w-11/12 rounded bg-[var(--color-overlay-surface-10)]" />
                  <div className="mb-3 h-6 w-8/12 rounded bg-[var(--color-overlay-surface-10)]" />
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-24 rounded bg-[var(--color-overlay-surface-10)]" />
                    <div className="h-4 w-14 rounded bg-[var(--color-overlay-surface-10)]" />
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
                  <div className="relative mb-6 h-48 w-full overflow-hidden rounded border border-[var(--color-border-inverse-soft)] bg-[var(--color-bg-panel-dark)] transition-colors group-hover:border-[color:rgb(112_177_158_/_0.50)]">
                    <img
                      src={article.image || newsPlaceholder}
                      alt={article.title}
                      loading="lazy"
                      onError={handleImageError}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:rgb(8_25_18_/_0.85)] via-[color:rgb(8_25_18_/_0.15)] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-alt)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />
                  </div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-[var(--color-text-muted-soft)]">
                      {article.date}
                    </span>
                    <span className="rounded bg-[var(--color-overlay-surface-05)] px-2 py-1 font-mono text-[10px] text-[var(--color-brand-alt)]">
                      {article.tag}
                    </span>
                  </div>
                  <h4 className="mb-3 text-lg font-bold transition-colors group-hover:text-[var(--color-brand-alt)]">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-text-muted)]">
                    Read Article <MoveRight size={14} />
                    <span className="text-xs text-[var(--color-text-muted-soft)]">
                      {article.readTime}
                    </span>
                  </div>
                </a>
              ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default NewsSection;
