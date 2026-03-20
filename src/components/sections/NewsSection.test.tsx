import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NewsSection from "./NewsSection";
import type { NewsArticle } from "../../types/news";

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

const mockArticles: NewsArticle[] = [
  {
    id: "article-1",
    title: "Tokenized Funds vs Tokenized Credit",
    excerpt: "A concise look at tokenized credit infrastructure.",
    link: "https://paragraph.com/@pareto/article-1",
    date: "FEB 18, 2026",
    tag: "Protocol Update",
    readTime: "5 min read",
  },
  {
    id: "article-2",
    title: "The Stripe Moment for Private Credit",
    excerpt: "Why programmable infrastructure matters now.",
    link: "https://paragraph.com/@pareto/article-2",
    date: "FEB 04, 2026",
    tag: "Market Commentary",
    readTime: "8 min read",
  },
  {
    id: "article-3",
    title: "Premier Opportunity in Asset Tokenization",
    excerpt: "An overview of the structural opportunity in onchain credit.",
    link: "https://paragraph.com/@pareto/article-3",
    date: "JAN 22, 2026",
    tag: "Security",
    readTime: "6 min read",
  },
];

const mockParagraphFeed = {
  articles: [] as NewsArticle[],
  isLoading: false,
};

vi.mock("../../hooks/useParagraphFeed", () => ({
  useParagraphFeed: () => mockParagraphFeed,
}));

afterEach(() => {
  mockParagraphFeed.articles = [];
  mockParagraphFeed.isLoading = false;
  vi.restoreAllMocks();
});

describe("NewsSection", () => {
  it("renders the heading CTA in the desktop header", () => {
    render(<NewsSection />);

    expect(screen.getByTestId("news-header-actions")).toContainElement(
      screen.getByRole("link", { name: /view all articles/i }),
    );
  });

  it("renders the heading CTA in the mobile footer", () => {
    setViewportWidth(390);

    render(<NewsSection />);

    expect(screen.getByTestId("news-footer-actions")).toContainElement(
      screen.getByRole("link", { name: /view all articles/i }),
    );
  });

  it("uses a mobile slider with hidden scrollbar for news cards", () => {
    setViewportWidth(390);
    mockParagraphFeed.articles = mockArticles;

    render(<NewsSection />);

    expect(screen.getByTestId("news-mobile-slider")).toHaveClass(
      "marquee-scroll",
      "overflow-x-auto",
      "touch-pan-x",
      "snap-x",
      "snap-mandatory",
      "md:hidden",
    );
  });

  it("renders mobile pagination dots for the news slider", () => {
    setViewportWidth(390);
    mockParagraphFeed.articles = mockArticles;

    render(<NewsSection />);

    const dots = screen.getAllByRole("button", { name: /go to news card/i });

    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-current", "true");
  });

  it("keeps the desktop news grid and hides mobile pagination on larger screens", () => {
    setViewportWidth(1280);
    mockParagraphFeed.articles = mockArticles;

    render(<NewsSection />);

    expect(screen.getByTestId("news-grid")).toHaveClass(
      "hidden",
      "md:grid",
      "md:grid-cols-3",
    );
    expect(
      screen.queryByRole("button", { name: /go to news card/i }),
    ).not.toBeInTheDocument();
  });

  it("scrolls to the selected centered news card when a pagination dot is pressed", () => {
    setViewportWidth(390);
    mockParagraphFeed.articles = mockArticles;

    render(<NewsSection />);

    const slider = screen.getByTestId("news-mobile-slider") as HTMLDivElement;
    const scrollTo = vi.fn();
    slider.scrollTo = scrollTo;
    Object.defineProperty(slider, "clientWidth", {
      configurable: true,
      value: 390,
    });

    const thirdCard = screen.getByTestId("news-mobile-card-2");
    Object.defineProperty(thirdCard, "offsetLeft", {
      configurable: true,
      value: 560,
    });
    Object.defineProperty(thirdCard, "clientWidth", {
      configurable: true,
      value: 328,
    });

    fireEvent.click(screen.getByRole("button", { name: /go to news card 3/i }));

    expect(scrollTo).toHaveBeenCalledWith({
      left: 529,
      behavior: "smooth",
    });
  });

  it("captures pointer drag on mobile to scroll the news cards", () => {
    setViewportWidth(390);
    mockParagraphFeed.articles = mockArticles;

    render(<NewsSection />);

    const slider = screen.getByTestId("news-mobile-slider") as HTMLDivElement;
    const setPointerCapture = vi.fn();
    slider.setPointerCapture = setPointerCapture;
    slider.releasePointerCapture = vi.fn();
    slider.hasPointerCapture = vi.fn().mockReturnValue(false);

    Object.defineProperty(slider, "scrollLeft", {
      configurable: true,
      writable: true,
      value: 100,
    });

    const [mobileLink] = within(slider).getAllByRole("link");

    fireEvent.pointerDown(mobileLink, {
      pointerId: 1,
      clientX: 120,
    });
    fireEvent.pointerMove(slider, {
      pointerId: 1,
      clientX: 90,
    });

    expect(setPointerCapture).toHaveBeenCalledWith(1);
    expect(slider.scrollLeft).toBe(130);
  });
});
