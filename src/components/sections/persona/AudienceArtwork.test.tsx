import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AudienceHeroVisual from "./AudienceHeroVisual";
import AudienceCardArt from "./AudienceCardArt";

const motion = vi.hoisted(() => ({ inView: true, reduced: false }));
vi.mock("framer-motion", () => ({
  useInView: () => motion.inView,
  useReducedMotion: () => motion.reduced,
}));

beforeEach(() => {
  motion.inView = true;
  motion.reduced = false;
});
afterEach(() => vi.restoreAllMocks());

describe("audience artwork motion", () => {
  it.each(["structure", "network", "benefit"] as const)(
    "pauses %s artwork when hidden, offscreen, or reduced motion is requested",
    (kind) => {
      const visibility = vi
        .spyOn(document, "visibilityState", "get")
        .mockReturnValue("visible");
      const artwork = () =>
        kind === "benefit" ? (
          <AudienceCardArt kind="activity" />
        ) : (
          <AudienceHeroVisual originators={kind === "structure"} />
        );
      const { container, rerender } = render(artwork());
      const frame = container.firstElementChild!;
      expect(frame).toHaveAttribute("data-running", "true");

      visibility.mockReturnValue("hidden");
      fireEvent(document, new Event("visibilitychange"));
      expect(frame).toHaveAttribute("data-running", "false");
      visibility.mockReturnValue("visible");
      fireEvent(document, new Event("visibilitychange"));
      expect(frame).toHaveAttribute("data-running", "true");

      motion.inView = false;
      rerender(artwork());
      expect(container.querySelector("[data-running]")).toHaveAttribute(
        "data-running",
        "false"
      );
      motion.inView = true;
      motion.reduced = true;
      rerender(artwork());
      expect(container.firstElementChild).toHaveAttribute(
        "data-running",
        "false"
      );
      expect(container.firstElementChild).toHaveAttribute(
        "data-reduced",
        "true"
      );
    }
  );
});
