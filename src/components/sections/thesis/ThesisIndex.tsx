import type { MouseEvent } from "react";
import { ArrowDownRight } from "lucide-react";
import { thesisChapters, type ThesisChapterId } from "../../../data/thesis";
import { PageLink } from "../../ui/PageLink";

const focusChapter = (event: MouseEvent<HTMLAnchorElement>, id: ThesisChapterId) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  // Let the router commit the hash scroll before moving reading focus.
  window.requestAnimationFrame(() => document.getElementById(`${id}-title`)?.focus({ preventScroll: true }));
};

/** Five-part contents under the hero, in the style of a principles list. */
const ThesisIndex = () => (
  <nav className="thesis-index" aria-label="Contents">
    <ol>
      {thesisChapters.map((chapter, index) => (
        <li key={chapter.id}>
          <PageLink
            to="/thesis"
            hash={chapter.id}
            onClick={(event) => focusChapter(event, chapter.id)}
            className="thesis-index__link"
          >
            <span className="thesis-index__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="thesis-index__title">{chapter.label}</span>
            <span className="thesis-index__summary">{chapter.summary}</span>
            <span className="thesis-index__tag">{chapter.tag}</span>
            <ArrowDownRight size={20} aria-hidden="true" className="thesis-index__arrow" />
          </PageLink>
        </li>
      ))}
    </ol>
  </nav>
);

export default ThesisIndex;
