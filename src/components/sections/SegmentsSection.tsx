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

      <div className="group marquee-container w-full [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-content">
          {[0, 1].map((loopIndex) => (
            <div
              key={`operators-loop-${loopIndex}`}
              aria-hidden={loopIndex === 1}
              className="marquee-group items-center gap-12 px-6 md:gap-20"
            >
              {partners.map((operator) => (
                <a
                  key={`${loopIndex}-${operator.name}`}
                  href={operator.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={loopIndex === 1 ? -1 : undefined}
                  className="relative inline-flex h-10 w-[10rem] shrink-0 items-center justify-center opacity-50 transition-opacity duration-300 hover:opacity-90 focus-visible:opacity-90 focus-visible:outline-none md:h-12 md:w-[12rem]"
                  aria-label={`Visit ${operator.name}`}
                >
                  <img
                    src={operator.src}
                    alt={operator.name}
                    style={{
                      transform: `translateY(${operator.verticalOffset ?? 0}px) scale(${operator.visualScale})`,
                      transformOrigin: "center center",
                    }}
                    className="block h-full w-full object-contain px-2 py-1.5 brightness-0"
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
