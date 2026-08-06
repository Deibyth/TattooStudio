# Artnaldo Tattoo Studio

Landing page for **Artnaldo Tattoo**, a blackwork and neo-Japanese tattoo studio in Bogotá, Colombia. Built with Next.js (App Router), Tailwind CSS v4, and Motion — with a strong focus on SEO, security hardening, and Core Web Vitals.

## Features

- 🎨 **Blackwork & neo-Japanese showcase** — hero, ritual story section, and a dynamic portfolio gallery
- 🖼️ **Dynamic portfolio** — images served through an App Router API route (`/api/portfolio`) that lists assets from `public/portfolio/`
- ♾️ **Infinite carousel** — auto-scrolling gallery built with Motion
- 🔍 **On-page SEO** — rich metadata, canonical URL, Open Graph & Twitter cards, and structured data (JSON-LD)
- 🗺️ **Sitemap & robots** — `/sitemap.xml` and `/robots.txt` served statically
- 🛡️ **Security hardening** — strict Content Security Policy (no inline scripts in production), HSTS, `X-Frame-Options`, and hidden `X-Powered-By`
- 📱 **Brand polish** — custom favicon (`icon.png`) and apple-touch icon from the studio logo, splash screen, dark theme with `theme-color`

## Tech Stack

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                            |
| UI         | React 19, Tailwind CSS v4, shadcn/ui (`@base-ui`)  |
| Motion     | `motion` (formerly Framer Motion)                  |
| Icons      | lucide-react                                       |
| Language   | TypeScript 5                                        |
| Package    | pnpm 11                                            |

## Getting Started

Requirements: **Node.js 20+** (or Bun) and **pnpm**.

```bash
# 1. Install dependencies
pnpm install

# 2. Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

The page auto-updates as you edit files under `src/app/`.

### Production build

```bash
pnpm build        # create a production build
pnpm start        # serve the production build (-p 3000 by default)
pnpm lint         # run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── portfolio/route.ts   # API: lists images from public/portfolio/
│   ├── globals.css               # Global styles / Tailwind theme
│   ├── layout.tsx                # Metadata, fonts, CSP-compliant structure
│   ├── page.tsx                  # Landing page (hero + portfolio + JSON-LD)
│   ├── robots.ts                 # robots.txt (static)
│   ├── sitemap.ts                # sitemap.xml (static)
│   └── icon.png / apple-icon.png # Favicon assets
├── components/
│   ├── Footer.tsx                # Footer with social links & WhatsApp CTA
│   ├── JsonLd.tsx                # Reusable JSON-LD script renderer
│   ├── KatanaDivider.tsx         # Decorative divider
│   ├── KintsugiDivider.tsx       # Decorative divider
│   ├── Portfolio.tsx             # Portfolio section
│   ├── PortfolioCarousel.tsx     # Infinite auto-scrolling carousel
│   └── SplashScreen.tsx          # Intro splash animation
├── data/
│   └── portfolio.ts              # Portfolio image metadata
└── lib/
    └── site.ts                   # Site-wide constants + URL helper (single source of truth for SEO)
```

## Environment Variables

| Variable              | Default                        | Description                                    |
| --------------------- | ------------------------------ | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://artnaldotattoo.vercel.app` | Canonical base URL. **Set this to your production domain** before deploying. |

Vars are read through `src/lib/site.ts`, which centralises the site URL, brand name, contact phone, and socials. Update `SITE_FALLBACK_URL` there to point to your real domain.

## Portfolio & Images

- The API route `src/app/api/portfolio/route.ts` serves images from `public/portfolio/`.
- Add new work by dropping image files into `public/portfolio/`; they are picked up automatically (JPEG, PNG, and WebP supported).
- Image optimization is enabled via `next/image` with a 75/100 quality profile (`next.config.ts`).

## Security

The site ships with production-hardening headers applied globally via `next.config.ts`:

- **Content-Security-Policy** — strict (no inline scripts) in production, relaxed in dev for HMR
- **Strict-Transport-Security** (HSTS with `preload`)
- **X-Frame-Options: DENY**
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy**, **Permissions-Policy**
- `poweredByHeader: false` (hides `X-Powered-By`)

## Deployment

The easiest way is to push to GitHub and connect the repo to [Vercel](https://vercel.com).

Before deploying to production:

1. Set `NEXT_PUBLIC_SITE_URL` to your real domain in Vercel's environment variables.
2. Update the `TODO` in `src/lib/site.ts` to replace the fallback URL.
3. Fill in the studio's real `streetAddress` / `geo` coordinates in the JSON-LD in `src/app/page.tsx`.

## License

All rights reserved.