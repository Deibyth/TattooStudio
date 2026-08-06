---
type: current-state
project_state: new
generated_by: kaddo-bootstrap
template_version: 1
---

> Language contract: knowledge files are written in English. The site's end-user UI copy is Spanish (Argentine); that copy language is a product decision recorded here, not the artifact language. Code, file names, commands and config keys remain in English.

# Current State

## Initial technical direction

- **Framework**: Next.js 15/16 App Router with TypeScript, React Server Components + client components for interactive displays/images.
- **Styling**: Tailwind CSS v4 configured CSS-first via `@theme` tokens — explicitly **not** `tailwind.config.ts`.
- **Component/styling utilities**: shadcn/ui for accessible primitives; custom design-system tokens.
- **Animations**: `motion` (formerly Framer Motion) for ink-flow hover micro-interactions and scroll/entrance motion.
- **Forms**: React Hook Form with Zod validation shared with the server route.
- **Design language**: "Tinta & Sombra" — ultra-dark charcoal backgrounds (`#0A0A0B`), layered Carbón containers (`#141416` / `#16161A` / `#222226`), Rojo Torii accent for CTAs (`#D90429` / `#C8102E`), Oro Kintsugi secondary accent (`#C5A059`), Blanco Washi text (`#E2E2E2`), secondary gray `#A0A0A0`. Fine paper/ink texture ~0.03–0.05 opacity, overlay/multiply blend; 1px thin gold/red card borders with soft glow on hover; linear vector Hannya/Kitsune masks and dark chrysanthemum/sakura watermarks as separators.
- **Typography direction**: display/headings either Japanese serif (Shippori Mincho / Zen Old Mincho / Noto Serif JP) or modern editorial heavy-stroke (Syne / Kanit); body Plus Jakarta Sans or Inter. Cinzel/Cormorant Garamond rejected (Roman/Western, culturally wrong).
- **Conversion & notifications**: quote submission routes through a Zod-validated API route that returns a pre-composed `wa.me` deep link with the quote summary; Resend optional as an internal email notification only. WhatsApp is the primary conversion channel (Argentine market).
- **Repo & language**: monorepo, single-site, indie team; end-user UI copy in Spanish (Argentine), code/knowledge in English.

## Known constraints

- Single-operator site: minimal operational overhead, no admin/CMS/platform in scope for the first build.
- Design system must stay cohesive and reusable; brand aesthetic is a hard non-functional requirement.
- Fixed color palette and the Japanese/editorial typography restriction are non-negotiable per the brief.
- No production code exists — this is a bootstrap knowledge pass, pre-spec.

## Unknowns

- [open] Display font final pick (Japanese serif vs. modern editorial heavy-stroke) before the design system is locked.
- [open] Portfolio data source (colocated files vs. early data layer), same as capabilities/codebase.
- [open] Reference image upload handling in the quote flow (store, pass to WhatsApp, or discard) with privacy/storage implications.
- [open] Monorepo tooling (workspaces vs. Turborepo).
- [open] Regex-free validation details for phone and free-text fields in the quote schema; WhatsApp link strategy (hosted number routing).