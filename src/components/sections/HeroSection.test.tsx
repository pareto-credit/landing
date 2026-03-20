import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroSection from "./HeroSection";

vi.mock("../three/Earth3D", () => ({
  default: () => <div data-testid="earth-3d" />,
}));

describe("HeroSection", () => {
  it("uses a mobile-safe layout for CTAs and vanity metrics", () => {
    render(
      <HeroSection
        metrics={{
          outstandingLoans: 181_273_034,
          creditExtended: 1_684_476_776,
        }}
        isMetricsLoading={false}
      />,
    );

    const ctaGroup = screen.getByTestId("hero-cta-group");
    const heroTitle = screen.getByTestId("hero-title");
    const contentShell = heroTitle.closest("div")?.parentElement;
    const metricsWrapper = screen.getByTestId("hero-metrics");

    expect(ctaGroup).toHaveClass("flex-col", "sm:flex-row", "w-full");
    expect(contentShell).toHaveClass("justify-center");
    expect(heroTitle).toHaveClass("text-[clamp(2.35rem,11vw,4.2rem)]");
    expect(metricsWrapper).toHaveClass("absolute", "inset-x-0", "bottom-0");
  });
});
