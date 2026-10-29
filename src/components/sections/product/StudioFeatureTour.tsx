"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, FileText, Layers3, ListChecks, Users } from "lucide-react";
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
    hint: "Define the facility",
    description: "Configure facility terms, participants and review stages.",
    icon: Layers3,
  },
  {
    id: "operations",
    label: "Connected operations",
    shortLabel: "Operations",
    hint: "Follow requests & payments",
    description:
      "See requests, interest payments and repayments in one activity view.",
    icon: ListChecks,
  },
  {
    id: "participants",
    label: "Participant views",
    shortLabel: "Participants",
    hint: "Connect every role",
    description:
      "Explore how underwriters, borrowers and lenders share facility context.",
    icon: Users,
  },
  {
    id: "reporting",
    label: "Reporting & visibility",
    shortLabel: "Reporting",
    hint: "Explore facility reporting",
    description:
      "Bring facility activity, participant information and reporting together.",
    icon: FileText,
  },
] as const;
type TourView = "overview" | (typeof views)[number]["id"];

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

/** Only the callouts navigate; the illustrative application remains inert. */
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
  // Position each guide on the actual sidebar control, including after a role
  // change or resize. DOM-only updates avoid React renders for geometry changes.
  useLayoutEffect(() => {
    const root = ref.current;
    const visual = root?.querySelector(".studio-feature-tour__screen");
    if (!root || !visual) return;
    const placeGuides = () => {
      const bounds = root.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const frame = visual.querySelector<HTMLElement>(".studio-preview-frame");
      const screenBounds = visual.getBoundingClientRect();
      const placements = views.map((item) => {
        const control = root.querySelector<HTMLElement>(
          `[data-tour-control="${item.id}"]`
        );
        const target = visual.querySelector<HTMLElement>(
          `[data-tour-target="${item.id}"]`
        );
        const icon = target?.firstElementChild ?? target;
        const point = icon?.getBoundingClientRect();
        const sidebar = target?.closest("aside")?.getBoundingClientRect();
        const x = point ? point.left + point.width / 2 - bounds.left - 22 : 0;
        const y = point ? point.top + point.height / 2 - bounds.top - 22 : 0;
        const visible = Boolean(
          point?.width &&
            point.height &&
            sidebar &&
            point.left >= Math.max(sidebar.left, screenBounds.left) &&
            point.right <= Math.min(sidebar.right, screenBounds.right) &&
            point.top >= Math.max(sidebar.top, screenBounds.top) &&
            point.bottom <= Math.min(sidebar.bottom, screenBounds.bottom) &&
            x >= 0 &&
            y >= 0 &&
            x + 44 <= bounds.width &&
            y + 44 <= bounds.height
        );
        return { control, x, y, visible };
      });
      // Read all geometry before writing, so resize does not alternate layouts.
      if (frame)
        frame.style.setProperty(
          "--studio-border-size",
          `${Math.ceil(Math.hypot(bounds.width, bounds.height) * 1.1)}px`
        );
      for (const { control, x, y, visible } of placements) {
        if (!control) continue;
        if (visible) {
          control.style.setProperty("--hotspot-x", `${x}px`);
          control.style.setProperty("--hotspot-y", `${y}px`);
          control.dataset.anchored = "true";
        } else {
          control.style.removeProperty("--hotspot-x");
          control.style.removeProperty("--hotspot-y");
          control.dataset.anchored = "false";
        }
      }
    };
    placeGuides();
    const resize =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(placeGuides);
    resize?.observe(root);
    const changes = new MutationObserver(placeGuides);
    changes.observe(visual, { childList: true, subtree: true });
    return () => {
      resize?.disconnect();
      changes.disconnect();
    };
  }, []);

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
      <button
        type="button"
        className="studio-feature-tour__overview"
        aria-label="Workspace overview"
        aria-pressed={selection.id === "overview"}
        aria-controls={screenId}
        onClick={(event) => select("overview", event)}
      >
        <ArrowLeft size={12} aria-hidden="true" /> Workspace overview
      </button>
      <div
        className="studio-feature-tour__hotspots"
        role="group"
        aria-label="Explore Studio functionality"
      >
        {views.map(({ id, label: title, shortLabel, hint, icon: Icon }) => (
          <button
            key={id}
            data-tour-control={id}
            type="button"
            className={`studio-feature-tour__hotspot studio-feature-tour__hotspot--${id}`}
            aria-label={`Explore ${title.toLowerCase()}`}
            aria-pressed={selection.id === id}
            aria-controls={screenId}
            onClick={(event) => select(id, event)}
          >
            <span className="studio-feature-tour__pin" aria-hidden="true">
              <Icon size={14} />
            </span>
            <span className="studio-feature-tour__tooltip">
              <strong className="studio-feature-tour__full-label">
                {title}
              </strong>
              <strong
                className="studio-feature-tour__short-label"
                aria-hidden="true"
              >
                {shortLabel}
              </strong>
              <small>{hint}</small>
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {label}.{" "}
        {view?.description ??
          "An animated overview of underwriter, borrower and lender workflows. Select a highlighted area to explore a function."}
      </p>
    </div>
  );
}
