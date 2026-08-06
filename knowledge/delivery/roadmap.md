---
type: roadmap
project_state: new
generated_by: kaddo-bootstrap
template_version: 1
---

> Language contract: knowledge files are written in English. The site's end-user UI copy is Spanish (Argentine); that copy language is a product decision recorded here, not the artifact language. Code, file names, commands and config keys remain in English.

# Roadmap

## Now

- Stand up the monorepo scaffold: Next.js 15/16 App Router + TypeScript + Tailwind CSS v4 CSS-first `@theme` config (not `tailwind.config.ts`) + shadcn/ui + motion + React Hook Form + Zod.
- Establish the "Tinta & Sombra" design system tokens: Negro Tinta `#0A0A0B`, Carbón `#141416` / `#16161A` / `#222226`, Rojo Torii `#D90429` / `#C8102E`, Oro Kintsugi `#C5A059`, Blanco Washi `#E2E2E2`, secondary gray `#A0A0A0`, paper/ink texture, thin gold/red borders with glow hover, vector Hannya/Kitsune/chrysanthemum/sakura watermarks.
- Build Hero (masonry grid of saturated B&W portfolio photos + "Agendar Cita / Cotizar" CTA in Rojo Torii) and the Gallery/Portfolio with style filters (Máscaras & Mitología, Fauna & Flora, Blackwork Puro, Flash Tattoos).
- Build the Quote process (step-by-step: body zone, approximate size, reference image upload, idea selection) with React Hook Form + Zod (shared server/client schema).
- Implement the quote API route: Zod validation → pre-composed `wa.me` deep link with quote summary as the conversion handoff.
- Opt-in on display font: lock either Japanese serif (Shippori Mincho / Zen Old Mincho / Noto Serif JP) or modern editorial heavy-stroke (Syne / Kanit) before finalizing the design system.

## Next

- The Artist / Ritual section (philosophy, Japanese influence, custom design process).
- Optional Resend email notification on quote submission (internal alerting only; WhatsApp remains primary).
- Polish ink-flow hover micro-interactions and motion-based scroll/entrance animations.
- Accessibility pass (contrast on charcoal surfaces, focus states, keyboard nav, alt texts for portfolio) and mobile-first responsive behavior.
- Performance: image optimization for masonry grid (sizes, format/webp-avif, lazy loading).
- Refine the reference-image upload handling for the quote flow (storage vs. pass-through vs. discard).

## Later

- Expanded Flash Tattoos catalog / seasonal flash drops.
- Potential lightweight CMS or data layer for portfolio once content volume grows past colocated files.
- Any internationalization — currently deferred; site is single-language Spanish (Argentine).
- Landing-page content split and SEO for the studio name ("ARTNALDO TATTOO") once the site is live.