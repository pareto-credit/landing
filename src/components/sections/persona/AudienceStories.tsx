import { partners } from "../../../data/partners";
import PartnerLogo from "../../ui/PartnerLogo";
import AudienceReveal from "./AudienceReveal";

// Shared across the Clients, Credit Vaults and Studio pages.
const audienceStories: Array<{
  company: string;
  topic: string;
  title: string;
  href?: string;
}> = [
  {
    company: "RockawayX",
    topic: "Capital allocator perspective",
    title: "From zero to invested in 15 minutes.",
    href: "https://paragraph.com/@pareto/invested-15-minutes-rockawayx-case-study",
  },
  {
    company: "M11 Credit",
    topic: "Underwriter perspective",
    title: "Institutional credit. Traditional finance discipline.",
    href: "https://paragraph.com/@pareto/institutional-credit-structured-discipline-traditional-finance-m11credit-casestudy",
  },
  {
    company: "FalconX",
    topic: "Borrower perspective",
    title: "Institutional credit, onchain.",
  },
];

export default function AudienceStories() {
  return (
    <div className="audience-stories">
      {audienceStories.map((story, index) => {
        const partner = partners.find((item) => item.name === story.company)!;
        const content = (
          <>
            <div className="audience-story__logo">
              <PartnerLogo
                partner={partner}
                tone="light"
                presentation="grid"
                linked={false}
              />
            </div>
            <div>
              <p className="audience-kicker">{story.topic}</p>
              <h3>{story.title}</h3>
            </div>
            <span className="audience-story__status">
              {story.href ? (
                <>
                  Read the story <span aria-hidden="true">↗</span>
                </>
              ) : (
                "COMING SOON"
              )}
            </span>
          </>
        );
        return (
          <AudienceReveal
            key={story.company}
            delay={index * 0.06}
            className="audience-story"
          >
            <article aria-label={`${story.company} story`}>
              {story.href ? (
                <a className="audience-story__content" href={story.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div className="audience-story__content">{content}</div>
              )}
            </article>
          </AudienceReveal>
        );
      })}
    </div>
  );
}
