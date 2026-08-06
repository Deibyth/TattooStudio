---
type: capabilities
project_state: new
generated_by: kaddo-bootstrap
template_version: 1
---

> Language contract: knowledge files are written in English. The site's end-user UI copy is Spanish (Argentine); that copy language is a product decision recorded here, not the artifact language. Code, file names, commands and config keys remain in English.

# Capabilities

## Planned capabilities

- [planned] Hero — masonry grid of saturated B&W portfolio photos with primary CTA "Agendar Cita / Cotizar" in Rojo Torii
- [planned] Gallery/Portfolio — interactive filters: Máscaras & Mitología, Fauna & Flora, Blackwork Puro, Flash Tattoos
- [planned] The Artist / Ritual — philosophy, Japanese influence, custom design process narrative
- [planned] Quote process — step-by-step form: body zone, approximate size, reference image upload, idea selection
- [planned] Quote handoff — server-side Zod validation returning a pre-composed `wa.me` WhatsApp deep link with the quote summary
- [planned] Internal notification — optional Resend email to the artist (secondary channel; WhatsApp remains primary)
- [planned] Design system — CSS-first tokens, paper/ink texture, thin gold/red borders with glow hover, vector watermarks, ink-flow micro-interactions

## Capability map

- **Presentation layer**: Hero, Gallery/Portfolio (filter state), Artist/Ritual, Quote form — served by Next.js App Router pages.
- **Design language**: Tailwind CSS v4 CSS-first `@theme` tokens (no `tailwind.config.ts`), shared shadcn/ui primitives, motion-based interactions.
- **Input flow**: React Hook Form + Zod schema for the multi-step quote form; server route validates the same schema.
- **Conversion handoff**: validated submission renders a `wa.me` deep link (phone, pre-filled message with body zone / size / idea / references).
- **Notifications (optional)**: Resend email triggered on quote submission as internal alerting only.
- **Content/portfolio**: static or lightly data-driven portfolio entries feeding the masonry Hero and filtered Gallery; kept simple for a single-operator site.

## Open questions

- [open] Where does the portfolio live — colocated content/data files vs. an early data structure that will be migrated to a CMS later?
- [open] Reference image upload during the quote flow: uploaded/stored server-side, passed client-side to WhatsApp, or dropped after use? (Data privacy + storage cost implications.)
- [open] Is the contact WhatsApp number the sole routing target, or will multiple artists/studios eventually need routing?
- [open] Exact display font final choice among Shippori Mincho / Zen Old Mincho / Noto Serif JP and Syne / Kanit (Japanese-ceremonial vs. modern editorial heavy-stroke) — decision required before the design system is finalized.