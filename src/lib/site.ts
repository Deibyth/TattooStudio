/**
 * Site-wide SEO constants.
 *
 * Centraliza la información de marca, el idioma objetivo (es-CO) y la URL
 * base del sitio. Tanto sitemap.ts como robots.ts, layout.tsx y el JSON-LD
 * de la landing leen de aquí para mantener una única fuente de verdad.
 *
 * NOTA: Ajusta `SITE_FALLBACK_URL` cuando exista un dominio propio. Para
 * lectura en cliente se usa NEXT_PUBLIC_SITE_URL; en build/server se puede
 * sobreescribir con NEXT_PUBLIC_SITE_URL o con el fallback.
 */

/**
 * URL base del sitio.
 * TODO: reemplazar por el dominio definitivo (p. ej. https://artnaldo.com)
 * cuando esté registrado, y configurar NEXT_PUBLIC_SITE_URL en Vercel.
 */
export const SITE_FALLBACK_URL = "https://tattoo-studio-seven-delta.vercel.app";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    SITE_FALLBACK_URL
).replace(/\/$/, "");

const route = (path: string) => `${siteUrl}${path}`;

export const SITE = {
  url: siteUrl,
  home: route("/"),
  /** Marca comercial registrada en el dominio. */
  name: "ARTNALDO TATTOO STUDIO",
  /** Nombre corto usado en title/OG. */
  shortName: "Artnaldo Tattoo",
  /** Teléfono de contacto público. */
  telephone: "+57 322 885 1584",
  e164Phone: "+573228851584",
  /** Instagram oficial del estudio. */
  instagram: "https://www.instagram.com/artnaldotattoo/",
  /** WhatsApp de cotización. */
  whatsapp:
    "https://api.whatsapp.com/send/?phone=573228851584&text=%F0%9F%9A%80%20Quiero%20m%C3%A1s%20informaci%C3%B3n&type=phone_number&app_absent=0",
  /** Logo usado como favicon/OG/icono de marca. */
  logo: route("/logo.jpg"),
  /** Tono de marca para móvil (negro carbón). */
  themeColor: "#0A0A0B",
} as const;