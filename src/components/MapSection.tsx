"use client";

import { motion } from "motion/react";
import { SITE } from "@/lib/site";
import RevealTitle from "@/components/RevealTitle";
import { REVEAL_TITLES } from "@/data/revealTitles";

/**
 * Sección de ubicación con mapa de Google embebido.
 *
 * Se renderiza justo antes del Footer para invitar al visitante a conocer
 * el estudio. El iframe usa `loading="lazy"` (carga diferida) y se ajusta
 * automáticamente a cualquier ancho de pantalla gracias al contenedor con
 * aspect-ratio, así que no hay recorte ni scroll interno en móvil.
 *
 * Dirección pública del estudio: Cra. 71d #1-13 sur, Kennedy, Bogotá.
 */

/** URL del embed oficial del estudio (Google Maps Embed API). */
const STUDIO_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.5526155485945!2d-74.13703270326455!3d4.622289668737763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9f000d36664f%3A0x5745040db0381112!2sJuan%20vargas%20Barbershop!5e0!3m2!1ses!2sco!4v1792546270532!5m2!1ses!2sco"

/** Enlace directo a Google Maps para "Cómo llegar" (mismas coordenadas del embed). */
const STUDIO_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "4.622830907916801,-74.13742028326351"
)}`;

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function MapSection() {
  return (
    <section
      id="ubicacion"
      className="relative z-10 py-24 px-6 bg-carbon-900/95 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copia de invitación */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-xl"
        >
          <div className="inline-block px-4 py-1.5 border border-rojo-torii-600/30 rounded-full text-xs font-semibold tracking-widest text-rojo-torii-500 uppercase bg-carbon-800/50 backdrop-blur-sm">
            Ubicación · Bogotá
          </div>

          <RevealTitle
            as="h2"
            {...REVEAL_TITLES.map}
            className="text-4xl md:text-5xl font-display text-blanco-washi leading-[1.15] tracking-tight"
          />

          <div className="w-12 h-1 bg-rojo-torii-600" />

          <p className="text-lg text-gris-secundario font-light leading-relaxed">
            Acércate y conoce el espacio donde el papel se vuelve piel.
            Coordina tu visita, camina hasta el estudio y déjanos diseñar
            contigo la pieza que ya tienes en la cabeza.
          </p>

          <div className="flex items-start gap-3 text-sm text-gris-secundario font-light">
            <MapPinIcon className="w-5 h-5 text-rojo-torii-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Cra. 71d #1-13 sur, Kennedy · Bogotá, Colombia
              <br />
              Artnaldo Tattoo Studio · Agenda previa{" "}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blanco-washi font-medium hover:text-rojo-torii-500 hover:underline underline-offset-4 transition-colors"
              >
                por WhatsApp
              </a>
            </span>
          </div>

          <div className="flex items-start gap-3 text-sm text-gris-secundario font-light">
            <ClockIcon className="w-5 h-5 text-rojo-torii-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Lunes a sábado · 10:00 a. m. – 7:00 p. m.
              <br />
              Domingo cerrado
            </span>
          </div>

          <motion.a
            href={STUDIO_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-4 text-sm font-bold tracking-widest uppercase text-blanco-washi border border-oro-kintsugi/40 hover:border-oro-kintsugi hover:bg-carbon-800 hover:shadow-[0_0_18px_rgba(217,4,41,0.2)] transition-all duration-300 cursor-pointer"
          >
            Cómo llegar →
          </motion.a>
        </motion.div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative overflow-hidden rounded-sm border border-carbon-700 bg-carbon-900 group"
        >
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]">
            <iframe
              src={STUDIO_EMBED_URL}
              title="Mapa del estudio Thermuthis Tattoo en Bogotá"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0 [filter:invert(92%)_hue-rotate(180deg)_saturate(0.72)_brightness(0.82)_contrast(1.12)] transition-[filter] duration-500 group-hover:[filter:invert(92%)_hue-rotate(180deg)_saturate(0.86)_brightness(0.9)_contrast(1.08)]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 bg-[#0a0a0b]/10 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-4 z-20 rounded-sm border border-oro-kintsugi/25 transition-colors duration-500 group-hover:border-oro-kintsugi/55" />
        </motion.div>
      </div>
    </section>
  );
}
