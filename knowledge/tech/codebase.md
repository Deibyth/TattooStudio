---
type: codebase
project_state: new
generated_by: kaddo-bootstrap
template_version: 1
---

> Language contract: knowledge files are written in English. The site's end-user UI copy is Spanish (Argentine); that copy language is a product decision, not the artifact language. Code, file names, commands and config keys remain in English.

# Codebase Map

## Repository structure

No production code yet. This is a monorepo; the intended structure is described below as it emerges and will be refined by the SDD design phase.

- `app/` — Next.js App Router pages and routes: `/` (Hero), `/galeria` (Gallery/Portfolio) or a section within the landing, `/artista` (The Artist / Ritual), quote flow as a route + API route for quote submission.
- `app/api/` — API route that validates the quote form (Zod) and returns the pre-composed `wa.me` deep link; optional Resend notification trigger.
- `components/ui/` — shadcn/ui primitives (buttons, inputs, dialog, etc.).
- `components/sections/` — Hero, Gallery/Portfolio, Artist/Ritual, QuoteProcess feature components.
- `components/motion/` — ink-flow hover micro-interactions and scroll/entrance animations via `motion` (formerly Framer Motion).
- `lib/` — business logic: quote schema + validation (Zod), `wa.me` link builder, Resend client, portfolio data access.
- `data/` (or a parallel dir) — portfolio entries (styles: Máscaras & Mitología, Fauna & Flora, Blackwork Puro, Flash Tattoos) feeding masonry Hero and filtered Gallery.
- `styles/` — Tailwind CSS v4 CSS-first configuration (`@theme` tokens), texture/paper effects, glow-border utilities.
- Tests colocated near routes/lib (unit for schema + link builder; component tests for the quote form).

## Entry points

- To be defined during the SDD design phase. Expected entry: `/` hero route rendering the full landing page with section routing, plus the quote-processing API route.

## How to run

- To be defined once scaffolding lands (expected `npm`/`pnpm` dev/build commands for the Next.js 15/16 monorepo). No code exists yet.

## How to test

- To be defined. Expected: unit tests for the Zod quote schema and the `wa.me` link builder; component/integration tests for the multi-step quote form; accessibility checks on CTA and form controls.

## Open questions

- [open] Monorepo tooling choice (pnpm workspaces vs. npm workspaces vs. Turborepo) for a single-site indie project.
- [open] Whether Gallery filters are a client-only concern or need URL state for shareability/deep-linking.
- [open] Data source for portfolio (colocated files vs. simple data layer) — same question recorded in capabilities.
- [open] Whether the quote API route only returns the `wa.me` link or also performs side-effect notifications (Resend) synchronously.