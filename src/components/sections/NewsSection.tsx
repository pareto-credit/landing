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
    <section
      id="news"
      className="relative border-b border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] py-24 text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[color:rgb(113_178_159_/_0.08)] blur-[120px]" />
      <SectionContainer>
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="News"
            title="Market Intelligence & Updates."
            size="2xl"
            titleClassName="text-4xl text-[var(--color-text-primary)] md:text-4xl"
            descriptionClassName="text-[var(--color-text-secondary)]"
          />
          <ButtonLink
            href={PARAGRAPH_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="text-[var(--color-text-primary)]"
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
                  <div className="mb-6 h-48 w-full rounded border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)]" />
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="h-3 w-24 rounded-full bg-[var(--color-surface-muted)]" />
                    <div className="h-5 w-20 rounded bg-[var(--color-surface-muted)]" />
                  </div>
                  <div className="mb-3 h-6 w-11/12 rounded bg-[var(--color-surface-muted)]" />
                  <div className="mb-3 h-6 w-8/12 rounded bg-[var(--color-surface-muted)]" />
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-24 rounded bg-[var(--color-surface-muted)]" />
                    <div className="h-4 w-14 rounded bg-[var(--color-surface-muted)]" />
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
                  <div className="relative mb-6 h-48 w-full overflow-hidden rounded border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] transition-colors group-hover:border-[color:rgb(112_177_158_/_0.50)]">
                    <img
                      src={article.image || newsPlaceholder}
                      alt={article.title}
                      loading="lazy"
                      onError={handleImageError}
                      className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:rgb(14_24_19_/_0.28)] via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-alt)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />
                  </div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">
                      {article.date}
                    </span>
                    <span className="rounded border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-2 py-1 font-mono text-[10px] text-[var(--color-brand-deep)]">
                      {article.tag}
                    </span>
                  </div>
                  <h4 className="mb-3 text-lg font-bold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-brand-alt)]">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-text-secondary)]">
                    Read Article <MoveRight size={14} />
                    <span className="text-xs text-[var(--color-text-muted)]">
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
