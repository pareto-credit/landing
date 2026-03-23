import { describe, expect, it } from "vitest";
import { router } from "./router";

describe("router", () => {
  it("enables scroll restoration so route navigation resets scroll", () => {
    expect(router.options.scrollRestoration).toBe(true);
  });
});
