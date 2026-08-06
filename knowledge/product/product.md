---
type: product
project_state: new
generated_by: kaddo-bootstrap
template_version: 1
---

> Language contract: knowledge files are written in English. The site's end-user UI copy is Spanish (Argentine); that copy language is a product decision recorded here, not the artifact language. Code, file names, commands and config keys remain in English.

# Product Context

## Product vision

A Blackwork / Neo-Japanese tattoo studio website ("ARTNALDO TATTOO") that sells craft and ritual before ink. The site presents a dark, precise, ceremonial experience ("Tinta & Sombra", Sumi-e x Dark Blackwork): ultra-dark charcoal surfaces with saturated ritual color accents inspired by temples, Hannya masks and Ukiyo-e prints. Its job is not just to show tattoos, but to walk a prospect from impression → style discovery → structured quote → WhatsApp conversation with the artist. Sections: Hero (masonry grid of saturated B&W portfolio photos + primary CTA "Agendar Cita / Cotizar" in Rojo Torii), Gallery/Portfolio (interactive filters), The Artist / Ritual (philosophy, Japanese influence, custom design process), and a step-by-step Quote process. End-user UI copy is Spanish (Argentine).

## User journeys

- **Browse → Book:** visitor lands on Hero, sees the saturated B&W masonry grid and the "Agendar Cita / Cotizar" CTA (Rojo Torii), and is moved to either the portfolio or the quote form.
- **Style discovery → Quote:** visitor explores Gallery/Portfolio and filters by Máscaras & Mitología, Fauna & Flora, Blackwork Puro, or Flash Tattoos; on a chosen direction they enter the quote process.
- **Ritual / trust building:** visitor reads The Artist / Ritual to understand Arnaldo's philosophy, Japanese influence and custom design process, which justifies the craft and the investment.
- **Quote submission:** visitor completes the step-by-step form (body zone, approximate size, idea selection, reference image upload). The API validates with Zod and returns a pre-composed WhatsApp deep link (`wa.me`) containing the quote summary, so the visitor continues the conversation in WhatsApp with minimal friction.

## Scope

- **In scope:** Hero section; Gallery/Portfolio with interactive style filters; The Artist / Ritual section; Quote process form (step-by-step: body zone, approximate size, reference image upload, idea selection); server-side Zod validation; pre-composed `wa.me` deep link with quote summary as the conversion handoff; optional internal Resend email notification.
- **In scope (foundation):** reusable design system — CSS-first tokens (Tailwind v4 `@theme`, not `tailwind.config.ts`), paper/ink texture at low opacity with blend, thin gold/red card borders with soft glow on hover, vector iconography (Hannya/Kitsune masks, dark chrysanthemum/sakura watermarks), ink-flow hover micro-interactions.
- **Out of scope:** e-commerce / payments, client accounts or auth, booking calendar, CMS admin panel, multilingual versions (single-language Spanish), physical content beyond the portfolio the studio provides.
- **Deferred:** content strategy and copywriting details beyond the sections above; decision on whether reference upload is stored or discarded client-side.

## Success criteria

- A qualified quote request reaches the artist via WhatsApp with the quote summary pre-composed (body zone, size, idea, references) — measurable as form completions that open the `wa.me` link with valid parameters.
- Portfolio enables at-a-glance style discovery: filters for Máscaras & Mitología, Fauna & Flora, Blackwork Puro and Flash Tattoos are usable and performant.
- The design system reads unmistakably as dark / precise / ritual ("Tinta & Sombra") across Hero, Gallery, Artist and Quote sections — no generic template feel.
- The site is fast, accessible and mobile-first, matching the pattern of initial browsing on phones.
- Artist-side operational overhead stays minimal: new portfolio entries are easy to add, and notifications (when enabled) do not become a second inbox.