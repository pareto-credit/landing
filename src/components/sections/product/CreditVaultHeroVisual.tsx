import { useId, useRef } from "react";
import { useInView } from "framer-motion";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import "./credit-vault-hero-visual.css";

const dialTicks = Array.from({ length: 36 }, (_, index) => index * 10);
const irisSeams = [0, 60, 120, 180, 240, 300];

export default function CreditVaultHeroVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const pageVisible = usePageVisibility();
  const id = useId();

  return (
    <svg
      ref={ref}
      className="credit-vault-visual"
      data-running={inView && pageVisible}
      viewBox="0 0 600 500"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#b8dacb" stopOpacity=".72" />
          <stop offset="1" stopColor="#b8dacb" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-glass`} x2="1" y2="1">
          <stop stopColor="#fff" stopOpacity=".96" />
          <stop offset="1" stopColor="#d2e1d8" stopOpacity=".85" />
        </linearGradient>
        <linearGradient id={`${id}-steel`} x2="1" y2="1">
          <stop stopColor="#eef7f2" />
          <stop offset=".52" stopColor="#b4cbbf" />
          <stop offset="1" stopColor="#829f91" />
        </linearGradient>
        <linearGradient id={`${id}-iris`} x2="1" y2="1">
          <stop stopColor="#607d70" />
          <stop offset=".53" stopColor="#38574a" />
          <stop offset="1" stopColor="#284338" />
        </linearGradient>
        <radialGradient id={`${id}-chamber`}>
          <stop stopColor="#8ac8b2" />
          <stop offset=".58" stopColor="#39695a" />
          <stop offset="1" stopColor="#122e24" />
        </radialGradient>
        <mask
          id={`${id}-shutter`}
          maskUnits="userSpaceOnUse"
          x="190"
          y="140"
          width="220"
          height="220"
        >
          <circle cx="300" cy="250" r="109" fill="white" />
          <path
            className="credit-vault-visual__aperture"
            d="M300 162 376 206V294L300 338 224 294V206Z"
            fill="black"
          />
        </mask>
      </defs>

      <ellipse cx="300" cy="263" rx="292" ry="232" fill={`url(#${id}-halo)`} />
      <g stroke="#8bac9c" opacity=".44">
        <path d="M73 211H110M490 211H527M73 289H110M490 289H527" />
        <path d="M84 72H113M84 72V101M516 72H487M516 72V101M84 428V399M84 428H113M516 428V399M516 428H487" />
        <path d="M300 53V76M300 424V447" strokeDasharray="2 5" />
      </g>

      <rect
        x="115"
        y="94"
        width="390"
        height="324"
        rx="35"
        fill="#a7c1b4"
        opacity=".37"
      />
      <rect
        x="105"
        y="82"
        width="390"
        height="324"
        rx="35"
        fill={`url(#${id}-glass)`}
        stroke="#adc6b9"
      />
      <rect
        x="112"
        y="89"
        width="376"
        height="310"
        rx="29"
        stroke="white"
        strokeOpacity=".8"
      />
      <path
        d="M139 116H163M139 123H151M437 381H461M449 374H461"
        stroke="#99b2a5"
        strokeLinecap="round"
      />

      <circle cx="300" cy="250" r="142" fill="#799d8c" opacity=".14" />
      <circle
        cx="300"
        cy="250"
        r="138"
        fill={`url(#${id}-steel)`}
        stroke="#799d8c"
      />
      <circle
        cx="300"
        cy="250"
        r="130"
        fill="#dceae3"
        stroke="white"
        strokeOpacity=".74"
      />
      <circle cx="300" cy="250" r="113" fill="#172f25" stroke="#789a8a" />
      <circle cx="300" cy="250" r="109" fill={`url(#${id}-chamber)`} />
      <g stroke="#c5f2de" strokeOpacity=".52">
        <circle cx="300" cy="250" r="48" />
        <circle cx="300" cy="250" r="67" strokeDasharray="2 6" />
        <path d="M275 250H325M300 225V275" strokeOpacity=".28" />
      </g>
      <path
        d="M300 230 320 250 300 270 280 250Z"
        fill="#9ed8c2"
        stroke="#d3f5e6"
      />
      <path d="M300 230V250L280 250Z" fill="#def8ed" />

      <g mask={`url(#${id}-shutter)`}>
        <circle cx="300" cy="250" r="109" fill={`url(#${id}-iris)`} />
        {irisSeams.map((angle) => (
          <path
            key={angle}
            d="M300 141Q343 170 350 212"
            transform={`rotate(${angle} 300 250)`}
            stroke="#a2bbae"
            strokeOpacity=".54"
          />
        ))}
      </g>
      <circle cx="300" cy="250" r="109" stroke="#b2d0c1" strokeOpacity=".42" />

      <g className="credit-vault-visual__dial">
        {dialTicks.map((angle) => (
          <path
            key={angle}
            d={angle % 30 === 0 ? "M300 125V135" : "M300 128V134"}
            transform={`rotate(${angle} 300 250)`}
            stroke={angle % 30 === 0 ? "#55786a" : "#a4bdb0"}
            strokeLinecap="round"
          />
        ))}
        <circle
          cx="300"
          cy="250"
          r="121"
          stroke="#4c8c76"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="42 800"
          transform="rotate(-90 300 250)"
        />
      </g>

      <circle cx="462" cy="117" r="5" fill="#5e8575" />
      <circle
        className="credit-vault-visual__status"
        cx="462"
        cy="117"
        r="4"
        fill="#aff6d8"
      />
    </svg>
  );
}
