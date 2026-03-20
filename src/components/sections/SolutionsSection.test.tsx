import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SolutionsSection from "./SolutionsSection";

vi.mock("../../lib/scrollToSection", () => ({
  scrollToSection: vi.fn(),
}));

describe("SolutionsSection", () => {
  it("centers the listing CTAs on mobile and keeps desktop left alignment", () => {
    render(<SolutionsSection />);

    expect(
      screen.getByRole("button", { name: /request access/i }).parentElement,
    ).toHaveClass("justify-center", "lg:justify-start");
    expect(
      screen.getByRole("button", { name: /request setup/i }).parentElement,
    ).toHaveClass("justify-center", "lg:justify-start");
  });

  it("places the White Label visual after the mobile CTA block", () => {
    render(<SolutionsSection />);

    const whiteLabelCopy = screen
      .getByRole("heading", { name: /pareto white label/i })
      .closest('[data-testid="white-label-copy-slot"]');
    const whiteLabelVisual = screen.getByTestId("white-label-visual-slot");

    expect(whiteLabelCopy).toHaveClass("order-1");
    expect(whiteLabelVisual).toHaveClass("order-2");
  });

  it("uses mobile sliders instead of feature lists for Studio and White Label", () => {
    render(<SolutionsSection />);

    expect(screen.getByTestId("studio-mobile-slider")).toHaveClass(
      "marquee-scroll",
      "overflow-x-auto",
      "touch-pan-x",
      "snap-x",
      "snap-mandatory",
      "md:hidden",
    );
    expect(screen.getByTestId("white-label-mobile-slider")).toHaveClass(
      "marquee-scroll",
      "overflow-x-auto",
      "touch-pan-x",
      "snap-x",
      "snap-mandatory",
      "md:hidden",
    );
    expect(screen.getByTestId("studio-feature-list")).toHaveClass("hidden", "md:block");
    expect(screen.getByTestId("white-label-feature-list")).toHaveClass("hidden", "md:block");
    expect(screen.getByTestId("studio-mobile-card-0")).toHaveClass(
      "w-[84%]",
      "shrink-0",
      "snap-center",
    );
    expect(screen.getByTestId("white-label-mobile-card-0")).toHaveClass(
      "w-[84%]",
      "shrink-0",
      "snap-center",
    );
  });

  it("renders mobile pagination controls for both solution sliders", () => {
    render(<SolutionsSection />);

    expect(
      screen.getAllByRole("button", { name: /go to pareto studio card/i }),
    ).toHaveLength(5);
    expect(
      screen.getAllByRole("button", { name: /go to pareto white label card/i }),
    ).toHaveLength(5);
  });

  it("scrolls to the selected Studio card when a mobile pagination dot is pressed", () => {
    render(<SolutionsSection />);

    const slider = screen.getByTestId("studio-mobile-slider") as HTMLDivElement;
    const scrollTo = vi.fn();
    slider.scrollTo = scrollTo;
    Object.defineProperty(slider, "clientWidth", {
      configurable: true,
      value: 390,
    });

    const thirdCard = screen.getByTestId("studio-mobile-card-2");
    Object.defineProperty(thirdCard, "offsetLeft", {
      configurable: true,
      value: 560,
    });
    Object.defineProperty(thirdCard, "clientWidth", {
      configurable: true,
      value: 328,
    });

    fireEvent.click(
      screen.getByRole("button", { name: /go to pareto studio card 3/i }),
    );

    expect(scrollTo).toHaveBeenCalledWith({
      left: 529,
      behavior: "smooth",
    });
  });

  it("scrolls to the selected final White Label card when a mobile pagination dot is pressed", () => {
    render(<SolutionsSection />);

    const slider = screen.getByTestId(
      "white-label-mobile-slider",
    ) as HTMLDivElement;
    const scrollTo = vi.fn();
    slider.scrollTo = scrollTo;
    Object.defineProperty(slider, "clientWidth", {
      configurable: true,
      value: 390,
    });

    const lastCard = screen.getByTestId("white-label-mobile-card-4");
    Object.defineProperty(lastCard, "offsetLeft", {
      configurable: true,
      value: 1120,
    });
    Object.defineProperty(lastCard, "clientWidth", {
      configurable: true,
      value: 328,
    });

    fireEvent.click(
      screen.getByRole("button", { name: /go to pareto white label card 5/i }),
    );

    expect(scrollTo).toHaveBeenCalledWith({
      left: 1089,
      behavior: "smooth",
    });
  });

  it("places the mobile CTAs after their respective sliders", () => {
    render(<SolutionsSection />);

    const studioSlider = screen.getByTestId("studio-mobile-slider");
    const studioCta = screen.getByRole("button", { name: /request access/i });
    const whiteLabelSlider = screen.getByTestId("white-label-mobile-slider");
    const whiteLabelCta = screen.getByRole("button", { name: /request setup/i });

    expect(
      studioSlider.compareDocumentPosition(studioCta),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      whiteLabelSlider.compareDocumentPosition(whiteLabelCta),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
