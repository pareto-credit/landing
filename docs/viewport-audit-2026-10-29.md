# Viewport and interaction audit — 29 October 2026

Reviewed layout targets: 1366×768 and 1440×900 desktop, 390×844 and 375×667 phones, with approximately 88px reserved for navigation. This is a source-based sizing audit; browser rendering and pixel measurements were unavailable in this session. Do not treat these targets as measured fit guarantees.

| Page | Main changes |
| --- | --- |
| Home | Reduced section padding and artwork; hero metrics in normal flow; compact structure grid; readable mobile card rails; Studio and Agents panels; compact News and optional index/banknote sections. |
| Credit Vaults | Short editorial block separated from the eight-structure collection; two-card desktop/one-card phone rail with navigation; consistent top-right numbering including 08; bounded module canvas with templates always in the same interactive frame on small screens. |
| Studio | Smaller viewport-aware mockup; full-row exploration highlights and lime callouts; reduced illustration heights; compact/mobile capability rail. |
| Originators | Smaller hero, benefit art and layer stack; mobile benefit/story rails; concise selected layer summaries; removed optional Explore this layer disclosures. |
| Capital Providers / Allocators | Same shared Clients improvements and all six interactive layers retained. |
| Thesis | Compact hero/chapter spacing; 260px desktop / 288px phone facility canvases with matching wires; longer module explanations available under Module details; mobile market/value-prop rails. |
| Data | Separate overview, metrics, history, benchmark and DeFi blocks; neutral/sage panels and green accents; subtle chart grid and area shading; bounded, scrollable facility table. |
| Privacy / Terms | Continuous legal reading layouts audited; text and document flow retained rather than shrinking or clipping legal content into a fixed-height panel. |

Legacy ecosystem routes redirect to Home or the canonical Clients pages and introduce no independent layouts.

Shared pricing artwork, contact form spacing and footer navigation were compacted. The contact form retains all fields, the Ray Dalio placeholder and the existing submit destination. Story cards highlight on hover and keyboard focus; FalconX remains unlinked and marked COMING SOON.

FAQs share one active question, animated height/opacity, labelled buttons/answer regions, and immediate aria-hidden/inert handling for closed answers. Reduced motion disables the transitions. Studio guides remain visible and clickable across all explored mockups, with full-row bounds measured from the actual sidebar row and the existing fallback retained for clipped/missing rows.

## Deliberate content growth

- The Thesis constraints retain their intentional multi-screen scroll track; each visible scene fills its viewport.
- Expanded module details, text zoom, resized form fields and unusually long live copy may grow naturally.
- On narrow phones, the Thesis introduction and facility are separate readable blocks within the same chapter. Long collections use horizontal browsing; data/preview canvases may scroll internally.
- Legal documents remain continuous reading content.

## Validation

- Final production build passes, including TypeScript.
- Full suite: 350 passed, 5 pre-existing compact-currency formatting assertions failed in productsData.test.ts (three) and DataDashboardPage.test.tsx (two). The same five failures were reproduced on baseline 253068405f935aaa3cf5d1f3cf0e1ed26a425ea0 in this runtime. No data calculations were changed.
- The obsolete SyntheticDollar fixed-height assertion was updated for the new content-sized mobile index cards.
- Independent source review found no material issues with FAQ semantics, Studio geometry, story hover/focus, CV08 positioning or revised Thesis connectors.
- Browser/pixel QA remains unverified.
