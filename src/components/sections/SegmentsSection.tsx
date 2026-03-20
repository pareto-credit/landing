import bastionEco from "../../assets/images/operators/Bastion_Trading.svg";
import adaptiveFrontierEco from "../../assets/images/operators/adaptivefrontier.png";
import eulerEco from "../../assets/images/operators/euler.svg";
import falconEco from "../../assets/images/operators/FalconX.svg";
import digitalEco from "../../assets/images/operators/Fasanara_Digital.svg";
import gauntletEco from "../../assets/images/operators/gauntletlogo.svg";
import keyringEco from "../../assets/images/operators/keyring.svg";
import rockawayEco from "../../assets/images/operators/RockawayX_mark.svg";
import m11Eco from "../../assets/images/operators/m11.svg";
import morphoEco from "../../assets/images/operators/morpho.svg";
import steakhouseEco from "../../assets/images/operators/steakhouse.svg";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface Operator {
  name: string;
  link: string;
  src: string;
  visualScale: number;
  verticalOffset?: number;
  imageClassName?: string;
  hoverImageClassName?: string;
}

const operators: Operator[] = [
  {
    name: "FalconX",
    link: "https://www.falconx.io/",
    src: falconEco,
    visualScale: 1.2,
    verticalOffset: -4,
  },
  {
    name: "RockawayX",
    link: "https://www.rockawayx.com/",
    src: rockawayEco,
    visualScale: 1.16,
    verticalOffset: -1,
  },
  {
    name: "Fasanara Digital",
    link: "https://www.fasanara.com/",
    src: digitalEco,
    visualScale: 1.04,
    verticalOffset: -1,
  },
  {
    name: "Bastion Trading",
    link: "https://bastiontrading.com/",
    src: bastionEco,
    visualScale: 1.08,
    verticalOffset: 0,
  },
  {
    name: "M11 Credit",
    link: "https://www.maven11.com/",
    src: m11Eco,
    visualScale: 1.14,
    verticalOffset: 0,
  },
  {
    name: "Adaptive Frontier",
    link: "https://www.adaptivefrontier.com/",
    src: adaptiveFrontierEco,
    visualScale: 1.08,
    verticalOffset: 0,
  },
  {
    name: "Gauntlet",
    link: "https://www.gauntlet.xyz/",
    src: gauntletEco,
    visualScale: 0.8,
    verticalOffset: 0,
    imageClassName: "brightness-0 invert opacity-90",
    hoverImageClassName: "group-hover/logo:brightness-100 group-hover/logo:invert-0",
  },
  {
    name: "Steakhouse",
    link: "https://www.steakhouse.financial/",
    src: steakhouseEco,
    visualScale: 0.8,
    verticalOffset: 0,
    imageClassName: "brightness-0 invert opacity-90",
  },
  {
    name: "Morpho",
    link: "https://morpho.org/",
    src: morphoEco,
    visualScale: 0.8,
    verticalOffset: 0,
    imageClassName: "opacity-90",
  },
  {
    name: "Keyring",
    link: "https://www.keyring.network/",
    src: keyringEco,
    visualScale: 0.8,
    verticalOffset: 0,
    imageClassName: "brightness-0 invert opacity-90",
  },
  {
    name: "Euler",
    link: "https://euler.finance/",
    src: eulerEco,
    visualScale: 0.6,
    verticalOffset: 0,
    imageClassName: "brightness-0 invert opacity-90",
    hoverImageClassName: "group-hover/logo:brightness-100 group-hover/logo:invert-0",
  },
];

const SegmentsSection = () => {
  return (
    <section className="relative z-20 overflow-hidden border-b border-[var(--color-border-inverse-subtle)] bg-[var(--color-brand-mid)] py-8">
      <SectionContainer className="mb-6 flex items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Our partners"
          title="Our partners"
          className="max-w-none"
          titleClassName="sr-only"
        />
      </SectionContainer>

      <div className="group marquee-container w-full">
        <div className="marquee-content">
          {[0, 1].map((loopIndex) => (
            <div
              key={`operators-loop-${loopIndex}`}
              aria-hidden={loopIndex === 1}
              className="marquee-group items-center gap-16 px-6 md:gap-24"
            >
              {operators.map((operator) => (
                <a
                  key={`${loopIndex}-${operator.name}`}
                  href={operator.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={loopIndex === 1 ? -1 : undefined}
                  className="group/logo relative inline-flex h-12 w-[12.5rem] shrink-0 items-center justify-center opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-14 md:w-[14rem]"
                  aria-label={`Visit ${operator.name}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-brand-alt)] to-transparent shadow-[0_0_28px_var(--color-brand-alt)]" />
                    <span className="absolute inset-x-1 bottom-0 h-[7px] bg-gradient-to-r from-transparent via-[color:rgb(112_177_158_/_0.45)] to-transparent blur-[5px]" />
                    <span className="absolute inset-x-2 bottom-0 h-[12px] bg-gradient-to-r from-transparent via-[color:rgb(141_248_224_/_0.24)] to-transparent blur-[12px]" />
                  </span>
                  <img
                    src={operator.src}
                    alt={operator.name}
                    style={{
                      transform: `translateY(${operator.verticalOffset ?? 0}px) scale(${operator.visualScale})`,
                      transformOrigin: "center center",
                    }}
                    className={`relative z-10 block h-full w-full object-contain px-2 pt-1 pb-2 md:pb-2.5 transition-[filter,opacity] duration-300 group-hover/logo:brightness-110 ${operator.imageClassName ?? ""} ${operator.hoverImageClassName ?? ""}`}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SegmentsSection;
