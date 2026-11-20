"use client";

import {
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  FileText,
  Layers3,
  LayoutDashboard,
  ListChecks,
  Users,
} from "lucide-react";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import StudioPreview from "../studio/StudioPreview";
import StudioDesk from "../studio/StudioDesk";
import { personaDesks } from "../studio/studioDeskData";
import "./studio-feature-tour.css";

const views = [
  {
    id: "structuring",
    label: "Facility structuring",
    shortLabel: "Structure",
    description: "Configure facility terms, participants and review stages.",
    icon: Layers3,
  },
  {
    id: "operations",
    label: "Connected operations",
    shortLabel: "Operations",
    description:
      "See requests, interest payments and repayments in one activity view.",
    icon: ListChecks,
  },
  {
    id: "participants",
    label: "Participant views",
    shortLabel: "Participants",
    description:
      "Explore how underwriters, borrowers and lenders share facility context.",
    icon: Users,
  },
  {
    id: "reporting",
    label: "Reporting & visibility",
    shortLabel: "Reporting",
    description:
      "Bring facility activity, participant information and reporting together.",
    icon: FileText,
  },
] as const;
const controls = [
  {
    id: "overview",
    label: "Overview",
    shortLabel: "Overview",
    icon: LayoutDashboard,
  },
  ...views,
] as const;
type TourView = (typeof controls)[number]["id"];

function FeatureWorkspace({
  view,
  running,
  animate,
}: {
  view: (typeof views)[number];
  running: boolean;
  animate: boolean;
}) {
  return (
    <div className="studio-preview-frame" data-running={running}>
      <div className="studio-preview-content">
        <StudioDesk
          desk={personaDesks[0]}
          workspaceView={view.id}
          isLive={running}
          animateWorkspace={animate}
        />
      </div>
    </div>
  );
}

/** The in-frame controls select a view of the illustrative application. */
export default function StudioFeatureTour() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const pageVisible = usePageVisibility();
  const reduced = useReducedMotion();
  const running = inView && pageVisible && !reduced;
  const [selection, setSelection] = useState<{
    id: TourView;
    animate: boolean;
  }>({ id: "overview", animate: false });
  const view = views.find(({ id }) => id === selection.id);
  const label = view?.label ?? "Workspace overview";
  const screenId = useId();
  const select = (id: TourView, event: MouseEvent<HTMLButtonElement>) => {
    setSelection({ id, animate: event.detail > 0 && !reduced });
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Interactive Studio walkthrough"
      className="studio-feature-tour"
      data-running={running}
      data-view={selection.id}
      onKeyDown={(event) => {
        if (event.key === "Escape" && selection.id !== "overview") {
          event.preventDefault();
          setSelection({ id: "overview", animate: false });
        }
      }}
    >
      <div
        className="studio-feature-tour__controls"
        role="group"
        aria-label="Explore Studio functionality"
      >
        {controls.map(({ id, label: title, shortLabel, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-label={id === "overview" ? title : `Explore ${title.toLowerCase()}`}
            aria-pressed={selection.id === id}
            aria-controls={screenId}
            onClick={(event) => select(id, event)}
          >
            <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
            <span>{shortLabel}</span>
          </button>
        ))}
      </div>
      <div
        id={screenId}
        role="img"
        aria-label={`${label} preview`}
        className="studio-feature-tour__screen"
      >
        <div inert aria-hidden="true">
          {view ? (
            <FeatureWorkspace
              view={view}
              running={running}
              animate={selection.animate}
            />
          ) : (
            <StudioPreview mode="guided" />
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {label}.{" "}
        {view?.description ??
          "An animated overview of underwriter and borrower workflows. Choose a view to explore a function."}
      </p>
    </div>
  );
}
