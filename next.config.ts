import type { NextConfig } from "next";

/**
 * Security headers — hardening del sitio.
 * - Uso un CSP condicionado por entorno: en dev Next.js inyecta scripts
 *   inline para HMR/fast refresh, por eso se relaja con 'unsafe-inline';
 *   en producción se aplica el policy estricto (sin inline). Solo hay un
 *   bloque inline real en producción (la asignación self.__next_r de Next),
 *   por lo que el policy de prod se mantiene sin `unsafe-inline`.
 */
const isProd = process.env.NODE_ENV === "production";

// Scripts & estilos de producción: self + inline proporcionado por Next.
// No hay terceros (Google Fonts se auto-alojan en _next/static vía next/font/google).
const scriptSrc = isProd
  ? "'self'"
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