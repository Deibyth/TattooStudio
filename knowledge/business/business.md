---
type: business
project_state: new
generated_by: kaddo-bootstrap
template_version: 1
---

> Language contract: knowledge files are written in English. The site's end-user UI copy is Spanish (Argentine); that copy language is a product decision recorded here, not the artifact language. Code, file names, commands and config keys remain in English.

# Business Context

## Problem

Single tattoo artist (Arnaldo) specializes in Blackwork warded with traditional Japanese aesthetics (Neo-Japanese) but has no online presence that drives bookings. Prospects cannot see a coherent portfolio filtered by style, cannot grasp the studio's design philosophy, and have no frictionless way to request a quote. Without a pipeline between portfolio browsing and quote submission, inbound interest is lost and booked time stays empty.

## Users

- **Prospective clients (primary)**: people seeking Blackwork and Neo-Japanese tattoos across the styles Máscaras & Mitología, Fauna & Flora, Blackwork Puro, and Flash Tattoos. They browse the portfolio, assess the artist's craft and visual world, and submit a quote request. Target market is Argentina.
- **Arnaldo (studio owner / sole artist)**: manages portfolio content and gallery filters, and receives quote requests through WhatsApp. Single-operator context — operational overhead must stay low.
- **Visitors generally**: aesthetic-driven, expect a dark, ritual, precise tone that matches the studio's identity; initial browsing is typically mobile-first.

## Business goals

- Convert portfolio browsing into quote requests and appointments, using WhatsApp as the primary conversion channel (dominant booking path in the Argentine market).
- Differentiate the studio's identity: specialized Blackwork with Neo-Japanese ritual aesthetic ("Tinta & Sombra", Sumi-e x Dark Blackwork).
- Present a filtered, curated portfolio so a client finds the exact style they want and understands the custom design process.
- Drive quote form submissions that arrive pre-structured via `wa.me` deep links (body zone, approximate size, idea, references) so the artist can respond faster and with context.
- Build a reusable design system that encodes darkness, precision and ritual strength — visually distinct from generic tattoo sites.

## Constraints

- **Single-site, indie team, monorepo**, low operational overhead, no heavy admin platform in scope.
- Fixed design tokens per the project brief: Negro Tinta `#0A0A0B` (bg), Carbón/Gris Humo `#141416` / `#16161A` / `#222226` (containers), Rojo Torii `#D90429` / `#C8102E` (primary accent / CTAs), Oro Kintsugi `#C5A059` (secondary accent / borders / highlights), Blanco Washi `#E2E2E2` (main text), secondary gray `#A0A0A0`.
- Typography constrained to Japanese serif or heavy-editorial display faces; Cinzel and Cormorant Garamond were explicitly rejected as culturally wrong (Roman/Western, not Japanese).
- End-user UI copy is Spanish (Argentine); the site is single-language.
- Brand tone must feel manual, precise and ritualistic — generic template looks are out of scope.