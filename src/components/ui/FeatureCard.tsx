import type { ComponentPropsWithRef } from "react";
import { cn } from "../../lib/cn";
import "./feature-card.css";

type FeatureCardProps = ComponentPropsWithRef<"article"> & {
  id: string;
  index: string;
  title: string;
  description: string;
  label: string;
};

export default function FeatureCard({
  id,
  index,
  title,
  description,
  label,
  children,
  className,
  ...articleProps
}: FeatureCardProps) {
  return (
    <article
      {...articleProps}
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("feature-card ui-card-surface", className)}
    >
      <div className="feature-card__copy">
        <div className="feature-card__meta">
          <span className="feature-card__index" aria-hidden="true">
            {index}
          </span>
          <span>{label}</span>
        </div>
        <h3 id={`${id}-title`}>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="feature-card__art" aria-hidden="true">
        {children}
      </div>
    </article>
  );
}
