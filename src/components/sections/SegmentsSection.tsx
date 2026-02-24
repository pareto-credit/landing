import { Fragment } from "react";
import bastionEco from "../../assets/images/operators/Bastion_Trading.svg";
import falconEco from "../../assets/images/operators/FalconX.svg";
import digitalEco from "../../assets/images/operators/Fasanara_Digital.svg";
import rockawayEco from "../../assets/images/operators/RockawayX_mark.svg";
import m11Eco from "../../assets/images/operators/m11.svg";
import { SectionContainer } from "../ui/Section";

interface Operator {
  name: string;
  link: string;
  src: string;
}

const operators: Operator[] = [
  {
    name: "FalconX",
    link: "https://www.falconx.io/",
    src: falconEco,
  },
  {
    name: "RockawayX",
    link: "https://www.rockawayx.com/",
    src: rockawayEco,
  },
  {
    name: "Fasanara Digital",
    link: "https://www.fasanara.com/",
    src: digitalEco,
  },
  {
    name: "Bastion Trading",
    link: "https://bastiontrading.com/",
    src: bastionEco,
  },
  {
    name: "M11 Credit",
    link: "https://www.maven11.com/",
    src: m11Eco,
  },
];

const SegmentsSection = () => {
  return (
    <section className="relative z-20 overflow-hidden border-b border-white/5 bg-[#081912] py-8">
      <SectionContainer className="mb-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#70B19E]">
          Our partners
        </div>
      </SectionContainer>

      <div className="group marquee-container w-full">
        <div className="marquee-content items-center gap-16 px-6 md:gap-24">
          {[...Array(3)].map((_, index) => (
            <Fragment key={`operators-loop-${index}`}>
              {operators.map((operator) => (
                <a
                  key={`${index}-${operator.name}`}
                  href={operator.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/logo relative inline-flex items-center justify-center px-2 py-3 opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  aria-label={`Visit ${operator.name}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-[2px] opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#70B19E] to-transparent shadow-[0_0_28px_#70B19E]" />
                    <span className="absolute inset-x-1 bottom-0 h-[7px] bg-gradient-to-r from-transparent via-[#70B19E]/45 to-transparent blur-[5px]" />
                    <span className="absolute inset-x-2 bottom-0 h-[12px] bg-gradient-to-r from-transparent via-[#8DF8E0]/24 to-transparent blur-[12px]" />
                  </span>
                  <img
                    src={operator.src}
                    alt={operator.name}
                    className="relative z-10 h-8 w-auto max-w-[180px] object-contain transition-all duration-300 group-hover/logo:scale-[1.02] group-hover/logo:brightness-110 md:h-10 md:max-w-[220px]"
                  />
                </a>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SegmentsSection;
