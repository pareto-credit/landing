import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import NarrativeScrollSection from "../components/sections/NarrativeScrollSection";
import { ButtonLink } from "../components/ui/Button";
import { PageLink } from "../components/ui/PageLink";
import { SectionContainer } from "../components/ui/Section";
import { PARETO_DOCS_URL } from "../data/brand";
import {
  thesisConstraints,
  thesisRoadmap,
  thesisSafeguards,
  thesisStages,
  thesisStats,
} from "../data/thesis";
import { useProductsData } from "../hooks/useProductsData";
import { setPendingContactInterest } from "../lib/siteNavigation";
import { cn } from "../lib/cn";

const chapters = [
  { id: "opportunity", label: "Opportunity" },
  { id: "constraint", label: "The constraint" },
  { id: "rails", label: "Why onchain" },
  { id: "accountability", label: "Accountability" },
  { id: "platform", label: "One platform" },
  { id: "next", label: "What's next" },
] as const;

const COMPACT_CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

interface ChapterProps {
  id: (typeof chapters)[number]["id"];
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  children: ReactNode;
}

const Chapter = ({ id, title, lead, tone = "light", children }: ChapterProps) => {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        isDark
          ? "bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)]"
          : "bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]",
      )}
    >
      <SectionContainer className="py-16 md:py-24">
        <div
          className={cn(
            "grid gap-8 border-t pt-8 md:grid-cols-[200px_1fr] md:gap-12",
            isDark ? "border-[color:rgb(255_255_255_/_0.12)]" : "border-[var(--color-border-soft-strong)]",
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.18em]">
            <span className={isDark ? "text-[var(--color-brand-bright)]" : "text-[var(--color-brand-alt)]"}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={cn("ml-3", isDark ? "text-[color:rgb(255_255_255_/_0.55)]" : "text-[var(--color-text-muted)]")}>
              {chapters[index].label}
            </span>
          </div>
          <div>
            <h2
              className={cn(
                "max-w-3xl text-3xl font-bold tracking-tight md:text-[2.6rem] md:leading-[1.1]",
                isDark ? "text-[var(--color-text-inverse)]" : "text-[var(--color-brand-dark)]",
              )}
            >
              {title}
            </h2>
            {lead ? (
              <p
                className={cn(
                  "mt-5 max-w-2xl text-lg leading-relaxed",
                  isDark ? "text-[color:rgb(255_255_255_/_0.65)]" : "text-[var(--color-text-muted)]",
                )}
              >
                {lead}
              </p>
            ) : null}
            <div className="mt-10">{children}</div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

const ThesisPage = () => {
  const { metrics, isLoading } = useProductsData();

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main>
        <section
          id="hero"
          className="relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[color:rgb(114_244_201_/_0.12)] blur-[140px]" />
          <SectionContainer className="relative z-10 pb-16 pt-36 md:pb-20 md:pt-44">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-brand-alt)]">
              Thesis · Institutional briefing · October 2026
            </div>
            <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-[var(--color-brand-dark)]">
              Credit is moving onchain.
              <span className="block text-[var(--color-text-muted)]">Underwriting decides how fast.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Private credit has become one of the largest sources of
              financing in the economy, yet most facilities still run on PDFs,
              email threads and spreadsheets. Onchain rails fix settlement and
              transparency. They don't, by themselves, fix underwriting:
              someone still has to diligence the borrower, set the terms and
              stand behind the facility. Pareto is built around that job.
            </p>

            <nav aria-label="Thesis chapters" className="mt-12 grid grid-cols-2 gap-x-6 border-t border-[var(--color-border-soft-strong)] sm:grid-cols-3 lg:grid-cols-6">
              {chapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className="group border-b border-[var(--color-border-soft)] py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand-dark)] lg:border-b-0"
                >
                  <span className="text-[var(--color-brand-alt)]">{String(index + 1).padStart(2, "0")}</span>{" "}
                  {chapter.label}
                </a>
              ))}
            </nav>
          </SectionContainer>
        </section>

        <NarrativeScrollSection />

        <Chapter
          id="opportunity"
          title={
            <>
              Two pools of capital that should meet.
              <span className="text-[var(--color-text-muted)]"> And mostly don't.</span>
            </>
          }
          lead="Stablecoins have created a deep pool of onchain dollars looking for real yield. Private credit has the yield, but reaches lenders through slow, opaque, manual processes. The gap between them is not demand. It's infrastructure."
        >
          <div className="grid gap-px overflow-hidden rounded-md border border-[var(--color-border-soft)] bg-[var(--color-border-soft)] md:grid-cols-3">
            {thesisStats.map((stat) => (
              <figure key={stat.value} className="flex flex-col bg-[var(--color-surface)] p-6">
                <div className="text-5xl font-light tracking-tight text-[var(--color-brand-dark)]">{stat.value}</div>
                <figcaption className="mt-4 flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{stat.label}</p>
                  <a
                    href={stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] hover:text-[var(--color-brand-deep)]"
                  >
                    {stat.source}
                    <ArrowUpRight size={12} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </Chapter>

        <Chapter
          id="constraint"
          title={
            <>
              Why credit is still slow to move.
              <span className="text-[var(--color-text-muted)]"> Five frictions.</span>
            </>
          }
        >
          <ol className="divide-y divide-[var(--color-border-soft)] border-y border-[var(--color-border-soft)]">
            {thesisConstraints.map((item, index) => (
              <li key={item.title} className="grid gap-2 py-5 md:grid-cols-[3rem_16rem_1fr] md:gap-6">
                <span className="font-mono text-sm text-[var(--color-brand-alt)]">0{index + 1}</span>
                <span className="text-lg font-semibold tracking-tight text-[var(--color-brand-dark)]">{item.title}</span>
                <span className="text-[0.95rem] leading-relaxed text-[var(--color-text-muted)]">{item.copy}</span>
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter
          id="rails"
          title={
            <>
              Familiar safeguards,
              <span className="text-[var(--color-text-muted)]"> enforced by code.</span>
            </>
          }
          lead="Onchain credit works when it keeps everything credit committees already rely on, and makes it verifiable."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {thesisSafeguards.map((item, index) => (
              <div
                key={item.title}
                className="rounded-md border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6"
              >
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-brand-alt)]">
                  {String.fromCharCode(65 + index)}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--color-brand-dark)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter
          id="accountability"
          tone="dark"
          title={
            <>
              Agents draft.
              <span className="text-[color:rgb(255_255_255_/_0.45)]"> Humans sign.</span>
            </>
          }
          lead="AI can take on most of the back office: reading data rooms, reconciling loan tapes, drafting reports. What lenders actually trust is a named party accountable for the credit. In Pareto, agents prepare the work and a curator signs it, whether that's your own team or NorthBridge."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Agents prepare", "Document review, tape reconciliation, borrowing-base and covenant calculations, lender reports."],
              ["Curators decide", "Credit approval, terms, exceptions and enforcement stay with a named, accountable curator."],
              ["Code enforces", "Signed decisions move capital onchain; nothing changes in a vault without a signature."],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-md border border-[color:rgb(255_255_255_/_0.1)] bg-[color:rgb(255_255_255_/_0.03)] p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.65)]">{copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[color:rgb(255_255_255_/_0.5)]">
            Curation does not guarantee repayment. Credit risk remains with lenders.
          </p>
        </Chapter>

        <Chapter
          id="platform"
          title={
            <>
              Five stages.
              <span className="text-[var(--color-text-muted)]"> One platform.</span>
            </>
          }
        >
          <ol className="grid gap-px overflow-hidden rounded-md border border-[var(--color-border-soft)] bg-[var(--color-border-soft)] sm:grid-cols-2 lg:grid-cols-5">
            {thesisStages.map((stage, index) => (
              <li key={stage.title} className="bg-[var(--color-surface)] p-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-brand-alt)]">
                  0{index + 1}
                </div>
                <div className="mt-3 text-lg font-semibold tracking-tight text-[var(--color-brand-dark)]">{stage.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{stage.copy}</p>
              </li>
            ))}
          </ol>
          <PageLink
            to="/"
            hash="structures"
            className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-deep)] hover:underline"
          >
            See the credit facilities we support <ArrowUpRight size={13} />
          </PageLink>
        </Chapter>

        <Chapter
          id="next"
          title={
            <>
              Where it goes next.
              <span className="text-[var(--color-text-muted)]"> Agents in the loop.</span>
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {thesisRoadmap.map((item) => (
              <div
                key={item.name}
                className="rounded-md border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6"
              >
                <span className="inline-flex rounded-full border border-[var(--color-border-soft-strong)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                  {item.status}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--color-brand-dark)]">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <section className="bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)]">
          <SectionContainer className="py-16 md:py-20">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-brand-alt)]">
                  Pareto today
                </div>
                <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-6">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:rgb(255_255_255_/_0.55)]">
                      Credit serviced
                    </dt>
                    <dd className="mt-1 text-4xl font-light tracking-tight text-[var(--color-brand-bright)]">
                      {isLoading ? "—" : COMPACT_CURRENCY.format(metrics.creditExtended)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:rgb(255_255_255_/_0.55)]">
                      Active loans
                    </dt>
                    <dd className="mt-1 text-4xl font-light tracking-tight">
                      {isLoading ? "—" : COMPACT_CURRENCY.format(metrics.outstandingLoans)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PageLink
                  to="/"
                  hash="contact"
                  onClick={() => setPendingContactInterest("Pareto Studio (Core)")}
                  className="ui-radius-control inline-flex items-center justify-center gap-2 border border-[var(--color-button-primary-border)] bg-[var(--color-button-primary-bg)] px-6 py-3 font-mono text-sm font-medium uppercase text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-button-primary-hover-bg)]"
                >
                  Request Studio access
                </PageLink>
                <ButtonLink href={PARETO_DOCS_URL} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">
                  Read the docs
                </ButtonLink>
              </div>
            </div>
            <p className="mt-12 max-w-3xl border-t border-[color:rgb(255_255_255_/_0.1)] pt-6 text-xs leading-relaxed text-[color:rgb(255_255_255_/_0.45)]">
              This page is for information only and is not an offer or
              solicitation to lend, borrow or invest. Market figures are
              third-party estimates as of the dates shown; Pareto figures are
              read live from the Pareto API.
            </p>
          </SectionContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThesisPage;
