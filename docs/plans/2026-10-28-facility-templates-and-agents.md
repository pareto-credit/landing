# Facility templates and agent presentation implementation plan

**Goal:** Apply Matteo's Credit Vaults and homepage agent refinements in the existing landing branch.

**Approved brief:** Keep scroll emphasis only on the Credit Vaults editorial paragraph, preserve the expanded facility collection, replace individual module toggles with eight example templates, expand the available module vocabulary, reuse Studio's agent section on Credit Vaults, and restore a substantial animated MCP session beside concise homepage copy.

**Architecture:** Use a typed module/template catalogue, one selected-template state and a four-group architecture figure around the common vault. Templates replace the entire configuration. Extract the existing animated session as a shared leaf; retain the detailed Studio presentation and use it for Credit Vaults too.

**Stack:** Existing React 19, TypeScript, Framer Motion, CSS, Lucide and Vitest. No new dependencies.

## Constraints and decisions

- Existing branch and uncommitted work stay in place. No commit, push or deployment.
- Keep existing brand typography, colors, 6px surfaces and spaced en dashes.
- Templates: Prime brokerage, Credit facility, Market maker, Trading note, Receivables financing, PayFi financing, Payday loans, BNPL providers.
- Twelve configuration choices grouped as structure/capital, returns/liquidity, access/collateral, portfolio/operations. Grouping keeps the diagram readable.
- Every template has exactly one term/revolving mode and one NAV/cycle-interest mode. Revolving examples use NAV accounting, consistent with the reviewed factory path.
- OTC, custody, reporting and borrowing-base arrangements are illustrative integrations/terms, not claims of independently deployed onchain modules.
- Current published technical context: idle-tranches `539dba671797ece04f98e698de04124d175fcdd0`; successful upstream check on 2026-10-28T17:34:34Z found no changes. Read factory lines 126–151, epoch settlement/request paths, accounting and programmable-borrower reservation logic for this change.
- Homepage names: Pareto MCP (Early access), Pareto Agents (Planned), Pareto Cura AI (Beta). One description each; keep Join early access, remove product-specific agent links.
- The illustrative animation queries supported categories of read-only data; it does not show fund movement. Pause while hidden/offscreen; complete static view for reduced motion.

## Review focus

- Selecting a template replaces the previous selection; focusing a button does not select it.
- Core accounting and selected-module count stay accurate, with no incompatible term/revolving or NAV/cash-mode combinations.
- Diagram and template controls remain readable on small screens with no page overflow.
- Shared agent animation advances in order, pauses offscreen/hidden, loops, and exposes one accessible description rather than live typing announcements.
- Credit Vaults reuses the Studio agent experience and preserves local early-access form routing.

## Tasks

- [x] Update behavioral tests for template replacement and shared agents, observe expected failures.
- [x] Implement the typed catalogue, template controls and grouped diagram; remove heading highlights outside the editorial paragraph.
- [x] Extract the existing MCP session, enlarge it on the homepage, add status chips and concise names, and reuse the detailed Studio section for Credit Vaults.
- [x] Verify animation lifecycle with focused tests; update the standalone diagram companion and documentation.
- [x] Run scoped lint, build, the bounded full test suite and a fresh review. Record actual results and any existing failures.

## Verification ledger

- Three updated integration expectations failed before implementation: missing template group, bespoke Credit Vault agent section instead of Studio, and old homepage names/preview. Four session lifecycle tests also failed before extraction. The first focused run then passed all 30 tests.
- Fresh source reviewer confirmed eight coherent templates, twelve unique choices, whole-configuration replacement, a preserved clock while hidden/offscreen and a static accessible description. Identified a missing reader-controlled pause for the repeating MCP illustration. Added a small keyboard-accessible pause/resume control to that illustration, separate from its image semantics. Its new test failed first, then all five lifecycle tests passed. Reduced motion has no animation control.
- Updated the standalone HTML companion from the current server-rendered figure: twelve choices, grouped architecture, prime brokerage example, no JavaScript. Installed diagram skill `self_check.py` passes. First ad hoc SSR bundling used classic JSX; supplying React for that scratch render corrected the tooling error without changing product code.
- Final production build: PASS. Existing bundle-size advisory remains (~1.402 MB / 403.71 kB gzip JavaScript).
- Scoped ESLint over all changed TypeScript/TSX: PASS. `git diff --check`: PASS.
- Final `npm test -- --maxWorkers=2`: 249 passed, 1 pre-existing failure, 250 total / 37 files. Failure: `SyntheticDollarSection.test.tsx` / `keeps the mobile synthetic cards at a shared fixed height`, expects `h-[36rem]` while unchanged source uses `h-[31rem]`. Both source and test were verified identical to HEAD. Logs: `/tmp/pareto-templates-suite-final.log`, `/tmp/pareto-templates-build-final.log`, `/tmp/pareto-templates-lint-final.log`.
- Browser verification unavailable: the integrated Pencil browser failed to connect to the desktop app after three retries. No rendered viewport, touch-scroll or screen-reader fidelity claim. Static diagram and source geometry checks passed; an optional local SVG rasterizer was unavailable.
- README reflects the new template catalogue and shared agent experience. Generated health timestamp restored without changing other health fields. No changes to the pre-existing package-lock delta, no commit, push or deployment.

## October 29 refinements

- [x] Add DeFi adapters (Morpho, Aave, Pendle) and legal/compliance as illustrative configuration modules; preserve the diagram frame by compacting groups with four rows.
- [x] Replace the generic Credit facility template with Working capital. Remove per-template marketing fields and make the explanatory panel universal and fixed; update only the architecture and an accessible selection status.
- [x] Rename the MCP illustration header to Your LLM. Hide the entire table until the answer phase and each row until its reveal; use separate table borders to keep divider painting with the cells.
- [x] Verify the changed behavior with RED/GREEN integration and timeline tests, refresh the standalone diagram, and run build/lint/full suite.

October 29 verification: the adapter/working-capital integration, fixed explanatory panel, and table visibility tests failed before implementation. All 12 focused page/session tests then passed. The panel regression was separately observed failing because the original template changed its explanatory copy. The final full suite passed 251/252 tests; the sole failure is the unchanged Synthetic Dollar fixed-height assertion (36rem expected, 31rem source). Build, scoped ESLint, diagram self-check and static geometry validation passed. All fourteen rows fit their groups without vertical overlap. A fresh reviewer found no actionable source defects. Rendered font fit, browser border painting, touch scrolling and screen-reader presentation remain unverified because browser access was unavailable. Regenerated the standalone companion from the current component and catalogue, with fourteen modules and all eight current template names. Logs: `/tmp/pareto-modules-and-llm-green.log`, `/tmp/pareto-modules-and-llm-suite.log`, `/tmp/pareto-modules-and-llm-build.log`, `/tmp/pareto-modules-and-llm-lint.log`. No commit, push or deployment.
