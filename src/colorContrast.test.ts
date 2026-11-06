import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
const tokens = new Map(
  [...css.matchAll(/(--color-[\w-]+):\s*([^;]+);/g)].map((match) => [
    match[1],
    match[2].trim(),
  ])
);

const luminance = (token: string): number => {
  const value = tokens.get(token);
  const alias = value?.match(/^var\((--color-[\w-]+)\)$/);
  if (alias) return luminance(alias[1]);
  if (!value || !/^#[a-f\d]{6}$/i.test(value))
    throw new Error(`Expected a solid color for ${token}`);
  const hex = value.slice(1);
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

describe("accessible semantic colors", () => {
  it.each([
    ["--color-text-muted", "--color-bg-light-alt", 4.5],
    ["--color-text-muted", "--color-surface", 4.5],
    ["--color-text-muted-inverse", "--color-bg-page", 4.5],
    ["--color-text-muted-inverse", "--color-bg-page-alt", 4.5],
    ["--color-focus-on-light", "--color-bg-light-alt", 3],
    ["--color-focus-on-light", "--color-surface-muted", 3],
    ["--color-focus-on-dark", "--color-bg-page", 3],
    ["--color-focus-on-dark", "--color-bg-page-alt", 3],
    ["--color-brand-deep", "--color-bg-light-alt", 4.5],
  ] as const)(
    "keeps %s readable against %s",
    (foreground, background, minimum) => {
      const [darker, lighter] = [
        luminance(foreground),
        luminance(background),
      ].sort((a, b) => a - b);
      expect((lighter + 0.05) / (darker + 0.05)).toBeGreaterThanOrEqual(
        minimum
      );
    }
  );
});
