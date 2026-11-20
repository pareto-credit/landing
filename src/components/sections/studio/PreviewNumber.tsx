import { useEffect, useRef } from "react";

/** Keep the final value accessible and reserve its width while the visual counter settles. */
export default function PreviewNumber({
  value,
  running,
  reduced,
}: {
  value: string;
  running: boolean;
  reduced: boolean;
}) {
  const visual = useRef<HTMLSpanElement>(null);
  const current = useRef(0);

  useEffect(() => {
    const node = visual.current;
    const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!node || !match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replaceAll(",", ""));
    if (reduced) {
      current.current = target;
      node.textContent = value;
      return;
    }
    if (!running) return;
    const decimals = digits.split(".")[1]?.length ?? 0;
    const format = (amount: number) =>
      `${prefix}${amount.toLocaleString("en-US", {
        useGrouping: digits.includes(","),
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
    const from = current.current;
    let started: number | undefined;
    let frame: number;
    const tick = (now: number) => {
      started ??= now;
      const progress = Math.min((now - started) / 900, 1);
      current.current = from + (target - from) * (1 - (1 - progress) ** 3);
      node.textContent = progress === 1 ? value : format(current.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    node.textContent = format(from);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, running, reduced]);

  return (
    <span className="preview-number">
      <span className="preview-number__target">{value}</span>
      <span ref={visual} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
