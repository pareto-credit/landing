"use client";

import { useId, useRef, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import "./audience-hero-visual.css";

const sheetOutline =
  "M -7 -76 Q 0 -80 7 -76 L 138 -4 Q 145 0 138 4 L 7 76 Q 0 80 -7 76 L -138 4 Q -145 0 -138 -4 Z";
const gridFractions = [-0.6, -0.2, 0.2, 0.6];

function Sheet({ fill, accent = false }: { fill: string; accent?: boolean }) {
  return (
    <>
      <path
        d={sheetOutline}
        fill={fill}
        stroke={accent ? "#779a5c" : "#a5b79b"}
        strokeWidth={accent ? 1.1 : 0.8}
      />
      <g
        fill="none"
        stroke={accent ? "#8da675" : "#bccab2"}
        strokeWidth=".65"
        opacity=".65"
      >
        {gridFractions.map((fraction) => (
          <g key={fraction}>
            <path
              d={`M ${fraction * 70 - 70} ${fraction * 40 + 40} L ${
                fraction * 70 + 70
              } ${fraction * 40 - 40}`}
            />
            <path
              d={`M ${fraction * 70 - 70} ${-fraction * 40 - 40} L ${
                fraction * 70 + 70
              } ${-fraction * 40 + 40}`}
            />
          </g>
        ))}
      </g>
      <path
        d="M -17 0 L 0 -10 L 17 0 L 0 10 Z"
        fill={accent ? "#6f9254" : "#b5c7a4"}
        opacity=".85"
      />
    </>
  );
}

/** Ambient architectural artwork; no product data, controls or application chrome. */
export default function AudienceHeroVisual({
  originators,
}: {
  originators: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.15 });
  const pageVisible = usePageVisibility();
  const reduced = useReducedMotion();
  const prefix = useId().replace(/:/g, "");
  const fillId = `${prefix}-sheet`;
  const maskId = `${prefix}-fade`;
  return (
    <figure
      ref={ref}
      className={`audience-art ${
        originators ? "audience-art--structure" : "audience-art--network"
      }`}
      data-testid="audience-hero-visual"
      data-running={visible && pageVisible && !reduced}
      aria-label={
        originators
          ? "Modular credit infrastructure"
          : "Connected credit access"
      }
    >
      <svg viewBox="0 0 600 500" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id={fillId}
            x1="-140"
            y1="-80"
            x2="140"
            y2="80"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f7f9f2" stopOpacity=".95" />
            <stop offset="1" stopColor="#d8e5cb" stopOpacity=".8" />
          </linearGradient>
          <radialGradient id={maskId}>
            <stop offset=".35" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`${maskId}-mask`}>
            <rect width="600" height="500" fill={`url(#${maskId})`} />
          </mask>
        </defs>
        <g
          mask={`url(#${maskId}-mask)`}
          stroke="#c4d1bb"
          strokeWidth=".7"
          opacity=".5"
        >
          {Array.from({ length: 17 }, (_, i) => (
            <g key={i}>
              <path d={`M ${-240 + i * 44} 150 L ${360 + i * 44} 500`} />
              <path d={`M ${240 + i * 44} 150 L ${-360 + i * 44} 500`} />
            </g>
          ))}
        </g>
        {originators ? (
          <g transform="translate(300 182)">
            <path
              d="M 0 -100 L 0 245"
              stroke="#afc19c"
              strokeDasharray="2 7"
              strokeWidth=".8"
            />
            {[120, 79, 38, -3].map((y, index) => (
              <g key={y} transform={`translate(0 ${y})`}>
                <g
                  className="audience-art__sheet"
                  style={
                    {
                      "--lift": `${18 - index * 18}px`,
                      "--drift": `${(index - 1.5) * 7}px`,
                      "--delay": `${index * -0.16}s`,
                    } as CSSProperties
                  }
                >
                  <Sheet fill={`url(#${fillId})`} accent={index === 3} />
                  <circle cx="-112" cy="0" r="2" fill="#799e5b" />
                  <circle cx="112" cy="0" r="2" fill="#799e5b" />
                </g>
              </g>
            ))}
            <g stroke="#afc398" strokeWidth="1">
              <path d="M -185 52 L -160 66 L -185 80" />
              <path d="M 185 52 L 160 66 L 185 80" />
            </g>
          </g>
        ) : (
          <>
            <g stroke="#a7be93" strokeWidth="1">
              <path d="M 145 155 L 300 245 L 455 155" />
              <path d="M 145 335 L 300 245 L 455 335" />
              <path d="M 300 65 L 300 425" strokeDasharray="2 7" />
            </g>
            {[
              [145, 155],
              [455, 155],
              [145, 335],
              [455, 335],
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y}) scale(.36)`}>
                <g
                  className="audience-art__satellite"
                  style={{ "--delay": `${i * -1.3}s` } as CSSProperties}
                >
                  <Sheet fill={`url(#${fillId})`} />
                  <path
                    d={sheetOutline}
                    transform="translate(0 16)"
                    stroke="#acbf9b"
                    strokeWidth="1.2"
                  />
                </g>
              </g>
            ))}
            <g transform="translate(300 245)">
              <g className="audience-art__hub">
                <path
                  d={sheetOutline}
                  transform="translate(0 25) scale(.84)"
                  fill="#dfe8d4"
                  stroke="#a4ba92"
                />
                <g transform="scale(.84)">
                  <Sheet fill={`url(#${fillId})`} accent />
                </g>
              </g>
            </g>
            {[
              [145, 155, 155, 90],
              [455, 155, -155, 90],
              [145, 335, 155, -90],
              [455, 335, -155, -90],
            ].map(([x, y, dx, dy], i) => (
              <g transform={`translate(${x} ${y})`} key={i}>
                <circle
                  className="audience-art__packet"
                  r="3"
                  fill="#779b54"
                  style={
                    {
                      "--dx": `${dx}px`,
                      "--dy": `${dy}px`,
                      "--delay": `${i * -1.4}s`,
                    } as CSSProperties
                  }
                />
              </g>
            ))}
          </>
        )}
      </svg>
      <figcaption>
        <span className="audience-art__caption-rule" aria-hidden="true" />
        <span>
          {originators
            ? "Every layer, aligned."
            : "Your capital. In perspective."}
        </span>
      </figcaption>
    </figure>
  );
}
