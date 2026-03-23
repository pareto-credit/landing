import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  consumeLegalPageReturnScroll,
  getLegalPageReturnScroll,
  saveLegalPageReturnScroll,
} from "./legalPageScroll";

describe("legalPageScroll", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("stores the current window scroll position for a legal-page return", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(1420);

    saveLegalPageReturnScroll();

    expect(getLegalPageReturnScroll()).toBe(1420);
  });

  it("consumes the stored scroll position only once", () => {
    window.sessionStorage.setItem("pareto:legal:return-scroll-y", "640");

    expect(consumeLegalPageReturnScroll()).toBe(640);
    expect(consumeLegalPageReturnScroll()).toBeNull();
  });

  it("drops invalid stored values", () => {
    window.sessionStorage.setItem("pareto:legal:return-scroll-y", "nope");

    expect(getLegalPageReturnScroll()).toBeNull();
  });

  it("returns null when no scroll has been stored", () => {
    expect(getLegalPageReturnScroll()).toBeNull();
  });
});
