import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StudioVisual from "./StudioVisual";
import WhiteLabelVisual from "./WhiteLabelVisual";

vi.mock("framer-motion", async () => {
  const React = await import("react");

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) =>
        React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
          ({ children, ...props }, ref) =>
            React.createElement(tag, { ...props, ref }, children),
        ),
    },
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion,
  };
});

describe("solutions visuals", () => {
  it("uses a smaller mobile frame and stage scale for Studio", () => {
    const { container } = render(<StudioVisual activeIndex={0} />);

    expect(container.firstElementChild).toHaveClass("h-[380px]");
    expect(container.querySelector(".items-center")).toHaveClass("items-center");
    expect(container.querySelector(".scale-\\[0\\.72\\]")).toHaveClass(
      "scale-[0.72]",
      "sm:scale-[0.84]",
      "md:scale-100",
    );
    expect(container.querySelector(".origin-center")).toHaveClass("origin-center");
    expect(container.querySelector("h4")).toHaveClass("text-lg", "md:text-xl");
    expect(container.querySelector("h4")?.parentElement).toHaveClass(
      "p-4",
      "pt-6",
      "md:p-8",
      "md:pt-12",
    );
  });

  it("uses a smaller mobile frame and stage scale for White Label", () => {
    const { container, getByTestId } = render(<WhiteLabelVisual activeIndex={0} />);

    expect(container.firstElementChild).toHaveClass("h-[410px]");
    expect(container.querySelector(".items-center")).toHaveClass("items-center");
    expect(container.querySelector(".scale-\\[0\\.78\\]")).toHaveClass(
      "scale-[0.78]",
      "sm:scale-[0.86]",
      "md:scale-100",
    );
    expect(container.querySelector(".origin-center")).toHaveClass("origin-center");
    expect(container.querySelector("h4")).toHaveClass("text-lg", "md:text-xl");
    expect(container.querySelector("h4")?.parentElement).toHaveClass(
      "p-4",
      "pt-6",
      "md:p-8",
      "md:pt-12",
    );
    expect(getByTestId("white-label-stage")).toHaveClass(
      "w-full",
      "max-w-[360px]",
      "sm:max-w-[430px]",
    );
  });

  it("centers the curated liquidity animation horizontally inside the stage", () => {
    const { getByTestId } = render(<WhiteLabelVisual activeIndex={1} />);

    expect(getByTestId("white-label-liquidity-visual")).toHaveClass(
      "w-full",
      "justify-center",
    );
  });
});
