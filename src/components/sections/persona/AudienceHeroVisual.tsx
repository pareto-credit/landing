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
        d="M-140 0 0 78 140 0V8L0 86-140 8Z"
        fill={accent ? "#9fbfac" : "#d1ded5"}
        stroke="#a7c0b2"
        strokeWidth=".8"
      />
      <path
        d={sheetOutline}
        fill={fill}
        stroke={accent ? "#3f6e59" : "#a7c0b2"}
        strokeWidth={accent ? 1.1 : 0.8}
      />
      <g
        fill="none"
        stroke={accent ? "#8da99b" : "#cfdbd4"}
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
        fill={accent ? "#3f6e59" : "#b7cbc0"}
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
      data-reduced={Boolean(reduced)}
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
            <stop stopColor="#f4f7f5" stopOpacity=".95" />
            <stop offset="1" stopColor="#d4e3da" stopOpacity=".8" />
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
          stroke="#c9d6ce"
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
        <ellipse
          cx="300"
          cy="379"
          rx="152"
          ry="26"
          fill="#254839"
          opacity=".04"
        />
        {originators ? (
          <g transform="translate(300 182)">
            <path
              d="M 0 -100 L 0 245"
              stroke="#a7c0b2"
              strokeDasharray="2 7"
              strokeWidth=".8"
            />
            {[120, 79, 38, -3].map((y, index) => (
              <g key={y} transform={`translate(0 ${y})`}>
                <g
                  className="audience-art__sheet"
                  style={
                    {
                      "--lift": `${4 - index * 5}px`,
                    } as CSSProperties
                  }
                >
                  <Sheet fill={`url(#${fillId})`} accent={index === 3} />
                  <path
                    className="audience-art__sheet-edge"
                    d="M-138 4 0 80 138 4"
                    stroke="#70b19e"
                    strokeWidth="1.5"
                    style={{ "--delay": `${index * 0.55}s` } as CSSProperties}
                  />
                  {index === 3 && (
                    <g transform="translate(0 -2)">
                      <path
                        d="m-44 0 44-25L44 0 0 25Z"
                        fill="#254839"
                        stroke="#3f6e59"
                      />
                      <path d="m-44 0 44 25L44 0v6L0 31-44 6Z" fill="#3f6e59" />
                      <path
                        d="m-12 0 9 5 16-10"
                        stroke="#bde7d7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </g>
              </g>
            ))}
            <circle
              className="audience-art__stack-signal"
              cx="0"
              cy="218"
              r="3"
              fill="#3f6e59"
            />
            <g stroke="#a7c0b2" strokeWidth="1">
              <path d="M -185 52 L -160 66 L -185 80" />
              <path d="M 185 52 L 160 66 L 185 80" />
            </g>
          </g>
        ) : (
          <>
            <g stroke="#a7c0b2" strokeWidth="1">
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
                    stroke="#b7cbc0"
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
                  fill="#e3eee8"
                  stroke="#a7c0b2"
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
                  fill="#3f6e59"
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
