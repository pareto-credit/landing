import { afterEach, describe, expect, it } from "vitest";
import { isQueryFlagEnabled } from "./queryFlags";

describe("isQueryFlagEnabled", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  it("is off unless the flag is present", () => {
    expect(isQueryFlagEnabled("showIndexes")).toBe(false);
  });

  it("turns on for truthy values and stays off for explicit falsy ones", () => {
    window.history.replaceState(null, "", "/?showIndexes=1");
    expect(isQueryFlagEnabled("showIndexes")).toBe(true);

    window.history.replaceState(null, "", "/?showIndexes=off");
    expect(isQueryFlagEnabled("showIndexes")).toBe(false);
  });
});
