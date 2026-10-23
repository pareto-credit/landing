import PartnerLogo from "../ui/PartnerLogo";
import { partners } from "../../data/partners";

const SegmentsSection = () => {
  return (
    <section
      aria-label="Our partners"
      className="relative z-20 overflow-hidden bg-[var(--color-bg-light-alt)] py-8 md:py-10"
    >
      <p className="mb-6 px-6 text-center text-sm text-[var(--color-text-muted)] md:mb-8 md:text-base">
        Powering leading companies building the future of credit and global markets
      </p>

      <div className="group marquee-container w-full [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [&:focus-within_.marquee-content]:[animation-play-state:paused]">
        <div className="marquee-content">
          {[0, 1].map((loopIndex) => (
            <div
              key={`operators-loop-${loopIndex}`}
              aria-hidden={loopIndex === 1}
              className="marquee-group items-center gap-12 px-6 md:gap-20"
            >
              {partners.map((operator) => (
                <PartnerLogo
                  key={`${loopIndex}-${operator.name}`}
                  partner={operator}
                  tone="light"
                  presentation="marquee"
                  duplicate={loopIndex === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SegmentsSection;
