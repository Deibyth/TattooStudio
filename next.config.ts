import type { NextConfig } from "next";

/**
 * Security headers — hardening del sitio.
 * - CSP condicionado por entorno. IMPORTANTE (verificado contra la guía oficial
 *   de Next.js `docs/01-app/02-guides/content-security-policy.md`):
 *   el App Router inyecta scripts inline OBLIGATORIOS en producción
 *   (contexto de hidratación `self.__next_f`) para poder hidratar la página.
 *   Sin permitir inline, `script-src 'self'` bloquea esos scripts y la app no
 *   arranca. Esta landing no recibe input de usuario ni datos sensibles, por lo
 *   que `script-src 'self' 'unsafe-inline'` en producción es la receta oficial
 *   "sin nonces" que mantiene el sitio estático/cacheable (seed de SEO).
 *   El resto del policy (styles, img, fonts, connect, base-uri, frame-ancestors,
 *   object-src, upgrade-insecure-requests) sigue estricto.
 * - Un nonce permitiría un script-src sin 'unsafe-inline', pero obliga a
 *   dynamic render (pierde prerender estático/CDN/SEO). No aplica acá.
 */
const isProd = process.env.NODE_ENV === "production";

// Scripts & estilos de producción: self + inline (requerido por Next para hidratación).
// No hay terceros (Google Fonts se auto-alojan en _next/static via next/font/google).
const scriptSrc = isProd
  ? "'self' 'unsafe-inline'"
  : "'self' 'unsafe-inline' 'unsafe-eval'";
const connectSrc = isProd
  ? "'self'"
  : "'self' ws: http:";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      `default-src 'self'`,
      `script-src ${scriptSrc}`,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: blob:`,
      `font-src 'self' data:`,
      `connect-src ${connectSrc}`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
      `upgrade-insecure-requests`,
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Oculta el header "X-Powered-By: Next.js" para no dejar expuesto el stack.
  poweredByHeader: false,
  images: {
    qualities: [100, 75],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;