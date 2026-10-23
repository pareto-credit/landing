import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUp, ChevronDown, ChevronRight } from "lucide-react";
import { thesisChapters, type ThesisChapterId } from "../../../data/thesis";
import { PageLink } from "../../ui/PageLink";
import "./thesis-menu.css";

interface ThesisChapterNavProps {
  isCurrentPage: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hidden?: boolean;
}

const groups = ["Context", "Foundations", "Execution"] as const;

const ThesisChapterNav = ({ isCurrentPage, open, onOpenChange, hidden = false }: ThesisChapterNavProps) => {
  const [activeChapter, setActiveChapter] = useState<ThesisChapterId | null>(null);
  const [availableHeight, setAvailableHeight] = useState(600);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCurrentPage) return;
    let frame: number | null = null;
    const sections = thesisChapters.map(({ id }) => document.getElementById(id));
    const update = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        const readingLine = (document.querySelector("[data-site-navbar]")?.getBoundingClientRect().bottom ?? 80) + 24;
        let current: ThesisChapterId | null = null;
        sections.forEach((section, index) => {
          if (section && section.getBoundingClientRect().top <= readingLine) current = thesisChapters[index].id;
        });
        setActiveChapter(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [isCurrentPage]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onOpenChange(false);
      toggleRef.current?.focus({ preventScroll: true });
    };
    const closeOnViewportChange = () => {
      onOpenChange(false);
      if (document.activeElement && navRef.current?.contains(document.activeElement)) toggleRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnViewportChange);
    window.addEventListener("scroll", closeOnViewportChange, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnViewportChange);
      window.removeEventListener("scroll", closeOnViewportChange);
    };
  }, [open, onOpenChange]);

  const selectChapter = (event: MouseEvent<HTMLAnchorElement>, id: ThesisChapterId | "hero") => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    onOpenChange(false);
    if (!isCurrentPage) return;
    // Let the disclosure close and the router commit before placing reading focus.
    window.requestAnimationFrame(() => document.getElementById(`${id}-title`)?.focus({ preventScroll: true }));
  };
  const currentChapter = isCurrentPage ? activeChapter : null;
  const activeLabel = thesisChapters.find(({ id }) => id === currentChapter)?.label ?? "Overview";
  const toggleContents = () => {
    const headerBottom = document.querySelector("[data-site-navbar]")?.getBoundingClientRect().bottom ?? 96;
    setAvailableHeight(Math.max(100, window.innerHeight - headerBottom - 28));
    onOpenChange(!open);
  };

  return (
    <nav ref={navRef} aria-label="Thesis chapters" className="thesis-header-nav" hidden={hidden}>
      <button
        ref={toggleRef}
        type="button"
        className="site-nav-link thesis-header-nav__toggle"
        aria-label={isCurrentPage ? `Thesis chapters: ${activeLabel}` : "Thesis chapters"}
        aria-current={isCurrentPage ? "page" : undefined}
        aria-expanded={open}
        aria-controls="thesis-chapter-index"
        onClick={toggleContents}
      >
        <span className="thesis-header-nav__desktop-label">Thesis</span>
        <span className="thesis-header-nav__mobile-label">{isCurrentPage ? "Chapters" : "Thesis"}</span>
        <ChevronDown size={14} aria-hidden="true" className={open ? "thesis-header-nav__chevron--open" : undefined} />
      </button>
      <div id="thesis-chapter-index" className="thesis-header-nav__index" hidden={!open} style={{ maxHeight: availableHeight }}>
        <div className="thesis-header-nav__summary"><span>{isCurrentPage ? "On this page" : "Thesis contents"}</span><span>{isCurrentPage ? activeLabel : "Explore the thesis"}</span></div>
        <div className="thesis-header-nav__groups">
          {groups.map((group) => (
            <div key={group}>
              <div className="thesis-header-nav__group-label">{group}</div>
              <ol>
                {thesisChapters.filter((chapter) => chapter.group === group).map((chapter) => (
                  <li key={chapter.id}>
                    <PageLink to="/thesis" hash={chapter.id} aria-current={currentChapter === chapter.id ? "location" : undefined} onClick={(event) => selectChapter(event, chapter.id)}>
                      <span className="thesis-header-nav__number" aria-hidden="true">{String(thesisChapters.indexOf(chapter) + 1).padStart(2, "0")}</span>
                      <span>{chapter.label}</span>
                      {currentChapter === chapter.id ? <ChevronRight size={13} aria-hidden="true" /> : null}
                    </PageLink>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <PageLink to="/thesis" hash="hero" className="thesis-header-nav__overview" onClick={(event) => selectChapter(event, "hero")}>{isCurrentPage ? "Back to overview" : "Read the overview"}<ArrowUp size={13} aria-hidden="true" /></PageLink>
      </div>
    </nav>
  );
};

export default ThesisChapterNav;
