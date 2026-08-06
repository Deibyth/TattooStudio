# Proposal: MVP Website — ARTNALDO TATTOO ("Tinta & Sombra")

## Intent

Arnaldo is a Blackwork artist warded with Neo-Japanese aesthetics, but has no online presence driving bookings. Prospects can't see a style-filtered portfolio, can't grasp the studio's ritual philosophy, and have no frictionless path from browsing to quote. This change ships the single-slice MVP website that turns portfolio browsing into structured WhatsApp quote requests — the primary conversion path for the Argentine market — with a dark, precise, ceremonial brand ("Tinta & Sombra", Sumi-e x Dark Blackwork).

## Problem Being Solved

Inbound interest is lost and booked time stays empty: no coherent portfolio, no style discovery, no quote pipeline. The site must sell craft and ritual *before* ink.

## Target Users & Situations

| User | Situation |
|------|-----------|
| Prospective clients (primary, Argentina) | Mobile-first browsing; want style discovery (Máscaras & Mitología, Fauna & Flora, Blackwork Puro, Flash Tattoos) then a structured quote → WhatsApp. |
| Arnaldo (sole artist/owner) | Low-overhead portfolio updates; receives pre-structured quote requests via WhatsApp, not a second inbox. |
| Visitors generally | Aesthetic-driven; expect dark, ritual, precise tone; judge craft via saturated B&W portfolio. |

## Business Rules & Conversion Goal

- **Conversion goal**: qualified quote request reaches the artist as a pre-composed `wa.me` deep link (body zone, approx size, idea, references) — WhatsApp is the sole routing target; Resend email (optional) is internal alerting only.
- Single language: Spanish (Argentine) UI copy. Single operator: no auth, no admin, no CMS.
- Reference uploads are client-side preview only — never stored server-side (MVP default).
- Brand tokens and Japanese/editorial typography restriction are non-negotiable; Cinzel/Cormorant rejected (culturally wrong).

## Product Outcome & Success Criteria

- [ ] Quote form completions open a valid `wa.me` link containing body zone, size, idea and references summary.
- [ ] Gallery filters (4 styles) usable and performant; at-a-glance style discovery on mobile.
- [ ] Design system reads unmistakably "Tinta & Sombra" across all sections — no generic template feel.
- [ ] Lighthouse performance ≥ 90, accessible (contrast, focus, alt text), mobile-first.
- [ ] New portfolio entries are easy to add (colocated data file).

## Current-State Gap

No production code exists (greenfield, pre-spec). Everything in `knowledge/*` is a bootstrap brief. This change materializes the roadmap "Now" slice into a buildable spec.

## Scope

### In Scope (first slice — one deliverable)
- Monorepo scaffold: Next.js 15/16 App Router + TS + Tailwind v4 CSS-first `@theme` (no `tailwind.config.ts`) + shadcn/ui + motion + React Hook Form + Zod.
- Design system foundation ("Tinta & Sombra"): tokens, paper/ink texture (~0.05 opacity), 1px gold/red borders + glow hover, Hannya/Kitsune linear vector separators/watermarks, ink-flow micro-interactions.
- Hero (masonry B&W grid + Rojo Torii CTA "Agendar Cita / Cotizar").
- Gallery/Portfolio with interactive filters (client state; URL-shareable optional).
- The Artist / Ritual section (philosophy, Japanese influence, custom design process).
- Quote process: step-by-step form (body zone, approx size, reference upload preview, idea) → Zod-validated API route → pre-composed `wa.me` link.
- Placeholder portfolio images (real photos are a client content dependency).

### Out of Scope (non-goals)
- CMS/admin panel, payments/e-commerce, client accounts/auth, booking calendar, i18n (single-language), server-side reference-image storage, notifications beyond optional Resend, SEO content strategy/launch ops.

## Capabilities

> Contract with sdd-spec. All are NEW (no `openspec/specs/` exist yet).

- `design-system`: tokens, typography, textures, borders/glow, watermarks, motion primitives, shared UI primitives.
- `portfolio-gallery`: portfolio data model + colocated data source, masonry Hero, filtered Gallery.
- `artist-ritual`: The Artist / Ritual section content + layout.
- `quote-process`: multi-step form, shared Zod schema, API route validation, `wa.me` link builder, optional Resend notification.

**Modified Capabilities**: None.

## Approach

Next.js App Router (`/`, `/galeria`, `/artista`, `/cotizar` + `app/api/quote`). Server components for static sections; client components for filters, form, motion. Zod schema shared client/server (`lib/quote.ts`); API validates and returns `{ waLink }` (Resend fired best-effort, non-blocking). Portfolio from colocated data file (e.g. `data/portfolio.ts`). Images in `public/` optimized via `next/image`. WhatsApp number + studio contact from env/config.

## Decision Gaps (defaults — REVISABLE)

| # | Decision | Default | Revisable |
|---|----------|---------|-----------|
| 1 | Display font | Japanese serif: **Shippori Mincho B1** display + **Inter** body (Plus Jakarta Sans alt) | Yes — user can flip to Syne/Kanit editorial |
| 2 | Reference upload | Preview only; never stored; quote text describes references; client sends images in WhatsApp | Yes — could add serverless storage later |
| 3 | Portfolio source | Colocated data file; no CMS | Yes — CMS later if volume grows |
| 4 | Monorepo tooling | pnpm workspaces, single app; **no Turborepo** | Yes |
| 5 | MVP shape | Design system + Hero + Portfolio + Artist + Quote (wa.me) as ONE deliverable; quote is MVP-inclusive | Yes — user can split |

## Edge Cases

- **Empty portfolio**: graceful empty states + fallback CTA (no broken masonry).
- **Mobile nav**: compact hamburger/drawer, accessible, keyboard-operable.
- **Form validation errors**: inline Argentine-Spanish messages, per-step, no data loss on error.
- **Missing reference images**: submission allowed without upload; message notes "sin referencia" so artist can ask.
- **Gallery shareability**: optional URL query state for filter deep-links (default: client-only).
- **SEO/share**: metadata, Open Graph, canonical per route; studio name indexed.
- **WhatsApp not installed / link blocked**: link opens browser fallback; copy-to-clipboard message backup.

## Implications & Impact

- Artist gains a low-overhead conversion pipeline; portfolio maintenance = editing one data file.
- Brand consistency enforced by tokens (design system prevents drift).
- No PII storage risk (uploads discarded) — privacy-safe by default.
- Optional Resend notification must not become a second inbox (rate-limited, best-effort).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/` | New | Routes: `/`, `/galeria`, `/artista`, `/cotizar` |
| `app/api/quote/route.ts` | New | Zod validation + `wa.me` link + optional Resend |
| `components/ui|sections|motion/` | New | shadcn primitives, feature sections, ink-flow motion |
| `lib/` | New | Quote schema, link builder, portfolio data access |
| `data/portfolio.ts` | New | Portfolio entries (4 styles) |
| `styles/` | New | Tailwind v4 `@theme` tokens, textures, glow utilities |
| `openspec/` | New | This change + future specs |

## Product Constraints

- Performance ≥ 90 Lighthouse (image optimization, lazy loading).
- Accessibility: contrast on charcoal, focus states, keyboard nav, alt text.
- SEO: metadata/OG/canonical; Argentine Spanish copy throughout.
- Single operator → minimal operational overhead.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Real portfolio photos/content missing at build | High | Placeholder images + documented content dependency; data-file schema ready |
| Wrong display font choice | Med | Default Shippori Mincho B1 + Inter; flip is a token change (marked revisable) |
| WhatsApp number/contact details wrong in prod | Med | Env-driven config, single source, pre-launch check |
| Upload privacy if default flipped | Low | Keep no-store default; revisit only with explicit storage decision |
| Scope creep (CMS, payments) | Med | Explicit non-goals + one-slice definition |

## Rollback Plan

Greenfield: no production code to break. If the slice fails verification, discard the change folder (`openspec/changes/mvp-website`) and the scaffold branch; nothing ships until verified. Post-deploy: static site rollback = redeploy previous build; env config keeps WhatsApp routing reversible.

## Dependencies

- Client content: portfolio photos, studio details, real WhatsApp number, brand assets (logo/mask vectors) — must be provided by Arnaldo.
- Tooling on host: node v24, pnpm 11 (present). No test runner yet — natural candidate **vitest** (unit: schema + link builder; component: quote form); to be finalized at design/tasks, not now.

## Open Questions (proposal question round)

1. Confirm display font default (Shippori Mincho B1 + Inter) or flip to Syne/Kanit editorial?
2. Confirm reference upload default (preview-only, never stored)?
3. Confirm one-slice MVP scope including Quote, or split?
4. Confirm WhatsApp number + studio contact for env config?
5. Confirm pnpm workspaces single-app monorepo (no Turborepo)?
