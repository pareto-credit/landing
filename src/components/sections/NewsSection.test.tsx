import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NewsSection from "./NewsSection";

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

vi.mock("../../hooks/useParagraphFeed", () => ({
  useParagraphFeed: () => ({
    articles: [],
    isLoading: false,
  }),
}));

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
});
