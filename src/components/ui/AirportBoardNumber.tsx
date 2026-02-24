import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

interface AirportBoardNumberProps {
  value: string;
  isLoading: boolean;
  className?: string;
}

const DIGIT_CHARS = "0123456789";
const isDigit = (char: string) => /\d/.test(char);

const getRandomDigit = () =>
  DIGIT_CHARS.charAt(Math.floor(Math.random() * DIGIT_CHARS.length));

const getShuffledValue = (template: string) =>
  template
    .split("")
    .map((char) => (isDigit(char) ? getRandomDigit() : char))
    .join("");

export const AirportBoardNumber = ({
  value,
  isLoading,
  className,
}: AirportBoardNumberProps) => {
  const targetValue = value || "$0";
  const [displayValue, setDisplayValue] = useState(() => getShuffledValue(targetValue));

  useEffect(() => {
    if (!isLoading) return;

    const intervalId = window.setInterval(() => {
      setDisplayValue(getShuffledValue(targetValue));
    }, 90);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isLoading, targetValue]);

  const renderedValue = isLoading ? displayValue : targetValue;

  return (
    <span
      className={cn(
        "tabular-nums [font-variant-numeric:tabular-nums]",
        isLoading && "tracking-[0.04em]",
        className,
      )}
    >
      {renderedValue}
    </span>
  );
};
