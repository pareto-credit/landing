# Priority improvements — 2026-10-23

Selected by Teo from the Oct 23 design/copy review (items 3, 5, 9 and 10 of the
top-10 list). Not implemented yet: the Ecosystem and Thesis rethink comes first.
Branch: `feat/landing-studio-restructure` (reviewed at `ed7ec87`).

## P1 — Contact form ending (review item 3)

Problem: the form posts to `https://formspree.io/f/xkgjlnwg` with a full-page
redirect, so the last step of the site happens on a third-party page. The submit
button reads "Request access" whatever the visitor selected, and "Interested in"
mixes two axes (plans and roles) in eight options.

Change:
- Submit with `fetch` (`Accept: application/json`) and keep the visitor on the
  page. Show a loading state on the button, then an inline success panel:
  "Thanks, {first name}. We've got your note about {interest}." plus what happens
  next (reply window to be confirmed by Teo; don't promise one until it's real).
- Inline error state that keeps everything the visitor typed, with a retry.
- Submit label follows the selected interest:
  - Pareto Studio (Core) → "Request Studio access"
  - Pareto MCP early access → "Join early access"
  - White-Glove by NorthBridge → "Contact NorthBridge"
  - everything else → "Send inquiry"
- Split "Interested in" into two groups (an `optgroup` per axis is enough):
  "Plans" (Core, Pro, White-Glove, MCP early access) and "I want to"
  (Lend, Borrow, Underwrite, Integrate). Keep the preselect events working
  (`pareto:contact-interest`, `setPendingContactInterest`).
- Rename "TG handle" to "Telegram (optional)".
- Contact heading: replace "The infrastructure is ready. Are you?" with
  "Tell us what you're launching." (alternatives: "Let's scope your first
  facility." / "Bring us a facility.").

## P2 — Cut the "built for" repetition (review item 5)

Keep "Credit infrastructure built for scrutiny." Reword the other five:

| Where | Now | Change to |
| --- | --- | --- |
| Hero subline | "…Enterprise-grade compliance. Built for the way capital flows today." | "Launch and run onchain credit facilities in Pareto Studio, with underwriting and oversight built in." |
| Studio audience line | "Built for credit funds, trading firms…" | "For credit funds, trading firms, fintech lenders and the underwriters behind them." |
| Live vaults heading | "Tokenized credit, built for scale" / "A modern fixed-income stack…" | "Facilities live on Pareto today" / "Real borrowers, repayments onchain, open to approved lenders." |
| Testimonials heading | "Built around what the market wants, not just for it" | "From the desks running on Pareto" |
| Ecosystem segments | eyebrow "Built for institutions", heading "Engineered for global scale" | Superseded by the Ecosystem persona rethink |

## P3 — Offering tiers (review item 9)

- Remove "White-label lender app available" from White-Glove: it already
  inherits it via "Everything in Pro, plus:".
- Show each tier's one-line subtitle on the card instead of only behind
  "How it works".
- Raise feature-list text size and contrast.
- Make Cura's status consistent everywhere: today it is "Beta" in Pro but
  "Coming soon" in Agents and on Thesis. Same for "Agent-prepared actions"
  vs "Signed agent actions" and "Join early access" vs "Request early access".
  Move names and statuses into `src/data/brand.ts` constants.

## P4 — Motion and performance (review item 10)

| Before | After | Why |
| --- | --- | --- |
| `AgentSession`: 50ms `setInterval` updates `elapsed` state (20 renders/s while in view) | Schedule each reveal once at its timeline mark (timeouts or CSS `animation-delay`) | ~10 state changes per 11s loop instead of ~220 |
| Studio aurora blobs: framer `animate={{x,y}}`, `repeat: Infinity` | CSS `@keyframes` on `transform`, paused off screen | Framer `x`/`y` run on the main thread; CSS runs on the compositor |
| `CountUpValue`: rAF + `setProgress` every frame | `useMotionValue` + `animate()` writing into the text node | No React render per frame |
| Facility cards: `whileHover={{ y: -4 }}` on all devices | Only when `(hover: hover) and (pointer: fine)` | Lift sticks after a tap on phones |
| Hero entrances 0.6s, metrics at 0.8s delay + 1s | ~0.4s, 50–60ms stagger, `cubic-bezier(0.23,1,0.32,1)`, settled by ~0.7s | The numbers are the proof; they land after ~1.8s today |
| Only `Button` has `active:scale` | `active:scale-[0.98]` on cards, Studio tabs, Offering cards, chapter links | Every pressable surface acknowledges the press |
| 16 × `transition-all` (Footer, News, Products, Testimonials, legacy sections) | Explicit property lists | Avoids animating layout properties by accident |

## Also from the review (not selected, keep in mind)

- Mint `#70b19e` as text on light backgrounds is 2.3:1. Add a text-on-light
  mint (`#3a7563`, 5.0:1); footer links `#8fa39b` (7.4:1).
- Mobile header shows the Thesis chapter menu on every page.
- Compact hero metrics ($155M / $1.4B) to match Thesis.
- Testimonial typo "to live" → "to life"; bracket Bob's insertion.
